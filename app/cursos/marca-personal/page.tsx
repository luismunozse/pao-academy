'use client';
import React from 'react';
import { m } from 'framer-motion';
import { ArrowLeft, Clock, Users, Award, CheckCircle2, Star, Megaphone, TrendingUp, Sparkles, BarChart4 } from 'lucide-react';
import Link from 'next/link';
import { copy, type Lang } from '../../../lib/i18n';

export default function MarcaPersonalPage() {
  const [lang, setLang] = React.useState<Lang>('es');
  const t = (k: string) => copy[lang][k] || k;

  const courseData = {
    es: {
      title: 'Marca Personal',
      category: 'Branding',
      description: 'Construí tu narrativa, aumentá tu visibilidad y diferenciá tu perfil en el mercado profesional.',
      objectives: [
        'Desarrollar una narrativa personal sólida',
        'Aumentar la visibilidad profesional',
        'Diferenciarse en el mercado laboral'
      ],
      methodology: [
        'Clases en vivo con ejercicios prácticos',
        'Proyecto final: estrategia de marca personal',
        'Material complementario y templates descargables'
      ],
      duration: '4 semanas – 2 encuentros semanales en vivo',
      certification: 'Certificado de Glomind360 validando competencias de branding personal',
      testimonials: [
        {
          name: 'Belén D.',
          quote: 'El programa de Marca Personal nos dio posicionamiento y clientes inbound en semanas.',
          role: 'Consultora Independiente'
        },
        {
          name: 'Roberto M.',
          quote: 'Aprendí a comunicar mi valor profesional de manera efectiva. Ahora recibo 3x más propuestas de trabajo.',
          role: 'Desarrollador Senior, TechCorp'
        },
        {
          name: 'Laura C.',
          quote: 'Mi perfil de LinkedIn se transformó completamente. Ahora soy reconocida como experta en mi área.',
          role: 'Marketing Manager, DigitalFlow'
        }
      ],
      partners: ['DigitalFlow', 'TechCorp', 'BrandStudio'],
      recommendedCourses: [
        {
          id: 'ventas',
          title: 'Ventas Consultivas',
          description: 'Convierte tu marca en oportunidades comerciales',
          icon: <TrendingUp className="size-5" />
        },
        {
          id: 'powerbi',
          title: 'Power BI desde Cero',
          description: 'Visualiza el impacto de tu marca con datos',
          icon: <BarChart4 className="size-5" />
        },
        {
          id: 'mindset',
          title: 'Motivación y Hábitos',
          description: 'Mantén consistencia en tu marca personal',
          icon: <Sparkles className="size-5" />
        }
      ]
    },
    en: {
      title: 'Personal Branding',
      category: 'Branding',
      description: 'Build your narrative, increase your visibility and differentiate your profile in the professional market.',
      objectives: [
        'Develop a solid personal narrative',
        'Increase professional visibility',
        'Differentiate in the job market'
      ],
      methodology: [
        'Live classes with practical exercises',
        'Final project: personal brand strategy',
        'Complementary material and downloadable templates'
      ],
      duration: '4 weeks – 2 weekly live sessions',
      certification: 'Glomind360 certificate validating personal branding competencies',
      testimonials: [
        {
          name: 'Belén D.',
          quote: 'The Personal Branding program gave us positioning and inbound clients within weeks.',
          role: 'Independent Consultant'
        },
        {
          name: 'Roberto M.',
          quote: 'I learned to communicate my professional value effectively. Now I receive 3x more job proposals.',
          role: 'Senior Developer, TechCorp'
        },
        {
          name: 'Laura C.',
          quote: 'My LinkedIn profile was completely transformed. Now I am recognized as an expert in my area.',
          role: 'Marketing Manager, DigitalFlow'
        }
      ],
      partners: ['DigitalFlow', 'TechCorp', 'BrandStudio'],
      recommendedCourses: [
        {
          id: 'ventas',
          title: 'Consultative Sales',
          description: 'Convert your brand into commercial opportunities',
          icon: <TrendingUp className="size-5" />
        },
        {
          id: 'powerbi',
          title: 'Power BI from Zero',
          description: 'Visualize your brand impact with data',
          icon: <BarChart4 className="size-5" />
        },
        {
          id: 'mindset',
          title: 'Motivation & Habits',
          description: 'Maintain consistency in your personal brand',
          icon: <Sparkles className="size-5" />
        }
      ]
    }
  };

  const course = courseData[lang];

  return (
    <div className="min-h-screen bg-[color:var(--neon-bg)] text-white">
      {/* Header */}
      <header className="relative z-50">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="size-5" />
              <span>Volver al catálogo</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setLang('es')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  lang === 'es' 
                    ? 'bg-[color:var(--neon-cyan)] text-[color:var(--neon-bg)]' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                ES
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
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
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex-1">
              {/* Badge de categoría */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[color:var(--neon-cyan)]/20 border border-[color:var(--neon-cyan)]/30 mb-6">
                <Megaphone className="size-4" />
                <span className="text-sm font-semibold uppercase tracking-wider">{course.category}</span>
              </div>

              {/* Título */}
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {course.title}
              </h1>

              {/* Descripción */}
              <p className="text-xl text-white/80 mb-8 max-w-2xl">
                {course.description}
              </p>
            </div>

            {/* CTA Button */}
            <div className="lg:ml-8">
              <button className="btn-aqua text-xl px-8 py-4">
                {t('enrollNow')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Imagen principal */}
      <section className="mx-auto max-w-7xl px-6 mb-16">
        <div className="relative rounded-2xl overflow-hidden">
          <div className="aspect-[16/9] bg-gradient-to-br from-[color:var(--neon-blue)]/20 to-[color:var(--neon-cyan)]/20 flex items-center justify-center">
            <div className="text-center">
              <Megaphone className="size-24 text-[color:var(--neon-cyan)]/50 mx-auto mb-4" />
              <p className="text-white/60 text-lg">Profesionales construyendo su marca personal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Detalles del curso */}
      <section className="mx-auto max-w-7xl px-6 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
      <section className="mx-auto max-w-7xl px-6 mb-16">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Lo que dicen nuestros alumnos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
            {course.testimonials.map((testimonial, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-neon p-6"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white/90 mb-4 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-white/70">{testimonial.role}</p>
                </div>
              </m.div>
            ))}
          </div>
        </m.div>
      </section>

      {/* Partners */}
      <section className="mx-auto max-w-7xl px-6 mb-16">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-center mb-8">Empresas que confían en nosotros</h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {course.partners.map((partner, index) => (
              <div
                key={index}
                className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white transition-colors"
              >
                {partner}
              </div>
            ))}
          </div>
        </m.div>
      </section>

      {/* Cursos recomendados */}
      <section className="mx-auto max-w-7xl px-6 mb-16">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">{t('alsoInterested')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {course.recommendedCourses.map((recCourse, index) => (
              <m.div
                key={recCourse.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-neon p-6 group cursor-pointer hover:transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  {recCourse.icon}
                  <h3 className="text-lg font-semibold text-white group-hover:text-[color:var(--neon-cyan)] transition-colors">
                    {recCourse.title}
                  </h3>
                </div>
                <p className="text-white/80 mb-4">{recCourse.description}</p>
                <button className="btn-neon w-full">
                  {t('wantToKnowMore')}
                </button>
              </m.div>
            ))}
          </div>
        </m.div>
      </section>

      {/* CTA Final */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-6">¿Listo para construir tu marca personal?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Únete a cientos de profesionales que ya destacan en el mercado con su marca personal sólida.
          </p>
          <button className="btn-aqua text-xl px-12 py-4">
            {t('enrollNow')}
          </button>
        </m.div>
      </section>
    </div>
  );
}
