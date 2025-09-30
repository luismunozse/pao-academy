import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://glomind360.com';
  const currentDate = new Date().toISOString();

  // Páginas estáticas principales
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/cursos`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/politicas-privacidad`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terminos-condiciones`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/arrepentimiento`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // Páginas de cursos en vivo
  const liveCourses = [
    'ventas-consultivas',
    'liderazgo-agil',
    'marca-personal',
    'power-bi-desde-cero',
  ].map(course => ({
    url: `${baseUrl}/cursos/${course}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Páginas de microcursos (asincrónicos)
  const asyncCourses = [
    'excel-pro',
    'powerbi-express',
    'notion-productividad',
    'trello-asana',
    'finanzas-smart',
    'excel-finanzas',
    'inversiones-principiantes',
    'contabilidad-sin-complicaciones',
    'productividad-10x',
    'comunicacion-asertiva',
    'python-desde-cero',
    'ia-generativa',
    'marketing-digital-express',
    'redes-sociales-pro',
    'email-marketing-ia',
    'diseno-canva',
    'ux-ui-fundamentals',
    'photoshop-start',
    'ventas-101',
    'atencion-cliente-5star',
    'objeciones-bajo-control',
    'comunicacion-efectiva-pro',
    'presentaciones-impacto',
    'trabajo-equipo-remoto',
    'marca-personal-360',
    'contenido-redes-ia',
    'linkedin-pro-ia',
    'reels-shorts-ia',
    'edicion-visual-ia',
  ].map(course => ({
    url: `${baseUrl}/cursos/${course}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Versiones en inglés
  const englishPages = [
    {
      url: `${baseUrl}/en`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/courses`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  return [
    ...staticPages,
    ...liveCourses,
    ...asyncCourses,
    ...englishPages,
  ];
}

