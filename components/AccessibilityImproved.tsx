/**
 * Componente de mejoras de accesibilidad
 * Este archivo documenta las mejoras aplicadas al proyecto
 */

/**
 * MEJORAS IMPLEMENTADAS:
 *
 * 1. Skip to Main Content
 *    ✅ Ya implementado en Header.tsx (línea 129-133)
 *
 * 2. ARIA Labels
 *    ✅ Botón de cerrar promoción tiene aria-label (línea 116)
 *    - Falta: Agregar a más botones de iconos
 *
 * 3. Roles ARIA
 *    ✅ Header tiene role="banner" (línea 127)
 *    - Falta: Agregar role="main" al contenido principal
 *
 * 4. Contraste de Colores
 *    - Actualizar text-white/60 a text-white/90 para mejor contraste
 *    - Actualizar text-white/70 a text-white/85
 *
 * 5. Focus Visible
 *    - Agregar estilos focus-visible a elementos interactivos
 */

// Utilidades para mejoras de accesibilidad
export const a11yUtils = {
  // Mínimo contraste WCAG AA: 4.5:1 para texto normal, 3:1 para texto grande
  contrastClasses: {
    // Reemplazar text-white/60 con text-white/90
    textSecondary: 'text-white/90',
    // Reemplazar text-white/70 con text-white/85
    textMuted: 'text-white/85',
    // Para fondos oscuros
    textOnDark: 'text-white',
  },

  // Estilos de focus mejorados
  focusClasses: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',

  // Helper para botones de iconos
  iconButtonProps: (label: string) => ({
    'aria-label': label,
    type: 'button' as const,
  }),
};

export default a11yUtils;
