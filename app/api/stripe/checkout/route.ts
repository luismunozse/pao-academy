import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const { courseId, couponCode } = await request.json();

    if (!courseId) {
      return NextResponse.json({ error: 'Curso no especificado' }, { status: 400 });
    }

    // Obtener curso
    const { data: course, error: courseError } = await (supabase
      .from('courses') as any)
      .select('*')
      .eq('id', courseId)
      .eq('is_published', true)
      .single();

    if (courseError || !course) {
      return NextResponse.json({ error: 'Curso no encontrado' }, { status: 404 });
    }

    // Verificar si ya esta inscrito
    const { data: existingEnrollment } = await (supabase
      .from('enrollments') as any)
      .select('id')
      .eq('user_id', user.id)
      .eq('course_id', courseId)
      .single();

    if (existingEnrollment) {
      return NextResponse.json({ error: 'Ya estas inscrito en este curso' }, { status: 400 });
    }

    let finalPrice = course.price;
    let discountAmount = 0;
    let couponId = null;

    // Validar cupon si se proporciona
    if (couponCode) {
      const { data: coupon } = await (supabase
        .from('coupons') as any)
        .select('*')
        .eq('code', couponCode.toUpperCase())
        .eq('is_active', true)
        .single();

      if (coupon) {
        const now = new Date();
        const isValidDate =
          (!coupon.starts_at || new Date(coupon.starts_at) <= now) &&
          (!coupon.expires_at || new Date(coupon.expires_at) > now);

        const isValidUses = !coupon.max_uses || coupon.used_count < coupon.max_uses;
        const isValidCourse = !coupon.course_id || coupon.course_id === courseId;
        const meetsMinPurchase = finalPrice >= (coupon.min_purchase || 0);

        if (isValidDate && isValidUses && isValidCourse && meetsMinPurchase) {
          couponId = coupon.id;

          if (coupon.discount_type === 'percentage') {
            discountAmount = (finalPrice * coupon.discount_value) / 100;
          } else {
            discountAmount = Math.min(coupon.discount_value, finalPrice);
          }

          finalPrice = Math.max(0, finalPrice - discountAmount);
        }
      }
    }

    // Si el curso es gratis despues del descuento
    if (finalPrice <= 0) {
      // Crear inscripcion directamente
      const { error: enrollError } = await (supabase
        .from('enrollments') as any)
        .insert({
          user_id: user.id,
          course_id: courseId,
          status: 'active'
        });

      if (enrollError) throw enrollError;

      // Registrar pago
      await (supabase
        .from('payments') as any)
        .insert({
          user_id: user.id,
          course_id: courseId,
          coupon_id: couponId,
          amount: 0,
          discount_amount: discountAmount,
          currency: course.currency || 'USD',
          status: 'completed',
          payment_method: 'free'
        });

      // Actualizar uso de cupon
      if (couponId) {
        await (supabase as any).rpc('increment_coupon_usage', { coupon_id: couponId });
      }

      return NextResponse.json({
        success: true,
        free: true,
        message: 'Inscripcion completada'
      });
    }

    // Obtener perfil para metadata
    const { data: profile } = await (supabase
      .from('profiles') as any)
      .select('full_name, email')
      .eq('id', user.id)
      .single();

    // Crear sesion de Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: (course.currency || 'USD').toLowerCase(),
            product_data: {
              name: course.title,
              description: course.short_description || undefined,
              images: course.thumbnail_url ? [course.thumbnail_url] : undefined,
            },
            unit_amount: Math.round(finalPrice * 100), // Stripe usa centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/cursos/${course.slug}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cursos/${course.slug}?canceled=true`,
      customer_email: profile?.email || user.email,
      metadata: {
        userId: user.id,
        courseId: courseId,
        couponId: couponId || '',
        discountAmount: discountAmount.toString(),
        originalPrice: course.price.toString(),
      },
      allow_promotion_codes: !couponCode, // Permitir codigos de Stripe si no uso cupon propio
    });

    // Guardar pago pendiente
    await (supabase
      .from('payments') as any)
      .insert({
        user_id: user.id,
        course_id: courseId,
        coupon_id: couponId,
        stripe_session_id: session.id,
        amount: finalPrice,
        discount_amount: discountAmount,
        currency: course.currency || 'USD',
        status: 'pending'
      });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Error al procesar el pago' },
      { status: 500 }
    );
  }
}
