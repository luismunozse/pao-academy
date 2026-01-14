# 🎨 Hero Component - Sistema Modular

Sistema de Hero completo y refactorizado con componentes modulares, múltiples variantes de diseño y optimizaciones de rendimiento.

## 📁 Estructura

```
components/Hero/
├── index.tsx                    # Hero principal (default)
├── HeroBadge.tsx               # Badge de confianza/certificación
├── HeroFeature.tsx             # Tarjetas de características
├── HeroBackground.tsx          # Gestión de fondos
├── ScrollIndicator.tsx         # Indicador de scroll animado
├── variants/
│   ├── HeroModern.tsx         # Variante moderna con animaciones
│   ├── HeroMinimal.tsx        # Variante minimalista
│   └── HeroPremium.tsx        # Variante premium/lujo
└── README.md                   # Esta documentación
```

## 🚀 Uso Rápido

### Hero por Defecto

```tsx
import Hero from '@/components/Hero';

<Hero
  brandName="GLOMIND360"
  t={(k) => translations[k]}
  cta={() => setModalOpen(true)}
/>
```

### Variantes Disponibles

#### 1️⃣ Hero Moderno (Recomendado para SaaS/Tech)

```tsx
import HeroModern from '@/components/Hero/variants/HeroModern';

<HeroModern
  brandName="GLOMIND360"
  t={(k) => translations[k]}
  cta={() => setModalOpen(true)}
/>
```

**Características:**
- ✨ Orbes animados en background
- 📊 Mini estadísticas (500+ estudiantes, 95% satisfacción)
- 🎯 Animaciones suaves con Framer Motion
- 🎨 Gradientes vibrantes azul-cyan

#### 2️⃣ Hero Minimalista (Para marcas elegantes)

```tsx
import HeroMinimal from '@/components/Hero/variants/HeroMinimal';

<HeroMinimal
  brandName="GLOMIND360"
  t={(k) => translations[k]}
  cta={() => setModalOpen(true)}
/>
```

**Características:**
- 🧘 Diseño limpio y espaciado
- ⚪ Fondo claro con patrón sutil
- 📝 Tipografía grande y legible
- ⚡ Carga ultra-rápida (sin animaciones pesadas)

#### 3️⃣ Hero Premium (Para productos de lujo/exclusivos)

```tsx
import HeroPremium from '@/components/Hero/variants/HeroPremium';

<HeroPremium
  brandName="GLOMIND360"
  t={(k) => translations[k]}
  cta={() => setModalOpen(true)}
/>
```

**Características:**
- 👑 Badge con corona dorada
- ✨ Efectos de lujo y texturas
- 🏆 Trust indicators premium (98% tasa de éxito, 4.9/5 rating)
- 💎 Botones con gradientes dorados

## 🧩 Componentes Individuales

### HeroBadge

Badge reutilizable con variantes de estilo.

```tsx
import HeroBadge from '@/components/Hero/HeroBadge';

<HeroBadge
  text="+500 profesionales transformaron su carrera"
  variant="trust" // 'trust' | 'certification' | 'highlight'
  icon={<Star className="h-4 w-4" />}
/>
```

### HeroFeature

Tarjeta de característica con animación.

```tsx
import HeroFeature from '@/components/Hero/HeroFeature';
import { GraduationCap } from 'lucide-react';

<HeroFeature
  icon={GraduationCap}
  title="Mentores Expertos"
  description="Aprende de profesionales activos"
  index={0}
  delay={0.9}
/>
```

### HeroBackground

Gestión de fondos con múltiples variantes.

```tsx
import HeroBackground from '@/components/Hero/HeroBackground';

<HeroBackground
  variant="image" // 'image' | 'gradient' | 'minimal'
  imageSrc="/hero.jpg"
  imageAlt="Hero background"
/>
```

### ScrollIndicator

Indicador de scroll animado con accesibilidad.

```tsx
import ScrollIndicator from '@/components/Hero/ScrollIndicator';

<ScrollIndicator />
```

## ⚙️ Props

### Hero / HeroModern / HeroMinimal / HeroPremium

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `brandName` | `string` | ✅ | Nombre de la marca |
| `t` | `(key: string) => string` | ✅ | Función de traducción |
| `cta` | `() => void` | ✅ | Callback para CTA principal |
| `variant` | `'default' \| 'gradient' \| 'minimal'` | ❌ | Variante de background (solo Hero default) |

