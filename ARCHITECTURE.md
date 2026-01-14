# 🏗️ Arquitectura Pao Academy - Strapi + Supabase

## Diagrama de Arquitectura

```
┌──────────────────────────────────────────────────────────────────┐
│                         USUARIOS                                  │
│                     (Estudiantes / Admin)                         │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│                      NEXT.JS FRONTEND                             │
│                     (Vercel / Railway)                            │
│                                                                   │
│  ┌─────────────────┐  ┌──────────────────┐  ┌─────────────────┐ │
│  │  Landing Pages  │  │   Auth Pages     │  │   Dashboard     │ │
│  │  /              │  │   /login         │  │   /dashboard    │ │
│  │  /cursos        │  │   /auth/callback │  │   /perfil       │ │
│  └─────────────────┘  └──────────────────┘  └─────────────────┘ │
│                                                                   │
│  Libraries:                                                       │
│  • @supabase/ssr (Auth & Data)                                   │
│  • lib/strapi.ts (CMS Content)                                   │
│  • framer-motion (Animations)                                    │
└───────────────────┬──────────────────────┬───────────────────────┘
                    │                      │
        ┌───────────┴─────┐    ┌──────────┴───────────┐
        │                 │    │                      │
        ▼                 ▼    ▼                      ▼
┌──────────────┐   ┌──────────────────┐      ┌────────────────┐
│   STRAPI     │   │    SUPABASE      │      │  EXTERNAL APIs │
│   CMS        │   │    Backend       │      │                │
│              │   │                  │      │  • Stripe      │
│ (Railway/    │   │ (Supabase Cloud) │      │  • SendGrid    │
│  VPS)        │   │                  │      │  • Cloudinary  │
└──────────────┘   └──────────────────┘      └────────────────┘
```

---

## Distribución de Responsabilidades

### 🎨 STRAPI (Headless CMS)
**Propósito**: Gestión de contenido estático y administrable

#### Responsabilidades:
- ✅ **Cursos**: Título, descripción, precio, nivel, thumbnail
- ✅ **Instructores**: Bio, avatar, redes sociales
- ✅ **Lecciones**: Contenido, videos, recursos descargables
- ✅ **Categorías**: Organización de cursos
- ✅ **Testimonios**: Reviews destacados
- ✅ **Blog/Recursos**: Artículos educativos
- ✅ **Landing Pages**: Contenido dinámico de páginas

#### Ventajas:
- Panel admin intuitivo para no-técnicos
- Content-Type builder visual
- Media library integrada
- Versionado de contenido (draft/publish)
- Búsqueda y filtrado avanzado

#### API Endpoints Generados:
```
GET  /api/courses
GET  /api/courses/:id
GET  /api/instructors
GET  /api/lessons?filters[course][id][$eq]=1
GET  /api/categories
GET  /api/testimonials
```

---

### 🗄️ SUPABASE (Backend-as-a-Service)
**Propósito**: Autenticación, datos de usuarios y features en tiempo real

#### Responsabilidades:
- ✅ **Autenticación**: Email, OAuth (Google, GitHub), Magic Links
- ✅ **Perfiles de Usuario**: Datos adicionales a auth.users
- ✅ **Inscripciones**: Relación usuario-curso
- ✅ **Progreso de Lecciones**: Tracking granular por lección
- ✅ **Certificados**: Generación y verificación
- ✅ **Reseñas de Usuarios**: Reviews escritas por estudiantes
- ✅ **Notificaciones**: Sistema en tiempo real
- ✅ **Analytics**: Métricas de uso

#### Ventajas:
- PostgreSQL completo con SQL directo
- Real-time subscriptions (websockets)
- Row Level Security (RLS) para seguridad
- Auto-generated REST y GraphQL APIs
- Storage para archivos (certificados, avatars)
- Edge Functions para lógica serverless

#### Tablas Principales:
```sql
profiles              -- Perfiles de usuarios
course_enrollments    -- Inscripciones
lesson_progress       -- Progreso de lecciones
certificates          -- Certificados emitidos
course_reviews        -- Reseñas de usuarios
notifications         -- Notificaciones
```

---

## Flujos de Datos

### 1️⃣ Carga de Página de Curso

```
Usuario visita /cursos/introduccion-react
           │
           ▼
    [Next.js Server Component]
           │
           ├──────────────────┐
           ▼                  ▼
    [Strapi API]        [Supabase]
    getCourseBySlug()   getEnrollment()
           │                  │
           ▼                  ▼
    Contenido del curso   Progreso del usuario
           │                  │
           └────────┬─────────┘
                    ▼
           [Renderiza página combinada]
```

### 2️⃣ Usuario Inscribe a un Curso

```
Usuario click "Inscribirse"
           │
           ▼
    [Client Component]
    createClient()
           │
           ▼
    [Supabase Insert]
    INSERT INTO course_enrollments
           │
           ▼
    [Real-time Update]
    Dashboard se actualiza automáticamente
```

### 3️⃣ Admin Actualiza Contenido

```
Admin edita curso en Strapi
           │
           ▼
    [Strapi Save]
           │
           ▼
    [Webhook Trigger]
    POST /api/revalidate
           │
           ▼
    [Next.js Revalidation]
    Cache invalidado
           │
           ▼
    Usuarios ven contenido actualizado
```

