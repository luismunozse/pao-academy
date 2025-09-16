'use client';
import React from 'react';
import { m } from 'framer-motion';
import { ArrowLeft, Clock, Users, Award, CheckCircle2, Star, Users as UsersIcon, Sparkles, Megaphone, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { copy, type Lang } from '../../../lib/i18n';

export default function LiderazgoAgilPage() {
  const [lang, setLang] = React.useState<Lang>('es');
  const t = (k: string) => copy[lang][k] || k;

  const courseData = {
    es: {
      title: 'Liderazgo Ágil',
      category: 'Liderazgo',
      description: 'Potenciá equipos de alto rendimiento con dinámicas ágiles, feedback constante y prácticas efectivas.',
      objectives: [
        'Formar equipos de alto rendimiento',
        'Aplicar metodologías ágiles en liderazgo',
        'Implementar feedback efectivo y continuo'
      ],
      methodology: [
        'Clases en vivo con dinámicas prácticas',
        'Simulaciones de equipos reales',
        'Material de apoyo y frameworks descargables'
      ],
      duration: '5 semanas – 2 encuentros semanales en vivo',
      certification: 'Certificado de Glomind360 validando competencias de liderazgo',
      testimonials: [
        {
          name: 'María L.',
          quote: 'Transformé mi equipo de 15 personas aplicando las técnicas de liderazgo ágil. Ahora somos 40% más productivos.',
          role: 'Gerente de Proyectos, TechStart'
        },
        {
          name: 'Carlos R.',
          quote: 'El programa me enseñó a liderar con propósito y crear culturas de alto rendimiento. Mis equipos están más motivados que nunca.',
          role: 'Director de Operaciones, InnovateCorp'
        },
        {
          name: 'Ana S.',
          quote: 'Las dinámicas ágiles revolucionaron la forma en que trabajo con mi equipo. Ahora tenemos reuniones efectivas y resultados medibles.',
          role: 'Líder de Equipo, DataFlow'
        }
      ],
      partners: ['TechStart', 'InnovateCorp', 'DataFlow'],
      recommendedCourses: [
        {
          id: 'ventas',
          title: 'Ventas Consultivas',
          description: 'Aplica liderazgo en equipos comerciales',
          icon: <TrendingUp className="size-5" />
        },
        {
          id: 'mindset',
          title: 'Motivación y Hábitos',
          description: 'Desarrolla tu inteligencia emocional como líder',
          icon: <Sparkles className="size-5" />
        },
        {
          id: 'analytics',
          title: 'Data Analytics Bootcamp',
          description: 'Lidera equipos basándote en datos',
          icon: <UsersIcon className="size-5" />
        }
      ]
    },
    en: {
      title: 'Agile Leadership',
      category: 'Leadership',
      description: 'Empower high-performance teams with agile dynamics, constant feedback and effective practices.',
      objectives: [
        'Form high-performance teams',
        'Apply agile methodologies in leadership',
        'Implement effective and continuous feedback'
      ],
      methodology: [
        'Live classes with practical dynamics',
        'Real team simulations',
        'Support material and downloadable frameworks'
      ],
      duration: '5 weeks – 2 weekly live sessions',
      certification: 'Glomind360 certificate validating leadership competencies',
      testimonials: [
        {
          name: 'María L.',
          quote: 'I transformed my team of 15 people by applying agile leadership techniques. Now we are 40% more productive.',
          role: 'Project Manager, TechStart'
        },
        {
          name: 'Carlos R.',
          quote: 'The program taught me to lead with purpose and create high-performance cultures. My teams are more motivated than ever.',
          role: 'Operations Director, InnovateCorp'
        },
        {
          name: 'Ana S.',
          quote: 'The agile dynamics revolutionized the way I work with my team. Now we have effective meetings and measurable results.',
          role: 'Team Leader, DataFlow'
        }
      ],
      partners: ['TechStart', 'InnovateCorp', 'DataFlow'],
      recommendedCourses: [
        {
          id: 'ventas',
          title: 'Consultative Sales',
          description: 'Apply leadership in commercial teams',
          icon: <TrendingUp className="size-5" />
        },
        {
          id: 'mindset',
          title: 'Motivation & Habits',
          description: 'Develop your emotional intelligence as a leader',
          icon: <Sparkles className="size-5" />
        },
        {
          id: 'analytics',
          title: 'Data Analytics Bootcamp',
          description: 'Lead teams based on data',
          icon: <UsersIcon className="size-5" />
        }
      ]
    }
  };

  const course = courseData[lang];

  return (
    <div className="min-h-screen bg-[color:var(--neon-bg)] text-white">
      {/* Header */}
      <header className="relative z-50 header-responsive">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm sm:text-base"
            >
              <ArrowLeft className="size-4 sm:size-5" />
              <span>Volver al catálogo</span>
            </Link>
            
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => setLang('es')}
                className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                  lang === 'es' 
                    ? 'bg-[color:var(--neon-cyan)] text-[color:var(--neon-bg)]' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                ES
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                  lang === 'en' 
                    ? 'bg-[color:var(--neon-cyan)] text-[color:var(--neon-bg)]' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative hero-responsive">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8">
            <div className="flex-1 w-full lg:w-auto">
              {/* Badge de categoría */}
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-[color:var(--neon-cyan)]/20 border border-[color:var(--neon-cyan)]/30 mb-4 sm:mb-6">
                <Users className="size-3 sm:size-4" />
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider">{course.category}</span>
              </div>

              {/* Título */}
              <h1 className="course-hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                {course.title}
              </h1>

              {/* Descripción */}
              <p className="course-hero-desc text-base sm:text-lg lg:text-xl text-white/80 mb-6 sm:mb-8 max-w-2xl">
                {course.description}
              </p>
            </div>

            {/* CTA Button */}
            <div className="w-full lg:w-auto lg:ml-8">
              <button className="btn-aqua btn-responsive-full text-lg sm:text-xl px-6 sm:px-8 py-3 sm:py-4">
                {t('enrollNow')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Imagen principal */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mb-12 sm:mb-16">
        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden image-responsive">
          <div className="aspect-[16/9] bg-gradient-to-br from-[color:var(--neon-blue)]/20 to-[color:var(--neon-cyan)]/20 flex items-center justify-center">
            <div className="text-center px-4">
              <Users className="size-16 sm:size-20 lg:size-24 text-[color:var(--neon-cyan)]/50 mx-auto mb-3 sm:mb-4" />
              <p className="text-white/60 text-sm sm:text-base lg:text-lg">Equipos trabajando en metodologías ágiles</p>
            </div>
          </div>
        </div>
      </section>

      {/* Detalles del curso */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mb-12 sm:mb-16 section-responsive">
        <div className="course-details-grid grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Columna izquierda */}
          <div className="space-y-8">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-4">Qué vas a lograr</h2>
              <ul className="space-y-3">
                {course.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-[color:var(--neon-cyan)] flex-shrink-0 mt-0.5" />
                    <span className="text-white/90">{objective}</span>
                  </li>
                ))}
              </ul>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-4">Metodología</h2>
              <ul className="space-y-3">
                {course.methodology.map((method, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-[color:var(--neon-cyan)] flex-shrink-0 mt-0.5" />
                    <span className="text-white/90">{method}</span>
                  </li>
                ))}
              </ul>
            </m.div>
          </div>

          {/* Columna derecha */}
          <div className="space-y-8">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-4">Duración</h2>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                <Clock className="size-6 text-[color:var(--neon-cyan)]" />
                <span className="text-white/90">{course.duration}</span>
              </div>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4">Certificación</h2>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                <Award className="size-6 text-[color:var(--neon-cyan)]" />
                <span className="text-white/90">{course.certification}</span>
              </div>
            </m.div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mb-12 sm:mb-16 section-responsive">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Lo que dicen nuestros alumnos</h2>
          <div className="course-testimonials-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
            {course.testimonials.map((testimonial, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-neon testimonial-responsive p-4 sm:p-6"
              >
                <div className="flex items-center gap-1 mb-3 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-3 sm:size-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white/90 mb-4 italic quote text-sm sm:text-base">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-white author text-sm sm:text-base">{testimonial.name}</p>
                  <p className="text-xs sm:text-sm text-white/70 role">{testimonial.role}</p>
                </div>
              </m.div>
            ))}
          </div>
        </m.div>
      </section>

      {/* Partners */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mb-12 sm:mb-16 section-responsive">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">Empresas que confían en nosotros</h2>
          <div className="course-partners-flex flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8">
            {course.partners.map((partner, index) => (
              <div
                key={index}
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white transition-colors text-sm sm:text-base"
              >
                {partner}
              </div>
            ))}
          </div>
        </m.div>
      </section>

      {/* Cursos recomendados */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mb-12 sm:mb-16 section-responsive">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">{t('alsoInterested')}</h2>
          <div className="course-recommendations-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {course.recommendedCourses.map((recCourse, index) => (
              <m.div
                key={recCourse.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-neon card-responsive p-4 sm:p-6 group cursor-pointer hover:transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  {recCourse.icon}
                  <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-[color:var(--neon-cyan)] transition-colors">
                    {recCourse.title}
                  </h3>
                </div>
                <p className="text-white/80 mb-4 text-sm sm:text-base">{recCourse.description}</p>
                <button className="btn-neon btn-responsive-full w-full text-sm sm:text-base">
                  {t('wantToKnowMore')}
                </button>
              </m.div>
            ))}
          </div>
        </m.div>
      </section>

      {/* CTA Final */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-12 sm:pb-16 section-responsive">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">¿Listo para liderar equipos de alto rendimiento?</h2>
          <p className="text-base sm:text-lg lg:text-xl text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Únete a cientos de líderes que ya aplican metodologías ágiles para potenciar sus equipos.
          </p>
          <button className="btn-aqua btn-responsive-full text-lg sm:text-xl px-8 sm:px-12 py-3 sm:py-4">
            {t('enrollNow')}
          </button>
        </m.div>
      </section>
    </div>
  );
}
