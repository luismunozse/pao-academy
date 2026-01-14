# 🎨 Plan de Rediseño Visual - PAO Academy

**Inspiración**: EducaciónIT, Platzi, CoderHouse
**Objetivo**: Modernizar completamente el diseño para igualar/superar a la competencia
**Fecha**: 14 de enero de 2026

---

## 🎯 Cambios de Diseño Fundamentales

### 1. **Esquema de Color - De Oscuro a Claro/Moderno**

#### Actual:
```css
/* Tema oscuro neon */
--neon-bg: #0A0F1B (fondo oscuro)
--neon-blue: #2563EB
--neon-cyan: #0EA5E9
```

#### Nuevo (Inspirado en Platzi + EducaciónIT):
```css
/* Tema claro/moderno con acentos vibrantes */
:root {
  /* Fondo blanco/gris muy claro */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F8FAFC;
  --bg-tertiary: #F1F5F9;

  /* Texto */
  --text-primary: #0F172A;
  --text-secondary: #475569;
  --text-tertiary: #94A3B8;

  /* Colores de categoría (Platzi style) */
  --category-data: #22C55E;        /* Verde brillante */
  --category-leadership: #8B5CF6;  /* Púrpura */
  --category-sales: #F97316;       /* Naranja */
  --category-marketing: #EAB308;   /* Amarillo */
  --category-tech: #3B82F6;        /* Azul */

  /* Accent colors */
  --accent-primary: #3B82F6;       /* Azul Platzi */
  --accent-secondary: #22C55E;     /* Verde success */
  --accent-warning: #F59E0B;       /* Naranja */
  --accent-danger: #EF4444;        /* Rojo */
}
```

---

## 📐 Estructura de Layout

### Header/Navbar (EducaciónIT Style)

**Actual**: Navbar oscuro con glassmorphism
**Nuevo**: Navbar blanco limpio con sombra sutil

```tsx
// Nuevo Header
<header className="bg-white border-b border-gray-200 sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4">
    <nav className="flex items-center justify-between h-16">
      {/* Logo */}
      <Logo />

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8">
        <NavLink>Cursos</NavLink>
        <NavLink>Para Empresas</NavLink>
        <NavLink>Nosotros</NavLink>
      </div>

      {/* CTAs */}
      <div className="flex items-center gap-3">
        <Button variant="ghost">Ingresar</Button>
        <Button variant="primary">Prueba gratis</Button>
      </div>
    </nav>
  </div>
</header>
```

**Características**:
- Fondo blanco sólido (no glassmorphism)
- Border inferior sutil
- Shadow en scroll
- CTAs prominentes a la derecha

---

### Hero Section (Platzi + EducaciónIT)

**Actual**: Hero oscuro con imagen de fondo
**Nuevo**: Hero moderno con ilustración/imagen a la derecha

```tsx
// Estilo Platzi: Split layout
<section className="bg-gradient-to-br from-blue-50 to-cyan-50 py-20">
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Left: Content */}
      <div>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          🚀 +500 profesionales ya avanzaron su carrera
        </div>

        {/* Title */}
        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          Aprende las habilidades que{' '}
          <span className="text-blue-600">demandan las empresas</span>
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-600 mb-8">
          Cursos en vivo con mentores expertos. Proyectos reales.
          Certificación válida. Empieza gratis hoy.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Prueba 7 días gratis
          </Button>
          <Button size="lg" variant="outline">
            Ver todos los cursos →
          </Button>
        </div>

        {/* Trust badges */}
        <div className="flex items-center gap-6 mt-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            ⭐ 4.9/5 en Google
          </div>
          <div className="flex items-center gap-2">
            ✓ 500+ graduados
          </div>
        </div>
      </div>

      {/* Right: Image/Illustration */}
      <div className="relative">
        <img
          src="/hero-illustration.png"
          alt="Estudiantes aprendiendo"
          className="w-full h-auto"
        />
      </div>
    </div>
  </div>
</section>
```

**Características**:
- Fondo con gradiente sutil (azul/cyan claro)
- Layout split 50/50
- Badge de confianza verde (EducaciónIT style)
- Título grande y bold
- Dual CTA strategy (Platzi)
- Trust badges inline

---

