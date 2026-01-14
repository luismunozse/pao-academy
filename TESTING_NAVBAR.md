# ✅ Testing Checklist - Navbar con Shadcn/UI

## 🎯 Objetivo
Verificar que el dropdown del navbar funciona correctamente después de migrar a shadcn/ui NavigationMenu.

---

## 🌐 Servidor
**URL:** http://localhost:3003
**Estado:** ✅ Running (sin errores de compilación)

---

## 📋 Tests Rápidos (5 minutos)

### 1️⃣ Verificación Visual Desktop

Abre http://localhost:3003 en tu navegador (Chrome recomendado).

#### Test 1: Dropdown aparece
```
1. Mueve el mouse sobre el botón "Cursos" (icono 📚)
2. ESPERAR: El dropdown debe aparecer suavemente
3. VERIFICAR:
   ✅ Dropdown aparece sin delay
   ✅ Fondo oscuro con blur (#0b0f1d)
   ✅ Borde blanco sutil
   ✅ Shadow profunda
```

#### Test 2: Layout del dropdown
```
VERIFICAR que el dropdown muestre 2 columnas:

┌─────────────────────────────────────────┐
│  📹 Cursos en Vivo  │  ▶️ Cursos Asinc. │
│  ─────────────────  │  ────────────────  │
│  • Ventas Consult.  │  📊 Análisis Datos │
│  • Liderazgo Ágil   │  💼 Negocios/Fin   │
│  • Motivación       │  ⚙️ Gest. Procesos │
│  • Marca Personal   │  🚀 Des. Personal  │
│  • Power BI         │  💻 Tecnología     │
│  • Data Analytics   │  📱 Marketing Dig. │
└─────────────────────────────────────────┘

✅ 2 columnas visibles
✅ Iconos de categoría (Video, PlayCircle)
✅ Descripciones visibles
✅ Todos los cursos listados
```

#### Test 3: Interacciones
```
1. Hover sobre un curso en "Cursos en Vivo"
   ✅ Background cambia a white/10
   ✅ Flecha (ChevronRight) se destaca
   ✅ Cursor: pointer

2. Hover sobre un curso en "Cursos Asincrónicos"
   ✅ Background cambia a white/10
   ✅ Icono 💬 visible (WhatsApp)
   ✅ Cursor: pointer

3. Mueve el mouse fuera del dropdown
   ✅ Dropdown se cierra suavemente (no instantáneo)
   ✅ Animación de zoom-out
```

#### Test 4: Click en curso
```
1. Click en "Ventas Consultivas"
   ✅ Navega a #cursos-en-vivo
   ✅ Página hace scroll
   ✅ Dropdown se cierra

2. Click en "📊 Análisis de Datos"
   ✅ Se abre WhatsApp en nueva pestaña
   ✅ Mensaje pre-llenado correcto
   ✅ Dropdown permanece abierto (nuevo tab)
```

#### Test 5: Navegación con teclado
```
1. Presiona Tab hasta llegar a "Cursos"
   ✅ Focus visible en el botón

2. Presiona Enter
   ✅ Dropdown se abre
   ✅ Focus se mueve al primer item

3. Presiona Tab para navegar items
   ✅ Focus se mueve entre items

4. Presiona Escape
   ✅ Dropdown se cierra
   ✅ Focus vuelve al botón "Cursos"
```

---

### 2️⃣ Otros Links del Navbar

```
✅ Inicio (GraduationCap) → Scroll a #inicio
✅ Corporate Training (Briefcase) → Scroll a #corporate-training
✅ Sobre Nosotros (Info) → Scroll a #sobre-nosotros
✅ Contacto (MessageCircle + 💬) → WhatsApp en nuevo tab
✅ Selector de idioma (Globe) → Cambia ES/EN
✅ Botón "Inscríbete Ahora" → Abre modal
```

---

### 3️⃣ Responsive Mobile (< 1024px)

Redimensiona la ventana del navegador a ~375px de ancho.

```
1. Navbar desktop debe desaparecer
   ✅ NavigationMenu oculto (hidden lg:flex)

2. Menú hamburguesa debe aparecer
   ✅ Visible en la derecha

3. Click en hamburguesa
   ✅ Menú lateral se abre desde la derecha
   ✅ Background overlay oscuro
   ✅ Scroll del body bloqueado

4. Click en "Cursos"
   ✅ Submenu se expande
   ✅ Icono chevron rota 180°

5. Click en "Cursos en Vivo"
   ✅ Lista de cursos se expande
   ✅ Funciona correctamente

6. Click en un curso
   ✅ Navega/abre WhatsApp
   ✅ Menú se cierra
```

---

## 🎨 Verificación Visual de Estilos

### Colores Correctos
```
✅ Navbar background: rgba(11, 15, 29, 0.95) con blur
✅ Dropdown background: rgba(11, 15, 29, 0.98) con blur
✅ Texto inactivo: white/70
✅ Texto hover: white
✅ Texto activo: white
✅ Hover background: white/10
✅ Border: white/12
✅ Accent color: var(--academic-accent)
```

