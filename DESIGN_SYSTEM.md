# 🎨 PAO Academy Design System

Guía completa de componentes, estilos y patrones de diseño.

---

## 📋 Índice

1. [Paleta de Colores](#paleta-de-colores)
2. [Tipografía](#tipografía)
3. [Componentes](#componentes)
4. [Animaciones](#animaciones)
5. [Accesibilidad](#accesibilidad)
6. [Responsive Design](#responsive-design)
7. [Patrones de Uso](#patrones-de-uso)

---

## 🎨 Paleta de Colores

### Colores Primarios

```css
--acc1: #2563EB;              /* Azul profundo */
--acc2: #0EA5E9;              /* Cian */
--fg: #0F172A;                /* Texto principal */
```

### Colores Neon (Tema Oscuro)

```css
--neon-blue: #2563EB;         /* Azul neón */
--neon-cyan: #0EA5E9;         /* Cian neón */
--neon-purple: #6366F1;       /* Púrpura neón */
--neon-accent: #0EA5E9;       /* Acento principal */
```

### Colores Academic

```css
--academic-primary: #2563EB;   /* Azul académico */
--academic-secondary: #0EA5E9; /* Cian académico */
--academic-accent: #0EA5E9;    /* Acento académico */
```

### Grises

```css
--academic-gray-50: #F8FAFC;   /* Muy claro */
--academic-gray-100: #F1F5F9;  /* Claro */
--academic-gray-300: #CBD5E1;  /* Medio */
--academic-gray-800: #1E293B;  /* Oscuro */
--academic-gray-900: #0F172A;  /* Muy oscuro */
```

### Uso en Código

```tsx
// CSS
.element {
  color: var(--academic-primary);
  background: var(--neon-cyan);
}

// Tailwind
className="text-[color:var(--academic-secondary)]"
className="bg-[color:var(--neon-blue)]"
```

---

## 📝 Tipografía

### Escala de Tamaños

| Clase | Tamaño | Uso |
|-------|--------|-----|
| `text-xs` | 0.75rem (12px) | Subtextos, metadatos |
| `text-sm` | 0.875rem (14px) | Texto secundario |
| `text-base` | 1rem (16px) | Texto principal |
| `text-lg` | 1.125rem (18px) | Subtítulos |
| `text-xl` | 1.25rem (20px) | Títulos pequeños |
| `text-2xl` | 1.5rem (24px) | Títulos medianos |
| `text-3xl` | 1.875rem (30px) | Títulos grandes |
| `text-4xl` | 2.25rem (36px) | Títulos hero |

### Pesos de Fuente

```css
font-weight: 400;  /* Normal - text principal */
font-weight: 500;  /* Medium - énfasis suave */
font-weight: 600;  /* Semibold - subtítulos */
font-weight: 700;  /* Bold - títulos */
font-weight: 800;  /* Extrabold - títulos hero */
```

### Contraste WCAG AA ✅

```css
/* ✅ CUMPLE - Usar en fondos oscuros */
text-white           /* 100% opacidad - títulos */
text-white/90        /* 90% opacidad - texto principal (4.8:1) */
text-white/87        /* 87% opacidad - texto secundario (4.6:1) */
text-white/80        /* 80% opacidad - metadatos (4.3:1) */

/* ❌ NO USAR - No cumple WCAG AA */
text-white/70        /* 70% opacidad - contraste 3.2:1 */
text-white/60        /* 60% opacidad - contraste 2.5:1 */
```

---

## 🧩 Componentes

### 1. Botones

#### Botón Primario

```tsx
<button className="btn-primary">
  Inscríbete Ahora
</button>
```

**CSS:**
```css
.btn-primary {
  background: linear-gradient(135deg, var(--neon-blue), var(--neon-cyan));
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 700;
  box-shadow: 0 4px 14px rgba(0, 119, 255, 0.3);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 119, 255, 0.4);
}
```

#### Botón Secundario

```tsx
<button className="btn-secondary">
  Ver Más
</button>
```

**CSS:**
```css
.btn-secondary {
  background: rgba(0, 119, 255, 0.1);
  border: 1px solid rgba(0, 119, 255, 0.3);
  color: white;
  backdrop-filter: blur(10px);
}
```

#### Botón Ghost

```tsx
<button className="btn-ghost">
  Cancelar
</button>
```

#### Botón Icon

```tsx
<button className="btn-icon">
  <ChevronRight />
</button>
```

#### Variantes de Tamaño

```tsx
<button className="btn-primary btn-sm">Pequeño</button>
<button className="btn-primary">Normal</button>
<button className="btn-primary btn-lg">Grande</button>
```

### 2. Cards

#### Card Neon (Tema Oscuro)

```tsx
<div className="card-neon p-6">
  <h3 className="text-xl font-semibold text-white mb-4">
    Título de Card
  </h3>
  <p className="text-white/87">
    Contenido de la card con buen contraste.
  </p>
</div>
```

**CSS:**
```css
.card-neon {
  background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03));
  border: 1px solid var(--neon-border);
  border-radius: 16px;
  padding: 18px;
  box-shadow: 0 8px 22px rgba(0,0,0,.25);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.card-neon:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 30px rgba(0,0,0,.35);
}
```

#### Card Feature

```tsx
<div className="card-feature p-6">
  <h4>Característica</h4>
  <p>Descripción de la característica</p>
</div>
```

#### Course Card Academic

```tsx
<div className="course-card-academic p-6">
  <span className="badge-academic">Nuevo</span>
  <h3>Título del Curso</h3>
  <p>Descripción breve del curso</p>
</div>
```

### 3. Inputs

#### Input Neon

```tsx
<div className="input-group">
  <input
    type="email"
    className="input-neon"
    placeholder="tu@email.com"
  />
</div>
```

**CSS:**
```css
.input-neon {
  width: 100%;
  height: 44px;
  border-radius: 12px;
  padding: 10px 14px;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.14);
  color: var(--neon-fg);
  transition: all 0.2s ease;
}

.input-neon:focus {
  border-color: var(--neon-cyan);
  box-shadow: 0 0 0 3px rgba(0,247,239,.22);
}

.input-neon::placeholder {
  color: rgba(234,242,255,.55);
}
```

#### Input con Icono

```tsx
<div className="input-group">
  <Mail className="input-icon" />
  <input
    type="email"
    className="input-neon input-with-icon"
    placeholder="tu@email.com"
  />
</div>
```

**CSS:**
```css
.input-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: rgba(234,242,255,.65);
  pointer-events: none;
}

.input-with-icon {
  padding-left: 2.75rem;
}
```

### 4. Modal

```tsx
<AnimatePresence mode="wait">
  {isOpen && (
    <Modal onClose={handleClose} t={t}>
      <h3 className="text-xl font-semibold">Título del Modal</h3>
      <p className="text-white/80">Contenido del modal</p>
    </Modal>
  )}
</AnimatePresence>
```

**Características:**
- ✅ Animación de entrada/salida suave
- ✅ Backdrop con blur
- ✅ Cierre con Escape
- ✅ Prevención de scroll del body
- ✅ ARIA labels completos

### 5. Carrusel (CarouselBase)

```tsx
<CarouselBase
  items={courses}
  renderItem={(course) => <CourseCard course={course} />}
  itemsPerView={{ mobile: 1, desktop: 3 }}
  autoPlay={true}
  showDots={true}
  ariaLabel="Carrusel de cursos"
/>
```

**Props:**
- `items`: Array de elementos
- `renderItem`: Función para renderizar cada item
- `itemsPerView`: { mobile, desktop }
- `autoPlay`: Boolean
- `showDots`: Boolean
- `showNavButtons`: Boolean
- `ariaLabel`: String

### 6. Loading States

#### LoadingSpinner

```tsx
// Simple
<LoadingSpinner />

// Con texto
<LoadingSpinner text="Cargando cursos..." />

// Full screen
<LoadingSpinner fullScreen text="Procesando..." />

// En botón
<button>
  <ButtonSpinner />
  Cargando...
</button>
```

#### Skeleton Loaders

```tsx
// Card skeleton
<SkeletonCard className="w-full" />

// Lista skeleton
<SkeletonList count={5} />
```

### 7. Image con Fallback

```tsx
<ImageWithFallback
  src="/course-image.jpg"
  fallbackSrc="/placeholder.jpg"
  alt="Curso de React"
  width={400}
  height={300}
  className="rounded-lg"
/>

// Avatar con iniciales
<AvatarWithFallback
  src="/user-avatar.jpg"
  alt="Usuario"
  initials="JD"
  className="w-12 h-12 rounded-full"
/>
```

### 8. Badges

```tsx
<span className="badge-academic">
  <Star className="size-4" />
  Nuevo
</span>

<span className="badge-neon">
  Premium
</span>
```

---

## ⚡ Animaciones

### Duraciones Estándar

```css
--transition-fast: 0.2s;     /* Hover states, focus */
--transition-normal: 0.3s;   /* Transiciones generales */
--transition-slow: 0.5s;     /* Carruseles, slides */
```

### Easing Functions

```css
/* Entrada */
ease-in: cubic-bezier(0.4, 0, 1, 1)

/* Salida */
ease-out: cubic-bezier(0, 0, 0.2, 1)

/* Entrada y salida */
ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
```

### Framer Motion

```tsx
// Fade in al aparecer
<m.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
  Content
</m.div>

// Slide up
<m.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
>
  Content
</m.div>

// whileInView (scroll triggered)
<m.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  Content
</m.div>
```

### CSS Animations

```css
/* Fade in */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}
```

### Performance Tips

✅ **Usar para animaciones:**
- `transform: translateX/Y/Z`
- `transform: scale`
- `opacity`

❌ **Evitar:**
- `width/height` (causa reflow)
- `box-shadow` en hover (expensive)
- `margin/padding`

**Mejor práctica:**
```css
/* ❌ Mal - causa reflow */
.card:hover {
  width: 350px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

/* ✅ Bien - GPU accelerated */
.card:hover {
  transform: translateY(-4px);
  outline: 2px solid var(--neon-cyan);
}
```

---

## ♿ Accesibilidad

### Contraste

✅ **Cumplimiento WCAG 2.1 AA:**
- Texto normal: mínimo 4.5:1
- Texto grande (≥18px o ≥14px bold): mínimo 3:1
- Elementos interactivos: mínimo 4.5:1

**Verificar con:**
- WAVE Extension
- axe DevTools
- Lighthouse Audit

### ARIA Labels

```tsx
// Botones de navegación
<button
  onClick={nextSlide}
  aria-label="Siguiente curso"
  className="btn-icon"
>
  <ChevronRight />
</button>

// Tabs
<div role="tablist" aria-label="Filtros de cursos">
  <button
    role="tab"
    aria-selected={isActive}
    aria-label="Cursos de React"
  >
    React
  </button>
</div>

// Modal
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
>
  <h3 id="modal-title">Título del Modal</h3>
</div>
```

### Keyboard Navigation

✅ **Teclas implementadas:**
- `Tab` → Navegar entre elementos
- `Enter/Space` → Activar botón
- `Arrow Left/Right` → Carruseles
- `Escape` → Cerrar modales

```tsx
// Implementación
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'Escape') closeModal();
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);
```

### Focus Visible

```css
.btn:focus-visible {
  outline: 2px solid var(--neon-cyan);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(0,247,239,0.3);
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile small */
@media (max-width: 480px) { }

/* Mobile */
@media (max-width: 640px) { }  /* sm */

/* Tablet */
@media (min-width: 768px) { }  /* md */

/* Desktop */
@media (min-width: 1024px) { } /* lg */

/* Large desktop */
@media (min-width: 1280px) { } /* xl */

/* Extra large */
@media (min-width: 1536px) { } /* 2xl */
```

### Mobile-First Approach

```tsx
// ✅ Mobile first
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* 1 col mobile, 2 tablet, 3 desktop */}
</div>

// Text sizes
<h1 className="text-2xl md:text-3xl lg:text-4xl">
  Título Responsivo
</h1>

// Spacing
<section className="py-8 md:py-12 lg:py-16">
  {/* Padding responsivo */}
</section>
```

### Touch Targets

✅ **Mínimo 44x44px** para elementos interactivos en mobile

```css
.btn-icon {
  min-width: 44px;
  min-height: 44px;
}
```

---

## 🎯 Patrones de Uso

### 1. Formularios

```tsx
<form className="space-y-6">
  {/* Campo con label */}
  <div>
    <label className="block text-sm font-medium text-white mb-2">
      Correo electrónico
    </label>
    <div className="input-group">
      <Mail className="input-icon" />
      <input
        type="email"
        className="input-neon input-with-icon"
        placeholder="tu@email.com"
        aria-label="Correo electrónico"
        required
      />
    </div>
  </div>

  {/* Estado de error */}
  <div className="field-error">
    <input className="input-neon" />
    <p className="text-red-400 text-sm mt-2">
      Este campo es requerido
    </p>
  </div>

  {/* Botón de submit */}
  <button
    type="submit"
    className="btn-primary btn-block"
    disabled={isSubmitting}
  >
    {isSubmitting ? (
      <>
        <ButtonSpinner />
        Enviando...
      </>
    ) : (
      'Enviar'
    )}
  </button>
</form>
```

### 2. Sección con Grid Responsivo

```tsx
<section className="section-academic py-16">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
      Título de Sección
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <div key={item.id} className="card-neon">
          {/* Contenido */}
        </div>
      ))}
    </div>
  </div>
</section>
```

### 3. Hero Section

```tsx
<section className="hero-neon min-h-screen flex items-center">
  <div className="container mx-auto px-4">
    <m.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      <h1 className="hero-title text-white mb-6">
        Título Principal
      </h1>
      <p className="text-xl text-white/87 mb-8 max-w-2xl mx-auto">
        Descripción atractiva del contenido
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="btn-primary btn-lg">
          CTA Principal
        </button>
        <button className="btn-secondary btn-lg">
          CTA Secundario
        </button>
      </div>
    </m.div>
  </div>
</section>
```

---

## 🔧 Utilidades Comunes

### Espaciado

```css
/* Gaps */
gap-2   /* 0.5rem = 8px */
gap-4   /* 1rem = 16px */
gap-6   /* 1.5rem = 24px */
gap-8   /* 2rem = 32px */

/* Padding */
p-4     /* 1rem = 16px */
px-6    /* horizontal */
py-8    /* vertical */

/* Margin */
mb-4    /* margin-bottom */
mt-8    /* margin-top */
mx-auto /* horizontal center */
```

### Sombras

```css
/* Elevaciones */
shadow-sm     /* Subtle */
shadow        /* Normal */
shadow-md     /* Medium */
shadow-lg     /* Large */
shadow-xl     /* Extra large */
shadow-2xl    /* Huge */
```

### Bordes

```css
rounded       /* 0.25rem */
rounded-lg    /* 0.5rem */
rounded-xl    /* 0.75rem */
rounded-2xl   /* 1rem */
rounded-full  /* Círculo */
```

---

## 📚 Recursos

### Documentación de Componentes

- [CarouselBase](./components/CAROUSEL_USAGE_EXAMPLE.md)
- [ImageWithFallback](./components/ImageWithFallback.tsx)
- [LoadingSpinner](./components/LoadingSpinner.tsx)

### Testing

- [Testing Checklist](./TESTING_CHECKLIST.md)
- [Mejoras Implementadas](./MEJORAS_IMPLEMENTADAS_RESUMEN.md)

### Herramientas

- **WAVE**: Accessibility checker
- **axe DevTools**: Accessibility testing
- **Lighthouse**: Performance + Accessibility audit
- **Chrome DevTools**: Contrast checker

---

## ✅ Checklist de Calidad

Antes de hacer commit, verifica:

- [ ] Contraste WCAG AA cumplido (≥ 4.5:1)
- [ ] ARIA labels en elementos interactivos
- [ ] Focus visible en todos los botones
- [ ] Keyboard navigation funciona
- [ ] Animaciones smooth (0.3s)
- [ ] Responsive en mobile/tablet/desktop
- [ ] Loading states implementados
- [ ] Error states manejados
- [ ] No hay console.errors

---

_Última actualización: Enero 2026_