### Course Cards (CoderHouse + Platzi)

**Actual**: Cards oscuras con neon glow
**Nuevo**: Cards blancas limpias con categoría de color

```tsx
<div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
  {/* Color bar por categoría */}
  <div className="h-2 bg-gradient-to-r from-green-400 to-green-600" />

  {/* Imagen */}
  <div className="relative h-48 bg-gray-100">
    <img src={course.image} className="w-full h-full object-cover" />

    {/* Badge de tipo */}
    <div className="absolute top-4 right-4">
      <Badge variant="bootcamp">Bootcamp</Badge>
    </div>
  </div>

  {/* Content */}
  <div className="p-6">
    {/* Category tag */}
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium mb-3">
      📊 Datos & Analytics
    </div>

    {/* Title */}
    <h3 className="text-xl font-bold text-gray-900 mb-2">
      {course.title}
    </h3>

    {/* Meta info */}
    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
      <span className="flex items-center gap-1">
        ⏱️ 12 semanas
      </span>
      <span className="flex items-center gap-1">
        👥 En vivo
      </span>
    </div>

    {/* Rating */}
    <div className="flex items-center gap-2 mb-4">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <span className="text-sm font-medium text-gray-900">4.9</span>
      <span className="text-sm text-gray-500">(250)</span>
    </div>

    {/* Price + CTA */}
    <div className="flex items-center justify-between">
      <div>
        <span className="text-2xl font-bold text-gray-900">$299</span>
        <span className="text-sm text-gray-500 line-through ml-2">$599</span>
      </div>
      <Button variant="primary" size="sm">
        Ver más →
      </Button>
    </div>
  </div>
</div>
```

**Características**:
- Fondo blanco con border gris
- Barra de color superior (categoría)
- Badge de tipo (bootcamp/carrera/curso)
- Categoría con emoji + color
- Rating con estrellas amarillas
- Precio visible con descuento
- Shadow en hover (no glow)

---

### Stats Section (EducaciónIT)

**Actual**: Stats con glassmorphism oscuro
**Nuevo**: Stats en grid limpio sobre fondo claro

```tsx
<section className="bg-white py-16">
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {/* Stat 1 */}
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-green-600" />
        </div>
        <div className="text-4xl font-bold text-gray-900 mb-2">
          <AnimatedCounter from={0} to={10000} />+
        </div>
        <div className="text-gray-600">
          Estudiantes graduados
        </div>
      </div>

      {/* Stat 2 */}
      <div className="text-center">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Star className="w-8 h-8 text-yellow-600" />
        </div>
        <div className="text-4xl font-bold text-gray-900 mb-2">4.9/5</div>
        <div className="text-gray-600">Calificación promedio</div>
      </div>

      {/* Stats 3-4... */}
    </div>
  </div>
</section>
```

**Características**:
- Fondo blanco sólido
- Icons con fondo circular de color
- Números grandes y bold en negro
- Texto descriptivo en gris
- Animated counter

---

## 🎨 Sistema de Componentes

### Buttons (EducaciónIT + Platzi)

```tsx
// Primary button - Azul sólido
<button className="
  bg-blue-600 hover:bg-blue-700
  text-white font-semibold
  px-6 py-3 rounded-lg
  shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30
  transition-all duration-200
  hover:scale-105
">
  Inscríbete ahora
</button>

// Secondary button - Outline
<button className="
  bg-white hover:bg-gray-50
  text-gray-900 font-semibold
  px-6 py-3 rounded-lg
  border-2 border-gray-300
  transition-all duration-200
  hover:scale-105
">
  Ver cursos
</button>

// Success button - Verde
<button className="
  bg-green-600 hover:bg-green-700
  text-white font-semibold
  px-6 py-3 rounded-lg
  shadow-lg shadow-green-600/20
">
  Prueba gratis
</button>
```

### Badges

```tsx
// Tipo de curso
<Badge className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
  Bootcamp
</Badge>

<Badge className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
  Carrera
</Badge>

<Badge className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
  Curso
</Badge>

// Categoría
<Badge className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
  📊 Datos & Analytics
</Badge>
```

---

## 📱 Typography

