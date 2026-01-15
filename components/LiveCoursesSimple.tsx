'use client';
import { useState, useMemo } from 'react';
import { ArrowRight, Calendar, Clock, Star, UserCheck, Award, Play, BookOpen, Building2, Users, TrendingUp, Target, BarChart } from 'lucide-react';
import { cursosBase } from '../lib/i18n';

type Props = {
  t: (k: string) => string;
  lang: 'es' | 'en';
  onCourseClick: (title: string) => void;
  onCatalogClick: () => void;
  onCorporateCTA?: () => void;
};

type TabType = 'live' | 'async' | 'corporate';

export default function LiveCoursesSimple({ t, lang, onCourseClick, onCatalogClick, onCorporateCTA }: Props) {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<TabType>('live');

  // Corporate Training data
  const corporateMetrics = [
    { number: '500+', label: 'Empresas capacitadas', icon: Building2, color: '#3B82F6' },
    { number: '15,000+', label: 'Profesionales formados', icon: Users, color: '#8B5CF6' },
    { number: '95%', label: 'Satisfacción promedio', icon: Star, color: '#F59E0B' },
    { number: '40%', label: 'Mejora promedio en KPIs', icon: TrendingUp, color: '#10B981' },
  ];

  const corporateBenefits = [
    { text: 'Diagnóstico inicial de necesidades', icon: Target },
    { text: 'Capacitación personalizada con mentores expertos', icon: Users },
    { text: 'Resultados medibles en el desempeño de los equipos', icon: BarChart },
  ];

  const successCases = [
    {
      company: 'TechCorp Argentina',
      industry: 'Tecnología',
      challenge: 'Mejorar liderazgo de equipos remotos',
      solution: 'Programa de Liderazgo Ágil',
      results: [
        { metric: '40%', label: 'aumento en productividad' },
        { metric: '85%', label: 'satisfacción del equipo' },
        { metric: '60%', label: 'reducción en rotación' }
      ],
      duration: '3 meses'
    },
    {
      company: 'RetailMax',
      industry: 'Retail',
      challenge: 'Capacitar equipos de ventas',
      solution: 'Ventas Consultivas + Power BI',
      results: [
        { metric: '35%', label: 'incremento en ventas' },
        { metric: '90%', label: 'adopción de herramientas' },
        { metric: '25%', label: 'mejora en KPIs' }
      ],
      duration: '4 meses'
    }
  ];

  // Async courses data - featured courses to display as cards
  const asyncCoursesData = useMemo(() => [
    {
      id: 'analisis-datos',
      tag: 'Análisis de Datos',
      image: '/analisis-datos.webp',
      es: { titulo: 'Análisis de Datos', duracion: 'A tu ritmo', modalidad: 'Grabado', inicio: 'Disponible ahora' },
      en: { titulo: 'Data Analysis', duracion: 'Self-paced', modalidad: 'Recorded', inicio: 'Available now' }
    },
    {
      id: 'negocios-finanzas',
      tag: 'Negocios y Finanzas',
      image: '/negocios-finanzas.webp',
      es: { titulo: 'Negocios y Finanzas', duracion: 'A tu ritmo', modalidad: 'Grabado', inicio: 'Disponible ahora' },
      en: { titulo: 'Business & Finance', duracion: 'Self-paced', modalidad: 'Recorded', inicio: 'Available now' }
    },
    {
      id: 'gestion-procesos',
      tag: 'Gestión de Procesos',
      image: '/gestion-procesos.webp',
      es: { titulo: 'Gestión de Procesos', duracion: 'A tu ritmo', modalidad: 'Grabado', inicio: 'Disponible ahora' },
      en: { titulo: 'Process Management', duracion: 'Self-paced', modalidad: 'Recorded', inicio: 'Available now' }
    },
    {
      id: 'desarrollo-personal',
      tag: 'Desarrollo Personal',
      image: '/desarrollo-personal.webp',
      es: { titulo: 'Desarrollo Personal', duracion: 'A tu ritmo', modalidad: 'Grabado', inicio: 'Disponible ahora' },
      en: { titulo: 'Personal Development', duracion: 'Self-paced', modalidad: 'Recorded', inicio: 'Available now' }
    },
    {
      id: 'tecnologia',
      tag: 'Tecnología',
      image: '/tecnologia.webp',
      es: { titulo: 'Tecnología', duracion: 'A tu ritmo', modalidad: 'Grabado', inicio: 'Disponible ahora' },
      en: { titulo: 'Technology', duracion: 'Self-paced', modalidad: 'Recorded', inicio: 'Available now' }
    },
    {
      id: 'marketing-digital',
      tag: 'Marketing Digital',
      image: '/marketing-digital.webp',
      es: { titulo: 'Marketing Digital', duracion: 'A tu ritmo', modalidad: 'Grabado', inicio: 'Disponible ahora' },
      en: { titulo: 'Digital Marketing', duracion: 'Self-paced', modalidad: 'Recorded', inicio: 'Available now' }
    },
  ], []);

  const asyncCourses = useMemo(() => {
    return asyncCoursesData.map((c) => {
      const data = c[lang as 'es' | 'en'];
      return {
        id: c.id,
        title: data.titulo,
        tag: c.tag,
        duration: data.duracion,
        level: 'Todos los niveles',
        nextStart: data.inicio,
        rating: 4.8,
        students: 180,
        image: c.image,
      };
    });
  }, [lang, asyncCoursesData]);

  const courses = useMemo(() => {
    return cursosBase.map((c) => {
      const data = c[lang as 'es' | 'en'];
      return {
        id: c.id,
        title: data.titulo,
        tag: c.tag,
        duration: data.duracion,
        level: 'Intermedio',
        nextStart: data.inicio,
        rating: 4.9,
        students: 250,
        image: c.image,
      };
    });
  }, [lang]);

  const tags = ['All', ...Array.from(new Set(courses.map((c) => c.tag)))];
  const filteredCourses = selectedTag === 'All' ? courses : courses.filter((c) => c.tag === selectedTag);

  const getCategoryColor = (tag: string) => {
    const colors: Record<string, string> = {
      // Live courses
      'Comercial': '#22C55E',
      'Liderazgo': '#8B5CF6',
      'Datos': '#3B82F6',
      'Mindset': '#F97316',
      'Branding': '#EAB308',
      // Async courses
      'Análisis de Datos': '#3B82F6',
      'Negocios y Finanzas': '#22C55E',
      'Gestión de Procesos': '#F97316',
      'Desarrollo Personal': '#EC4899',
      'Tecnología': '#6366F1',
      'Marketing Digital': '#EAB308',
    };
    return colors[tag] || '#3B82F6';
  };

  const getAsyncCategoryEmoji = (tag: string) => {
    const emojis: Record<string, string> = {
      'Análisis de Datos': '📊',
      'Negocios y Finanzas': '💰',
      'Gestión de Procesos': '⚙️',
      'Desarrollo Personal': '🎯',
      'Tecnología': '💻',
      'Marketing Digital': '📱',
    };
    return emojis[tag] || '📚';
  };

  return (
    <section style={{ background: 'white', padding: '4rem 1rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Tabs Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          {[
            { id: 'live' as TabType, label: 'Cursos en Vivo', icon: Play, color: '#EF4444' },
            { id: 'async' as TabType, label: 'Cursos Asincrónicos', icon: BookOpen, color: '#8B5CF6' },
            { id: 'corporate' as TabType, label: 'Corporate Training', icon: Building2, color: '#3B82F6' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSelectedTag('All');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                border: 'none',
                ...(activeTab === tab.id ? {
                  background: tab.color,
                  color: 'white',
                  boxShadow: `0 4px 14px ${tab.color}40`
                } : {
                  background: '#F1F5F9',
                  color: '#64748B'
                })
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.background = '#E2E8F0';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.background = '#F1F5F9';
                }
              }}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          {activeTab === 'live' && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#FEE2E2',
              color: '#991B1B',
              borderRadius: '9999px',
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1rem'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                background: '#EF4444',
                borderRadius: '50%',
                display: 'inline-block',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}></span>
              EN VIVO AHORA
            </div>
          )}

          {activeTab === 'async' && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#EDE9FE',
              color: '#5B21B6',
              borderRadius: '9999px',
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1rem'
            }}>
              <BookOpen size={16} />
              A TU RITMO
            </div>
          )}

          {activeTab === 'corporate' && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#DBEAFE',
              color: '#1E40AF',
              border: '1px solid #93C5FD',
              borderRadius: '9999px',
              padding: '0.5rem 1.5rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1rem'
            }}>
              <Building2 size={18} />
              <span>Formación Corporativa</span>
            </div>
          )}

          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '700',
            color: '#0F172A',
            marginBottom: '1rem'
          }}>
            {activeTab === 'live' && 'Programas en vivo que transforman tu carrera'}
            {activeTab === 'async' && 'Aprende a tu propio ritmo'}
            {activeTab === 'corporate' && (
              <>Formación a medida para <span style={{
                background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>empresas</span></>
            )}
          </h2>

          <p style={{
            fontSize: '1.125rem',
            color: '#475569',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            {activeTab === 'live' && 'Aprende junto a mentores que aplican lo que enseñan y llevá cada concepto directo a tu trabajo real.'}
            {activeTab === 'async' && 'Accede a contenido grabado de alta calidad, disponible 24/7 para que avances cuando quieras.'}
            {activeTab === 'corporate' && 'Programas in-company diseñados para potenciar a tus equipos en ventas, liderazgo, datos y más.'}
          </p>
        </div>

        {/* Filters - Only show for live courses */}
        {activeTab === 'live' && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '2.5rem'
          }}>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  ...(selectedTag === tag ? {
                    background: '#EF4444',
                    color: 'white',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.3)'
                  } : {
                    background: 'white',
                    color: '#374151',
                    border: '2px solid #E5E7EB'
                  })
                }}
              >
                {tag === 'All' ? 'Todos' : tag}
                {tag !== 'All' && ` (${courses.filter((c) => c.tag === tag).length})`}
              </button>
            ))}
          </div>
        )}

        {/* Async Courses - Card Grid */}
        {activeTab === 'async' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {asyncCourses.map((course) => (
            <div
              key={course.id}
              style={{
                background: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '1rem',
                overflow: 'hidden',
                transition: 'all 0.3s',
                cursor: 'pointer',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Color bar */}
              <div style={{
                height: '0.5rem',
                background: `linear-gradient(90deg, ${getCategoryColor(course.tag)}, ${getCategoryColor(course.tag)}dd)`
              }}></div>

              {/* Course image */}
              <div style={{
                height: '12rem',
                background: `linear-gradient(135deg, ${getCategoryColor(course.tag)}22, ${getCategoryColor(course.tag)}11)`,
                position: 'relative',
                overflow: 'hidden'
              }}>
                {course.image ? (
                  <img
                    src={course.image}
                    alt={course.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <BookOpen size={64} color={getCategoryColor(course.tag)} style={{ opacity: 0.3 }} />
                  </div>
                )}
                {/* Badge - Async/Recorded */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  background: '#8B5CF6',
                  color: 'white',
                  padding: '0.375rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}>
                  <Play size={12} />
                  GRABADO
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '1.5rem' }}>
                {/* Category tag */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  padding: '0.25rem 0.75rem',
                  background: `${getCategoryColor(course.tag)}22`,
                  color: getCategoryColor(course.tag),
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  marginBottom: '0.75rem'
                }}>
                  {getAsyncCategoryEmoji(course.tag)}
                  {' '}{course.tag}
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#0F172A',
                  marginBottom: '0.75rem',
                  lineHeight: '1.4'
                }}>
                  {course.title}
                </h3>

                {/* Meta info */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  fontSize: '0.875rem',
                  color: '#64748B',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={16} />
                    {course.duration}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <UserCheck size={16} />
                    {course.level}
                  </div>
                </div>

                {/* Rating */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="#FBBF24" color="#FBBF24" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0F172A' }}>
                    {course.rating}
                  </span>
                  <span style={{ fontSize: '0.875rem', color: '#64748B' }}>
                    ({course.students}+)
                  </span>
                </div>

                {/* Availability info */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  background: '#EDE9FE',
                  borderRadius: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <BookOpen size={16} color="#8B5CF6" />
                  <span style={{ fontSize: '0.875rem', color: '#5B21B6', fontWeight: '500' }}>
                    {course.nextStart}
                  </span>
                </div>

                {/* CTA */}
                <button
                  onClick={() => onCourseClick(course.title)}
                  style={{
                    width: '100%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: 'white',
                    background: '#8B5CF6',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#7C3AED';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#8B5CF6';
                  }}
                >
                  <span>Ver contenido</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
        )}

        {/* Course Cards Grid - Only for live courses */}
        {activeTab === 'live' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              style={{
                background: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '1rem',
                overflow: 'hidden',
                transition: 'all 0.3s',
                cursor: 'pointer',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Color bar */}
              <div style={{
                height: '0.5rem',
                background: `linear-gradient(90deg, ${getCategoryColor(course.tag)}, ${getCategoryColor(course.tag)}dd)`
              }}></div>

              {/* Course image */}
              <div style={{
                height: '12rem',
                background: `linear-gradient(135deg, ${getCategoryColor(course.tag)}22, ${getCategoryColor(course.tag)}11)`,
                position: 'relative',
                overflow: 'hidden'
              }}>
                {course.image ? (
                  <img
                    src={course.image}
                    alt={course.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Award size={64} color={getCategoryColor(course.tag)} style={{ opacity: 0.3 }} />
                  </div>
                )}
                {/* Badge - Live */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  background: '#EF4444',
                  color: 'white',
                  padding: '0.375rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}>
                  <span style={{
                    width: '6px',
                    height: '6px',
                    background: 'white',
                    borderRadius: '50%',
                    display: 'inline-block'
                  }}></span>
                  EN VIVO
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '1.5rem' }}>
                {/* Category tag */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  padding: '0.25rem 0.75rem',
                  background: `${getCategoryColor(course.tag)}22`,
                  color: getCategoryColor(course.tag),
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  marginBottom: '0.75rem'
                }}>
                  {course.tag === 'Datos' && '📊'}
                  {course.tag === 'Liderazgo' && '👥'}
                  {course.tag === 'Comercial' && '💼'}
                  {course.tag === 'Mindset' && '🧠'}
                  {course.tag === 'Branding' && '🎨'}
                  {' '}{course.tag}
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#0F172A',
                  marginBottom: '0.75rem',
                  lineHeight: '1.4'
                }}>
                  {course.title}
                </h3>

                {/* Meta info */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  fontSize: '0.875rem',
                  color: '#64748B',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={16} />
                    {course.duration}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <UserCheck size={16} />
                    {course.level}
                  </div>
                </div>

                {/* Rating */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="#FBBF24" color="#FBBF24" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0F172A' }}>
                    {course.rating}
                  </span>
                  <span style={{ fontSize: '0.875rem', color: '#64748B' }}>
                    ({course.students}+)
                  </span>
                </div>

                {/* Next start */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  background: '#EFF6FF',
                  borderRadius: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <Calendar size={16} color="#3B82F6" />
                  <span style={{ fontSize: '0.875rem', color: '#1E40AF', fontWeight: '500' }}>
                    Próximo inicio: {course.nextStart}
                  </span>
                </div>

                {/* CTA */}
                <button
                  onClick={() => onCourseClick(course.title)}
                  style={{
                    width: '100%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: 'white',
                    background: '#3B82F6',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#2563EB';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#3B82F6';
                  }}
                >
                  <span>Quiero saber más</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
        )}

        {/* Ver todos CTA - Only for live courses */}
        {activeTab === 'live' && (
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={onCatalogClick}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem 2rem',
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#0F172A',
              background: 'white',
              border: '2px solid #E5E7EB',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#EF4444';
              e.currentTarget.style.background = '#F9FAFB';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#E5E7EB';
              e.currentTarget.style.background = 'white';
            }}
          >
            <span>Ver todos los cursos</span>
            <ArrowRight size={20} />
          </button>
        </div>
        )}

        {/* Corporate Training Content */}
        {activeTab === 'corporate' && (
          <>
            {/* Metrics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              marginBottom: '3rem'
            }}>
              {corporateMetrics.map((metric, index) => (
                <div
                  key={index}
                  style={{
                    textAlign: 'center',
                    padding: '1.5rem',
                    background: '#F9FAFB',
                    border: '1px solid #E5E7EB',
                    borderRadius: '1rem',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.borderColor = metric.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = '#E5E7EB';
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    margin: '0 auto 0.75rem',
                    background: `${metric.color}22`,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <metric.icon size={24} color={metric.color} />
                  </div>
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: metric.color,
                    marginBottom: '0.25rem'
                  }}>
                    {metric.number}
                  </div>
                  <div style={{
                    fontSize: '0.875rem',
                    color: '#64748B'
                  }}>
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Content Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              {/* Benefits */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {corporateBenefits.map((benefit, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'start',
                      gap: '1rem',
                      padding: '1rem',
                      background: '#F9FAFB',
                      border: '1px solid #E5E7EB',
                      borderRadius: '0.75rem',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.borderColor = '#3B82F6';
                      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#F9FAFB';
                      e.currentTarget.style.borderColor = '#E5E7EB';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{
                      flexShrink: 0,
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)'
                    }}>
                      <benefit.icon size={20} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{
                        margin: 0,
                        fontSize: '0.9375rem',
                        fontWeight: '500',
                        color: '#0F172A',
                        lineHeight: '1.5'
                      }}>
                        {benefit.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Visual + CTA */}
              <div>
                <div style={{
                  width: '100%',
                  height: '280px',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  marginBottom: '1.5rem',
                  position: 'relative'
                }}>
                  <img
                    src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop&auto=format&q=80"
                    alt="Equipo de trabajo en capacitación corporativa"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div style={{
                    display: 'none',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #DBEAFE, #E9D5FF)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <Building2 size={64} color="#3B82F6" style={{ opacity: 0.5, margin: '0 auto 1rem' }} />
                      <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1E40AF', margin: 0 }}>
                        Formación Corporativa
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onCorporateCTA}
                  style={{
                    width: '100%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '1rem 2rem',
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: 'white',
                    background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                    border: 'none',
                    borderRadius: '0.75rem',
                    cursor: 'pointer',
                    boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(59, 130, 246, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(59, 130, 246, 0.3)';
                  }}
                >
                  <span>Habla con Ventas</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>

            {/* Success Cases */}
            <div>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#0F172A',
                textAlign: 'center',
                marginBottom: '2rem'
              }}>
                Casos de Éxito <span style={{
                  background: 'linear-gradient(90deg, #10B981, #059669)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>Reales</span>
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '1.5rem'
              }}>
                {successCases.map((case_, index) => (
                  <div
                    key={index}
                    style={{
                      background: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '1rem',
                      padding: '1.5rem',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#10B981';
                      e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(16, 185, 129, 0.2)';
                      e.currentTarget.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#E5E7EB';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                      marginBottom: '1rem'
                    }}>
                      <div>
                        <h4 style={{
                          fontSize: '1.125rem',
                          fontWeight: '700',
                          color: '#0F172A',
                          marginBottom: '0.25rem'
                        }}>
                          {case_.company}
                        </h4>
                        <p style={{
                          fontSize: '0.875rem',
                          color: '#64748B',
                          margin: 0
                        }}>
                          {case_.industry}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{
                          fontSize: '0.75rem',
                          color: '#64748B'
                        }}>
                          Duración
                        </div>
                        <div style={{
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          color: '#10B981'
                        }}>
                          {case_.duration}
                        </div>
                      </div>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{
                        fontSize: '0.875rem',
                        color: '#475569',
                        marginBottom: '0.5rem'
                      }}>
                        <strong style={{ color: '#0F172A' }}>Desafío:</strong> {case_.challenge}
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        color: '#475569'
                      }}>
                        <strong style={{ color: '#0F172A' }}>Solución:</strong> {case_.solution}
                      </div>
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '0.75rem'
                    }}>
                      {case_.results.map((result, resultIndex) => (
                        <div
                          key={resultIndex}
                          style={{
                            textAlign: 'center',
                            padding: '0.75rem',
                            background: '#F0FDF4',
                            border: '1px solid #BBF7D0',
                            borderRadius: '0.5rem'
                          }}
                        >
                          <div style={{
                            fontSize: '1.25rem',
                            fontWeight: '700',
                            color: '#10B981',
                            marginBottom: '0.25rem'
                          }}>
                            {result.metric}
                          </div>
                          <div style={{
                            fontSize: '0.75rem',
                            color: '#065F46',
                            lineHeight: '1.2'
                          }}>
                            {result.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}
