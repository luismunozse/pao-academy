# 🚀 Guía de Configuración - Pao Academy (Strapi + Supabase)

Esta guía te ayudará a configurar completamente la arquitectura híbrida de **Strapi** (CMS) + **Supabase** (Backend) para tu plataforma de cursos.

---

## 📋 Tabla de Contenidos

1. [Requisitos Previos](#requisitos-previos)
2. [Configurar Supabase](#1-configurar-supabase)
3. [Configurar Strapi](#2-configurar-strapi)
4. [Configurar Next.js](#3-configurar-nextjs)
5. [Probar la Integración](#4-probar-la-integración)
6. [Deployment](#5-deployment)

---

## Requisitos Previos

- Node.js 20+ instalado
- Cuenta de Supabase (gratuita): https://supabase.com
- Git instalado

---

## 1. Configurar Supabase

### 1.1 Crear Proyecto

1. Ve a https://app.supabase.com
2. Click en "New Project"
3. Completa:
   - Name: `pao-academy`
   - Database Password: Guarda esta contraseña
   - Region: Selecciona la más cercana
4. Click en "Create new project" (toma ~2 minutos)

### 1.2 Ejecutar Schema SQL

1. En el dashboard de Supabase, ve a **SQL Editor** (menú izquierdo)
2. Click en "+ New query"
3. Copia y pega TODO el contenido del archivo `supabase-schema.sql`
4. Click en "Run" (botón verde)
5. Deberías ver "Success. No rows returned" ✅

### 1.3 Configurar Autenticación

1. Ve a **Authentication > Providers** (menú izquierdo)
2. Habilita **Email** (ya está habilitado por defecto)
3. Para **Google OAuth** (opcional pero recomendado):
   - Habilita el toggle de Google
   - Necesitarás Client ID y Secret de Google Cloud Console
   - Guía: https://supabase.com/docs/guides/auth/social-login/auth-google

### 1.4 Obtener Credenciales

1. Ve a **Project Settings > API** (menú izquierdo)
2. Copia estos valores:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...`

---

## 2. Configurar Strapi

### 2.1 Iniciar Strapi

```bash
cd cms
npm install
npm run develop
```

Esto abrirá http://localhost:1337/admin

### 2.2 Crear Cuenta Admin

1. Primera vez: Completa el formulario de registro
2. Guarda estas credenciales en un lugar seguro

### 2.3 Crear Content-Types

Sigue la guía detallada en: [`cms/CONTENT_TYPES_GUIDE.md`](./cms/CONTENT_TYPES_GUIDE.md)

**Resumen rápido:**

1. Ve a **Content-Type Builder** > **Create new collection type**
2. Crea estos Content-Types (en orden):
   - **Category** (categoría de cursos)
   - **Instructor** (profesores)
   - **Course** (cursos)
   - **Lesson** (lecciones)
   - **Testimonial** (testimonios)

Cada Content-Type tiene campos específicos. Consulta la guía completa para detalles.

### 2.4 Configurar Permisos

1. Ve a **Settings > Roles > Public**
2. Para cada Content-Type creado, habilita:
   - ✅ `find` (listar todos)
   - ✅ `findOne` (obtener uno por ID)
3. Click en "Save"

### 2.5 Crear API Token (Producción)

1. Ve a **Settings > API Tokens**
2. Click en "Create new API Token"
3. Configuración:
   - Name: `Next.js Frontend`
   - Token type: `Read-only`
   - Token duration: `Unlimited`
4. Click en "Save"
5. **Copia el token** (solo se muestra una vez)

### 2.6 Agregar Datos de Prueba

1. Ve a **Content Manager**
2. Crea al menos:
   - 1 Instructor
   - 1 Categoría
   - 2-3 Cursos (asigna instructor y categoría)
   - 3-5 Lecciones por curso

---

## 3. Configurar Next.js

### 3.1 Instalar Dependencias

```bash
# En la raíz del proyecto (no en /cms)
npm install
```

### 3.2 Configurar Variables de Entorno

1. Copia el archivo de ejemplo:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edita `.env.local` con tus valores:

```env
# SUPABASE (desde paso 1.4)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

# STRAPI
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=tu-token-aqui  # Del paso 2.5

# REVALIDACIÓN (genera un random string)
REVALIDATE_SECRET=tu-secret-aleatorio-aqui
```

### 3.3 Iniciar Next.js

```bash
npm run dev
```

Abre http://localhost:3000

---

## 4. Probar la Integración

### 4.1 Probar Strapi (Contenido)

1. Ve a http://localhost:3000/cursos (necesitas crear esta página o usar una existente)
2. Deberías ver los cursos de Strapi
3. Si no funciona, verifica:
   - Strapi está corriendo (`npm run develop` en `/cms`)
   - Permisos públicos están habilitados
   - `NEXT_PUBLIC_STRAPI_URL` está correcto

### 4.2 Probar Supabase (Autenticación)

1. Ve a http://localhost:3000/login
2. Intenta iniciar sesión con email (Magic Link)
3. Revisa tu bandeja de entrada
4. O prueba con Google OAuth si lo configuraste

### 4.3 Probar Dashboard Integrado

1. Inicia sesión primero
2. Ve a http://localhost:3000/dashboard-integrado
3. Deberías ver:
   - Tu email
   - Estadísticas (vacías si no hay datos)
   - Mensaje de "no inscrito en cursos"

### 4.4 Inscribirse a un Curso (Manual)

Para probar con datos reales:

1. Ve al SQL Editor de Supabase
2. Ejecuta esto (reemplaza los valores):

```sql
-- Obtener tu user_id primero
SELECT id, email FROM auth.users LIMIT 1;

-- Inscribirte al curso con ID 1 (ajusta según tus cursos en Strapi)
INSERT INTO public.course_enrollments (user_id, course_id, progress, status)
VALUES ('tu-user-id-aqui', 1, 25, 'active');

-- Ver resultado
SELECT * FROM public.course_enrollments;
```

3. Recarga el dashboard, deberías ver el curso

---

## 5. Deployment

### 5.1 Supabase

✅ Ya está en producción (es SaaS)

Actualiza `.env.local` en producción con los mismos valores.

### 5.2 Strapi

**Opción A: Railway** (Recomendado)

1. Sube tu código a GitHub
2. Ve a https://railway.app
3. "New Project" > "Deploy from GitHub"
4. Selecciona tu repo
5. Configura:
   - Root directory: `/cms`
   - Start command: `npm run start`
6. Agrega PostgreSQL addon
7. Variables de entorno: Railway las detecta automáticamente

**Opción B: VPS (DigitalOcean, Linode, etc.)**

```bash
# En el servidor
git clone tu-repo
cd tu-repo/cms
npm install
npm run build
pm2 start npm --name "strapi" -- start
```

### 5.3 Next.js

**Vercel** (Recomendado):

1. Conecta tu repo de GitHub a Vercel
2. Configura variables de entorno en Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_STRAPI_URL` (URL de producción de Strapi)
   - `STRAPI_API_TOKEN`
   - `REVALIDATE_SECRET`
3. Deploy automático

### 5.4 Configurar Webhook de Strapi

Para que Strapi invalide el cache de Next.js al actualizar contenido:

1. En Strapi: **Settings > Webhooks > Create**
2. Configuración:
   - Name: `Next.js Revalidation`
   - URL: `https://tu-dominio.vercel.app/api/revalidate?secret=tu-secret&path=/cursos`
   - Events:
     - ✅ `entry.create`
     - ✅ `entry.update`
     - ✅ `entry.delete`
3. Trigger solo en los Content-Types de cursos

---

## 🎯 Arquitectura Final

```
┌─────────────────────────────────────────┐
│         Next.js (Vercel)                │
│  • Landing pages                         │
│  • Dashboard estudiantes                 │
│  • Páginas de cursos                     │
└─────────────┬───────────────────────────┘
              │
       ┌──────┴──────┐
       │             │
       ▼             ▼
┌──────────┐  ┌─────────────┐
│  Strapi  │  │  Supabase   │
│ (Railway)│  │   (Cloud)   │
│          │  │             │
│ CMS para │  │ - Auth      │
│ contenido│  │ - Progreso  │
│ estático │  │ - Real-time │
└──────────┘  └─────────────┘
```

---

## 📚 Recursos Adicionales

- **Strapi Docs**: https://docs.strapi.io
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs

---

## 🐛 Troubleshooting

### Error: "Failed to fetch from Strapi"
- Verifica que Strapi esté corriendo
- Revisa permisos públicos en Strapi
- Confirma `NEXT_PUBLIC_STRAPI_URL` en `.env.local`

### Error: "Supabase auth not working"
- Revisa que las URLs de Supabase sean correctas
- Verifica que el Auth Provider esté habilitado
- Revisa la consola del navegador para errores

### Error: "Invalid secret" en revalidación
- Confirma que `REVALIDATE_SECRET` sea el mismo en Next.js y Strapi webhook

---

## ✅ Checklist de Configuración

- [ ] Proyecto de Supabase creado
- [ ] Schema SQL ejecutado en Supabase
- [ ] Google OAuth configurado (opcional)
- [ ] Strapi instalado y corriendo
- [ ] Content-Types creados en Strapi
- [ ] Permisos públicos configurados
- [ ] API Token generado
- [ ] Datos de prueba agregados
- [ ] Variables de entorno configuradas en Next.js
- [ ] Login funcionando
- [ ] Dashboard mostrando datos
- [ ] Webhook configurado (producción)

---

¡Listo! Tu plataforma de cursos está configurada con Strapi + Supabase 🎉
