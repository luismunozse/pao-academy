# ✅ Checklist Anti-Mismatch - Verificación Completa

## 📋 Revisión de Componentes Críticos

### ❌ **EVITAR ABSOLUTAMENTE**

#### 1. `typeof window` en inicialización de estado
```tsx
// ❌ MAL - Esto causa hidratación diferente
const [isMobile] = useState(() => 
  window.matchMedia('(max-width: 768px)').matches
);

// ✅ BIEN - Estado fijo inicial, ajustar en useEffect
const [isMobile, setIsMobile] = useState(false);
useEffect(() => {
  setIsMobile(window.matchMedia('(max-width: 768px)').matches);
}, []);
```

#### 2. IDs/fechas aleatorias en render SSR
```tsx
// ❌ MAL
const id = Math.random().toString();
const timestamp = Date.now();

// ✅ BIEN - Generarlas en useEffect
const [id, setId] = useState('');
useEffect(() => {
  setId(Math.random().toString());
}, []);
```

#### 3. Render condicional basado en `mounted`
```tsx
// ❌ MAL - Estructura HTML diferente
if (!mounted) return <div>Loading...</div>;
return <div>Content</div>;

// ✅ BIEN - Misma estructura, visibilidad con CSS
return (
  <div>
    <div style={{ opacity: mounted ? 1 : 0 }}>Content</div>
  </div>
);
```

---

## ✅ **Verificación de Componentes**

### `components/Hero.tsx`
**Estado Anterior:**
- ❌ Tenía `if (!mounted) return <DifferentJSX />`
- ❌ Estructura HTML diferente antes y después de mount

**Estado Actual:**
- ✅ Eliminado el return condicional
- ✅ `useState(false)` - estado fijo inicial
- ✅ `matchMedia` solo dentro de `useEffect`
- ✅ Misma estructura HTML siempre

```tsx
// ✅ CORRECTO
const [reducedMotion, setReducedMotion] = useState(false);
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

useEffect(() => {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  setReducedMotion(mq.matches);
  // ...
}, []);
```

---

### `components/HeroOptimized.tsx`
- ✅ No usa `typeof window` en render
- ✅ Estado fijo: `useState(false)`
- ✅ `useABTest` siempre se llama (no condicional)
- ✅ Variante 'A' fija hasta mount
- ✅ Ambos fondos (imagen + gradiente) siempre presentes
- ✅ `Math.random()` solo en `useEffect` del hook

```tsx
// ✅ CORRECTO
const [mounted, setMounted] = useState(false);
const abVariantFromHook = useABTest('hero_cta');  // Siempre se llama
const abVariant = mounted ? abVariantFromHook : 'A';  // 'A' fijo hasta mount

// Estructura HTML idéntica siempre
<div className="hero-bg-desktop">
  <Image src="/hero.jpg" ... />
</div>
<div className="hero-bg-fallback" style={{ opacity: 0 }}>
  {/* gradiente */}
</div>
```

---

### `components/Header.tsx`
- ✅ No usa `typeof window` en render
- ✅ Estado fijo: `useState(false)` para `elevated` y `open`
- ✅ `window.scrollY` solo en `useEffect`
- ✅ Misma estructura HTML antes y después de scroll

```tsx
// ✅ CORRECTO
const [open, setOpen] = useState(false);
const [elevated, setElevated] = useState(false);

useEffect(() => {
  const onScroll = () => setElevated(window.scrollY > 6);
  onScroll();
  // ...
}, []);
```

---

### `lib/ab-testing.ts`
- ✅ `Math.random()` solo dentro de `useEffect`
- ✅ `useState<ABTestVariant>('A')` - estado fijo inicial
- ✅ `Date.now()` solo en eventos, no en render

```tsx
// ✅ CORRECTO
export function useABTest(testName: string): ABTestVariant {
  const [variant, setVariant] = useState<ABTestVariant>('A');  // Fijo
  
  useEffect(() => {
    // Math.random() SOLO aquí
    const rnd = Math.random() * 100;
    // ...
  }, [testName]);
  
  return variant;
}
```

---

### `middleware.ts`
- ✅ No cambia URLs de manera inconsistente
- ✅ Reemplazo de imágenes rotas es determinista
- ✅ Matcher incluye `/_next/image` correctamente
- ✅ El `src` del Hero (`/hero.jpg`) es estable (no cambia entre SSR y CSR)

```tsx
// ✅ CORRECTO
const BROKEN_IMAGES_MAP = new Map([
  ['photo-1556157382-97eda2f9e69b', 'photo-1516321318423-f06f85e504b3'],
]);
// Reemplazo determinista, no aleatorio
```

---

## 🎯 **Resumen de Cumplimiento**

### Checklist Anti-Mismatch

| Ítem | Estado | Notas |
|------|--------|-------|
| No `typeof window` en estado inicial | ✅ | Verificado en todos los componentes |
| No `matchMedia` fuera de `useEffect` | ✅ | Hero y Header corregidos |
| No `Math.random()` en render SSR | ✅ | Solo en `useEffect` |
| No `Date.now()` en render SSR | ✅ | Solo en handlers/refs |
| Estado fijo inicial (`useState(false)`) | ✅ | Todos los componentes |
| Misma estructura HTML SSR/CSR | ✅ | Eliminados returns condicionales |
| Cambios solo en clases/estilos | ✅ | Visibilidad con CSS |
| `src` de imágenes estable | ✅ | `/hero.jpg` no cambia |
| Middleware determinista | ✅ | No introduce variabilidad |

---

## 🚀 **Resultado Final**

### Antes
```
❌ Hydration failed: server/client HTML mismatch
❌ React detected change in order of hooks
❌ Rendered more hooks than previous render
```

### Después
```
✅ HTML idéntico en SSR y CSR
✅ Orden de hooks consistente
✅ Sin errores de hidratación
✅ Performance optimizada
```

---

## 💡 **Notas Adicionales**

1. **No se necesita `suppressHydrationWarning`**: La estructura es correcta
2. **A/B testing funciona**: Variante 'A' inicial, cambia después del mount
3. **Sin FOUC**: Imágenes con `priority`, carga optimizada
4. **Middleware estable**: URLs consistentes entre SSR y cliente

---

## 📚 **Referencias**

- [React Hydration Rules](https://react.dev/link/hydration-mismatch)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Rules of Hooks](https://react.dev/link/rules-of-hooks)