### 4️⃣ Usuario Completa una Lección

```
Usuario marca lección como completa
           │
           ▼
    [Server Action]
    updateLessonProgress()
           │
           ▼
    [Supabase Update]
    UPDATE lesson_progress SET completed = true
           │
           ├──────────────────┐
           ▼                  ▼
    [Trigger]          [Calcular Progreso]
    calculate_course_  UPDATE course_enrollments
    progress()         SET progress = X%
           │
           ▼
    Si progress = 100% → Generar certificado
```

---

## Patrones de Integración

### Pattern 1: Server Component Fetch
```typescript
// app/cursos/[slug]/page.tsx
import { createClient } from '@/lib/supabase/server'
import { getCourseBySlug } from '@/lib/strapi'

export default async function CoursePage({ params }) {
  // Contenido del curso (Strapi)
  const course = await getCourseBySlug(params.slug)

  // Datos del usuario (Supabase)
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Progreso si está autenticado
  let enrollment = null
  if (user) {
    const { data } = await supabase
      .from('course_enrollments')
      .select('*')
      .eq('course_id', course.id)
      .eq('user_id', user.id)
      .single()
    enrollment = data
  }

  return <CourseView course={course} enrollment={enrollment} />
}
```

### Pattern 2: Client Component con Real-time
```typescript
'use client'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export function NotificationBell() {
  const [notifications, setNotifications] = useState([])
  const supabase = createClient()

  useEffect(() => {
    // Fetch inicial
    supabase
      .from('notifications')
      .select('*')
      .then(({ data }) => setNotifications(data))

    // Suscribirse a cambios en tiempo real
    const channel = supabase
      .channel('notifications')
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications' },
        (payload) => setNotifications(prev => [payload.new, ...prev])
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  return <Bell count={notifications.filter(n => !n.read).length} />
}
```

### Pattern 3: Server Action para Mutaciones
```typescript
// app/actions.ts
'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function markLessonComplete(lessonId: number) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('lesson_progress')
    .upsert({
      user_id: user.id,
      lesson_id: lessonId,
      completed: true,
      completed_at: new Date().toISOString()
    })

  if (error) throw error

  // Revalidar para que se vea el cambio inmediatamente
  revalidatePath('/dashboard')

  return { success: true }
}
```

---

## Seguridad

### Row Level Security (RLS) en Supabase

Todas las tablas tienen políticas de seguridad:

```sql
-- Usuarios solo ven sus propias inscripciones
CREATE POLICY "Users can view own enrollments"
  ON course_enrollments FOR SELECT
  USING (auth.uid() = user_id);

-- Usuarios solo pueden actualizar su propio progreso
CREATE POLICY "Users can update own lesson progress"
  ON lesson_progress FOR UPDATE
  USING (auth.uid() = user_id);
```

### Strapi API Token

```typescript
// Solo Next.js puede escribir a Strapi
headers: {
  'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
}
```

---

## Escalabilidad

### Caching Strategy

```typescript
// Strapi content (ISR)
export const revalidate = 60 // Revalidar cada 60 segundos

// Supabase queries (no-cache para datos de usuario)
const { data } = await supabase
  .from('enrollments')
  .select('*')
// Next.js automáticamente no cachea queries con auth
```

### Edge Functions (Futuro)

```typescript
// supabase/functions/generate-certificate/index.ts
import { createClient } from '@supabase/supabase-js'

Deno.serve(async (req) => {
  const { userId, courseId } = await req.json()

  // Generar PDF de certificado
  const pdfUrl = await generateCertificatePDF(userId, courseId)

  // Guardar en DB
  const supabase = createClient(...)
  await supabase.from('certificates').insert({
    user_id: userId,
    course_id: courseId,
    certificate_url: pdfUrl
  })

  return new Response(JSON.stringify({ url: pdfUrl }))
})
```

---

## Monitoreo

### Logs importantes:
- **Supabase**: Dashboard > Logs (Auth, Database, API)
- **Strapi**: stdout logs en servidor
- **Next.js**: Vercel Analytics & Logs

### Métricas clave:
- Tiempo de carga de páginas
- Tasa de inscripciones
- Progreso promedio de cursos
- Errores de API

---

## Roadmap

### Fase 1 (Actual): ✅
- [x] Configuración básica Strapi + Supabase
- [x] Autenticación
- [x] CRUD de cursos
- [x] Dashboard de estudiantes

### Fase 2 (Próximo):
- [ ] Integración de pagos (Stripe)
- [ ] Generación de certificados automática
- [ ] Sistema de comentarios en lecciones
- [ ] Notificaciones por email

### Fase 3 (Futuro):
- [ ] Gamificación (badges, leaderboard)
- [ ] Live streaming de clases
- [ ] Foro de comunidad
- [ ] Mobile app (React Native)

---

## Conclusión

Esta arquitectura híbrida combina lo mejor de ambos mundos:
- **Strapi**: Panel admin fácil para gestionar contenido
- **Supabase**: Backend potente para features avanzadas

Es escalable, mantenible y permite iterar rápidamente. 🚀
