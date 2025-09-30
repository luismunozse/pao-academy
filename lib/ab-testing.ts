'use client';

import React from 'react';

export type ABTestVariant = 'A' | 'B' | 'C';

export interface ABTestConfig {
  name: string;
  variants: {
    [key in ABTestVariant]: {
      weight: number;
      config: any;
    };
  };
  isActive: boolean;
  startDate: string;
  endDate: string;
}

// Configuración de tests A/B
export const abTests: Record<string, ABTestConfig> = {
  hero_cta: {
    name: 'Hero CTA Button',
    variants: {
      A: {
        weight: 33,
        config: {
          text: 'Inscríbete Ahora',
          color: 'primary',
          size: 'lg',
          icon: 'graduation',
        },
      },
      B: {
        weight: 33,
        config: {
          text: '¡Comienza Gratis!',
          color: 'accent',
          size: 'lg',
          icon: 'rocket',
        },
      },
      C: {
        weight: 34,
        config: {
          text: 'Reserva tu Lugar',
          color: 'secondary',
          size: 'lg',
          icon: 'calendar',
        },
      },
    },
    isActive: true,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
  },
  course_cta: {
    name: 'Course CTA Button',
    variants: {
      A: {
        weight: 34,
        config: {
          text: 'Quiero saber más',
          style: 'primary',
        },
      },
      B: {
        weight: 33,
        config: {
          text: 'Ver detalles del curso',
          style: 'outline',
        },
      },
      C: {
        weight: 33,
        config: {
          text: 'Explorar curso',
          style: 'secondary',
        },
      },
    },
    isActive: true,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
  },
  urgency_popup: {
    name: 'Urgency Popup',
    variants: {
      A: {
        weight: 34,
        config: {
          title: '¡Últimos cupos disponibles!',
          message: 'Solo quedan 3 lugares para la próxima cohorte',
          cta: 'Reservar ahora',
        },
      },
      B: {
        weight: 33,
        config: {
          title: '¡Oferta por tiempo limitado!',
          message: '50% de descuento solo por hoy',
          cta: 'Aprovechar oferta',
        },
      },
      C: {
        weight: 33,
        config: {
          title: '¡No te quedes fuera!',
          message: 'Última oportunidad para unirte a esta cohorte',
          cta: 'Únete ahora',
        },
      },
    },
    isActive: true,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
  },
};

// Hook para A/B testing
export function useABTest(testName: string): ABTestVariant {
  const [variant, setVariant] = React.useState<ABTestVariant>('A');

  React.useEffect(() => {
    try {
      const test = abTests[testName];
      if (!test || !test.isActive) {
        setVariant('A');
        return;
      }

      const key = `ab_test_${testName}`;
      const storedVariant = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
      if (storedVariant === 'A' || storedVariant === 'B' || storedVariant === 'C') {
        setVariant(storedVariant as ABTestVariant);
        return;
      }

      const rnd = Math.random() * 100;
      let cumulative = 0;
      let selected: ABTestVariant = 'A';
      for (const [varName, cfg] of Object.entries(test.variants)) {
        cumulative += cfg.weight;
        if (rnd <= cumulative) {
          selected = varName as ABTestVariant;
          break;
        }
      }
      setVariant(selected);
      try { window.localStorage.setItem(key, selected); } catch {}
    } catch {}
  }, [testName]);

  return variant;
}

// Declaración global de gtag para Google Analytics
declare global {
  function gtag(...args: any[]): void;
}

// Función para trackear conversiones
export function trackConversion(testName: string, variant: ABTestVariant, action: string) {
  if (typeof window === 'undefined') return;

  // Google Analytics 4
  if (typeof gtag !== 'undefined') {
    gtag('event', 'conversion', {
      test_name: testName,
      variant: variant,
      action: action,
      value: 1,
    });
  }

  // Evento personalizado para analytics
  window.dispatchEvent(new CustomEvent('ab_conversion', {
    detail: {
      testName,
      variant,
      action,
      timestamp: Date.now(),
    },
  }));

  // Log para debugging
  console.log(`AB Test Conversion: ${testName} - ${variant} - ${action}`);
}

// Función para obtener configuración de variante
export function getVariantConfig(testName: string, variant: ABTestVariant) {
  const test = abTests[testName];
  if (!test) return null;
  
  return test.variants[variant]?.config || null;
}

// Función para verificar si un test está activo
export function isTestActive(testName: string): boolean {
  const test = abTests[testName];
  if (!test) return false;

  const now = new Date();
  const startDate = new Date(test.startDate);
  const endDate = new Date(test.endDate);

  return test.isActive && now >= startDate && now <= endDate;
}

