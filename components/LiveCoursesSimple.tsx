'use client';
import { useState, useMemo } from 'react';
import { ArrowRight, Calendar, Clock, Star, UserCheck, Award } from 'lucide-react';
import { cursosBase } from '../lib/i18n';

type Props = {
  t: (k: string) => string;
  lang: 'es' | 'en';
  onCourseClick: (title: string) => void;
  onCatalogClick: () => void;
};

export default function LiveCoursesSimple({ t, lang, onCourseClick, onCatalogClick }: Props) {
  const [selectedTag, setSelectedTag] = useState<string>('All');

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
      'Comercial': '#22C55E',
      'Liderazgo': '#8B5CF6',
      'Datos': '#3B82F6',
      'Mindset': '#F97316',
      'Branding': '#EAB308',
    };
    return colors[tag] || '#3B82F6';
  };

  return (
    <section style={{ background: 'white', padding: '4rem 1rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
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

          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '700',
            color: '#0F172A',
            marginBottom: '1rem'
          }}>
            Programas en vivo que transforman tu carrera
          </h2>

          <p style={{
            fontSize: '1.125rem',
            color: '#475569',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Aprende junto a mentores que aplican lo que enseñan y llevá cada concepto directo a tu trabajo real.
          </p>
        </div>

        {/* Filters */}
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
                  background: '#3B82F6',
                  color: 'white',
                  border: 'none',
                  boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)'
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

        {/* Course Cards Grid */}
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
                {/* Live badge */}
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

        {/* Ver todos CTA */}
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
              e.currentTarget.style.borderColor = '#3B82F6';
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
