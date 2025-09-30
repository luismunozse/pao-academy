// Configuración centralizada de imágenes de cursos
// Todas las imágenes están verificadas y son accesibles

export const COURSE_IMAGES = {
  // Categorías principales con imágenes verificadas
  data_analytics: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
  business_finance: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1600&auto=format&fit=crop',
  process_management: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1600&auto=format&fit=crop',
  personal_development: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1600&auto=format&fit=crop',
  technology: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1600&auto=format&fit=crop',
  digital_marketing: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop',
  design_creativity: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1600&auto=format&fit=crop',
  sales_customer: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1600&auto=format&fit=crop',
  default: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop',

  // Fallbacks seguros
  fallback_data: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
  fallback_business: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1600&auto=format&fit=crop',
  fallback_default: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop',
} as const;

export function getCourseImage(category: string): string {
  const normalized = category
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}+/gu, '')
    .trim();

  if (normalized.includes('datos') || normalized.includes('analitica') || normalized.includes('analisis') || normalized.includes('data')) {
    return COURSE_IMAGES.data_analytics;
  }
  if (normalized.includes('negocios') || normalized.includes('finanzas')) {
    return COURSE_IMAGES.business_finance;
  }
  if (normalized.includes('gestion de procesos') || normalized.includes('procesos')) {
    return COURSE_IMAGES.process_management;
  }
  if (normalized.includes('mindset') || normalized.includes('desarrollo personal')) {
    return COURSE_IMAGES.personal_development;
  }
  if (normalized.includes('tech') || normalized.includes('program')) {
    return COURSE_IMAGES.technology;
  }
  if (normalized.includes('marketing digital')) {
    return COURSE_IMAGES.digital_marketing;
  }
  if (normalized.includes('diseño') || normalized.includes('creatividad') || normalized.includes('ux') || normalized.includes('ui')) {
    return COURSE_IMAGES.design_creativity;
  }
  if (normalized.includes('ventas') || normalized.includes('customer')) {
    return COURSE_IMAGES.sales_customer;
  }

  return COURSE_IMAGES.default;
}

export function getCourseFallback(category: string): string {
  const normalized = category
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}+/gu, '')
    .trim();

  if (normalized.includes('datos') || normalized.includes('analitica') || normalized.includes('analisis') || normalized.includes('data')) {
    return COURSE_IMAGES.fallback_data;
  }
  if (normalized.includes('negocios') || normalized.includes('finanzas')) {
    return COURSE_IMAGES.fallback_business;
  }

  return COURSE_IMAGES.fallback_default;
}

