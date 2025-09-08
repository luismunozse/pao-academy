# Landing Cursos (Next.js + Tailwind)

Stack:
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- framer-motion + lucide-react

## Desarrollo

```bash
pnpm install   # o npm i / yarn
pnpm dev       # http://localhost:3000
```

## Deploy en Vercel

1. Sube este repo a GitHub/GitLab/Bitbucket.
2. En Vercel → **New Project** → Importa el repo.
3. Framework: **Next.js** (auto-detectado). No hace falta configurar variables.
4. Deploy.

> Para cambiar la marca y WhatsApp, edita `app/page.tsx`:
- `brandName = "Pao Academy"`
- `phoneAR = "5493517601441"`

## Personalización rápida
- Edita los arrays `features`, `cursos` y las rutas de aprendizaje en `app/page.tsx`.
- Reemplaza los placeholders de LOGO por SVGs o imágenes corporativas.
- Si prefieres páginas estáticas, puedes exportar imágenes y copiar la sección de Hero en otra página.

