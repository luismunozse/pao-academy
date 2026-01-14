# Guía de Content-Types para Strapi

Esta guía te ayudará a configurar los Content-Types necesarios en Strapi para la plataforma de cursos.

## 📋 Content-Types a Crear

### 1. Course (Curso)

**Collection Type:** `course`

#### Campos:

| Campo | Tipo | Configuración |
|-------|------|---------------|
| title | Text (short) | Required, Unique |
| slug | UID (from title) | Required, Unique |
| short_description | Text (short) | - |
| description | Rich Text | Required |
| price | Number (decimal) | Required, Default: 0 |
| currency | Enumeration | Values: USD, EUR, MXN (Default: USD) |
| duration_hours | Number (integer) | - |
| level | Enumeration | Values: beginner, intermediate, advanced (Required) |
| is_published | Boolean | Default: false |
| thumbnail | Media (Single image) | - |
| tags | JSON | - |

#### Relaciones:
- `instructor` → Relation (Many-to-One) con Instructor
- `category` → Relation (Many-to-One) con Category
- `lessons` → Relation (One-to-Many) con Lesson

---

### 2. Instructor (Instructor)

**Collection Type:** `instructor`

#### Campos:

| Campo | Tipo | Configuración |
|-------|------|---------------|
| name | Text (short) | Required |
| slug | UID (from name) | Required, Unique |
| bio | Rich Text | - |
| title | Text (short) | - |
| avatar | Media (Single image) | - |
| social_links | JSON | Ejemplo: {"linkedin": "url", "twitter": "url"} |

#### Relaciones:
- `courses` → Relation (One-to-Many) con Course

---

### 3. Lesson (Lección)

**Collection Type:** `lesson`

#### Campos:

| Campo | Tipo | Configuración |
|-------|------|---------------|
| title | Text (short) | Required |
| content | Rich Text | - |
| video_url | Text (long) | - |
| duration_minutes | Number (integer) | - |
| order | Number (integer) | Required, Default: 0 |
| is_free | Boolean | Default: false |

#### Relaciones:
- `course` → Relation (Many-to-One) con Course

#### Component (Resources):
Crear un Component llamado `lesson.resource`:
- title (Text)
- url (Text)
- type (Enumeration: pdf, link, download)

Agregar al Lesson:
- `resources` → Component (Repeatable) → lesson.resource

---

### 4. Category (Categoría)

**Collection Type:** `category`

#### Campos:

| Campo | Tipo | Configuración |
|-------|------|---------------|
| name | Text (short) | Required, Unique |
| slug | UID (from name) | Required, Unique |
| description | Text (long) | - |
| icon | Text (short) | Emoji o clase de icono |

#### Relaciones:
- `courses` → Relation (One-to-Many) con Course

---

### 5. Testimonial (Testimonio)

**Collection Type:** `testimonial`

#### Campos:

| Campo | Tipo | Configuración |
|-------|------|---------------|
| student_name | Text (short) | Required |
| content | Text (long) | Required |
| rating | Number (integer) | Required, Min: 1, Max: 5 |
| avatar | Media (Single image) | - |
| is_featured | Boolean | Default: false |

#### Relaciones:
- `course` → Relation (Many-to-One) con Course

---

## 🚀 Pasos para Crear en Strapi

1. **Iniciar Strapi:**
   ```bash
   cd cms
   npm run develop
   ```

2. **Acceder al Admin:**
   - URL: http://localhost:1337/admin
   - Crea tu cuenta de admin si es la primera vez

3. **Crear Content-Types:**
   - Ve a: Content-Type Builder (panel izquierdo)
   - Click en "+ Create new collection type"
   - Sigue la tabla de arriba para cada Content-Type

4. **Configurar Permisos:**
   - Ve a: Settings > Roles > Public
   - Para cada Content-Type, habilita:
     - `find` (listar)
     - `findOne` (obtener uno)
   - Esto permite que Next.js acceda sin autenticación

5. **Crear API Token (Recomendado para producción):**
   - Ve a: Settings > API Tokens
   - Click en "+ Create new API Token"
   - Nombre: "Next.js Frontend"
   - Token type: Read-only
   - Copia el token y agrégalo a `.env.local` en Next.js:
     ```
     STRAPI_API_TOKEN=tu-token-aqui
     ```

---

## 📝 Ejemplo de Datos de Prueba

### Course Example:
```json
{
  "title": "Introducción a React",
  "slug": "introduccion-react",
  "short_description": "Aprende React desde cero",
  "description": "Curso completo de React...",
  "price": 49.99,
  "currency": "USD",
  "duration_hours": 10,
  "level": "beginner",
  "is_published": true,
  "tags": ["react", "javascript", "frontend"]
}
```

### Lesson Example:
```json
{
  "title": "¿Qué es React?",
  "content": "React es una biblioteca de JavaScript...",
  "video_url": "https://youtube.com/watch?v=...",
  "duration_minutes": 15,
  "order": 1,
  "is_free": true,
  "resources": [
    {
      "title": "Documentación oficial",
      "url": "https://react.dev",
      "type": "link"
    }
  ]
}
```

---

## 🔗 Integración con Next.js

Una vez creados los Content-Types, puedes consumirlos desde Next.js:

```typescript
import { getCourses, getCourseBySlug } from '@/lib/strapi'

// En un Server Component
export default async function CoursesPage() {
  const { data: courses } = await getCourses({
    populate: 'thumbnail,instructor',
    filters: { is_published: true }
  })

  return (
    <div>
      {courses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}
```

---

## 🪝 Webhook para Revalidación (Opcional)

Configura un webhook en Strapi para que Next.js actualice su cache cuando cambies contenido:

1. En Strapi: Settings > Webhooks > Create
2. URL: `https://tu-dominio.com/api/revalidate?secret=tu-secret`
3. Events: `entry.create`, `entry.update`, `entry.delete`

Luego crea el endpoint en Next.js:

```typescript
// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ message: 'Invalid secret' }, { status: 401 })
  }

  revalidatePath('/courses')
  return Response.json({ revalidated: true })
}
```

---

## ✅ Checklist

- [ ] Crear Content-Type: Course
- [ ] Crear Content-Type: Instructor
- [ ] Crear Content-Type: Lesson
- [ ] Crear Content-Type: Category
- [ ] Crear Content-Type: Testimonial
- [ ] Configurar permisos públicos
- [ ] Crear API Token
- [ ] Agregar datos de prueba
- [ ] Probar integración con Next.js
