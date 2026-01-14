'use client';

import Link from 'next/link';
import { ArrowLeft, Target, Users, Award, Rocket, Heart, Globe, CheckCircle, Linkedin, GraduationCap, TrendingUp, Lightbulb } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { number: '10,000+', label: 'Profesionales formados' },
    { number: '95%', label: 'Tasa de satisfacción' },
    { number: '50+', label: 'Cursos disponibles' },
    { number: '15+', label: 'Países alcanzados' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Excelencia',
      description: 'Nos comprometemos con los más altos estándares de calidad en cada curso y material que desarrollamos.'
    },
    {
      icon: Heart,
      title: 'Pasión por enseñar',
      description: 'Creemos que la educación transforma vidas. Cada clase es una oportunidad para impactar positivamente.'
    },
    {
      icon: Users,
      title: 'Comunidad',
      description: 'Fomentamos conexiones entre profesionales que comparten la misma visión de crecimiento continuo.'
    },
    {
      icon: Lightbulb,
      title: 'Innovación',
      description: 'Actualizamos constantemente nuestros contenidos para reflejar las últimas tendencias del mercado.'
    },
  ];

  const team = [
    {
      name: 'María González',
      role: 'CEO & Fundadora',
      bio: '+15 años de experiencia en desarrollo organizacional y liderazgo empresarial.',
      image: null
    },
    {
      name: 'Carlos Rodríguez',
      role: 'Director Académico',
      bio: 'Especialista en diseño instruccional y metodologías de aprendizaje activo.',
      image: null
    },
    {
      name: 'Ana Martínez',
      role: 'Head of Sales Training',
      bio: 'Experta en ventas consultivas con track record en empresas Fortune 500.',
      image: null
    },
    {
      name: 'Diego López',
      role: 'Lead Data Instructor',
      bio: 'Data Scientist con experiencia en Google y startups tecnológicas.',
      image: null
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #E5E7EB',
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#64748B',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: 500
            }}
          >
            <ArrowLeft size={18} />
            <span>Volver al inicio</span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
        padding: '4rem 1.5rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            borderRadius: '1.5rem',
            background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
            marginBottom: '1.5rem',
            boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)'
          }}>
            <GraduationCap size={40} color="white" />
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            color: '#0F172A',
            marginBottom: '1rem',
            lineHeight: 1.2
          }}>
            Sobre Glomind360
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: '#475569',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Transformamos carreras profesionales a través de educación práctica,
            actualizada y orientada a resultados reales.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{
        maxWidth: '1100px',
        margin: '-3rem auto 0',
        padding: '0 1.5rem',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          background: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)',
          border: '1px solid #E5E7EB'
        }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {stat.number}
              </div>
              <div style={{ color: '#64748B', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Content */}
      <main style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '4rem 1.5rem'
      }}>

        {/* Mission & Vision */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{
              padding: '2rem',
              background: 'white',
              borderRadius: '1rem',
              border: '1px solid #E5E7EB',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #DBEAFE, #E0E7FF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <Target size={28} color="#3B82F6" />
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>
                Nuestra Misión
              </h2>
              <p style={{ color: '#475569', lineHeight: 1.7 }}>
                Democratizar el acceso a educación de alta calidad en habilidades profesionales
                demandadas por el mercado actual. Queremos que cada persona tenga las herramientas
                para alcanzar su máximo potencial profesional, sin importar su ubicación geográfica
                o situación económica.
              </p>
            </div>

            <div style={{
              padding: '2rem',
              background: 'white',
              borderRadius: '1rem',
              border: '1px solid #E5E7EB',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #DBEAFE, #E0E7FF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <Rocket size={28} color="#3B82F6" />
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>
                Nuestra Visión
              </h2>
              <p style={{ color: '#475569', lineHeight: 1.7 }}>
                Ser la plataforma líder en formación profesional en Latinoamérica, reconocida
                por la calidad de nuestros contenidos, la excelencia de nuestros instructores
                y el impacto medible en las carreras de nuestros estudiantes. Aspiramos a formar
                la próxima generación de líderes empresariales.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{
            padding: '2.5rem',
            background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
            borderRadius: '1.5rem',
            border: '1px solid #BFDBFE'
          }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0F172A', marginBottom: '1.5rem', textAlign: 'center' }}>
              Nuestra Historia
            </h2>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <p style={{ color: '#475569', lineHeight: 1.8, marginBottom: '1rem' }}>
                Glomind360 nació en 2020 de una observación simple pero poderosa: existe una brecha
                significativa entre lo que se enseña en la educación tradicional y lo que realmente
                demanda el mercado laboral actual.
              </p>
              <p style={{ color: '#475569', lineHeight: 1.8, marginBottom: '1rem' }}>
                Fundada por profesionales con amplia experiencia en el mundo corporativo, nuestra
                plataforma se construyó sobre un principio fundamental: <strong style={{ color: '#0F172A' }}>la educación
                debe ser práctica, actualizada y orientada a resultados medibles</strong>.
              </p>
              <p style={{ color: '#475569', lineHeight: 1.8 }}>
                Hoy, con más de 10,000 profesionales formados en 15 países, seguimos comprometidos
                con nuestra misión original: transformar carreras a través del conocimiento aplicado.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0F172A', marginBottom: '2rem', textAlign: 'center' }}>
            Nuestros Valores
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem'
          }}>
            {values.map((value, i) => (
              <div key={i} style={{
                padding: '1.5rem',
                background: 'white',
                borderRadius: '1rem',
                border: '1px solid #E5E7EB',
                transition: 'all 0.2s',
                cursor: 'default'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #DBEAFE, #E0E7FF)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}>
                  <value.icon size={24} color="#3B82F6" />
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0F172A', marginBottom: '0.5rem' }}>
                  {value.title}
                </h3>
                <p style={{ color: '#64748B', fontSize: '0.875rem', lineHeight: 1.6 }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* What Sets Us Apart */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0F172A', marginBottom: '2rem', textAlign: 'center' }}>
            ¿Por qué elegirnos?
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem'
          }}>
            {[
              { title: 'Instructores expertos', desc: 'Profesionales activos en la industria con experiencia real en empresas líderes.' },
              { title: 'Contenido actualizado', desc: 'Cursos revisados constantemente para reflejar las últimas tendencias y herramientas.' },
              { title: 'Aprendizaje práctico', desc: 'Proyectos reales, casos de estudio y ejercicios aplicables desde el día uno.' },
              { title: 'Comunidad activa', desc: 'Acceso a una red de profesionales y oportunidades de networking.' },
              { title: 'Certificaciones reconocidas', desc: 'Certificados que validan tus habilidades ante empleadores.' },
              { title: 'Soporte personalizado', desc: 'Acompañamiento continuo durante todo tu proceso de aprendizaje.' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                padding: '1rem',
                background: 'white',
                borderRadius: '12px',
                border: '1px solid #E5E7EB'
              }}>
                <div style={{
                  flexShrink: 0,
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#D1FAE5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <CheckCircle size={14} color="#10B981" />
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, color: '#0F172A', marginBottom: '0.25rem', fontSize: '0.938rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#64748B', fontSize: '0.813rem', lineHeight: 1.5 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem', textAlign: 'center' }}>
            Nuestro Equipo
          </h2>
          <p style={{ color: '#64748B', textAlign: 'center', marginBottom: '2rem' }}>
            Profesionales apasionados por la educación y el desarrollo de talento
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem'
          }}>
            {team.map((member, i) => (
              <div key={i} style={{
                padding: '1.5rem',
                background: 'white',
                borderRadius: '1rem',
                border: '1px solid #E5E7EB',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontSize: '1.5rem',
                  color: 'white',
                  fontWeight: 700
                }}>
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0F172A', marginBottom: '0.25rem' }}>
                  {member.name}
                </h3>
                <p style={{ color: '#3B82F6', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.75rem' }}>
                  {member.role}
                </p>
                <p style={{ color: '#64748B', fontSize: '0.813rem', lineHeight: 1.5 }}>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section>
          <div style={{
            padding: '3rem 2rem',
            background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
            borderRadius: '1.5rem',
            textAlign: 'center',
            boxShadow: '0 10px 40px -10px rgba(59, 130, 246, 0.4)'
          }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: '1rem' }}>
              ¿Listo para transformar tu carrera?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
              Únete a miles de profesionales que ya están avanzando en sus carreras con Glomind360.
            </p>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.875rem 2rem',
                background: 'white',
                color: '#3B82F6',
                borderRadius: '0.5rem',
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s'
              }}
            >
              Explorar cursos
              <TrendingUp size={18} />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          paddingTop: '3rem',
          marginTop: '2rem',
          borderTop: '1px solid #E5E7EB'
        }}>
          <p style={{ color: '#94A3B8', fontSize: '0.875rem' }}>
            © {new Date().getFullYear()} Glomind360. Todos los derechos reservados.
          </p>
        </div>
      </main>
    </div>
  );
}
