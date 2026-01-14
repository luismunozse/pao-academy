'use client';
import { useState, useMemo } from 'react';
import { m } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  Clock,
  Play,
  Star,
  UserCheck,
  Award,
  TrendingUp,
} from 'lucide-react';
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
  tipo: 'bootcamp' | 'carrera' | 'curso' | 'taller';
};

type Props = {
  t: (k: string) => string;
  lang: 'es' | 'en';
  onCourseClick: (title: string) => void;
  onCatalogClick: () => void;
  liveCourses?: LiveCourse[];
};

// Mapeo de categorías a colores Platzi-style
const categoryColors: Record<string, string> = {
  'Comercial': 'green',
  'Liderazgo': 'purple',
  'Datos': 'blue',
  'Mindset': 'orange',
  'Branding': 'yellow',
};

// Mapeo de tipos de curso a badges
const tipoBadgeClasses: Record<string, string> = {
  'bootcamp': 'badge-bootcamp',
  'carrera': 'badge-carrera',
  'curso': 'badge-curso',
  'taller': 'badge-taller',
};

export default function LiveCoursesModern({
  t,
  lang,
  onCourseClick,
  onCatalogClick,
  liveCourses,
}: Props) {
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const fallbackCourses: LiveCourse[] = useMemo(() => {
    return cursosBase.map((c) => {
      const data = c[lang as 'es' | 'en'];
      // Determinar tipo basado en el tag o título
      let tipo: 'bootcamp' | 'carrera' | 'curso' | 'taller' = 'curso';
      if (data.titulo.toLowerCase().includes('bootcamp')) tipo = 'bootcamp';
      else if (data.titulo.toLowerCase().includes('carrera')) tipo = 'carrera';
      else if (data.titulo.toLowerCase().includes('taller')) tipo = 'taller';

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
        students: 250,
        tipo,
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

  const getCategoryColor = (tag: string) => {
    return categoryColors[tag] || 'blue';
  };

  const getCategoryDataAttr = (tag: string) => {
    const colorMap: Record<string, string> = {
      'Comercial': 'sales',
      'Liderazgo': 'leadership',
      'Datos': 'data',
      'Mindset': 'marketing',
      'Branding': 'marketing',
    };
    return colorMap[tag] || 'tech';
  };

  return (
    <section id="cursos-en-vivo" className="section-modern-white">
      <div className="container-modern py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-red-100 text-red-700 rounded-full px-4 py-2 mb-4 text-sm font-semibold"
          >
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            {t('liveNow')}
          </m.div>

          <h2 className="text-modern-h2 mb-4">
            {t('liveCoursesTitle')}
          </h2>
          <p className="text-modern-large max-w-2xl mx-auto">
            {t('liveCoursesDesc')}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-600 hover:text-blue-600'
              }`}
            >
              {tag === 'All' ? t('all') : tag}
              {tag !== 'All' && (
                <span className="ml-1 text-xs opacity-70">
                  ({courses.filter((c) => c.tag === tag).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Course Cards Grid - Platzi/EducaciónIT Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <m.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`card-modern card-modern-category`}
              data-category={getCategoryDataAttr(course.tag)}
            >
              {/* Category badge en esquina superior */}
              <div className="absolute top-4 right-4 z-10">
                <span className={`badge-modern ${tipoBadgeClasses[course.tipo]}`}>
                  {course.tipo.charAt(0).toUpperCase() + course.tipo.slice(1)}
                </span>
              </div>

              {/* Imagen/Visual placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-${getCategoryColor(course.tag)}-400 to-${getCategoryColor(course.tag)}-600 flex items-center justify-center shadow-lg`}>
                  <Award className="w-8 h-8 text-white" />
                </div>
                {/* Live indicator */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                  EN VIVO
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category tag con emoji */}
                <div className={`inline-flex items-center gap-2 px-3 py-1 bg-${getCategoryColor(course.tag)}-100 text-${getCategoryColor(course.tag)}-700 rounded-full text-xs font-semibold mb-3`}>
                  {course.tag === 'Datos' && '📊'}
                  {course.tag === 'Liderazgo' && '👥'}
                  {course.tag === 'Comercial' && '💼'}
                  {course.tag === 'Mindset' && '🧠'}
                  {course.tag === 'Branding' && '🎨'}
                  {course.tag}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {course.title}
                </h3>

                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <UserCheck className="w-4 h-4" />
                    {course.level}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {course.rating}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({course.students}+)
                  </span>
                </div>

                {/* Next start */}
                <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg mb-4">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-900 font-medium">
                    Próximo inicio: {course.nextStart}
                  </span>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => onCourseClick(course.title)}
                  className="btn-modern-primary w-full group"
                >
                  <span>{t('wantToKnowMore')}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </m.div>
          ))}
        </div>

        {/* Ver todos los cursos CTA */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button
            onClick={onCatalogClick}
            className="btn-modern-outline btn-modern-lg group"
          >
            <span>Ver todos los cursos</span>
            <TrendingUp className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </m.div>
      </div>
    </section>
  );
}
