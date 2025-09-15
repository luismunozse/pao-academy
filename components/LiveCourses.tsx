'use client';
import React from 'react';
import { m } from 'framer-motion';
import { ChevronRight, TrendingUp, Users, Sparkles, Megaphone, BarChart4, Database, GraduationCap, BookOpen, Clock, Star, UserCheck, Play, ArrowRight, Shield, Target, Zap } from 'lucide-react';
import type { Lang } from '../lib/i18n';
import CategoryRecommendations from './CategoryRecommendations';

const courseIcons = {
  Comercial: <TrendingUp className="size-6" />,
  Liderazgo: <Users className="size-6" />,
  Mindset: <Sparkles className="size-6" />,
  Branding: <Megaphone className="size-6" />,
  Datos: <BarChart4 className="size-6" />,
  Productividad: <Database className="size-6" />,
};

const courseData = {
  es: [
    {
      id: 'ventas',
      tag: 'Comercial',
      title: 'Ventas Consultivas',
      description: 'Aprendé a detectar oportunidades y cerrar con técnicas modernas de prospección y discovery.',
      recommendations: ['branding', 'mindset'], // Marca Personal y Motivación y Hábitos
    },
    {
      id: 'liderazgo',
      tag: 'Liderazgo',
      title: 'Liderazgo Ágil',
      description: 'Potenciá equipos de alto rendimiento con dinámicas ágiles, feedback constante y prácticas efectivas.',
      recommendations: ['ventas', 'mindset'], // Ventas Consultivas y Motivación y Hábitos
    },
    {
      id: 'mindset',
      tag: 'Mindset',
      title: 'Motivación y Hábitos',
      description: 'Diseñá rutinas y sistemas que sostengan tu productividad y eleven tu mentalidad a otro nivel.',
      recommendations: ['ventas', 'liderazgo'], // Ventas Consultivas y Liderazgo Ágil
    },
    {
      id: 'branding',
      tag: 'Branding',
      title: 'Marca Personal',
      description: 'Construí tu narrativa, aumentá tu visibilidad y diferenciá tu perfil en el mercado profesional.',
      recommendations: ['ventas', 'powerbi'], // Ventas Consultivas y Power BI
    },
    {
      id: 'powerbi',
      tag: 'Datos',
      title: 'Power BI desde Cero',
      description: 'Transformá datos en decisiones con dashboards, métricas y reportes que generan impacto real.',
      recommendations: ['analytics', 'branding'], // Data Analytics Bootcamp y Marca Personal
    },
    {
      id: 'analytics',
      tag: 'Datos',
      title: 'Data Analytics Bootcamp',
      description: 'Domina SQL, ETL y métricas de negocio end-to-end para resolver problemas con analítica aplicada.',
      recommendations: ['powerbi', 'liderazgo'], // Power BI y Liderazgo Ágil
    },
  ],
  en: [
    {
      id: 'ventas',
      tag: 'Commercial',
      title: 'Consultative Sales',
      description: 'Learn to detect opportunities and close with modern prospecting and discovery techniques.',
      recommendations: ['branding', 'mindset'],
    },
    {
      id: 'liderazgo',
      tag: 'Leadership',
      title: 'Agile Leadership',
      description: 'Empower high-performance teams with agile dynamics, constant feedback and effective practices.',
      recommendations: ['ventas', 'mindset'],
    },
    {
      id: 'mindset',
      tag: 'Mindset',
      title: 'Motivation & Habits',
      description: 'Design routines and systems that sustain your productivity and elevate your mindset to another level.',
      recommendations: ['ventas', 'liderazgo'],
    },
    {
      id: 'branding',
      tag: 'Branding',
      title: 'Personal Branding',
      description: 'Build your narrative, increase your visibility and differentiate your profile in the professional market.',
      recommendations: ['ventas', 'powerbi'],
    },
    {
      id: 'powerbi',
      tag: 'Data',
      title: 'Power BI from Zero',
      description: 'Transform data into decisions with dashboards, metrics and reports that generate real impact.',
      recommendations: ['analytics', 'branding'],
    },
    {
      id: 'analytics',
      tag: 'Data',
      title: 'Data Analytics Bootcamp',
      description: 'Master SQL, ETL and end-to-end business metrics to solve problems with applied analytics.',
      recommendations: ['powerbi', 'liderazgo'],
    },
  ],
};

export type LiveCoursesProps = {
  t: (k: string) => string;
  lang: Lang;
  onCourseClick: (title: string) => void;
  onCatalogClick: () => void;
};

