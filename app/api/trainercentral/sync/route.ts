import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getAllTCCourses } from '@/lib/trainercentral/courses';

interface CourseMapping {
  localCourseId: string;
  tcCourseId: string;
}

/**
 * POST /api/trainercentral/sync
 * Sincroniza los mappings entre cursos locales y TrainerCentral
 * Solo accesible para admins
 */
export async function POST(request: NextRequest) {
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

    const { mappings } = await request.json() as { mappings: CourseMapping[] };

    if (!mappings || !Array.isArray(mappings)) {
      return NextResponse.json({ error: 'Mappings inválidos' }, { status: 400 });
    }

    // Obtener cursos de TC para validar y obtener metadata
    const tcCourses = await getAllTCCourses();
    const tcCoursesMap = new Map(tcCourses.map(c => [c.course_id, c]));

    let synced = 0;
    const errors: string[] = [];

    for (const mapping of mappings) {
      const tcCourse = tcCoursesMap.get(mapping.tcCourseId);

      if (!tcCourse) {
        errors.push(`Curso TC ${mapping.tcCourseId} no encontrado`);
        continue;
      }

      const { error } = await (supabase
        .from('tc_course_mappings') as any)
        .upsert({
          local_course_id: mapping.localCourseId,
          tc_course_id: mapping.tcCourseId,
          tc_course_key: tcCourse.course_key,
          tc_course_name: tcCourse.course_name,
          last_synced_at: new Date().toISOString(),
          sync_status: 'synced',
        }, { onConflict: 'local_course_id' });

      if (error) {
        errors.push(`Error mapping ${mapping.localCourseId}: ${error.message}`);
      } else {
        synced++;
      }
    }

    return NextResponse.json({
      success: true,
      synced,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error: unknown) {
    console.error('Error syncing TC courses:', error);
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * DELETE /api/trainercentral/sync
 * Elimina un mapping específico
 */
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const { data: profile } = await (supabase
      .from('profiles') as any)
      .select('role')
      .eq('id', user.id)
      .single();

    if ((profile as any)?.role !== 'admin') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    const { localCourseId } = await request.json();

    if (!localCourseId) {
      return NextResponse.json({ error: 'localCourseId requerido' }, { status: 400 });
    }

    const { error } = await (supabase
      .from('tc_course_mappings') as any)
      .delete()
      .eq('local_course_id', localCourseId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Error deleting TC mapping:', error);
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
