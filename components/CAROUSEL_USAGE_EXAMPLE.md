# CarouselBase - Componente Reutilizable

Componente de carrusel genérico con todas las funcionalidades integradas:
- ✅ Keyboard navigation (ArrowLeft/ArrowRight)
- ✅ Aria labels para accesibilidad
- ✅ Auto-play opcional
- ✅ Responsive (mobile/desktop)
- ✅ Dots indicators
- ✅ Navigation buttons
- ✅ Focus visible states

## Ejemplo de Uso

### 1. Carrusel Simple

```tsx
import CarouselBase from './CarouselBase';

interface Course {
  id: string;
  title: string;
  description: string;
}

function MyCourses() {
  const courses: Course[] = [
    { id: '1', title: 'React', description: 'Learn React' },
    { id: '2', title: 'Next.js', description: 'Learn Next.js' },
    { id: '3', title: 'TypeScript', description: 'Learn TypeScript' },
  ];

  return (
    <CarouselBase
      items={courses}
      renderItem={(course) => (
        <div className="p-4 bg-white rounded-lg">
          <h3>{course.title}</h3>
          <p>{course.description}</p>
        </div>
      )}
      ariaLabel="Carrusel de cursos"
      ariaLabelPrev="Curso anterior"
      ariaLabelNext="Siguiente curso"
    />
  );
}
```

### 2. Carrusel con Auto-play

```tsx
<CarouselBase
  items={courses}
  renderItem={(course) => <CourseCard course={course} />}
  autoPlay={true}
  autoPlayInterval={3000}
  itemsPerView={{ mobile: 1, desktop: 3 }}
/>
```

### 3. Carrusel Personalizado

```tsx
<CarouselBase
  items={images}
  renderItem={(img) => <img src={img.src} alt={img.alt} />}
  showDots={true}
  showNavButtons={true}
  className="max-w-6xl mx-auto"
  navButtonClassName="bg-blue-500 hover:bg-blue-600"
  dotClassName="!bg-blue-500"
  ariaLabel="Galería de imágenes"
/>
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `items` | `T[]` | **requerido** | Array de items a mostrar |
| `renderItem` | `(item: T, index: number) => ReactNode` | **requerido** | Función para renderizar cada item |
| `autoPlay` | `boolean` | `false` | Activar auto-play |
| `autoPlayInterval` | `number` | `5000` | Intervalo en ms para auto-play |
| `itemsPerView` | `{ mobile: number, desktop: number }` | `{ mobile: 1, desktop: 3 }` | Items visibles por viewport |
| `showDots` | `boolean` | `true` | Mostrar indicadores |
| `showNavButtons` | `boolean` | `true` | Mostrar botones de navegación |
| `className` | `string` | `''` | Clases CSS para el contenedor |
| `navButtonClassName` | `string` | `''` | Clases CSS para botones de navegación |
| `dotClassName` | `string` | `''` | Clases CSS para dots |
| `ariaLabel` | `string` | `'Carrusel de contenido'` | Label para el carrusel |
| `ariaLabelPrev` | `string` | `'Anterior'` | Label para botón anterior |
| `ariaLabelNext` | `string` | `'Siguiente'` | Label para botón siguiente |

## Refactorización Sugerida

### Antes (LiveCourses.tsx - 350 líneas)

```tsx
// Código duplicado con lógica de carrusel completa
const [currentSlide, setCurrentSlide] = useState(0);
const nextSlide = () => { /* ... */ };
const prevSlide = () => { /* ... */ };
// + 100 líneas de JSX para navegación
```

### Después (usando CarouselBase - 50 líneas)

```tsx
import CarouselBase from './CarouselBase';

<CarouselBase
  items={filteredCourses}
  renderItem={(course) => renderCourseCard(course)}
  itemsPerView={{ mobile: 1, desktop: 3 }}
  ariaLabel="Cursos en vivo"
/>
```

## Beneficios

1. **Menos código**: Reduce ~200 líneas por componente
2. **Mantenibilidad**: Un solo lugar para bugs fixes
3. **Consistencia**: Mismo comportamiento en todos los carruseles
4. **Accesibilidad**: ARIA labels y keyboard nav incluidos
5. **Performance**: Lógica optimizada y memoizada

## Próximos Pasos

Para refactorizar `LiveCourses.tsx` y `Featured.tsx`:

1. Importar `CarouselBase`
2. Reemplazar lógica de carrusel con el componente
3. Mantener solo el `renderItem` específico
4. Eliminar código duplicado

Esto reducirá el código en ~400 líneas totales.
