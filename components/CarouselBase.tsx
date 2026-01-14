'use client';
import { useState, useEffect, ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselBaseProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  itemsPerView?: {
    mobile: number;
    desktop: number;
  };
  showDots?: boolean;
  showNavButtons?: boolean;
  className?: string;
  navButtonClassName?: string;
  dotClassName?: string;
  ariaLabel?: string;
  ariaLabelPrev?: string;
  ariaLabelNext?: string;
}

export default function CarouselBase<T>({
  items,
  renderItem,
  autoPlay = false,
  autoPlayInterval = 5000,
  itemsPerView = { mobile: 1, desktop: 3 },
  showDots = true,
  showNavButtons = true,
  className = '',
  navButtonClassName = '',
  dotClassName = '',
  ariaLabel = 'Carrusel de contenido',
  ariaLabelPrev = 'Anterior',
  ariaLabelNext = 'Siguiente',
}: CarouselBaseProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar mobile/desktop
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentItemsPerView = isMobile ? itemsPerView.mobile : itemsPerView.desktop;
  const totalGroups = Math.ceil(items.length / currentItemsPerView);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex, currentItemsPerView]);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const nextIndex = prev + 1;
      if (isMobile) {
        return nextIndex % items.length;
      }
      return nextIndex + currentItemsPerView - 1 < items.length ? nextIndex : 0;
    });
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      if (isMobile) {
        return (prev - 1 + items.length) % items.length;
      }
      return prev >= currentItemsPerView
        ? prev - currentItemsPerView
        : Math.max(0, items.length - currentItemsPerView);
    });
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`relative ${className}`} role="region" aria-label={ariaLabel}>
      {/* Contenedor del carrusel */}
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: isMobile
              ? `translateX(-${currentIndex * 100}%)`
              : `translateX(-${currentIndex * (100 / currentItemsPerView)}%)`,
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={`flex-shrink-0 ${
                isMobile ? 'w-full px-3' : `w-1/${currentItemsPerView} px-4`
              }`}
              style={{
                width: isMobile ? '100%' : `${100 / currentItemsPerView}%`,
              }}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>

      {/* Botones de navegación */}
      {showNavButtons && (
        <>
          <button
            onClick={prevSlide}
            aria-label={ariaLabelPrev}
            className={`absolute left-2 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--academic-accent)] z-10 ${navButtonClassName}`}
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>
          <button
            onClick={nextSlide}
            aria-label={ariaLabelNext}
            className={`absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--academic-accent)] z-10 ${navButtonClassName}`}
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </button>
        </>
      )}

      {/* Indicadores (dots) */}
      {showDots && (
        <div
          className="flex justify-center mt-6 gap-2"
          role="tablist"
          aria-label="Indicadores de navegación"
        >
          {Array.from({ length: isMobile ? items.length : totalGroups }).map((_, index) => {
            const groupStart = isMobile ? index : index * currentItemsPerView;
            const isActive = isMobile
              ? currentIndex === index
              : currentIndex >= groupStart && currentIndex < groupStart + currentItemsPerView;

            return (
              <button
                key={index}
                onClick={() => goToSlide(isMobile ? index : groupStart)}
                role="tab"
                aria-selected={isActive}
                aria-label={`Ir al elemento ${index + 1}`}
                className={`w-2 h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--academic-accent)] ${
                  isActive
                    ? 'bg-[color:var(--academic-accent)] w-8'
                    : 'bg-white/30 hover:bg-white/50'
                } ${dotClassName}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
