'use client';
import { Star, CheckCircle, ArrowRight, Play } from 'lucide-react';

export default function HeroSimple({
  brandName, t, cta
}:{ brandName:string; t:(k:string)=>string; cta:()=>void; }){

  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
        padding: '10rem 1rem 4rem',
        minHeight: '700px',
        marginTop: '0'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center' }}>

          {/* Trust Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: '#D1FAE5',
            color: '#065F46',
            borderRadius: '9999px',
            fontSize: '0.875rem',
            fontWeight: '600',
            marginBottom: '2rem'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              background: '#10B981',
              borderRadius: '50%',
              display: 'inline-block'
            }}></span>
            Únete a nuestra comunidad de aprendizaje
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.75rem)',
            fontWeight: '700',
            color: '#0F172A',
            marginBottom: '1.5rem',
            lineHeight: '1.2'
          }}>
            Aprende las habilidades que{' '}
            <span style={{
              background: 'linear-gradient(90deg, #3B82F6, #06B6D4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block'
            }}>
              demandan las empresas
            </span>
          </h1>

          {/* Description - Feature highlights */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '1.5rem',
            justifyContent: 'center',
            marginBottom: '2rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1.1rem',
              color: '#334155'
            }}>
              <span style={{ color: '#10B981', fontSize: '1.25rem' }}>✓</span>
              Cursos en vivo con mentores expertos
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1.1rem',
              color: '#334155'
            }}>
              <span style={{ color: '#10B981', fontSize: '1.25rem' }}>✓</span>
              Certificación válida en el mercado
            </div>
          </div>

          {/* CTAs */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            justifyContent: 'center',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            {/* Primary Button */}
            <button
              onClick={cta}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                color: 'white',
                background: '#22C55E',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                boxShadow: '0 10px 15px -3px rgba(34, 197, 94, 0.3)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#16A34A';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#22C55E';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>Inscribirme Ahora</span>
              <ArrowRight size={20} />
            </button>

            {/* Secondary Button */}
            <button
              onClick={() => {
                document.getElementById('cursos-en-vivo')?.scrollIntoView({ behavior: 'smooth' });
              }}
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
              <Play size={20} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
