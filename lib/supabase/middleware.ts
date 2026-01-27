import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session if expired
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protected routes
  const protectedRoutes = ['/dashboard', '/admin'];
  const publicAdminRoutes = ['/admin/login'];
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );
  const isPublicAdminRoute = publicAdminRoutes.includes(request.nextUrl.pathname);

  if (isProtectedRoute && !isPublicAdminRoute && !user) {
    const url = request.nextUrl.clone();
    // Redirigir a /admin/login si intenta acceder a rutas de admin
    if (request.nextUrl.pathname.startsWith('/admin')) {
      url.pathname = '/admin/login';
    } else {
      url.pathname = '/login';
      url.searchParams.set('redirect', request.nextUrl.pathname);
    }
    return NextResponse.redirect(url);
  }

  // Admin-only routes (excluir /admin/login)
  if (request.nextUrl.pathname.startsWith('/admin') && !isPublicAdminRoute && user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      const url = request.nextUrl.clone();
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
