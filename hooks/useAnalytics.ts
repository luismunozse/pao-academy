'use client';
import { useEffect, useCallback, useRef } from 'react';
import { 
  trackEvent, 
  trackConversion, 
  trackUserInteraction, 
  trackScroll, 
  trackClick, 
  trackTimeOnPage,
  useScrollTracking,
  setupErrorTracking 
} from '../lib/analytics';

export function useAnalytics() {
  const startTime = useRef<number>(Date.now());
  const scrollCleanup = useRef<(() => void) | null>(null);

  // Inicializar tracking
  useEffect(() => {
    // Configurar error tracking
    setupErrorTracking();

    // Configurar scroll tracking
    scrollCleanup.current = useScrollTracking() || null;

    // Trackear tiempo en página al salir
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime.current) / 1000);
      trackTimeOnPage(timeSpent);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      if (scrollCleanup.current) {
        scrollCleanup.current();
      }
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Función para trackear clics en elementos
  const trackElementClick = useCallback((element: string, location: string, value?: number) => {
    trackClick(element, location, value);
  }, []);

  // Función para trackear conversiones
  const trackConversionEvent = useCallback((action: string, value?: number, label?: string) => {
    trackConversion(action, value, label);
  }, []);

  // Función para trackear interacciones de usuario
  const trackUserAction = useCallback((action: string, element: string, value?: number) => {
    trackUserInteraction(action, element, value);
  }, []);

  // Función para trackear scroll en secciones específicas
  const trackSectionScroll = useCallback((section: string, percentage: number) => {
    trackScroll(section, percentage);
  }, []);

  // Función para trackear eventos personalizados
  const trackCustomEvent = useCallback((event: {
    action: string;
    category: string;
    label?: string;
    value?: number;
    custom_parameters?: Record<string, any>;
  }) => {
    trackEvent(event);
  }, []);

  return {
    trackElementClick,
    trackConversionEvent,
    trackUserAction,
    trackSectionScroll,
    trackCustomEvent,
  };
}

// Hook específico para tracking de formularios
export function useFormAnalytics(formName: string) {
  const trackFormStart = useCallback(() => {
    trackUserInteraction('form_start', formName);
  }, [formName]);

  const trackFormFieldFocus = useCallback((fieldName: string) => {
    trackUserInteraction('form_field_focus', `${formName}_${fieldName}`);
  }, [formName]);

  const trackFormFieldBlur = useCallback((fieldName: string, hasValue: boolean) => {
    trackUserInteraction('form_field_blur', `${formName}_${fieldName}`, hasValue ? 1 : 0);
  }, [formName]);

  const trackFormValidationError = useCallback((fieldName: string, errorType: string) => {
    trackUserInteraction('form_validation_error', `${formName}_${fieldName}`, 1);
    trackCustomEvent({
      action: 'form_validation_error',
      category: 'form_interaction',
      label: `${formName}_${fieldName}`,
      custom_parameters: {
        error_type: errorType,
        form_name: formName,
        field_name: fieldName,
      },
    });
  }, [formName]);

  const trackFormSubmission = useCallback((success: boolean, fields: string[]) => {
    trackUserInteraction('form_submit', formName, success ? 1 : 0);
    trackCustomEvent({
      action: success ? 'form_submit_success' : 'form_submit_error',
      category: 'conversion',
      label: formName,
      custom_parameters: {
        form_fields: fields,
        success,
        form_name: formName,
      },
    });
  }, [formName]);

  const trackCustomEvent = useCallback((event: {
    action: string;
    category: string;
    label?: string;
    value?: number;
    custom_parameters?: Record<string, any>;
  }) => {
    trackEvent({
      ...event,
      custom_parameters: {
        ...event.custom_parameters,
        form_name: formName,
      },
    });
  }, [formName]);

  return {
    trackFormStart,
    trackFormFieldFocus,
    trackFormFieldBlur,
    trackFormValidationError,
    trackFormSubmission,
    trackCustomEvent,
  };
}

// Hook para tracking de CTAs
export function useCTATracking() {
  const trackCTAClick = useCallback((ctaName: string, location: string, variant?: string) => {
    trackUserInteraction('cta_click', ctaName, 1);
    trackCustomEvent({
      action: 'cta_click',
      category: 'conversion',
      label: `${ctaName}_${location}`,
      custom_parameters: {
        cta_name: ctaName,
        location,
        variant,
      },
    });
  }, []);

  const trackCTAHover = useCallback((ctaName: string, location: string) => {
    trackUserInteraction('cta_hover', ctaName);
  }, []);

  const trackCustomEvent = useCallback((event: {
    action: string;
    category: string;
    label?: string;
    value?: number;
    custom_parameters?: Record<string, any>;
  }) => {
    trackEvent(event);
  }, []);

  return {
    trackCTAClick,
    trackCTAHover,
    trackCustomEvent,
  };
}

// Hook para tracking de scroll específico
export function useScrollAnalytics() {
  const trackedSections = useRef<Set<string>>(new Set());

  const trackSectionView = useCallback((sectionName: string, percentage: number) => {
    // Solo trackear una vez por sesión por sección
    const key = `${sectionName}_${Math.floor(percentage / 25) * 25}`;
    
    if (trackedSections.current.has(key)) return;
    
    trackedSections.current.add(key);
    trackScroll(sectionName, percentage);
  }, []);

  const trackScrollDepth = useCallback((depth: number) => {
    trackCustomEvent({
      action: 'scroll_depth',
      category: 'engagement',
      value: depth,
      custom_parameters: {
        scroll_depth_percentage: depth,
      },
    });
  }, []);

  const trackCustomEvent = useCallback((event: {
    action: string;
    category: string;
    label?: string;
    value?: number;
    custom_parameters?: Record<string, any>;
  }) => {
    trackEvent(event);
  }, []);

  return {
    trackSectionView,
    trackScrollDepth,
    trackCustomEvent,
  };
}

