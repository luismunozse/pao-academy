# ✅ Testing Checklist - Mejoras UX/UI

## 📋 Resumen de Cambios Implementados

### ✅ Completados
1. **Paleta de colores consolidada** - Eliminada duplicación en globals.css
2. **Contraste WCAG AA** - text-white/60 → text-white/90, text-white/70 → text-white/87
3. **Modal con animaciones** - Framer Motion con transiciones suaves
4. **Keyboard navigation** - ArrowLeft/Right en carruseles
5. **ARIA labels completos** - Accesibilidad mejorada en navegación
6. **FAQ con transiciones** - duration-300 en chevron rotation
7. **CarouselBase component** - Componente reutilizable creado

---

## 🧪 Testing Manual - Paso a Paso

### 1. TESTING DE CONTRASTE (WCAG 2.1 AA)

#### Herramientas necesarias:
- Chrome DevTools → Lighthouse
- Extensión WAVE (Web Accessibility Evaluation Tool)
- Extensión Axe DevTools

#### Pasos:
```bash
# 1. Iniciar servidor de desarrollo
npm run dev

# 2. Abrir en Chrome
http://localhost:3000
```

#### Verificaciones:

**A. LiveCourses (Sección "Cursos en Vivo")**
- [ ] Scroll a la sección de cursos
- [ ] Verificar texto de rating/estudiantes: debe ser claro y legible
- [ ] Usar Chrome DevTools → Elements → Computed → color
- [ ] Contraste debe ser ≥ 4.5:1

**B. SocialProof (Sección "Testimonios")**
- [ ] Verificar subtítulos de estadísticas
- [ ] Texto debe tener contraste ≥ 4.5:1
- [ ] Verificar con WAVE: No debe tener errores rojos

**C. Featured (Sección "Cursos Destacados")**
- [ ] Verificar texto de descripción de cursos
- [ ] Rating y conteo de estudiantes deben ser legibles
- [ ] Sin alertas de contraste en WAVE

**D. FAQ**
- [ ] Verificar texto de respuestas (text-white/80)
- [ ] Contraste debe ser aceptable (≥ 4.5:1)

---

### 2. TESTING DE ANIMACIONES

#### Modal (Componente de Reserva)

**Test 1: Abrir Modal**
- [ ] Click en cualquier botón "Inscríbete"
- [ ] Modal debe aparecer con:
  - Fade in del backdrop (0.25s)
  - Scale + fade in del contenido (0.3s)
  - Smooth y no abrupto
- [ ] Verificar que el body no hace scroll

**Test 2: Cerrar Modal**
- [ ] Click en botón X
- [ ] Modal debe desaparecer con animación inversa
- [ ] No debe desaparecer instantáneamente
- [ ] Body debe volver a hacer scroll

**Test 3: Cerrar con Escape**
- [ ] Abrir modal
- [ ] Presionar tecla Escape
- [ ] Debe cerrar con animación
- [ ] Verificar que funciona correctamente

**Test 4: Cerrar con click en backdrop**
- [ ] Abrir modal
- [ ] Click fuera del modal (en el fondo oscuro)
- [ ] Debe cerrar con animación

#### FAQ (Componente de Preguntas)

**Test 1: Expandir pregunta**
- [ ] Scroll a sección FAQ
- [ ] Click en una pregunta
- [ ] Chevron debe rotar 90° con transición suave (duration-300)
- [ ] No debe ser instantáneo

**Test 2: Múltiples preguntas**
- [ ] Expandir pregunta 1
- [ ] Expandir pregunta 2
- [ ] Ambas transiciones deben ser suaves
- [ ] Focus ring debe ser visible (cyan)

---

### 3. TESTING DE KEYBOARD NAVIGATION

#### LiveCourses (Carrusel Mobile)

