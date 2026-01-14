'use client';
import { useState, useEffect, useMemo } from 'react';
import { m } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Star,
  UserCheck,
} from 'lucide-react';
import CategoryRecommendations from './CategoryRecommendations';
import { cursosBase } from '../lib/i18n';

type LiveCourse = {
  id: string;
  title: string;
  description: string;
  tag: string;
  duration: string;
  level: string;
  modality: string;
  nextStart: string;
  rating: number;
  students: number;
  image?: string;
};

type Props = {
  t: (k: string) => string;
  lang: 'es' | 'en';
  onCourseClick: (title: string) => void;
  onCatalogClick: () => void;
  liveCourses?: LiveCourse[];
};

export default function LiveCourses({
  t,
  lang,
  onCourseClick,
  onCatalogClick,
  liveCourses,
}: Props) {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fallbackCourses: LiveCourse[] = useMemo(() => {
    return cursosBase.map((c) => {
      const data = c[lang as 'es' | 'en'];
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
        image: c.image,
      };
    });
  }, [lang, t]);

  const courses = liveCourses && liveCourses.length ? liveCourses : fallbackCourses;

  const tags = useMemo(
    () => ['All', ...Array.from(new Set(courses.map((c) => c.tag)))],
    [courses]
  );

  const filteredCourses = useMemo(() => {
    if (selectedTag === 'All') return courses;
    return courses.filter((c) => c.tag === selectedTag);
  }, [courses, selectedTag]);

  const handleCourseClick = (id: string, title: string) => {
    setExpandedCard((prev) => (prev === id ? null : id));
    onCourseClick(title);
  };

  const handleRecommendedCourseClick = (title: string) => {
    onCourseClick(title);
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % filteredCourses.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + filteredCourses.length) % filteredCourses.length);

  // Keyboard navigation para el carrusel
  useEffect(() => {
    if (!isMobile || filteredCourses.length === 0) return;

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
  }, [isMobile, filteredCourses.length]);

  function renderCourseCard(course: LiveCourse) {
    const isExpanded = expandedCard === course.id;

    return (
      <m.div
        key={course.id}
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="course-card-academic group relative overflow-hidden flex flex-col cursor-pointer"
        onClick={() => handleCourseClick(course.id, course.title)}
      >
        {/* Imagen del curso */}
        {course.image && (
          <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-[color:var(--academic-secondary)] text-xs border border-white/20">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                {t('live')}
              </span>
              <button
                className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-semibold border border-white/20 hover:bg-black/70"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTag(course.tag);
                }}
                aria-label={`Filtrar por ${course.tag}`}
              >
                {course.tag}
              </button>
            </div>
            <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white text-sm">
              <Star className="size-4 text-yellow-400 fill-current" />
              <span className="font-semibold">{course.rating}</span>
              <span className="text-white/80">· {course.students}+ {t('students')}</span>
            </div>
          </div>
        )}

        <div className="p-5 md:p-6 flex flex-col gap-4 flex-1">
          <div className="relative z-10 flex flex-col gap-3 flex-1">
            <h3 className="text-xl font-academic-heading group-hover:text-[color:var(--academic-secondary)] transition-colors text-white">
              {course.title}
            </h3>

            <p className="text-white/80 text-sm leading-relaxed font-academic line-clamp-2">
              {course.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-1">
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/8 text-white/80 text-sm border border-white/10">
                <Clock className="size-4 text-[color:var(--academic-accent)]" />
                <span>{course.duration}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/8 text-white/80 text-sm border border-white/10">
                <UserCheck className="size-4 text-[color:var(--academic-accent)]" />
                <span>{course.level}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/8 text-white/80 text-sm border border-white/10">
                <Calendar className="size-4 text-[color:var(--academic-accent)]" />
                <span>{course.nextStart}</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-2">
            <button
              className="btn-primary flex items-center justify-center gap-2 group px-6 w-full h-11"
              onClick={(e) => {
                e.stopPropagation();
                handleCourseClick(course.id, course.title);
              }}
              aria-label={`${t('wantToKnowMore')} ${course.title}`}
            >
              <span>{t('wantToKnowMore')}</span>
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {isExpanded && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 mt-4 pt-4 border-t border-white/10"
            >
              <h4 className="text-base font-academic-heading text-white mb-3">
                {t('recommendedCourses')}
              </h4>
              <CategoryRecommendations
                selectedCategory={course.tag}
                onCourseClick={handleRecommendedCourseClick}
                t={t}
                lang={lang}
              />
            </m.div>
          )}
        </div>
      </m.div>
    );
  }

  return (
    <section id="cursos-en-vivo" className="section-academic-no-top">
      <div className="relative full-width-content pt-3 pb-2 md:pt-4 md:pb-2">
        <div className="text-center mb-3">
          <m.div
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[color:var(--academic-secondary)]/20 to-[color:var(--academic-accent)]/20 border border-[color:var(--academic-secondary)]/30 rounded-full px-3 py-1 mb-3 text-xs text-white"
          >
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-[color:var(--academic-secondary)] font-academic-heading uppercase tracking-wider">
              {t('liveNow')}
            </span>
          </m.div>

          <m.h2
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-3xl md:text-4xl font-academic-heading text-white mb-2"
          >
            {t('liveCoursesTitle')}
          </m.h2>

          <m.p
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-base md:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed"
          >
            {t('liveCoursesDesc')}
          </m.p>
        </div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6"
        >
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full font-academic text-sm transition-all duration-300 ${
                selectedTag === tag
                  ? 'bg-gradient-to-r from-[color:var(--academic-secondary)] to-[color:var(--academic-accent)] text-white shadow-lg scale-105'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/20'
              }`}
            >
              {tag}
            </button>
          ))}
        </m.div>

        {isMobile ? (
          <div className="relative mb-8">
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {filteredCourses.map((course) => (
                  <div key={course.id} className="w-full flex-shrink-0 px-3">
                    <div className="max-w-sm mx-auto">
                      {renderCourseCard(course)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 px-4">
              <button
                onClick={prevSlide}
                aria-label={t('previousCourse') || 'Curso anterior'}
                className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--academic-accent)]"
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </button>
              <div className="flex gap-2" role="tablist" aria-label="Indicadores de curso">
                {filteredCourses.map((course, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    role="tab"
                    aria-selected={index === currentSlide}
                    aria-label={`Ir a ${course.title}`}
                    className={`w-2 h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--academic-accent)] ${
                      index === currentSlide
                        ? 'bg-[color:var(--academic-accent)] w-8'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                aria-label={t('nextCourse') || 'Siguiente curso'}
                className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--academic-accent)]"
              >
                <ChevronRight className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {filteredCourses.map((course) => renderCourseCard(course))}
          </div>
        )}

        <div className="text-center">
          <m.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            onClick={onCatalogClick}
            className="btn-secondary group"
            aria-label={t('viewAllCourses')}
          >
            <span>{t('viewAllCourses')}</span>
            <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform duration-300" />
          </m.button>
        </div>
      </div>
    </section>
  );
}
