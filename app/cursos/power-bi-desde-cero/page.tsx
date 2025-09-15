'use client';
import React from 'react';
import { m } from 'framer-motion';
import { ArrowLeft, Clock, Users, Award, CheckCircle2, Star, BarChart4, Database, Megaphone, Users as UsersIcon } from 'lucide-react';
import Link from 'next/link';
import { copy, type Lang } from '../../../lib/i18n';

export default function PowerBIDesdeCeroPage() {
  const [lang, setLang] = React.useState<Lang>('es');
  const t = (k: string) => copy[lang][k] || k;

  const courseData = {
    es: {
      title: 'Power BI desde Cero',
      category: 'Datos',
      description: 'Transformá datos en decisiones con dashboards, métricas y reportes que generan impacto real.',
      objectives: [
        'Crear dashboards interactivos desde cero',
        'Dominar DAX y modelado de datos',
        'Automatizar reportes y métricas de negocio'
      ],
      methodology: [
        'Clases en vivo con ejercicios prácticos',
        'Proyecto final: dashboard completo',
        'Material complementario y datasets reales'
      ],
      duration: '6 semanas – 2 encuentros semanales en vivo',
      certification: 'Certificado de Glomind360 validando competencias en Power BI',
      testimonials: [
        {
          name: 'Julián C.',
          quote: 'La ruta de Power BI nos permitió estandarizar reportes y tomar decisiones en tiempo real.',
          role: 'Gerente de Operaciones, LogiSur'
        },
        {
          name: 'María F.',
          quote: 'Aprendí a crear dashboards que realmente impactan en la toma de decisiones. Ahora soy la referente en datos de mi empresa.',
          role: 'Analista de Datos, RetailCorp'
        },
        {
          name: 'Diego L.',
          quote: 'El curso me dio las herramientas para automatizar todos mis reportes. Ahorro 10 horas semanales.',
          role: 'Business Analyst, TechStart'
        }
      ],
      partners: ['LogiSur', 'RetailCorp', 'TechStart'],
      recommendedCourses: [
        {
          id: 'analytics',
          title: 'Data Analytics Bootcamp',
          description: 'Evoluciona tus habilidades analíticas',
          icon: <Database className="size-5" />
        },
        {
          id: 'branding',
          title: 'Marca Personal',
          description: 'Visualiza el impacto de tu marca con datos',
          icon: <Megaphone className="size-5" />
        },
        {
          id: 'liderazgo',
          title: 'Liderazgo Ágil',
          description: 'Aplica datos en la toma de decisiones',
          icon: <UsersIcon className="size-5" />
        }
      ]
    },
    en: {
      title: 'Power BI from Zero',
      category: 'Data',
      description: 'Transform data into decisions with dashboards, metrics and reports that generate real impact.',
      objectives: [
        'Create interactive dashboards from scratch',
        'Master DAX and data modeling',
        'Automate reports and business metrics'
      ],
      methodology: [
        'Live classes with practical exercises',
        'Final project: complete dashboard',
        'Complementary material and real datasets'
      ],
      duration: '6 weeks – 2 weekly live sessions',
      certification: 'Glomind360 certificate validating Power BI competencies',
      testimonials: [
        {
          name: 'Julián C.',
          quote: 'The Power BI path helped us standardize reports and make real-time decisions.',
          role: 'Operations Manager, LogiSur'
        },
        {
          name: 'María F.',
          quote: 'I learned to create dashboards that really impact decision making. Now I am the data reference in my company.',
          role: 'Data Analyst, RetailCorp'
        },
        {
          name: 'Diego L.',
          quote: 'The course gave me the tools to automate all my reports. I save 10 hours per week.',
          role: 'Business Analyst, TechStart'
        }
      ],
      partners: ['LogiSur', 'RetailCorp', 'TechStart'],
      recommendedCourses: [
        {
          id: 'analytics',
          title: 'Data Analytics Bootcamp',
          description: 'Evolve your analytical skills',
          icon: <Database className="size-5" />
        },
        {
          id: 'branding',
          title: 'Personal Branding',
          description: 'Visualize your brand impact with data',
          icon: <Megaphone className="size-5" />
        },
        {
          id: 'liderazgo',
          title: 'Agile Leadership',
          description: 'Apply data in decision making',
          icon: <UsersIcon className="size-5" />
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
                <BarChart4 className="size-4" />
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
              <BarChart4 className="size-24 text-[color:var(--neon-cyan)]/50 mx-auto mb-4" />
              <p className="text-white/60 text-lg">Dashboards interactivos en Power BI</p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <p className="text-white/90 mb-4 italic">"{testimonial.quote}"</p>
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
          <h2 className="text-3xl font-bold mb-6">¿Listo para dominar Power BI?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Únete a cientos de profesionales que ya transforman datos en decisiones con Power BI.
          </p>
          <button className="btn-aqua text-xl px-12 py-4">
            {t('enrollNow')}
          </button>
        </m.div>
      </section>
    </div>
  );
}