**Test 1: Navegación con teclado**
- [ ] Abrir en viewport mobile (< 1024px)
- [ ] Presionar ArrowRight → debe avanzar al siguiente curso
- [ ] Presionar ArrowLeft → debe retroceder al curso anterior
- [ ] Navegación debe ser fluida

**Test 2: Focus visible**
- [ ] Tab hasta llegar a botones de navegación
- [ ] Botón anterior debe mostrar ring cyan
- [ ] Botón siguiente debe mostrar ring cyan
- [ ] Dots/indicadores deben mostrar ring al recibir focus

#### Featured (Carrusel Desktop)

**Test 1: Navegación con teclado**
- [ ] Abrir en viewport desktop (≥ 1024px)
- [ ] Presionar ArrowRight → debe avanzar 3 cursos
- [ ] Presionar ArrowLeft → debe retroceder 3 cursos
- [ ] Transición debe ser smooth

**Test 2: ARIA labels**
- [ ] Usar lector de pantalla (NVDA en Windows / VoiceOver en Mac)
- [ ] Botón anterior debe leer "Ver cursos anteriores"
- [ ] Botón siguiente debe leer "Ver siguientes cursos"
- [ ] Dots deben leer "Ver grupo de cursos N"

---

### 4. TESTING DE ACCESIBILIDAD COMPLETA

#### Herramientas:
1. **Lighthouse**
```bash
# 1. Build producción
npm run build
npm run start

# 2. Abrir DevTools → Lighthouse
# 3. Seleccionar "Accessibility"
# 4. Run audit

# Meta: Score ≥ 90
```

2. **WAVE Extension**
```
# 1. Instalar extensión WAVE
# 2. Abrir página
# 3. Click en icono WAVE
# 4. Verificar:
   - 0 Errors (rojo)
   - 0 Contrast Errors
   - Alerts < 5 (amarillo, opcional)
```

3. **axe DevTools**
```
# 1. Instalar axe DevTools
# 2. F12 → Tab "axe DevTools"
# 3. Click "Scan ALL of my page"
# 4. Verificar: 0 Critical issues
```

#### Checklist Completo:

**A. Contraste de colores**
- [ ] Sin errores en WAVE
- [ ] Sin errores en Lighthouse
- [ ] text-white/60 NO debe aparecer (reemplazado por /90)
- [ ] text-white/70 NO debe aparecer (reemplazado por /87)

**B. ARIA labels**
- [ ] Botones de navegación tienen aria-label
- [ ] Dots/indicadores tienen role="tab" y aria-selected
- [ ] Modal tiene role="dialog" y aria-modal="true"
- [ ] FAQ summary tiene focus-visible

**C. Keyboard navigation**
- [ ] Todos los elementos interactivos accesibles con Tab
- [ ] Enter/Space activan botones
- [ ] ArrowLeft/Right navegan carruseles
- [ ] Escape cierra modal

**D. Focus visible**
- [ ] Todos los botones muestran ring al recibir focus
- [ ] Ring es color cyan (--neon-cyan) y visible
- [ ] outline-offset: 2px correcto
- [ ] No hay elementos sin focus indicator

---

### 5. TESTING RESPONSIVE

#### Breakpoints a Probar:
- **Mobile Small**: 375px (iPhone SE)
- **Mobile**: 640px
- **Tablet**: 768px (iPad)
- **Desktop**: 1024px
- **Desktop Large**: 1920px

#### Checklist por Dispositivo:

**Mobile (375px)**
- [ ] Carrusel LiveCourses: 1 item visible
- [ ] Carrusel Featured: 1 item visible
- [ ] Modal: ocupa max viewport con padding
- [ ] Botones: min-width 44px (touch target)
- [ ] Keyboard nav funciona

**Tablet (768px)**
- [ ] Carruseles: responsive correcto
- [ ] Modal: centered con max-w-xl
- [ ] FAQ: expandible sin overflow
- [ ] Touch targets: ≥ 44x44px

