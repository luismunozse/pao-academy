# 🚀 Quick Start - Guía Rápida

## ✅ Todo Está Listo

El proyecto ha sido completamente refactorizado y está funcionando en:

**🌐 URL Local:** http://localhost:3002

---

## 📋 Tabla de Contenidos

1. [Ver el Proyecto](#ver-el-proyecto)
2. [Probar Variantes de Hero](#probar-variantes-de-hero)
3. [Verificar Iconos del Navbar](#verificar-iconos-del-navbar)
4. [Personalizar](#personalizar)
5. [Testing Checklist](#testing-checklist)

---

## 1️⃣ Ver el Proyecto

### Servidor ya está corriendo ✅

Abre tu navegador en: **http://localhost:3002**

Si necesitas reiniciar:
```bash
npm run dev
```

### Qué Verás

1. **Hero mejorado** con:
   - ✅ Badge de confianza social
   - ✅ Título impactante con gradiente
   - ✅ 3 features animadas
   - ✅ 2 CTAs claros
   - ✅ Scroll indicator

2. **Navbar optimizado** con:
   - ✅ Iconos modernos y claros
   - ✅ Dropdown de cursos funcional
   - ✅ Menu mobile responsive

---

## 2️⃣ Probar Variantes de Hero

### Actualmente: Hero Default ✅

Para cambiar a otra variante, edita `app/page.tsx`:

### Opción A: Hero Moderno (Tech/SaaS)

```tsx
// Comenta la línea 173-177 y descomenta 181-185:

// <Hero brandName={brandName} t={t} cta={cta} />

<HeroModern
  brandName={brandName}
  t={t}
  cta={()=>{ setInteres(lang==='es'?'programas':'programs'); setModalOpen(true); }}
/>
```

**Características:**
- 🌀 Orbes animados
- 📊 Mini stats (500+ estudiantes)
- ✨ Animaciones suaves

### Opción B: Hero Minimalista (Elegante)

```tsx
// <Hero brandName={brandName} t={t} cta={cta} />

<HeroMinimal
  brandName={brandName}
  t={t}
  cta={()=>{ setInteres(lang==='es'?'programas':'programs'); setModalOpen(true); }}
/>
```

**Características:**
- ⚪ Fondo claro
- 📝 Tipografía grande
- ⚡ Ultra rápido

### Opción C: Hero Premium (Lujo)

```tsx
// <Hero brandName={brandName} t={t} cta={cta} />

<HeroPremium
  brandName={brandName}
  t={t}
  cta={()=>{ setInteres(lang==='es'?'programas':'programs'); setModalOpen(true); }}
/>
```

**Características:**
- 👑 Badge dorado
- ✨ Efectos de lujo
- 💎 Trust indicators premium

### Cómo Ver los Cambios

1. Guarda el archivo
2. El servidor recarga automáticamente
3. Refresca el navegador (F5)

---

## 3️⃣ Verificar Iconos del Navbar

### Nuevos Iconos Implementados ✅

Abre http://localhost:3002 y verifica:

| Sección | Nuevo Ícono | Dónde Ver |
|---------|-------------|-----------|
| **Cursos** | 📚 Library | Navbar principal |
| **Asincrónicos** | ▶️ PlayCircle | Dropdown de Cursos |
| **Corporate** | 💼 Briefcase | Navbar principal |
| **Contacto** | 💬 MessageCircle | Navbar principal |

### Desktop (> 1024px)
- Hover sobre "Cursos" → Aparece dropdown
- Verás los nuevos iconos en cada categoría

### Mobile (< 1024px)
- Click en el menú hamburguesa
- Verás los iconos en el menú lateral

---

## 4️⃣ Personalizar

### Cambiar Colores del Tema

Edita `app/globals.css` (líneas 58-65):

```css
:root {
  /* Cambia estos valores */
  --neon-blue: #2563EB;   /* Azul primario */
  --neon-cyan: #0EA5E9;   /* Cyan acento */
}
```

**Ejemplos de paletas:**

```css
/* Paleta Morada */
--neon-blue: #8B5CF6;   /* Púrpura */
--neon-cyan: #A78BFA;   /* Lavanda */

/* Paleta Verde */
--neon-blue: #10B981;   /* Esmeralda */
--neon-cyan: #34D399;   /* Verde claro */

/* Paleta Naranja */
--neon-blue: #F59E0B;   /* Ambar */
--neon-cyan: #FBBF24;   /* Amarillo */
```

### Cambiar Textos del Hero

Edita `lib/i18n.ts` o directamente en `components/Hero/index.tsx`:

```tsx
// Cambiar título
<h1>
  Tu Nuevo Título Aquí
  <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mt-1">
    con {brandName}
  </span>
</h1>

// Cambiar subtítulo
<p>
  Tu nueva descripción aquí...
</p>
```

### Cambiar Features

En `components/Hero/index.tsx` (líneas 21-29):

```tsx
const features = [
  {
    icon: TuIcono1, // Importa de lucide-react
    title: 'Tu Feature 1',
    desc: 'Descripción 1'
  },
  // ... más features
];
```

---

## 5️⃣ Testing Checklist

### ✅ Visual Testing

Prueba en tu navegador:

- [ ] **Desktop** (1920x1080)
  - [ ] Hero se ve correctamente
  - [ ] Navbar con todos los iconos
  - [ ] Dropdown de cursos funciona
  - [ ] CTAs visibles y clickeables

- [ ] **Tablet** (768px)
  - [ ] Layout se adapta
  - [ ] Textos legibles
  - [ ] Botones accesibles

- [ ] **Mobile** (375px)
  - [ ] Menu hamburguesa funciona
  - [ ] Hero responsive
  - [ ] Imágenes optimizadas

### ✅ Funcionalidad

- [ ] **Click en "Inscríbete Ahora"** → Abre modal
- [ ] **Click en "Ver cursos"** → Scroll a sección
- [ ] **Hover en "Cursos"** → Muestra dropdown
- [ ] **Click en curso** → Abre WhatsApp (nuevos tabs)
- [ ] **Selector de idioma** → Cambia textos
- [ ] **Scroll indicator** → Hace scroll suave

### ✅ Performance

Abre DevTools (F12) → Lighthouse:

```
1. Click en "Lighthouse" tab
2. Selecciona "Performance" y "Accessibility"
3. Click "Generate report"
```

**Targets:**
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 90

### ✅ Accesibilidad

Pruebas rápidas:

1. **Navegación por teclado**
   - Presiona `Tab` repetidamente
   - Verifica que se marque cada elemento

2. **Screen reader** (opcional)
   - Windows: Narrator (Win + Ctrl + Enter)
   - Mac: VoiceOver (Cmd + F5)
   - Verifica que lee correctamente

3. **Contraste**
   - Textos legibles sobre fondos
   - Botones distinguibles

---

## 🎨 Comparación Visual Rápida

### Hero Default vs Variantes

```
┌─────────────────────────────────────┐
│      HERO DEFAULT (Actual)          │
│  • Imagen de fondo                  │
│  • Badge de confianza               │
│  • Título + gradiente               │
│  • 2 CTAs                           │
│  • 3 Features animadas              │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│      HERO MODERN (SaaS)             │
│  • Orbes animados                   │
│  • Stats (500+, 95%, 4.8/5)        │
│  • Más animaciones                  │
│  • Gradientes vibrantes             │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│      HERO MINIMAL (Elegante)        │
│  • Fondo claro                      │
│  • Tipografía grande                │
│  • Sin animaciones pesadas          │
│  • Carga ultra-rápida               │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│      HERO PREMIUM (Lujo)            │
│  • Badge dorado con corona          │
│  • Textura de lujo                  │
│  • Stats premium (98%, 4.9/5)      │
│  • Efectos sofisticados             │
└─────────────────────────────────────┘
```

---

## 📊 Tabla de Decisión: ¿Qué Variante Usar?

| Tipo de Negocio | Variante Recomendada | Por Qué |
|-----------------|---------------------|---------|
| **Academia Online** | Hero Default | Balance perfecto, profesional |
| **Startup Tech/SaaS** | Hero Modern | Animaciones, stats dinámicos |
| **Consultoría/Agencia** | Hero Minimal | Elegancia, foco en contenido |
| **Producto Premium** | Hero Premium | Exclusividad, posicionamiento alto |
| **B2B Enterprise** | Hero Default o Minimal | Confianza, profesionalismo |
| **E-commerce Cursos** | Hero Modern | Energía, social proof visible |

---

## 🐛 Problemas Comunes

### ❌ "Cannot find module '@/components/Hero'"

**Solución:**
```bash
# Verifica que exista el archivo
ls components/Hero/index.tsx

# Reinicia el servidor
# Ctrl + C (detener)
npm run dev
```

### ❌ Iconos no se ven en el navbar

**Solución:**
Verifica que los imports estén correctos en `components/Header.tsx`:
```tsx
import { Library, PlayCircle, Briefcase, MessageCircle, ... } from 'lucide-react';
```

### ❌ Animaciones lentas/cortadas

**Solución:**
1. Reduce `prefers-reduced-motion` en settings del OS
2. O usa `HeroMinimal` sin animaciones

### ❌ Build falla con TypeScript errors

**Solución:**
```bash
# Limpia y reinstala
rm -rf .next node_modules
npm install
```

---

## 📚 Documentación Completa

Para más detalles, consulta:

1. **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Resumen completo
2. **[Hero/README.md](./components/Hero/README.md)** - Docs técnicas del Hero
3. **[HERO_REFACTOR_GUIDE.md](./HERO_REFACTOR_GUIDE.md)** - Guía de refactorización
4. **[NAVBAR_ICONS_IMPROVEMENTS.md](./NAVBAR_ICONS_IMPROVEMENTS.md)** - Cambios en iconos

---

## ✅ Checklist Rápido

Antes de cerrar esta guía:

- [ ] Abrí http://localhost:3002
- [ ] Vi el Hero funcionando
- [ ] Probé el navbar desktop
- [ ] Probé el menu mobile
- [ ] Vi los nuevos iconos
- [ ] Probé diferentes variantes de Hero
- [ ] Todo funciona correctamente

---

## 🎉 ¡Listo!

**Todo está implementado y funcionando.**

Disfruta explorando las variantes y personalizando según tus necesidades.

**¿Necesitas ayuda?** Revisa la [documentación completa](./IMPLEMENTATION_SUMMARY.md)

---

**Servidor activo:** http://localhost:3002
**Estado:** ✅ Funcionando perfectamente

*Última actualización: 2026-01-14*
