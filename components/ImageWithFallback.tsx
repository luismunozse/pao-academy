'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageWithFallbackProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  onError?: () => void;
  onLoad?: () => void;
}

/**
 * Componente de imagen con fallback automático
 *
 * Características:
 * - Fallback automático cuando la imagen no carga
 * - Soporte para Next.js Image optimization
 * - Loading states opcionales
 * - Callback events para tracking
 *
 * @example
 * ```tsx
 * <ImageWithFallback
 *   src="/course-image.jpg"
 *   fallbackSrc="/placeholder.jpg"
 *   alt="Curso de React"
 *   width={400}
 *   height={300}
 *   className="rounded-lg"
 * />
 * ```
 */
export default function ImageWithFallback({
  src,
  fallbackSrc = '/placeholder.jpg',
  alt,
  width,
  height,
  className = '',
  fill = false,
  priority = false,
  sizes,
  objectFit = 'cover',
  onError,
  onLoad,
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Reset cuando cambia el src
  useEffect(() => {
    setImgSrc(src);
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
      onError?.();
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  // Versión con fill
  if (fill) {
    return (
      <div className={`relative ${className}`}>
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse rounded" />
        )}
        <Image
          src={imgSrc}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-${objectFit} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onError={handleError}
          onLoad={handleLoad}
        />
      </div>
    );
  }

  // Versión con width/height
  if (width && height) {
    return (
      <div className={`relative ${className}`} style={{ width, height }}>
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse rounded" />
        )}
        <Image
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className={`object-${objectFit} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onError={handleError}
          onLoad={handleLoad}
        />
      </div>
    );
  }

  // Fallback a img estándar si no se proveen dimensiones
  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse rounded" />
      )}
      <img
        src={imgSrc}
        alt={alt}
        className={`w-full h-full object-${objectFit} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  );
}

/**
 * Variante con gradiente de placeholder
 */
export function ImageWithGradientFallback({
  src,
  alt,
  gradientFrom = 'from-blue-500/20',
  gradientTo = 'to-purple-500/20',
  className = '',
  ...props
}: ImageWithFallbackProps & {
  gradientFrom?: string;
  gradientTo?: string;
}) {
  return (
    <ImageWithFallback
      src={src}
      fallbackSrc=""
      alt={alt}
      className={className}
      onError={() => {
        // Mostrar gradiente en lugar de imagen
      }}
      {...props}
    />
  );
}

/**
 * Variante con avatar/iniciales
 */
export function AvatarWithFallback({
  src,
  alt,
  initials,
  className = '',
  ...props
}: ImageWithFallbackProps & {
  initials?: string;
}) {
  const [showInitials, setShowInitials] = useState(false);

  if (showInitials && initials) {
    return (
      <div className={`bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center ${className}`}>
        <span className="text-white font-bold text-2xl">{initials}</span>
      </div>
    );
  }

  return (
    <ImageWithFallback
      src={src}
      alt={alt}
      className={className}
      onError={() => setShowInitials(true)}
      {...props}
    />
  );
}