export default function LiveCourses({ t, lang, onCourseClick, onCatalogClick }: LiveCoursesProps) {
  const courses = courseData[lang];
  const tags = [t('all'), 'Comercial', 'Liderazgo', 'Mindset', 'Branding', 'Datos', 'Productividad'];
  const [selectedTag, setSelectedTag] = React.useState(t('all'));
  const [expandedCard, setExpandedCard] = React.useState<string | null>(null);

  const filteredCourses = courses.filter(course => 
    selectedTag === t('all') || course.tag === selectedTag
  );

  const getRecommendedCourses = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return [];
    return courses.filter(c => course.recommendations.includes(c.id));
  };

  const getCourseUrl = (courseId: string) => {
    const courseUrls: Record<string, string> = {
      'ventas': '/cursos/ventas-consultivas',
      'liderazgo': '/cursos/liderazgo-agil',
      'mindset': '/cursos/motivacion-habitos',
      'branding': '/cursos/marca-personal',
      'powerbi': '/cursos/power-bi-desde-cero',
      'analytics': '/cursos/data-analytics-bootcamp',
    };
    return courseUrls[courseId] || '#';
  };

  const handleCourseClick = (courseId: string, courseTitle: string) => {
    const url = getCourseUrl(courseId);
    if (url !== '#') {
      window.location.href = url;
    } else {
      onCourseClick(courseTitle);
    }
  };

  return (
    <section id="cursos-en-vivo" className="section-academic">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16">
        {/* Título y subtítulo */}
        <div className="text-center mb-16">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[color:var(--academic-secondary)]/20 border border-[color:var(--academic-secondary)]/30 mb-8"
          >
            <GraduationCap className="size-5 text-[color:var(--academic-secondary)]" />
            <span className="text-sm font-academic-heading text-[color:var(--academic-secondary)]">
              Cursos en Vivo
            </span>
          </m.div>
          
          <m.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-academic-heading text-white mb-6"
          >
            {t('liveCoursesTitle')}
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/80 max-w-3xl mx-auto font-academic"
          >
            {t('liveCoursesDesc')}
          </m.p>
        </div>

        {/* Filtros */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`badge-academic px-6 py-3 rounded-full font-academic-heading transition-all duration-300 ${
                selectedTag === tag
                  ? 'bg-[color:var(--academic-secondary)] text-white'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
              }`}
              aria-pressed={selectedTag === tag}
            >
              {tag}
            </button>
          ))}
        </m.div>

        {/* Grid de cursos */}
        <div className="grid-academic grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredCourses.map((course, index) => {
            const isExpanded = expandedCard === course.id;
            const recommendedCourses = getRecommendedCourses(course.id);
            
            return (
              <m.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="course-card-academic group cursor-pointer"
                onClick={() => handleCourseClick(course.id, course.title)}
              >
                {/* Header de la tarjeta */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-[color:var(--academic-secondary)]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {courseIcons[course.tag as keyof typeof courseIcons]}
                    </div>
                    <div>
                      <button
                        className="badge-academic text-xs font-academic-heading uppercase tracking-wider"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTag(course.tag);
                        }}
                      >
                        {course.tag}
                      </button>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="size-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-academic-heading text-white">4.9</span>
                        </div>
                        <div className="w-1 h-1 bg-white/30 rounded-full"></div>
                        <span className="text-sm text-white/70 font-academic">150+</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-white/60">
                    <Play className="size-4" />
                    <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>

                {/* Título del curso */}
                <h3 className="text-2xl font-academic-heading mb-4 group-hover:text-[color:var(--academic-secondary)] transition-colors text-white">
                  {course.title}
                </h3>

                {/* Descripción */}
                <p className="text-white/80 mb-6 leading-relaxed font-academic">
                  {course.description}
                </p>

                {/* Course Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-white/70">
                    <Clock className="size-4 text-[color:var(--academic-accent)]" />
                    <span className="text-sm font-academic">6 semanas</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <UserCheck className="size-4 text-[color:var(--academic-accent)]" />
                    <span className="text-sm font-academic">Intermedio</span>
                  </div>
                </div>

                {/* CTA */}
                <button
                  className="btn-academic-primary w-full flex items-center justify-center gap-2 group"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCourseClick(course.id, course.title);
                  }}
                >
                  {t('wantToKnowMore')}
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Sección de recomendaciones expandible */}
                {isExpanded && recommendedCourses.length > 0 && (
                  <m.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-white/10 pt-4 mt-4"
                  >
                    <h4 className="text-sm font-semibold text-[color:var(--neon-cyan)] mb-3">
                      {t('alsoInterested')}
                    </h4>
                    <div className="space-y-2">
                      {recommendedCourses.map((recCourse) => (
                        <button
                          key={recCourse.id}
                          className="recommendation-item w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCourseClick(recCourse.id, recCourse.title);
                          }}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {courseIcons[recCourse.tag as keyof typeof courseIcons]}
                            <span className="text-sm font-medium text-white">{recCourse.title}</span>
                          </div>
                          <p className="text-xs text-white/70 line-clamp-2">{recCourse.description}</p>
                        </button>
                      ))}
                    </div>
                  </m.div>
                )}
              </m.div>
            );
          })}
        </div>

        {/* Recomendaciones por categoría */}
        {selectedTag !== t('all') && (
          <CategoryRecommendations
            t={t}
            lang={lang}
            selectedCategory={selectedTag}
            onCourseClick={onCourseClick}
          />
        )}

        {/* CTA final */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="card-academic max-w-2xl mx-auto text-center">
            <GraduationCap className="size-12 text-[color:var(--academic-secondary)] mx-auto mb-4" />
            <h3 className="text-2xl font-academic-heading text-white mb-4">
              ¿Listo para transformar tu carrera?
            </h3>
            <p className="text-white/80 mb-6 font-academic">
              Únete a miles de profesionales que ya están desarrollando las habilidades del futuro.
            </p>
            <button 
              onClick={onCatalogClick}
              className="btn-academic-primary text-lg px-8 py-4 flex items-center gap-2 mx-auto group"
            >
              {t('seeFullCatalog')}
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </m.div>
      </div>
    </section>
  );
}
