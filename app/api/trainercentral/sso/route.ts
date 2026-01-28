import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateSSOUrl } from '@/lib/trainercentral/sso';

/**
 * GET /api/trainercentral/sso
 * Genera una URL de SSO para acceder a TrainerCentral
 * Opcionalmente redirige a un curso específico
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    // Obtener parámetro de curso (opcional)
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('course');

    // Obtener datos del usuario
    const { data: profile } = await (supabase
      .from('profiles') as any)
      .select('full_name')
      .eq('id', user.id)
      .single();

    const nameParts = ((profile as any)?.full_name || 'Usuario').trim().split(' ');
    const firstName = nameParts[0] || 'Usuario';
    const lastName = nameParts.slice(1).join(' ') || '-';

    // Si se especifica un curso, obtener su course_key de TC
    let courseKey: string | undefined;

    if (courseId) {
      const { data: courseMapping } = await (supabase
        .from('tc_course_mappings') as any)
        .select('tc_course_key')
        .eq('local_course_id', courseId)
        .single();

      courseKey = (courseMapping as any)?.tc_course_key;
    }

    // Generar URL de SSO
    const ssoUrl = generateSSOUrl(
      {
        email: user.email!,
        firstName,
        lastName,
      },
      courseKey
    );

    return NextResponse.json({ url: ssoUrl });
  } catch (error: unknown) {
    console.error('Error generating SSO URL:', error);
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
