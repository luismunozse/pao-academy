'use client';
import React, { useState, useEffect } from 'react';
import { m } from 'framer-motion';
import { ChevronRight, TrendingUp, Users, Sparkles, Megaphone, BarChart4, Database, GraduationCap, BookOpen, Clock, Star, UserCheck, Play, ArrowRight, Shield, Target, Zap, Calendar, MapPin, ChevronLeft } from 'lucide-react';
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
      nextStart: '15 de Marzo 2026',
      schedule: 'Martes y Jueves 19:00-21:00',
      level: 'Intermedio',
      students: 150,
      rating: 4.9,
    },
    {
      id: 'liderazgo',
      tag: 'Liderazgo',
      title: 'Liderazgo Ágil y Equipos de Alto Rendimiento',
      description: 'Desarrollá habilidades para liderar equipos dinámicos y fomentar la innovación en entornos cambiantes.',
      recommendations: ['ventas', 'mindset'],
      price: '$95,900',
      originalPrice: '$129,900',
      modality: 'Online en vivo',
      duration: '8 semanas',
      nextStart: '22 de Marzo 2026',
      schedule: 'Lunes y Miércoles 19:00-21:00',
      level: 'Avanzado',
      students: 120,
      rating: 4.8,
    },
    {
      id: 'marca-personal',
      tag: 'Branding',
      title: 'Marca Personal y Networking Estratégico',
      description: 'Construí una marca personal sólida y aprendé a generar conexiones valiosas para tu crecimiento profesional.',
      recommendations: ['ventas', 'liderazgo'],
      price: '$69,900',
      originalPrice: '$99,900',
      modality: 'Online en vivo',
      duration: '4 semanas',
      nextStart: '18 de Marzo 2026',
      schedule: 'Sábados 10:00-12:00',
      level: 'Principiante',
      students: 200,
      rating: 4.9,
    },
    {
      id: 'power-bi',
      tag: 'Datos',
      title: 'Power BI desde Cero a Experto',
      description: 'Dominá la herramienta de análisis de datos más demandada y creá dashboards impactantes.',
      recommendations: ['ventas', 'powerbi'],
      price: '$79,900',
      originalPrice: '$109,900',
      modality: 'Online en vivo',
      duration: '5 semanas',
      nextStart: '20 de Marzo 2026',
      schedule: 'Miércoles y Viernes 19:00-21:00',
      level: 'Intermedio',
      students: 180,
      rating: 4.7,
    },
    {
      id: 'mindset',
      tag: 'Mindset',
      title: 'Mindset Emprendedor y Productividad',
      description: 'Desarrollá una mentalidad de crecimiento y aprendé técnicas para maximizar tu productividad personal y profesional.',
      recommendations: ['analytics', 'branding'],
      price: '$99,900',
      originalPrice: '$139,900',
      modality: 'Online en vivo',
      duration: '7 semanas',
      nextStart: '25 de Marzo 2026',
      schedule: 'Martes y Jueves 19:00-21:00',
      level: 'Principiante',
      students: 160,
      rating: 4.8,
    },
    {
      id: 'analytics',
      tag: 'Datos',
      title: 'Analytics Avanzado con Python y SQL',
      description: 'Profundizá en el análisis de datos con herramientas potentes y técnicas avanzadas para la toma de decisiones.',
      recommendations: ['powerbi', 'liderazgo'],
      price: '$119,900',
      originalPrice: '$159,900',
      modality: 'Online en vivo',
      duration: '10 semanas',
      nextStart: '28 de Marzo 2026',
      schedule: 'Lunes, Miércoles y Viernes 19:00-21:00',
      level: 'Intermedio',
      students: 90,
      rating: 4.9,
    },
  ],
  en: [
    {
      id: 'sales',
      tag: 'Commercial',
      title: 'Consultative Sales',
      description: 'Learn to identify opportunities and close deals with modern prospecting and discovery techniques.',
      recommendations: ['branding', 'mindset'],
      price: '$89,900',
      originalPrice: '$119,900',
      modality: 'Live Online',
      duration: '6 weeks',
      nextStart: 'March 15, 2026',
      schedule: 'Tuesday & Thursday 7:00-9:00 PM',
      level: 'Intermediate',
      students: 150,
      rating: 4.9,
    },
    {
      id: 'leadership',
      tag: 'Leadership',
      title: 'Agile Leadership & High-Performance Teams',
      description: 'Develop skills to lead dynamic teams and foster innovation in changing environments.',
      recommendations: ['ventas', 'mindset'],
      price: '$95,900',
      originalPrice: '$129,900',
      modality: 'Live Online',
      duration: '8 weeks',
      nextStart: 'March 22, 2026',
      schedule: 'Monday & Wednesday 7:00-9:00 PM',
      level: 'Advanced',
      students: 120,
      rating: 4.8,
    },
    {
      id: 'personal-brand',
      tag: 'Branding',
      title: 'Personal Branding & Strategic Networking',
      description: 'Build a strong personal brand and learn to generate valuable connections for your professional growth.',
      recommendations: ['ventas', 'liderazgo'],
      price: '$69,900',
      originalPrice: '$99,900',
      modality: 'Live Online',
      duration: '4 weeks',
      nextStart: 'March 18, 2026',
      schedule: 'Saturdays 10:00 AM-12:00 PM',
      level: 'Beginner',
      students: 200,
      rating: 4.9,
    },
    {
      id: 'power-bi',
      tag: 'Data',
      title: 'Power BI from Zero to Expert',
      description: 'Master the most in-demand data analysis tool and create impactful dashboards.',
      recommendations: ['ventas', 'powerbi'],
      price: '$79,900',
      originalPrice: '$109,900',
      modality: 'Live Online',
      duration: '5 weeks',
      nextStart: 'March 20, 2026',
      schedule: 'Wednesday & Friday 7:00-9:00 PM',
      level: 'Intermediate',
      students: 180,
      rating: 4.7,
    },
    {
      id: 'mindset',
      tag: 'Mindset',
      title: 'Entrepreneurial Mindset & Productivity',
      description: 'Develop a growth mindset and learn techniques to maximize your personal and professional productivity.',
      recommendations: ['analytics', 'branding'],
      price: '$99,900',
      originalPrice: '$139,900',
      modality: 'Live Online',
      duration: '7 weeks',
      nextStart: 'March 25, 2026',
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
      nextStart: 'March 28, 2026',
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
  const tags = [t('all'), t('commercial'), t('leadership'), t('mindset'), t('branding'), t('data'), t('productivity')];
  const [selectedTag, setSelectedTag] = React.useState(t('all'));
  const [expandedCard, setExpandedCard] = React.useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const filteredCourses = courses.filter(course => 
    selectedTag === t('all') || course.tag === selectedTag
  );

  // Detectar si es mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-rotación del carrusel en mobile
  useEffect(() => {
    if (!isMobile) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % filteredCourses.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isMobile, filteredCourses.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredCourses.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + filteredCourses.length) % filteredCourses.length);
  };

  const getRecommendedCourses = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return [];
    return courses.filter(c => course.recommendations.includes(c.id));
  };

  const getCourseUrl = (courseId: string) => {
    // Por ahora todas las páginas de cursos redirigen al inicio
    return '#';
  };

  const handleCourseClick = (courseId: string, courseTitle: string) => {
    if (expandedCard === courseId) {
      setExpandedCard(null);
    } else {
      setExpandedCard(courseId);
    }
    onCourseClick(courseTitle);
  };

  const handleRecommendedCourseClick = (courseTitle: string) => {
    onCourseClick(courseTitle);
  };

  // Función para renderizar una tarjeta de curso
  function renderCourseCard(course: any, index: number) {
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
{t('live')}
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
              <span className="text-sm text-white/70 font-academic">{course.students}+ {t('students')}</span>
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
            <span>{t('wantToKnowMore')}</span>
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Expanded content */}
        {isExpanded && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 mt-6 pt-6 border-t border-white/10"
          >
            <div className="mb-6">
              <h4 className="text-lg font-academic-heading text-white mb-4">
                {t('recommendedCourses')}
              </h4>
              <CategoryRecommendations
                selectedCategory={course.tag}
                onCourseClick={handleRecommendedCourseClick}
                t={t}
                lang={lang}
              />
            </div>
          </m.div>
        )}
      </m.div>
    );
  }

  return (
    <section id="cursos-en-vivo" className="section-academic-no-top">
      <div className="relative full-width-content pt-8 pb-4 md:pt-12 md:pb-6">
        {/* Título y subtítulo */}
        <div className="text-center mb-8">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[color:var(--academic-secondary)]/20 to-[color:var(--academic-accent)]/20 border border-[color:var(--academic-secondary)]/30 rounded-full px-6 py-3 mb-6"
          >
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-[color:var(--academic-secondary)] font-academic-heading text-sm uppercase tracking-wider">
              {t('liveNow')}
            </span>
          </m.div>
          
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-academic-heading text-white mb-4"
          >
            {t('liveCoursesTitle')}
          </m.h2>
          
          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
          >
            {t('liveCoursesDesc')}
          </m.p>
        </div>

        {/* Filtros de categorías */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-6 py-3 rounded-full font-academic transition-all duration-300 ${
                selectedTag === tag
                  ? 'bg-gradient-to-r from-[color:var(--academic-secondary)] to-[color:var(--academic-accent)] text-white shadow-lg scale-105'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/20'
              }`}
            >
              {tag}
            </button>
          ))}
        </m.div>

        {/* Grid de cursos - Desktop / Carrusel - Mobile */}
        {isMobile ? (
          <div className="relative mb-16">
            {/* Carrusel container */}
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {filteredCourses.map((course, index) => (
                  <div key={course.id} className="w-full flex-shrink-0 px-4">
                    <div className="max-w-sm mx-auto">
                      {renderCourseCard(course, index)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navegación del carrusel */}
            <div className="flex items-center justify-between mt-6 px-4">
              <button
                onClick={prevSlide}
                className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300"
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </button>
              
              {/* Dots indicator */}
              <div className="flex gap-2">
                {filteredCourses.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-[color:var(--academic-accent)] w-8' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextSlide}
                className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300"
              >
                <ChevronRight className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid-academic grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredCourses.map((course, index) => {
              return renderCourseCard(course, index);
            })}
          </div>
        )}

        {/* CTA final */}
        <div className="text-center">
          <m.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            onClick={onCatalogClick}
            className="btn-secondary group"
          >
            <span>{t('viewAllCourses')}</span>
            <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform duration-300" />
          </m.button>
        </div>
      </div>
    </section>
  );
}