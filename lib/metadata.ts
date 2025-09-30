import { Metadata } from 'next';

export const defaultMetadata: Metadata = {
  title: {
    default: 'GLOMIND360 - Formación Profesional en Vivo y Online',
    template: '%s | GLOMIND360'
  },
  description: 'Transforma tu carrera con cursos en vivo y asincrónicos. Liderazgo, Ventas, Power BI, Marca Personal y más. Certificación universitaria incluida.',
  keywords: [
    'cursos online',
    'formación profesional',
    'liderazgo',
    'ventas consultivas',
    'power bi',
    'marca personal',
    'certificación universitaria',
    'cursos en vivo',
    'capacitación empresarial',
    'desarrollo profesional'
  ],
  authors: [{ name: 'GLOMIND360' }],
  creator: 'GLOMIND360',
  publisher: 'GLOMIND360',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://glomind360.com'),
  alternates: {
    canonical: '/',
    languages: {
      'es-ES': '/es',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://glomind360.com',
    title: 'GLOMIND360 - Formación Profesional en Vivo y Online',
    description: 'Transforma tu carrera con cursos en vivo y asincrónicos. Liderazgo, Ventas, Power BI, Marca Personal y más. Certificación universitaria incluida.',
    siteName: 'GLOMIND360',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GLOMIND360 - Formación Profesional',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GLOMIND360 - Formación Profesional en Vivo y Online',
    description: 'Transforma tu carrera con cursos en vivo y asincrónicos. Liderazgo, Ventas, Power BI, Marca Personal y más.',
    images: ['/og-image.jpg'],
    creator: '@glomind360',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export function generatePageMetadata({
  title,
  description,
  path = '',
  keywords = [],
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  return {
    title,
    description,
    keywords: [...defaultMetadata.keywords!, ...keywords],
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      url: `https://glomind360.com${path}`,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
    },
    alternates: {
      canonical: `https://glomind360.com${path}`,
    },
  };
}

// Metadatos específicos para páginas de cursos
export const courseMetadata = {
  'ventas-consultivas': generatePageMetadata({
    title: 'Ventas Consultivas - Curso en Vivo | GLOMIND360',
    description: 'Aprende técnicas modernas de prospección y discovery. Duplica tu tasa de cierre en 90 días con nuestro método de Ventas Consultivas.',
    path: '/cursos/ventas-consultivas',
    keywords: ['ventas consultivas', 'prospección', 'cierre de ventas', 'técnicas de venta', 'curso ventas'],
  }),
  'liderazgo-agil': generatePageMetadata({
    title: 'Liderazgo Ágil - Curso en Vivo | GLOMIND360',
    description: 'Potencia equipos de alto rendimiento con dinámicas ágiles, feedback constante y prácticas efectivas de liderazgo.',
    path: '/cursos/liderazgo-agil',
    keywords: ['liderazgo ágil', 'equipos de alto rendimiento', 'feedback', 'gestión de equipos', 'curso liderazgo'],
  }),
  'marca-personal': generatePageMetadata({
    title: 'Marca Personal - Curso en Vivo | GLOMIND360',
    description: 'Construye tu narrativa, aumenta tu visibilidad y diferencia tu perfil en el mercado profesional con nuestro curso de Marca Personal.',
    path: '/cursos/marca-personal',
    keywords: ['marca personal', 'personal branding', 'visibilidad profesional', 'networking', 'curso marca personal'],
  }),
  'power-bi-desde-cero': generatePageMetadata({
    title: 'Power BI desde Cero - Curso en Vivo | GLOMIND360',
    description: 'Transforma datos en decisiones con dashboards, métricas y reportes que generan impacto real. Aprende Power BI desde cero.',
    path: '/cursos/power-bi-desde-cero',
    keywords: ['power bi', 'análisis de datos', 'dashboards', 'business intelligence', 'curso power bi'],
  }),
};

