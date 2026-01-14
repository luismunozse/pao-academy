/**
 * Revalidation API Route
 * Webhook endpoint para que Strapi invalide el cache de Next.js
 * cuando se actualiza contenido
 */
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  const path = request.nextUrl.searchParams.get('path')

  // Verificar secret
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: 'Invalid secret' },
      { status: 401 }
    )
  }

  // Path es requerido
  if (!path) {
    return NextResponse.json(
      { message: 'Path parameter is required' },
      { status: 400 }
    )
  }

  try {
    // Revalidar el path específico
    revalidatePath(path)

    // También revalidar rutas relacionadas comunes
    if (path.includes('/cursos')) {
      revalidatePath('/cursos')
      revalidatePath('/')
    }

    return NextResponse.json({
      revalidated: true,
      path,
      now: Date.now(),
    })
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating', error: String(err) },
      { status: 500 }
    )
  }
}