**Desktop (1024px+)**
- [ ] Carrusel Featured: 3 items visibles
- [ ] LiveCourses: grid de 3 columnas
- [ ] Animaciones smooth (no lag)
- [ ] Hover states funcionan

---

### 6. TESTING DE PERFORMANCE

#### Lighthouse Performance Audit:
```bash
# 1. Build production
npm run build
npm run start

# 2. Open incognito window (sin extensiones)
# 3. DevTools → Lighthouse
# 4. Performance + Accessibility
# 5. Run audit

# Metas:
# - Performance: ≥ 85
# - Accessibility: ≥ 90
# - Best Practices: ≥ 90
```

#### Métricas a Verificar:

**Core Web Vitals**
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1

**Animaciones**
- [ ] Modal transitions: 60fps
- [ ] Carrusel slides: 60fps
- [ ] FAQ expand: 60fps
- [ ] Usar DevTools → Performance → Record para verificar

---

### 7. TESTING CON SCREEN READERS

#### NVDA (Windows) o VoiceOver (Mac)

**LiveCourses Carrusel**
- [ ] Botón anterior: Lee "Curso anterior"
- [ ] Botón siguiente: Lee "Siguiente curso"
- [ ] Dots: Lee "Ir a [Nombre del curso]"
- [ ] role="tablist" anunciado correctamente

**Featured Carrusel**
- [ ] Botón anterior: Lee "Ver cursos anteriores"
- [ ] Botón siguiente: Lee "Ver siguientes cursos"
- [ ] Dots: Lee "Ver grupo de cursos N"

**Modal**
- [ ] role="dialog" anunciado
- [ ] aria-modal="true" bloquea navegación fuera
- [ ] Botón cerrar: Lee label correcto
- [ ] Escape funciona

**FAQ**
- [ ] Preguntas navegables con Tab
- [ ] Enter/Space expanden/colapsan
- [ ] Contenido anunciado correctamente

---

### 8. TESTING DE COMPONENTES NUEVOS

#### CarouselBase Component

**Test 1: Props básicas**
```tsx
<CarouselBase
  items={[1, 2, 3, 4, 5]}
  renderItem={(item) => <div>{item}</div>}
/>
```
- [ ] Renderiza correctamente
- [ ] Navegación funciona
- [ ] Keyboard nav funciona

**Test 2: Personalización**
```tsx
<CarouselBase
  items={courses}
  renderItem={(c) => <CourseCard course={c} />}
  autoPlay={true}
  itemsPerView={{ mobile: 1, desktop: 3 }}
  showDots={true}
  ariaLabel="Test carousel"
/>
```
- [ ] Auto-play funciona (5s default)
- [ ] itemsPerView respetado (mobile 1, desktop 3)
- [ ] Dots visibles
- [ ] aria-label correcto

---

## 🐛 BUG TRACKING

### Problemas Encontrados Durante Testing:

| # | Componente | Problema | Severidad | Estado |
|---|------------|----------|-----------|--------|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

---

## ✅ SIGN-OFF

### Tester: ___________________
### Fecha: ___________________

### Resultados Generales:

- [ ] Contraste WCAG: APROBADO
- [ ] Animaciones: APROBADO
- [ ] Keyboard Navigation: APROBADO
- [ ] ARIA Labels: APROBADO
- [ ] Responsive: APROBADO
- [ ] Performance: APROBADO (score ≥ 85)
- [ ] Accessibility: APROBADO (score ≥ 90)

### Notas Adicionales:
```
[Escribir observaciones aquí]
```

---

## 📊 LIGHTHOUSE SCORES

### Antes de las mejoras:
- Performance: ____ / 100
- Accessibility: ____ / 100
- Best Practices: ____ / 100
- SEO: ____ / 100

### Después de las mejoras:
- Performance: ____ / 100
- Accessibility: ____ / 100 (Meta: ≥ 90)
- Best Practices: ____ / 100
- SEO: ____ / 100

### Mejora:
- Accessibility: +____%
- Performance: +____%
