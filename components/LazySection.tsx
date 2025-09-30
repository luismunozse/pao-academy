'use client';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import { ReactNode, useRef, useEffect, useState } from 'react';

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn';
  delay?: number;
  duration?: number;
  reducedMotion?: boolean;
}

const animations = {
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
  },
};

export default function LazySection({
  children,
  className = '',
  threshold = 0.1,
  rootMargin = '50px',
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.6,
  reducedMotion = false,
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin, hasAnimated]);

  const animationConfig = animations[animation];

  return (
    <div ref={ref} className={className}>
      <LazyMotion features={domAnimation} strict>
        <m.div
          initial={reducedMotion ? false : animationConfig.initial}
          animate={
            reducedMotion || !isVisible
              ? undefined
              : { ...animationConfig.animate, transition: { duration, delay } }
          }
          transition={{ duration, delay, ease: 'easeOut' }}
        >
          {children}
        </m.div>
      </LazyMotion>
    </div>
  );
}

// Hook para lazy loading de imágenes
export function useLazyImage(src: string, fallback?: string) {
  const [imageSrc, setImageSrc] = useState(fallback || '');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
    
    img.onerror = () => {
      setHasError(true);
      if (fallback) {
        setImageSrc(fallback);
        setIsLoaded(true);
      }
    };
    
    img.src = src;
  }, [src, fallback]);

  return { imageSrc, isLoaded, hasError };
}

// Componente para lazy loading de imágenes con placeholder
interface LazyImageProps {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
  placeholder?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function LazyImage({
  src,
  alt,
  fallback,
  className = '',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+',
  width,
  height,
  priority = false,
}: LazyImageProps) {
  const { imageSrc, isLoaded, hasError } = useLazyImage(src, fallback);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
          style={{ width, height }}
        >
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ width, height }}
        loading={priority ? 'eager' : 'lazy'}
        onError={() => {
          // El manejo de errores ya está en el hook useLazyImage
          // No necesitamos hacer nada aquí ya que el hook se encarga de cambiar a fallback
        }}
      />
    </div>
  );
}

