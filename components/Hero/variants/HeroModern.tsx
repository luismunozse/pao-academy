'use client';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { Award, Star, GraduationCap, ArrowRight, Sparkles, TrendingUp, Users } from 'lucide-react';
import HeroBadge from '../HeroBadge';
import HeroFeature from '../HeroFeature';
import ScrollIndicator from '../ScrollIndicator';

interface HeroModernProps {
  brandName: string;
  t: (k: string) => string;
  cta: () => void;
}

export default function HeroModern({ brandName, t, cta }: HeroModernProps) {
  const features = [
    { icon: GraduationCap, title: t('bullet1'), desc: 'Mentores expertos' },
    { icon: Award, title: t('bullet2'), desc: 'Proyectos reales' },
    { icon: Star, title: t('bullet3'), desc: 'Certificación válida' },
  ];

  const stats = [
    { value: '500+', label: 'Estudiantes', icon: Users },
    { value: '95%', label: 'Satisfacción', icon: Star },
    { value: '4.8/5', label: 'Rating', icon: TrendingUp },
  ];

  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Background con gradiente animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-cyan-950" />

      {/* Orbes animados */}
      <div className="absolute inset-0 overflow-hidden">
        <m.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        />
        <m.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">

          <LazyMotion features={domAnimation} strict>
            {/* Badge con animación */}
            <m.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-8"
            >
              <HeroBadge
                text="🚀 Únete a más de 500 profesionales exitosos"
                variant="highlight"
              />
            </m.div>

            {/* Título principal con animación */}
            <m.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight text-center"
            >
              Transforma tu
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Carrera Profesional
              </span>
            </m.h1>

            {/* Subtítulo */}
            <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed text-center"
            >
              Formación práctica con mentores expertos. Proyectos reales que impulsan tu portfolio.
              Certificación que marca la diferencia.
            </m.p>

            {/* Stats mini */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-6 mb-10"
            >
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3"
                >
                  <stat.icon className="h-5 w-5 text-cyan-400" />
                  <span className="text-white font-bold">{stat.value}</span>
                  <span className="text-white/70 text-sm">{stat.label}</span>
                </div>
              ))}
            </m.div>

            {/* CTAs */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <button
                onClick={cta}
                className="group relative px-10 py-5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Comienza Ahora
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={() => document.getElementById('cursos-en-vivo')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 border-2 border-white/40 text-white rounded-2xl font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Explorar Cursos
              </button>
            </m.div>

            {/* Features mejoradas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <HeroFeature
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.desc}
                  index={index}
                  delay={1}
                />
              ))}
            </div>
          </LazyMotion>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
