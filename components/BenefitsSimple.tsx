'use client';
import {
  Target,
  Award,
  Globe,
  Smartphone,
  GraduationCap,
  Briefcase,
  TrendingUp,
  Users,
  Zap,
  Shield
} from 'lucide-react';

export default function BenefitsSimple({ t }: { t: (k: string) => string }) {
  const benefits = [
    {
      icon: Target,
      title: 'Clases dinámicas y aplicables',
      desc: 'Aprendizaje conectado al mundo real y a tus desafíos profesionales.',
      emoji: '🎯',
      color: '#3B82F6'
    },
    {
      icon: Award,
      title: 'Certificaciones con impacto',
      desc: 'Sumá avales que fortalecen tu perfil y abren puertas laborales.',
      emoji: '📜',
      color: '#8B5CF6'
    },
    {
      icon: Globe,
      title: 'Comunidad internacional',
      desc: 'Conectá con mentores y alumnos de distintos países y sectores.',
      emoji: '🌍',
      color: '#10B981'
    },
    {
      icon: Smartphone,
      title: 'Acceso desde cualquier dispositivo',
      desc: 'Formate en vivo o a tu ritmo, desde donde quieras.',
      emoji: '📱',
      color: '#F59E0B'
    },
    {
      icon: GraduationCap,
      title: 'Mentores expertos en la industria',
      desc: 'Aprende de profesionales que aplican lo que enseñan en empresas reales.',
      emoji: '👨‍🏫',
      color: '#EF4444'
    },
    {
      icon: Briefcase,
      title: 'Proyectos aplicables a tu trabajo',
      desc: 'No solo teoría: trabajás con casos reales y salís con experiencia práctica.',
      emoji: '💼',
      color: '#06B6D4'
    },
    {
      icon: TrendingUp,
      title: 'Enfoque en empleabilidad',
      desc: 'Todo lo que aprendés está orientado a mejorar tu perfil y oportunidades laborales.',
      emoji: '🚀',
      color: '#8B5CF6'
    },
    {
      icon: Users,
      title: 'Acompañamiento personalizado',
      desc: 'Soporte humano real para resolver dudas y guiarte en tu proceso.',
      emoji: '🧑‍🤝‍🧑',
      color: '#22C55E'
    },
    {
      icon: Zap,
      title: 'Metodología ágil y flexible',
      desc: 'Estudiá en vivo, on-demand o en formato mixto, según tu disponibilidad.',
      emoji: '⚡',
      color: '#F97316'
    },
    {
      icon: Shield,
      title: 'Programas avalados por instituciones y empresas',
      desc: 'Reforzá tu credibilidad con formación reconocida.',
      emoji: '🏆',
      color: '#3B82F6'
    },
  ];

  return (
    <section style={{
      background: '#F8FAFC',
      padding: '4rem 1rem'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '700',
            color: '#0F172A',
            marginBottom: '1rem'
          }}>
            ¿Por qué estudiar con nosotros?
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#475569',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Descubrí las ventajas que hacen la diferencia en tu formación profesional
          </p>
        </div>

        {/* Benefits Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {benefits.map((benefit, index) => (
            <div
              key={index}
              style={{
                background: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '1rem',
                padding: '1.5rem',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = benefit.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#E5E7EB';
              }}
            >
              {/* Icon */}
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                background: `${benefit.color}22`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <benefit.icon size={28} color={benefit.color} />
              </div>

              {/* Emoji + Title */}
              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>
                  {benefit.emoji}
                </span>
                <h3 style={{
                  display: 'inline',
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  color: '#0F172A'
                }}>
                  {benefit.title}
                </h3>
              </div>

              {/* Description */}
              <p style={{
                fontSize: '0.875rem',
                color: '#64748B',
                lineHeight: '1.6',
                margin: 0
              }}>
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
