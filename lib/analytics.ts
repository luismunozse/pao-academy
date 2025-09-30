'use client';

// Tipos para eventos de analytics
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

export interface ScrollEvent {
  section: string;
  percentage: number;
  timestamp: number;
}

export interface HeatmapEvent {
  x: number;
  y: number;
  element: string;
  timestamp: number;
}

// Configuración de Google Analytics 4
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

// Declaración global de gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Inicializar Google Analytics
export function initializeGA() {
  if (typeof window === 'undefined') return;

  // Cargar script de GA4
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);

  // Configurar gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_TRACKING_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });
}

// Trackear eventos personalizados
export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === 'undefined') return;

  // Google Analytics 4
  if (typeof gtag !== 'undefined') {
    gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event.custom_parameters,
    });
  }

  // Console log para debugging
  console.log('Analytics Event:', event);
}

// Trackear conversiones específicas
export function trackConversion(action: string, value?: number, label?: string) {
  trackEvent({
    action,
    category: 'conversion',
    label,
    value,
  });
}

// Trackear interacciones de usuario
export function trackUserInteraction(action: string, element: string, value?: number) {
  trackEvent({
    action,
    category: 'user_interaction',
    label: element,
    value,
  });
}

// Trackear scroll por secciones
export function trackScroll(section: string, percentage: number) {
  const event: ScrollEvent = {
    section,
    percentage,
    timestamp: Date.now(),
  };

  // Solo trackear cada 25% para evitar spam
  const key = `scroll_${section}_${Math.floor(percentage / 25) * 25}`;
  if (sessionStorage.getItem(key)) return;
  
  sessionStorage.setItem(key, 'true');

  trackEvent({
    action: 'scroll',
    category: 'engagement',
    label: section,
    value: percentage,
    custom_parameters: {
      scroll_percentage: percentage,
      section_name: section,
    },
  });
}

// Trackear clics en elementos
export function trackClick(element: string, location: string, value?: number) {
  trackEvent({
    action: 'click',
    category: 'engagement',
    label: `${element}_${location}`,
    value,
  });
}

// Trackear formularios
export function trackFormSubmission(formName: string, success: boolean, fields?: string[]) {
  trackEvent({
    action: success ? 'form_submit_success' : 'form_submit_error',
    category: 'conversion',
    label: formName,
    custom_parameters: {
      form_fields: fields,
      success,
    },
  });
}

// Trackear tiempo en página
export function trackTimeOnPage(timeInSeconds: number) {
  trackEvent({
    action: 'time_on_page',
    category: 'engagement',
    value: timeInSeconds,
  });
}

// Trackear heatmap data (simplificado)
export function trackHeatmap(x: number, y: number, element: string) {
  // Solo trackear clics, no todos los movimientos del mouse
  trackEvent({
    action: 'heatmap_click',
    category: 'user_behavior',
    custom_parameters: {
      x,
      y,
      element,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
    },
  });
}

// Hook para tracking automático de scroll
export function useScrollTracking() {
  if (typeof window === 'undefined') return;

  const sections = [
    'hero',
    'cursos-en-vivo',
    'cursos-asincronos',
    'formacion-corporativa',
    'opciones-formacion',
    'beneficios',
    'testimonios',
    'faq',
    'contacto',
  ];

  const handleScroll = () => {
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;
      
      // Calcular porcentaje visible
      const visibleTop = Math.max(0, -rect.top);
      const visibleBottom = Math.min(elementHeight, windowHeight - rect.top);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const percentage = Math.round((visibleHeight / elementHeight) * 100);

      if (percentage > 50) {
        trackScroll(section, percentage);
      }
    });
  };

  // Throttle scroll events
  let ticking = false;
  const throttledScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', throttledScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', throttledScroll);
  };
}

// Trackear errores de JavaScript
export function trackError(error: Error, context?: string) {
  trackEvent({
    action: 'javascript_error',
    category: 'error',
    label: context || 'unknown',
    custom_parameters: {
      error_message: error.message,
      error_stack: error.stack,
      user_agent: navigator.userAgent,
      url: window.location.href,
    },
  });
}

// Configurar error tracking global
export function setupErrorTracking() {
  if (typeof window === 'undefined') return;

  window.addEventListener('error', (event) => {
    trackError(new Error(event.message), 'global_error');
  });

  window.addEventListener('unhandledrejection', (event) => {
    trackError(new Error(event.reason), 'unhandled_promise_rejection');
  });
}