### Animaciones Suaves
```
✅ Dropdown aparece con zoom-in (scale 0.9 → 1)
✅ Dropdown desaparece con zoom-out (scale 1 → 0.95)
✅ Fade in/out sincronizado
✅ Transiciones de hover (200ms)
✅ Sin saltos o glitches
```

### Shadow y Profundidad
```
✅ Dropdown tiene shadow profunda: 0_24px_70px_rgba(0,0,0,0.55)
✅ Se ve "flotando" sobre el contenido
✅ Backdrop blur funciona
```

---

## 🐛 Verificación de Bugs Anteriores

### ❌ Bugs Anteriores (Manual)
1. ~~Dropdown no aparecía~~ → ✅ RESUELTO
2. ~~Z-index issues~~ → ✅ RESUELTO
3. ~~Timing de hover inconsistente~~ → ✅ RESUELTO
4. ~~Nested dropdown no funcionaba~~ → ✅ RESUELTO

### ✅ Tests de Regresión
```
1. Abrir dropdown 5 veces seguidas
   ✅ Siempre funciona (no hay fallos intermitentes)

2. Hover rápidamente sobre "Cursos" y salir
   ✅ Dropdown no se queda "colgado"
   ✅ Se cierra correctamente

3. Abrir dropdown y scroll de la página
   ✅ Dropdown se mantiene fijo en posición
   ✅ No hay flickering

4. Cambiar tamaño de ventana mientras dropdown abierto
   ✅ Dropdown se adapta
   ✅ Mobile menu toma control en < 1024px
```

---

## 📊 Checklist Final

### Funcionalidad
- [ ] Dropdown de "Cursos" aparece al hover
- [ ] 2 columnas visibles (Vivo + Asíncrono)
- [ ] Todos los cursos listados correctamente
- [ ] Hover effects funcionan
- [ ] Clicks navegan/abren WhatsApp
- [ ] Dropdown se cierra suavemente
- [ ] Navegación con teclado funciona
- [ ] Otros links del navbar funcionan
- [ ] Mobile menu intacto

### Visual
- [ ] Colores correctos (tema oscuro)
- [ ] Blur effects visibles
- [ ] Shadow profunda
- [ ] Animaciones suaves
- [ ] Sin glitches o saltos
- [ ] Icons correctos (Library, PlayCircle, Briefcase, MessageCircle)

### Performance
- [ ] Sin errores en consola
- [ ] Sin warnings en consola
- [ ] Transiciones a 60fps
- [ ] No hay memory leaks (abrir/cerrar 10 veces)

### Accesibilidad
- [ ] Navegación con Tab funciona
- [ ] Enter abre dropdown
- [ ] Escape cierra dropdown
- [ ] Focus visible en todos los elementos
- [ ] Screen reader compatible (opcional)

---

## 🚨 Si Encuentras Problemas

### Problema: Dropdown no aparece
**Solución:**
1. Abre DevTools (F12)
2. Busca errores en Console
3. Verifica que NavigationMenu está en el DOM
4. Revisa que no hay errores de compilación

### Problema: Estilos no se aplican
**Solución:**
1. Hard refresh (Ctrl + Shift + R)
2. Verifica que `components/ui/navigation-menu.tsx` existe
3. Revisa que los imports en Header.tsx están correctos

### Problema: Animaciones no funcionan
**Solución:**
1. Verifica que `tailwind.config.js` tiene las keyframes
2. Reinstala dependencias: `npm install`
3. Reinicia servidor: `npm run dev`

### Problema: Mobile menu no funciona
**Solución:**
1. Verifica que NavigationMenu tiene `hidden lg:flex`
2. Asegúrate que el menú lateral manual sigue intacto
3. No debe haber conflictos entre ambos

---

## ✅ Resultado Esperado

Después de completar todos los tests, debes tener:

```
✅ Dropdown funciona perfectamente
✅ Sin bugs reportados
✅ Animaciones suaves
✅ Accesibilidad completa
✅ Mobile intacto
✅ Performance óptimo
✅ Código limpio y mantenible
```

---

## 📸 Screenshots Recomendadas

Tomar screenshots de:
1. Dropdown abierto (desktop)
2. Hover sobre un curso
3. Mobile menu abierto
4. Navegación con teclado (focus visible)

Guardar en: `/docs/screenshots/navbar-shadcn/`

---

## 🎉 Test Completo

Si todos los checkboxes están marcados:

**✅ NAVBAR CON SHADCN/UI FUNCIONANDO PERFECTAMENTE**

Puedes proceder a:
1. Merge a rama principal
2. Deploy a producción
3. Monitorear analytics

---

## 📞 Soporte

Si encuentras problemas no listados:
1. Revisa [NAVBAR_SHADCN_IMPLEMENTATION.md](./NAVBAR_SHADCN_IMPLEMENTATION.md)
2. Revisa logs del servidor en terminal
3. Busca en documentación de Radix UI

---

*Checklist creado: 2026-01-14*
*Versión: 1.0*
*Estado: ✅ Ready para testing*
