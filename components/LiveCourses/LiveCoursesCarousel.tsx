'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCarouselNavigation } from './hooks/useCarouselNavigation';
import LiveCourseCard from './LiveCourseCard';
import type { LiveCoursesCarouselProps } from './types';

export default function LiveCoursesCarousel({
  courses,
  onCourseClick,
  onTagClick,
  t,
  lang,
}: LiveCoursesCarouselProps) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const { currentSlide, nextSlide, prevSlide, setCurrentSlide } = useCarouselNavigation(courses.length);

  const handleCourseClick = (id: string, title: string) => {
    setExpandedCard(expandedCard === id ? null : id);
    onCourseClick(id, title);
  };

  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/60 text-lg">{t('noCoursesFound')}</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Card actual */}
      <div className="px-4">
        <LiveCourseCard
          course={courses[currentSlide]}
          isExpanded={expandedCard === courses[currentSlide].id}
          onCourseClick={handleCourseClick}
          onTagClick={onTagClick}
          t={t}
          lang={lang}
        />
      </div>

      {/* Navegación */}
      {courses.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-gradient-to-r from-[color:var(--academic-secondary)] to-[color:var(--academic-accent)] text-white shadow-lg hover:scale-110 transition-transform focus-visible:ring-2 focus-visible:ring-[color:var(--academic-accent)]"
            aria-label={t('previousCourse') || 'Curso anterior'}
          >
            <ChevronLeft className="h-5 w-5 mx-auto" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-gradient-to-r from-[color:var(--academic-secondary)] to-[color:var(--academic-accent)] text-white shadow-lg hover:scale-110 transition-transform focus-visible:ring-2 focus-visible:ring-[color:var(--academic-accent)]"
            aria-label={t('nextCourse') || 'Curso siguiente'}
          >
            <ChevronRight className="h-5 w-5 mx-auto" />
          </button>
        </>
      )}

      {/* Indicadores */}
      {courses.length > 1 && (
        <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Course indicators">
          {courses.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-gradient-to-r from-[color:var(--academic-secondary)] to-[color:var(--academic-accent)]'
                  : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
              role="tab"
              aria-selected={index === currentSlide}
              aria-label={`Ir al curso ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
