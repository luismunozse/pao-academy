import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Lista de imágenes rotas y sus reemplazos
const BROKEN_IMAGES_MAP = new Map([
  ['photo-1556157382-97eda2f9e69b', 'photo-1516321318423-f06f85e504b3'],
  // Agregar más imágenes rotas aquí si se encuentran
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Solo interceptar solicitudes de imágenes de Next.js
  if (pathname.startsWith('/_next/image')) {
    const url = request.nextUrl.searchParams.get('url');
    
    if (url) {
      // Verificar si la URL contiene alguna imagen rota
      for (const [brokenId, replacementId] of BROKEN_IMAGES_MAP) {
        if (url.includes(brokenId)) {
          // Reemplazar la imagen rota con una válida
          const newUrl = url.replace(brokenId, replacementId);
          request.nextUrl.searchParams.set('url', newUrl);
          return NextResponse.redirect(request.nextUrl);
        }
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
