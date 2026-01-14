'use client';
import { useState, useMemo } from 'react';
import { m } from 'framer-motion';
import { useCourseFiltering } from './hooks/useCourseFiltering';
import { useResponsive } from './hooks/useResponsive';
import CourseFilters from './CourseFilters';
import LiveCoursesGrid from './LiveCoursesGrid';
import LiveCoursesCarousel from './LiveCoursesCarousel';
import { cursosBase } from '../../lib/i18n';
import type { LiveCourse, LiveCoursesProps } from './types';

export default function LiveCourses({
  t,
  lang,
  onCourseClick,
  onCatalogClick,
  liveCourses,
}: LiveCoursesProps) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const { isMobile } = useResponsive();

  // Fallback courses desde i18n
  const fallbackCourses: LiveCourse[] = useMemo(() => {
    return cursosBase.map((c) => {
      const data = c[lang];
      return {
        id: c.id,
        title: data.titulo,
        description: t('liveCoursesDesc'),
        tag: c.tag,
        duration: data.duracion,
        level: 'Intermedio',
        modality: data.modalidad,
        nextStart: data.inicio,
        rating: 4.9,
        students: 500,
      };
    });
  }, [lang, t]);

  const courses = liveCourses?.length ? liveCourses : fallbackCourses;
  const { selectedTag, setSelectedTag, tags, filteredCourses } = useCourseFiltering(courses);

  const handleCourseClick = (id: string, title: string) => {
    setExpandedCard((prev) => (prev === id ? null : id));
    onCourseClick(title);
  };

  return (
    <section id="cursos-en-vivo" className="section-academic-no-top">
      <div className="relative full-width-content pt-3 pb-2 md:pt-4 md:pb-2">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full px-6 py-3 mb-6">
            <span className="text-white font-semibold">{t('liveCourses')}</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('liveCoursesTitle') || 'Cursos en vivo'}{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              profesionales
            </span>
          </h2>

          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            {t('liveCoursesSubtitle') || 'Aprende con mentores expertos en tiempo real'}
          </p>
        </m.div>

        {/* Filtros */}
        <CourseFilters
          tags={tags}
          selectedTag={selectedTag}
          onTagChange={setSelectedTag}
          t={t}
        />

        {/* Grid o Carousel según dispositivo */}
        {isMobile ? (
          <LiveCoursesCarousel
            courses={filteredCourses}
            onCourseClick={handleCourseClick}
            onTagClick={setSelectedTag}
            t={t}
            lang={lang}
          />
        ) : (
          <LiveCoursesGrid
            courses={filteredCourses}
            onCourseClick={handleCourseClick}
            onTagClick={setSelectedTag}
            expandedCard={expandedCard}
            setExpandedCard={setExpandedCard}
            t={t}
            lang={lang}
          />
        )}

        {/* CTA Ver catálogo completo */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button
            onClick={onCatalogClick}
            className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 text-white font-semibold transition-all hover:scale-105"
          >
            {t('viewFullCatalog') || 'Ver catálogo completo'}
          </button>
        </m.div>
      </div>
    </section>
  );
}
