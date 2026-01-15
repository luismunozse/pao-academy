'use client';
import { Building2, Users, Star, TrendingUp, Target, BarChart, CheckCircle, ArrowRight } from 'lucide-react';

export default function CorporateTrainingSimple({
  t,
  onClickCTA
}: {
  t: (k: string) => string;
  onClickCTA: () => void;
}) {
  const metrics = [
    { number: '500+', label: 'Empresas capacitadas', icon: Building2, color: '#3B82F6' },
    { number: '15,000+', label: 'Profesionales formados', icon: Users, color: '#8B5CF6' },
    { number: '95%', label: 'Satisfacción promedio', icon: Star, color: '#F59E0B' },
    { number: '40%', label: 'Mejora promedio en KPIs', icon: TrendingUp, color: '#10B981' },
  ];

  const benefits = [
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

  return (
    <section id="corporate-training" style={{
      background: 'white',
      padding: '4rem 1rem'
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
            <Building2 size={18} />
            <span>Formación Corporativa</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '700',
            color: '#0F172A',
            marginBottom: '1rem'
          }}>
            Formación a medida para <span style={{
              background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>empresas</span>
          </h2>

          <p style={{
            fontSize: '1.125rem',
            color: '#475569',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Programas in-company diseñados para potenciar a tus equipos en ventas, liderazgo, datos y más.
          </p>
        </div>

        {/* Metrics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {metrics.map((metric, index) => (
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
            {benefits.map((benefit, index) => (
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
              onClick={onClickCTA}
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
      </div>
    </section>
  );
}