### HeroBadge

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `text` | `string` | ✅ | Texto del badge |
| `icon` | `React.ReactNode` | ❌ | Ícono personalizado |
| `variant` | `'trust' \| 'certification' \| 'highlight'` | ❌ | Estilo visual |

### HeroFeature

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `icon` | `LucideIcon` | ✅ | Ícono de Lucide |
| `title` | `string` | ✅ | Título de la característica |
| `description` | `string` | ✅ | Descripción |
| `index` | `number` | ✅ | Índice para animación escalonada |
| `delay` | `number` | ❌ | Delay de animación (default: 0.9s) |

### HeroBackground

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `variant` | `'image' \| 'gradient' \| 'minimal'` | ❌ | Tipo de fondo |
| `imageSrc` | `string` | ❌ | Ruta de imagen (default: '/hero.jpg') |
| `imageAlt` | `string` | ❌ | Texto alternativo |

## 🎨 Personalización

### Cambiar colores del gradiente

Edita las variables CSS en `globals.css`:

```css
:root {
  --neon-blue: #2563EB;   /* Azul primario */
  --neon-cyan: #0EA5E9;   /* Cyan acento */
}
```

### Personalizar animaciones

Las animaciones usan Framer Motion. Ajusta en cada componente:

```tsx
<m.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }} // 👈 Ajusta aquí
>
```

## ♿ Accesibilidad

Todos los componentes incluyen:
- ✅ ARIA labels apropiados
- ✅ Navegación por teclado
- ✅ `role` y `aria-live` donde corresponde
- ✅ Texto alternativo en imágenes
- ✅ Focus visible en todos los botones

## 🚀 Optimizaciones de Rendimiento

### Imágenes
- ✅ WebP con fallback JPG
- ✅ Responsive images (mobile/tablet/desktop)
- ✅ `priority` para LCP
- ✅ `sizes` optimizado

### JavaScript
- ✅ LazyMotion para reducir bundle de Framer Motion
- ✅ Componentes modulares para tree-shaking
- ✅ Sin dependencias innecesarias

### CSS
- ✅ Clases utilitarias de Tailwind
- ✅ Backdrop-blur con soporte de fallback
- ✅ GPU-accelerated transforms

## 📱 Responsive Design

Todos los componentes son totalmente responsivos:

- **Mobile (< 768px):** Layout vertical, fuentes adaptadas
- **Tablet (768px - 1024px):** Layout híbrido
- **Desktop (> 1024px):** Layout horizontal completo

## 🔄 Migración desde HeroFixed

Si estás usando `HeroFixed.tsx`, migra así:

**Antes:**
```tsx
import HeroFixed from '@/components/HeroFixed';

<HeroFixed brandName={brandName} t={t} cta={cta} />
```

**Después:**
```tsx
import Hero from '@/components/Hero';

<Hero brandName={brandName} t={t} cta={cta} />
```

O usa una variante específica:

```tsx
import HeroModern from '@/components/Hero/variants/HeroModern';

<HeroModern brandName={brandName} t={t} cta={cta} />
```

## 🎯 Recomendaciones de Uso

| Tipo de Negocio | Variante Recomendada | Por Qué |
|------------------|---------------------|---------|
| Tech/SaaS | `HeroModern` | Animaciones modernas, stats dinámicos |
| Servicios Profesionales | `Hero` (default) | Balance entre elegancia y funcionalidad |
| E-learning/Academia | `Hero` o `HeroModern` | Énfasis en resultados y confianza |
| Productos Premium | `HeroPremium` | Posicionamiento de lujo y exclusividad |
| Portfolios/Agencias | `HeroMinimal` | Elegancia minimalista, foco en contenido |

## 🐛 Troubleshooting

### Las imágenes no cargan
Verifica que existan:
- `/public/hero.webp`
- `/public/hero-mobile.webp`
- `/public/hero.jpg` (fallback)

### Animaciones no funcionan
Asegúrate de tener instalado Framer Motion:
```bash
npm install framer-motion
```

### Errores de TypeScript
Verifica que tengas los tipos de Lucide React:
```bash
npm install -D @types/lucide-react
```

## 📚 Ejemplos Completos

Ver `app/page.tsx` para ejemplos de implementación en producción.

## 🤝 Contribuciones

Para agregar nuevas variantes:

1. Crea archivo en `variants/HeroNuevo.tsx`
2. Sigue la estructura de props existente
3. Documenta en este README
4. Agrega ejemplo de uso

## 📄 Licencia

MIT - Libre para uso comercial y personal.

---

**Creado con ❤️ para GLOMIND360**
