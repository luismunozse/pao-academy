import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getLearnerEnrollments } from '@/lib/trainercentral/enrollments';

/**
 * GET /api/trainercentral/progress
 * Obtiene el progreso del usuario en TrainerCentral y sincroniza con la BD local
 */
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    // Obtener TC learner ID del usuario
    const { data: learnerMapping } = await (supabase
      .from('tc_learner_mappings') as any)
      .select('tc_learner_id')
      .eq('user_id', user.id)
      .single();

    if (!learnerMapping) {
      return NextResponse.json({ enrollments: [] });
    }

    // Obtener inscripciones de TC
    const tcEnrollments = await getLearnerEnrollments((learnerMapping as any).tc_learner_id);

    // Obtener mappings de cursos para relacionar con cursos locales
    const { data: courseMappings } = await (supabase
      .from('tc_course_mappings') as any)
      .select('tc_course_id, local_course_id');

    const tcToLocalMap = new Map(
      (courseMappings as any[])?.map((m: any) => [m.tc_course_id, m.local_course_id]) || []
    );

    // Sincronizar progreso con BD local
    for (const enrollment of tcEnrollments) {
      const localCourseId = tcToLocalMap.get(enrollment.course_id);

      if (localCourseId) {
        // Actualizar enrollment local con progreso de TC
        await (supabase
          .from('enrollments') as any)
          .update({
            progress: enrollment.progress_percentage,
            status: enrollment.enrollment_status === 'completed' ? 'completed' : 'active',
            completed_at: enrollment.completion_date || null,
          })
          .eq('user_id', user.id)
          .eq('course_id', localCourseId);
      }
    }

    // Mapear enrollments con info de cursos locales
    const enrichedEnrollments = tcEnrollments.map(enrollment => ({
      ...enrollment,
      local_course_id: tcToLocalMap.get(enrollment.course_id) || null,
    }));

    return NextResponse.json({ enrollments: enrichedEnrollments });
  } catch (error: unknown) {
    console.error('Error fetching TC progress:', error);
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
