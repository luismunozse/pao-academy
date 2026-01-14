'use client';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'white' | 'gray';
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

const sizeMap = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
};

const colorMap = {
  primary: 'text-[color:var(--academic-primary)]',
  secondary: 'text-[color:var(--academic-secondary)]',
  white: 'text-white',
  gray: 'text-gray-500',
};

/**
 * Componente de loading spinner unificado
 *
 * Características:
 * - Múltiples tamaños (sm, md, lg, xl)
 * - Variantes de color consistentes con design system
 * - Modo full screen con overlay
 * - Texto opcional
 *
 * @example
 * ```tsx
 * // Spinner simple
 * <LoadingSpinner />
 *
 * // Spinner con texto
 * <LoadingSpinner text="Cargando cursos..." />
 *
 * // Spinner full screen
 * <LoadingSpinner fullScreen text="Procesando..." />
 * ```
 */
export default function LoadingSpinner({
  size = 'md',
  variant = 'primary',
  text,
  fullScreen = false,
  className = '',
}: LoadingSpinnerProps) {
  const spinner = (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <Loader2 className={`animate-spin ${sizeMap[size]} ${colorMap[variant]}`} />
      {text && (
        <p className={`text-sm font-medium ${variant === 'white' ? 'text-white' : 'text-gray-600'}`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return spinner;
}

/**
 * Spinner en línea para botones
 */
export function ButtonSpinner({ className = '' }: { className?: string }) {
  return <Loader2 className={`h-4 w-4 animate-spin ${className}`} />;
}

/**
 * Spinner de dots (alternativa)
 */
export function DotsSpinner({
  variant = 'primary',
  className = '',
}: {
  variant?: 'primary' | 'secondary' | 'white';
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`h-2 w-2 rounded-full ${colorMap[variant]} animate-bounce`}
          style={{
            animationDelay: `${i * 0.15}s`,
            animationDuration: '0.6s',
          }}
        />
      ))}
    </div>
  );
}

/**
 * Skeleton loader para cards
 */
export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-t-lg" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded" />
          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-5/6" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton para lista
 */
export function SkeletonList({ count = 3, className = '' }: { count?: number; className?: string }) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse flex gap-4">
          <div className="h-12 w-12 bg-gray-200 dark:bg-gray-800 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
            <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Spinner circular personalizado (sin Lucide)
 */
export function CircleSpinner({
  size = 'md',
  variant = 'primary',
  className = '',
}: {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'white';
  className?: string;
}) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-3',
  };

  const colorClasses = {
    primary: 'border-[color:var(--academic-primary)] border-t-transparent',
    secondary: 'border-[color:var(--academic-secondary)] border-t-transparent',
    white: 'border-white border-t-transparent',
  };

  return (
    <div
      className={`rounded-full animate-spin ${sizeClasses[size]} ${colorClasses[variant]} ${className}`}
    />
  );
}
