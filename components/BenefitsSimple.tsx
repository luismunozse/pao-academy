'use client';
import {
  GraduationCap,
  Users,
  Globe,
  Award,
  CheckCircle
} from 'lucide-react';

export default function BenefitsSimple({ t }: { t: (k: string) => string }) {
  const benefits = [
    {
      icon: GraduationCap,
      title: 'Mentores expertos',
      desc: 'Aprende de profesionales que aplican lo que enseñan en empresas reales.',
      color: '#3B82F6'
    },
    {
      icon: Users,
      title: 'Acompañamiento personalizado',
      desc: 'Soporte humano real para resolver dudas y guiarte en tu proceso.',
      color: '#8B5CF6'
    },
    {
      icon: Globe,
      title: 'Comunidad internacional',
      desc: 'Conectá con mentores y alumnos de distintos países y sectores.',
      color: '#10B981'
    },
    {
      icon: Award,
      title: 'Certificaciones con impacto',
      desc: 'Sumá avales que fortalecen tu perfil y abren puertas laborales.',
      color: '#F59E0B'
    },
  ];

  const highlights = [
    'Clases dinámicas y aplicables al mundo real',
    'Proyectos prácticos con casos reales',
    'Acceso desde cualquier dispositivo',
    'Metodología ágil y flexible'
  ];

  return (
    <section style={{
      background: '#F8FAFC',
      padding: '5rem 1rem'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Two Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
          gap: '3rem',
          alignItems: 'center'
        }}>

          {/* Left Column - Image/Visual */}
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: '1.5rem',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
              position: 'relative'
            }}>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&auto=format&q=80"
                alt="Estudiantes colaborando en un ambiente de aprendizaje moderno"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  aspectRatio: '4/3',
                  objectFit: 'cover'
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              {/* Fallback */}
              <div style={{
                display: 'none',
                width: '100%',
                aspectRatio: '4/3',
                background: 'linear-gradient(135deg, #DBEAFE 0%, #E9D5FF 50%, #FEF3C7 100%)',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <GraduationCap size={80} color="#3B82F6" style={{ opacity: 0.6, margin: '0 auto 1rem' }} />
                  <p style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1E40AF', margin: 0 }}>
                    Tu futuro empieza aquí
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div style={{
              position: 'absolute',
              bottom: '-1rem',
              right: '-1rem',
              background: 'white',
              borderRadius: '1rem',
              padding: '1rem 1.5rem',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15)',
              border: '1px solid #E5E7EB'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Users size={24} color="white" />
                </div>
                <div>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#0F172A'
                  }}>
                    +5,000
                  </div>
                  <div style={{
                    fontSize: '0.875rem',
                    color: '#64748B'
                  }}>
                    Estudiantes activos
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div>
            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#DBEAFE',
                color: '#1E40AF',
                border: '1px solid #93C5FD',
                borderRadius: '9999px',
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                <Award size={16} />
                <span>Nuestra Diferencia</span>
              </div>

              <h2 style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                fontWeight: '700',
                color: '#0F172A',
                marginBottom: '1rem',
                lineHeight: '1.2'
              }}>
                ¿Por qué estudiar con{' '}
                <span style={{
                  background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  nosotros
                </span>?
              </h2>

              <p style={{
                fontSize: '1.125rem',
                color: '#475569',
                lineHeight: '1.7',
                margin: 0
              }}>
                Formación práctica con mentores expertos que te preparan para los
                desafíos reales del mercado laboral.
              </p>
            </div>

            {/* Benefits List */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'start',
                    gap: '1rem',
                    padding: '1rem',
                    background: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '0.75rem',
                    transition: 'all 0.3s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = benefit.color;
                    e.currentTarget.style.boxShadow = '0 4px 12px -2px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E5E7EB';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{
                    flexShrink: 0,
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: `${benefit.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <benefit.icon size={22} color={benefit.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: '#0F172A',
                      marginBottom: '0.25rem'
                    }}>
                      {benefit.title}
                    </h3>
                    <p style={{
                      fontSize: '0.875rem',
                      color: '#64748B',
                      lineHeight: '1.5',
                      margin: 0
                    }}>
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Highlights */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.75rem'
            }}>
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <CheckCircle size={18} color="#10B981" />
                  <span style={{
                    fontSize: '0.875rem',
                    color: '#475569'
                  }}>
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
