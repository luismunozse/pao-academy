'use client';
import { Quote, Star, Award, TrendingUp, Users, CheckCircle, Briefcase, Building2 } from 'lucide-react';

export default function SocialProofSimple({
  t,
  lang,
  testimonios,
  idx
}: {
  t: (k: string) => string;
  lang: 'es' | 'en';
  testimonios: any[];
  idx: number;
}) {
  const test = testimonios[idx][lang];

  const stats = [
    {
      icon: Users,
      value: '10,000+',
      label: 'Estudiantes graduados',
      color: '#22C55E'
    },
    {
      icon: Star,
      value: '4.9/5',
      label: 'Calificación promedio',
      color: '#F59E0B'
    },
    {
      icon: Briefcase,
      value: '95%',
      label: 'Consigue empleo',
      color: '#8B5CF6'
    },
    {
      icon: TrendingUp,
      value: '+40%',
      label: 'Aumento salarial',
      color: '#3B82F6'
    }
  ];

  const companies = [
    { name: 'TechStart', color: '#3B82F6' },
    { name: 'DataCorp', color: '#22C55E' },
    { name: 'RetailPro', color: '#EF4444' },
    { name: 'FinanceMax', color: '#8B5CF6' },
    { name: 'EduTech', color: '#F97316' }
  ];

  return (
    <section style={{
      background: '#F8FAFC',
      padding: '2rem 1rem 2rem'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
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
            <Award size={18} />
            <span>Testimonios Reales</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '700',
            color: '#0F172A',
            marginBottom: '1rem'
          }}>
            Lo que dicen nuestros{' '}
            <span style={{
              background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              estudiantes
            </span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {stats.map((stat, index) => (
            <div
              key={index}
              style={{
                background: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '1rem',
                padding: '1.5rem',
                textAlign: 'center',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = stat.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#E5E7EB';
              }}
            >
              <div style={{
                width: '56px',
                height: '56px',
                margin: '0 auto 1rem',
                background: `${stat.color}22`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <stat.icon size={28} color={stat.color} />
              </div>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: stat.color,
                marginBottom: '0.25rem'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: '#64748B'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonio Card */}
        <div style={{
          maxWidth: '900px',
          margin: '0 auto 3rem',
          background: 'white',
          border: '1px solid #E5E7EB',
          borderRadius: '1.5rem',
          padding: '3rem 2rem',
          position: 'relative',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          {/* Quote icon */}
          <div style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.2
          }}>
            <Quote size={24} color="white" />
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem'
          }}>
            {/* Avatar */}
            <img
              src={test.imagen}
              alt={test.autor}
              style={{
                width: '96px',
                height: '96px',
                borderRadius: '50%',
                border: '4px solid #DBEAFE',
                objectFit: 'cover'
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />

            {/* Stars */}
            <div style={{ display: 'flex', gap: '4px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="#FBBF24" color="#FBBF24" />
              ))}
            </div>

            {/* Quote */}
            <blockquote style={{
              fontSize: '1.25rem',
              color: '#0F172A',
              fontWeight: '500',
              lineHeight: '1.6',
              textAlign: 'center',
              fontStyle: 'italic',
              margin: 0
            }}>
              &ldquo;{test.frase}&rdquo;
            </blockquote>

            {/* Author info */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '1.125rem',
                fontWeight: '700',
                color: '#0F172A',
                marginBottom: '0.25rem'
              }}>
                {test.autor}
              </div>
              <div style={{
                fontSize: '0.9375rem',
                color: '#64748B'
              }}>
                {test.rol}
              </div>
            </div>

            {/* Progress dots */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              marginTop: '1rem'
            }}>
              {testimonios.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i === idx ? '32px' : '8px',
                    height: '8px',
                    borderRadius: '9999px',
                    background: i === idx ? '#3B82F6' : '#E5E7EB',
                    transition: 'all 0.3s'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Empresas que confían */}
        <div>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#64748B',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            Empresas que confían en nuestros graduados
          </h3>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1.5rem',
            alignItems: 'center'
          }}>
            {companies.map((company, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  background: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '0.75rem',
                  transition: 'all 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = company.color;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 4px 6px -1px ${company.color}33`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Building2 size={20} color={company.color} />
                <span style={{
                  fontSize: '0.9375rem',
                  fontWeight: '600',
                  color: '#0F172A'
                }}>
                  {company.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
