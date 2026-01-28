import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getOrCreateLearner } from '@/lib/trainercentral/learners';
import { enrollLearnerInCourse, isLearnerEnrolled } from '@/lib/trainercentral/enrollments';

/**
 * POST /api/trainercentral/enroll
 * Inscribe a un usuario en un curso de TrainerCentral
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const { courseId } = await request.json();

    if (!courseId) {
      return NextResponse.json({ error: 'courseId requerido' }, { status: 400 });
    }

    // Obtener mapping del curso
    const { data: courseMapping } = await (supabase
      .from('tc_course_mappings') as any)
      .select('tc_course_id')
      .eq('local_course_id', courseId)
      .single();

    if (!courseMapping) {
      return NextResponse.json(
        { error: 'Este curso no está vinculado a TrainerCentral' },
        { status: 404 }
      );
    }

    // Obtener datos del usuario
    const { data: profile } = await (supabase
      .from('profiles') as any)
      .select('full_name')
      .eq('id', user.id)
      .single();

    const nameParts = ((profile as any)?.full_name || 'Usuario').trim().split(' ');
    const firstName = nameParts[0] || 'Usuario';
    const lastName = nameParts.slice(1).join(' ') || '-';

    // Obtener o crear learner en TC
    const learner = await getOrCreateLearner({
      email: user.email!,
      firstName,
      lastName,
    });

    // Guardar mapping del learner
    await (supabase
      .from('tc_learner_mappings') as any)
      .upsert({
        user_id: user.id,
        tc_learner_id: learner.learner_id,
        tc_email: user.email,
        last_synced_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });

    // Verificar si ya está inscrito
    const alreadyEnrolled = await isLearnerEnrolled(
      learner.learner_id,
      courseMapping.tc_course_id
    );

    if (alreadyEnrolled) {
      return NextResponse.json({
        success: true,
        message: 'Ya estás inscrito en este curso',
        alreadyEnrolled: true,
      });
    }

    // Inscribir en TC
    const enrollment = await enrollLearnerInCourse(
      learner.learner_id,
      courseMapping.tc_course_id
    );

    return NextResponse.json({
      success: true,
      enrollment,
    });
  } catch (error: unknown) {
    console.error('Error enrolling in TC:', error);
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
