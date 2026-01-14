'use client';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { Award, Star, GraduationCap, ArrowRight, Crown, Award as Trophy, Zap } from 'lucide-react';
import HeroFeature from '../HeroFeature';
import ScrollIndicator from '../ScrollIndicator';

interface HeroPremiumProps {
  brandName: string;
  t: (k: string) => string;
  cta: () => void;
}

export default function HeroPremium({ brandName, t, cta }: HeroPremiumProps) {
  const features = [
    { icon: GraduationCap, title: t('bullet1'), desc: 'Mentores expertos certificados' },
    { icon: Award, title: t('bullet2'), desc: 'Proyectos empresariales reales' },
    { icon: Star, title: t('bullet3'), desc: 'Certificación internacional' },
  ];

  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Background premium con textura */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />

        {/* Textura de lujo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)`
          }} />
        </div>

        {/* Brillo dorado sutil */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Líneas decorativas */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">

          <LazyMotion features={domAnimation} strict>
            {/* Badge premium */}
            <m.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-8"
            >
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500/20 via-amber-500/20 to-yellow-500/20 backdrop-blur-sm border-2 border-yellow-500/40 rounded-full px-8 py-4 shadow-2xl shadow-yellow-500/20">
                <Crown className="h-5 w-5 text-yellow-400" />
                <span className="text-yellow-100 font-bold text-sm tracking-wider uppercase">
                  Experiencia Premium
                </span>
                <Trophy className="h-5 w-5 text-yellow-400" />
              </div>
            </m.div>

            {/* Título premium con efecto dorado */}
            <m.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight text-center"
            >
              <span className="block mb-2">Educación de</span>
              <span className="block bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl">
                Clase Mundial
              </span>
              <span className="block text-3xl md:text-5xl mt-4 text-white/80 font-medium">
                con {brandName}
              </span>
            </m.h1>

            {/* Subtítulo elegante */}
            <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/70 mb-10 max-w-3xl mx-auto leading-relaxed text-center font-light"
            >
              Únete a la élite de profesionales que han transformado su carrera.
              <br className="hidden md:block" />
              Formación exclusiva diseñada para líderes del mañana.
            </m.p>

            {/* CTAs premium */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16"
            >
              <button
                onClick={cta}
                className="group relative px-12 py-6 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-500 text-black font-bold text-lg rounded-2xl shadow-2xl shadow-yellow-500/40 hover:shadow-yellow-500/60 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Zap className="h-6 w-6" fill="currentColor" />
                  Acceso Inmediato
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={() => document.getElementById('cursos-en-vivo')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-12 py-6 border-2 border-white/50 text-white rounded-2xl font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
              >
                Explorar Programas Premium
              </button>
            </m.div>

            {/* Features premium */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <HeroFeature
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.desc}
                  index={index}
                  delay={0.8}
                />
              ))}
            </div>

            {/* Trust indicators premium */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-16 flex flex-wrap justify-center gap-8 items-center"
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-1">500+</div>
                <div className="text-white/60 text-sm">Profesionales Elite</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-1">98%</div>
                <div className="text-white/60 text-sm">Tasa de Éxito</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-1">4.9/5</div>
                <div className="text-white/60 text-sm">Calificación Premium</div>
              </div>
            </m.div>
          </LazyMotion>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