```css
/* Headings */
h1: text-5xl lg:text-6xl font-bold text-gray-900
h2: text-4xl lg:text-5xl font-bold text-gray-900
h3: text-2xl lg:text-3xl font-bold text-gray-900
h4: text-xl lg:text-2xl font-semibold text-gray-900

/* Body */
p: text-base text-gray-600
p-large: text-lg text-gray-600
p-small: text-sm text-gray-500

/* Labels */
label: text-sm font-medium text-gray-700
```

---

## 🎯 Checklist de Implementación

### Fase 1: Sistema de Diseño Base (1-2 días)
- [ ] Actualizar variables CSS (colores, tipografía)
- [ ] Crear componentes Button (3 variantes)
- [ ] Crear componentes Badge (5 tipos)
- [ ] Crear sistema de categorías con colores
- [ ] Actualizar globals.css (tema claro)

### Fase 2: Header + Hero (1 día)
- [ ] Rediseñar Header (navbar blanco)
- [ ] Rediseñar Hero (split layout)
- [ ] Agregar ilustración/imagen hero
- [ ] Implementar trust badges
- [ ] Dual CTA strategy

### Fase 3: Course Cards (1 día)
- [ ] Rediseñar cards (fondo blanco)
- [ ] Agregar barra de color por categoría
- [ ] Implementar badges de tipo
- [ ] Mostrar precio + descuento
- [ ] Rating con estrellas amarillas

### Fase 4: Secciones Principales (2 días)
- [ ] Stats section (grid limpio)
- [ ] Featured courses (layout moderno)
- [ ] Testimonials (cards blancas)
- [ ] FAQ (accordion limpio)
- [ ] Footer (multi-columna)

### Fase 5: Detalles Finales (1 día)
- [ ] Animated counters
- [ ] Smooth scroll
- [ ] Loading states
- [ ] Hover effects
- [ ] Responsive perfecto

---

## 🎨 Mockup de Secciones

### Hero (Platzi Style)
```
┌─────────────────────────────────────────────────┐
│ [Logo]              Cursos  Empresas  Nosotros  │
│                           [Ingresar] [Prueba]   │
├─────────────────────────────────────────────────┤
│                                                  │
│  [Badge: 🚀 +500 profesionales]                  │
│                                                  │
│  Aprende las habilidades                         │
│  que demandan las empresas            [Imagen]  │
│                                                  │
│  Cursos en vivo con mentores...                  │
│                                                  │
│  [Prueba gratis] [Ver cursos]                    │
│                                                  │
│  ⭐ 4.9/5  ✓ 500+ graduados                      │
└─────────────────────────────────────────────────┘
```

### Course Cards Grid
```
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│ ═══════════   │ │ ═══════════   │ │ ═══════════   │ ← Color bar
│               │ │               │ │               │
│  [Imagen]     │ │  [Imagen]     │ │  [Imagen]     │
│   [Bootcamp]  │ │   [Carrera]   │ │   [Curso]     │ ← Badge
│               │ │               │ │               │
│ 📊 Datos      │ │ 🎨 Diseño     │ │ 💼 Ventas     │ ← Categoría
│               │ │               │ │               │
│ Power BI      │ │ UX/UI         │ │ Consultivas   │ ← Título
│               │ │               │ │               │
│ ⭐⭐⭐⭐⭐ 4.9  │ │ ⭐⭐⭐⭐⭐ 4.8  │ │ ⭐⭐⭐⭐⭐ 5.0  │ ← Rating
│               │ │               │ │               │
│ $299 ~~$599~~ │ │ $399 ~~$799~~ │ │ $199 ~~$399~~ │ ← Precio
│    [Ver más]  │ │    [Ver más]  │ │    [Ver más]  │ ← CTA
└───────────────┘ └───────────────┘ └───────────────┘
```

---

## 🚀 Próximos Pasos

1. **Revisar y aprobar** este plan de rediseño
2. **Elegir entre**:
   - A) Implementar todo de una vez (3-4 días)
   - B) Implementar por fases (más controlado)
3. **Decidir prioridad**:
   - Hero + Header (máximo impacto)
   - Course Cards (conversión)
   - Sistema completo

**¿Quieres que empiece con la implementación?** Puedo comenzar por:
1. Sistema de diseño base (colores + componentes)
2. Hero section rediseñado
3. Course cards modernas

