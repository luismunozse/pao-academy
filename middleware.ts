import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

// Lista de imágenes rotas y sus reemplazos
const BROKEN_IMAGES_MAP = new Map([
  ['photo-1556157382-97eda2f9e69b', 'photo-1516321318423-f06f85e504b3'],
]);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Manejar imágenes rotas
  if (pathname.startsWith('/_next/image')) {
    const url = request.nextUrl.searchParams.get('url');
    if (url) {
      for (const [brokenId, replacementId] of BROKEN_IMAGES_MAP) {
        if (url.includes(brokenId)) {
          const newUrl = url.replace(brokenId, replacementId);
          request.nextUrl.searchParams.set('url', newUrl);
          return NextResponse.redirect(request.nextUrl);
        }
      }
    }
  }

  // Actualizar sesión de Supabase y proteger rutas
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
