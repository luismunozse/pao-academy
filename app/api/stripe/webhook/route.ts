import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import { getOrCreateLearner } from '@/lib/trainercentral/learners';
import { enrollLearnerInCourse } from '@/lib/trainercentral/enrollments';

// Create supabase admin client lazily
const getSupabaseAdmin = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
};

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabaseAdmin = getSupabaseAdmin();

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutComplete(supabaseAdmin, session);
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment succeeded:', paymentIntent.id);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentFailed(supabaseAdmin, paymentIntent);
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        await handleRefund(supabaseAdmin, charge);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook handler error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function handleCheckoutComplete(supabaseAdmin: any, session: Stripe.Checkout.Session) {
  const { userId, courseId, couponId } = session.metadata || {};

  if (!userId || !courseId) {
    console.error('Missing metadata in checkout session');
    return;
  }

  // Actualizar pago a completado
  const { error: paymentError } = await supabaseAdmin
    .from('payments')
    .update({
      status: 'completed',
      stripe_payment_id: session.payment_intent as string,
      payment_method: session.payment_method_types?.[0] || 'card'
    })
    .eq('stripe_session_id', session.id);

  if (paymentError) {
    console.error('Error updating payment:', paymentError);
  }

  // Verificar si ya existe inscripcion
  const { data: existingEnrollment } = await supabaseAdmin
    .from('enrollments')
    .select('id')
    .eq('user_id', userId)
    .eq('course_id', courseId)
    .single();

  if (!existingEnrollment) {
    // Crear inscripcion
    const { error: enrollError } = await supabaseAdmin
      .from('enrollments')
      .insert({
        user_id: userId,
        course_id: courseId,
        status: 'active'
      });

    if (enrollError) {
      console.error('Error creating enrollment:', enrollError);
    }
  }

  // Incrementar uso de cupon
  if (couponId) {
    await supabaseAdmin.rpc('increment_coupon_usage', { coupon_id: couponId });
  }

  console.log(`Enrollment created for user ${userId} in course ${courseId}`);

  // =====================================================
  // TRAINERCENTRAL: Inscripción automática
  // =====================================================
  try {
    // Verificar si el curso tiene mapping con TrainerCentral
    const { data: courseMapping } = await supabaseAdmin
      .from('tc_course_mappings')
      .select('tc_course_id')
      .eq('local_course_id', courseId)
      .single();

    if (courseMapping?.tc_course_id) {
      // Obtener datos del usuario
      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('full_name')
        .eq('id', userId)
        .single();

      const userEmail = session.customer_email || session.customer_details?.email;

      if (userEmail) {
        const nameParts = (profile?.full_name || 'Usuario').trim().split(' ');
        const firstName = nameParts[0] || 'Usuario';
        const lastName = nameParts.slice(1).join(' ') || '-';

        // Obtener o crear learner en TrainerCentral
        const learner = await getOrCreateLearner({
          email: userEmail,
          firstName,
          lastName,
        });

        // Guardar mapping del learner
        await supabaseAdmin
          .from('tc_learner_mappings')
          .upsert({
            user_id: userId,
            tc_learner_id: learner.learner_id,
            tc_email: userEmail,
            last_synced_at: new Date().toISOString(),
          }, { onConflict: 'user_id' });

        // Inscribir en el curso de TrainerCentral
        await enrollLearnerInCourse(learner.learner_id, courseMapping.tc_course_id);

        console.log(`User ${userId} enrolled in TC course ${courseMapping.tc_course_id}`);
      }
    }
  } catch (tcError) {
    // Log el error pero no fallar - el enrollment local ya existe
    console.error('TrainerCentral enrollment error:', tcError);

    // Guardar para retry posterior
    await supabaseAdmin
      .from('tc_pending_enrollments')
      .upsert({
        user_id: userId,
        course_id: courseId,
        error: tcError instanceof Error ? tcError.message : 'Unknown error',
        retry_count: 0,
        created_at: new Date().toISOString(),
      }, { onConflict: 'user_id,course_id' });
  }
}

async function handlePaymentFailed(supabaseAdmin: any, paymentIntent: Stripe.PaymentIntent) {
  // Buscar pago por stripe_payment_id
  const { error } = await supabaseAdmin
    .from('payments')
    .update({ status: 'failed' })
    .eq('stripe_payment_id', paymentIntent.id);

  if (error) {
    console.error('Error updating failed payment:', error);
  }
}

async function handleRefund(supabaseAdmin: any, charge: Stripe.Charge) {
  if (!charge.payment_intent) return;

  const { error } = await supabaseAdmin
    .from('payments')
    .update({
      status: 'refunded',
      refunded_at: new Date().toISOString()
    })
    .eq('stripe_payment_id', charge.payment_intent);

  if (error) {
    console.error('Error updating refunded payment:', error);
  }
}
