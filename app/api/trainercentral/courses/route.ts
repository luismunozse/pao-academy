import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getAllTCCourses } from '@/lib/trainercentral/courses';

/**
 * GET /api/trainercentral/courses
 * Lista todos los cursos de TrainerCentral
 * Solo accesible para admins
 */
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    // Verificar que sea admin
    const { data: profile } = await (supabase
      .from('profiles') as any)
      .select('role')
      .eq('id', user.id)
      .single();

    if ((profile as any)?.role !== 'admin') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    // Obtener cursos de TrainerCentral
    const courses = await getAllTCCourses();

    // Obtener mappings existentes
    const { data: mappings } = await (supabase
      .from('tc_course_mappings') as any)
      .select('tc_course_id, local_course_id');

    const mappingsMap = new Map(
      (mappings as any[])?.map((m: any) => [m.tc_course_id, m.local_course_id]) || []
    );

    // Agregar info de mapping a cada curso
    const coursesWithMapping = courses.map(course => ({
      ...course,
      local_course_id: mappingsMap.get(course.course_id) || null,
    }));

    return NextResponse.json({ courses: coursesWithMapping });
  } catch (error: unknown) {
    console.error('Error fetching TC courses:', error);
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
