'use client';
import React from 'react';
import { m } from 'framer-motion';
import { ChevronRight, TrendingUp, Users, Sparkles, Megaphone, BarChart4, Database, GraduationCap, BookOpen, Clock, Star, UserCheck, Play, ArrowRight, Shield, Target, Zap, Calendar, DollarSign, MapPin } from 'lucide-react';
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
      recommendations: ['branding', 'mindset'],
      price: '$89,900',
      originalPrice: '$119,900',
      modality: 'Online en vivo',
      duration: '6 semanas',
      nextStart: '15 de Marzo 2024',
      schedule: 'Martes y Jueves 19:00-21:00',
      level: 'Intermedio',
      students: 150,
      rating: 4.9,
    },
    {
      id: 'liderazgo',
      tag: 'Liderazgo',
      title: 'Liderazgo Ágil',
      description: 'Potenciá equipos de alto rendimiento con dinámicas ágiles, feedback constante y prácticas efectivas.',
      recommendations: ['ventas', 'mindset'],
      price: '$95,900',
      originalPrice: '$129,900',
      modality: 'Online en vivo',
      duration: '8 semanas',
      nextStart: '22 de Marzo 2024',
      schedule: 'Lunes y Miércoles 19:00-21:00',
      level: 'Avanzado',
      students: 120,
      rating: 4.8,
    },
    {
      id: 'mindset',
      tag: 'Mindset',
      title: 'Motivación y Hábitos',
      description: 'Diseñá rutinas y sistemas que sostengan tu productividad y eleven tu mentalidad a otro nivel.',
      recommendations: ['ventas', 'liderazgo'],
      price: '$69,900',
      originalPrice: '$99,900',
      modality: 'Online en vivo',
      duration: '4 semanas',
      nextStart: '18 de Marzo 2024',
      schedule: 'Sábados 10:00-12:00',
      level: 'Principiante',
      students: 200,
      rating: 4.9,
    },
    {
      id: 'branding',
      tag: 'Branding',
      title: 'Marca Personal',
      description: 'Construí tu narrativa, aumentá tu visibilidad y diferenciá tu perfil en el mercado profesional.',
      recommendations: ['ventas', 'powerbi'],
      price: '$79,900',
      originalPrice: '$109,900',
      modality: 'Online en vivo',
      duration: '5 semanas',
      nextStart: '20 de Marzo 2024',
      schedule: 'Miércoles y Viernes 19:00-21:00',
      level: 'Intermedio',
      students: 180,
      rating: 4.7,
    },
    {
      id: 'powerbi',
      tag: 'Datos',
      title: 'Power BI desde Cero',
      description: 'Transformá datos en decisiones con dashboards, métricas y reportes que generan impacto real.',
      recommendations: ['analytics', 'branding'],
      price: '$99,900',
      originalPrice: '$139,900',
      modality: 'Online en vivo',
      duration: '7 semanas',
      nextStart: '25 de Marzo 2024',
      schedule: 'Martes y Jueves 19:00-21:00',
      level: 'Principiante',
      students: 160,
      rating: 4.8,
    },
    {
      id: 'analytics',
      tag: 'Datos',
      title: 'Data Analytics Bootcamp',
      description: 'Domina SQL, ETL y métricas de negocio end-to-end para resolver problemas con analítica aplicada.',
      recommendations: ['powerbi', 'liderazgo'],
      price: '$119,900',
      originalPrice: '$159,900',
      modality: 'Online en vivo',
      duration: '10 semanas',
      nextStart: '28 de Marzo 2024',
      schedule: 'Lunes, Miércoles y Viernes 19:00-21:00',
      level: 'Intermedio',
      students: 90,
      rating: 4.9,
    },
  ],
  en: [
    {
      id: 'ventas',
      tag: 'Commercial',
      title: 'Consultative Sales',
      description: 'Learn to detect opportunities and close with modern prospecting and discovery techniques.',
      recommendations: ['branding', 'mindset'],
      price: '$89,900',
      originalPrice: '$119,900',
      modality: 'Live Online',
      duration: '6 weeks',
      nextStart: 'March 15, 2024',
      schedule: 'Tuesday & Thursday 7:00-9:00 PM',
      level: 'Intermediate',
      students: 150,
      rating: 4.9,
    },
    {
      id: 'liderazgo',
      tag: 'Leadership',
      title: 'Agile Leadership',
      description: 'Empower high-performance teams with agile dynamics, constant feedback and effective practices.',
      recommendations: ['ventas', 'mindset'],
      price: '$95,900',
      originalPrice: '$129,900',
      modality: 'Live Online',
      duration: '8 weeks',
      nextStart: 'March 22, 2024',
      schedule: 'Monday & Wednesday 7:00-9:00 PM',
      level: 'Advanced',
      students: 120,
      rating: 4.8,
    },
    {
      id: 'mindset',
      tag: 'Mindset',
      title: 'Motivation & Habits',
      description: 'Design routines and systems that sustain your productivity and elevate your mindset to another level.',
      recommendations: ['ventas', 'liderazgo'],
      price: '$69,900',
      originalPrice: '$99,900',
      modality: 'Live Online',
      duration: '4 weeks',
      nextStart: 'March 18, 2024',
      schedule: 'Saturdays 10:00 AM-12:00 PM',
      level: 'Beginner',
      students: 200,
      rating: 4.9,
    },
    {
      id: 'branding',
      tag: 'Branding',
      title: 'Personal Branding',
      description: 'Build your narrative, increase your visibility and differentiate your profile in the professional market.',
      recommendations: ['ventas', 'powerbi'],
      price: '$79,900',
      originalPrice: '$109,900',
      modality: 'Live Online',
      duration: '5 weeks',
      nextStart: 'March 20, 2024',
      schedule: 'Wednesday & Friday 7:00-9:00 PM',
      level: 'Intermediate',
      students: 180,
      rating: 4.7,
    },
    {
      id: 'powerbi',
      tag: 'Data',
      title: 'Power BI from Zero',
      description: 'Transform data into decisions with dashboards, metrics and reports that generate real impact.',
      recommendations: ['analytics', 'branding'],
      price: '$99,900',
      originalPrice: '$139,900',
      modality: 'Live Online',
      duration: '7 weeks',
      nextStart: 'March 25, 2024',
      schedule: 'Tuesday & Thursday 7:00-9:00 PM',
      level: 'Beginner',
      students: 160,
      rating: 4.8,
    },
    {
      id: 'analytics',
      tag: 'Data',
      title: 'Data Analytics Bootcamp',
      description: 'Master SQL, ETL and end-to-end business metrics to solve problems with applied analytics.',
      recommendations: ['powerbi', 'liderazgo'],
      price: '$119,900',
      originalPrice: '$159,900',
      modality: 'Live Online',
      duration: '10 weeks',
      nextStart: 'March 28, 2024',
      schedule: 'Monday, Wednesday & Friday 7:00-9:00 PM',
      level: 'Intermediate',
      students: 90,
      rating: 4.9,
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
      <div className="relative full-width-content py-16">
        {/* Título y subtítulo */}
        <div className="text-center mb-16">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[color:var(--academic-secondary)]/20 to-[color:var(--academic-accent)]/20 border border-[color:var(--academic-secondary)]/30 mb-8 backdrop-blur-sm"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[color:var(--academic-secondary)] to-[color:var(--academic-accent)] flex items-center justify-center">
              <GraduationCap className="size-4 text-white" />
            </div>
            <span className="text-base font-academic-heading text-white">
              Cursos en Vivo
            </span>
            <div className="w-3 h-3 bg-[color:var(--academic-accent)] rounded-full animate-pulse"></div>
          </m.div>
          
          <m.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-academic-heading text-white mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
          >
            {t('liveCoursesTitle')}
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/80 max-w-4xl mx-auto font-academic leading-relaxed"
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
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-6 py-3 rounded-full font-academic-heading transition-all duration-500 transform hover:scale-105 ${
                selectedTag === tag
                  ? 'bg-gradient-to-r from-[color:var(--academic-secondary)] to-[color:var(--academic-accent)] text-white shadow-lg shadow-[color:var(--academic-secondary)]/25'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white backdrop-blur-sm border border-white/20'
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
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
                className="course-card-academic group cursor-pointer relative overflow-hidden"
                onClick={() => handleCourseClick(course.id, course.title)}
              >
                {/* Background gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--academic-secondary)]/5 via-transparent to-[color:var(--academic-accent)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Header de la tarjeta */}
                <div className="relative z-10 flex items-start justify-between mb-6">
                  {/* Live indicator */}
                  <div className="absolute -top-2 -right-2 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg z-20">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    EN VIVO
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[color:var(--academic-secondary)]/20 to-[color:var(--academic-accent)]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                      <div className="text-[color:var(--academic-secondary)]">
                        {courseIcons[course.tag as keyof typeof courseIcons]}
                      </div>
                    </div>
                    <div>
                      <button
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-[color:var(--academic-secondary)]/20 to-[color:var(--academic-accent)]/20 text-[color:var(--academic-secondary)] text-xs font-academic-heading uppercase tracking-wider border border-[color:var(--academic-secondary)]/30 hover:scale-105 transition-transform duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTag(course.tag);
                        }}
                      >
                        {course.tag}
                      </button>
                      <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center gap-1">
                        <Star className="size-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-academic-heading text-white">{course.rating}</span>
                      </div>
                      <div className="w-1 h-1 bg-white/30 rounded-full"></div>
                      <span className="text-sm text-white/70 font-academic">{course.students}+ estudiantes</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-white/60 group-hover:text-[color:var(--academic-secondary)] transition-colors duration-300">
                    <Play className="size-4" />
                    <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>

                {/* Título del curso */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-academic-heading mb-4 group-hover:text-[color:var(--academic-secondary)] transition-colors text-white">
                    {course.title}
                  </h3>

                  {/* Descripción */}
                  <p className="text-white/80 mb-6 leading-relaxed font-academic">
                    {course.description}
                  </p>

                  {/* Course Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-2 text-white/70 bg-white/5 rounded-lg p-3">
                      <Clock className="size-4 text-[color:var(--academic-accent)]" />
                      <span className="text-sm font-academic">{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70 bg-white/5 rounded-lg p-3">
                      <UserCheck className="size-4 text-[color:var(--academic-accent)]" />
                      <span className="text-sm font-academic">{course.level}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70 bg-white/5 rounded-lg p-3">
                      <MapPin className="size-4 text-[color:var(--academic-accent)]" />
                      <span className="text-sm font-academic">{course.modality}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70 bg-white/5 rounded-lg p-3">
                      <Calendar className="size-4 text-[color:var(--academic-accent)]" />
                      <span className="text-sm font-academic">{course.nextStart}</span>
                    </div>
                  </div>

                  {/* Precio */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-[color:var(--academic-secondary)]/10 to-[color:var(--academic-accent)]/10 rounded-lg border border-[color:var(--academic-secondary)]/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <DollarSign className="size-4 text-[color:var(--academic-secondary)]" />
                          <span className="text-sm text-white/70 font-academic">Precio</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-white">{course.price}</span>
                          <span className="text-sm text-white/50 line-through">{course.originalPrice}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-white/70 font-academic">Próximo inicio</div>
                        <div className="text-sm font-semibold text-[color:var(--academic-secondary)]">{course.nextStart}</div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-white/60 font-academic">
                      Horario: {course.schedule}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="relative z-10 flex justify-center">
                  <button
                    className="btn-primary flex items-center justify-center gap-2 group px-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCourseClick(course.id, course.title);
                    }}
                  >
                    {t('wantToKnowMore')}
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

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
                            <div className="text-[color:var(--academic-secondary)]">
                              {courseIcons[recCourse.tag as keyof typeof courseIcons]}
                            </div>
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

      </div>
    </section>
  );
}
