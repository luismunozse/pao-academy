'use client';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import { Award, Star, GraduationCap, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function HeroFixed({
  brandName, t, cta
}:{ brandName:string; t:(k:string)=>string; cta:()=>void; }){
  
  const features = [
    { icon: GraduationCap, title: t('bullet1'), desc: 'Mentores expertos' },
    { icon: Award,         title: t('bullet2'), desc: 'Proyectos reales' },
    { icon: Star,          title: t('bullet3'), desc: 'Certificación válida' },
  ];

  return (
    <section id="inicio" className="hero-wrap overflow-hidden">
      {/* Imagen de fondo optimizada con WebP */}
      <div className="hero-bg-desktop absolute inset-0">
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet="/hero-mobile.webp"
            type="image/webp"
          />
          <source
            srcSet="/hero.webp"
            type="image/webp"
          />
          <Image
            src="/hero.jpg"
            alt="GLOMIND360 - Formación profesional"
            fill
            priority
            quality={85}
            className="object-cover brightness-[0.3] saturate-[0.8]"
            sizes="100vw"
          />
        </picture>
      </div>
      
      {/* Overlay sutil - Colores neutros */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-gray-900/60 to-slate-800/70"></div>

      <div className="relative z-10 container mx-auto px-4 pt-32 pb-12 md:pt-36 md:pb-20">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Badge de confianza con pulsing ring y glow */}
          <div className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 backdrop-blur-md border border-blue-400/30 shadow-lg shadow-blue-500/20 mb-6 overflow-hidden">
            {/* Pulsing ring */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400 shadow-lg shadow-yellow-400/50"></span>
            </span>

            <Star className="h-4 w-4 text-yellow-400 animate-pulse" />
            <span className="text-white/90 text-sm font-semibold">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent font-bold">+500</span>
              {' '}profesionales ya transformaron su carrera
            </span>

            {/* Shimmer effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>

          {/* Título principal */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
            Formación práctica que acelera tu carrera
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mt-1">
              con {brandName}
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="text-xl md:text-2xl text-white/80 mb-6 max-w-3xl mx-auto leading-relaxed">
            Desarrollá habilidades reales, aplicá lo que aprendés y destacate en el mercado laboral. Clases en vivo con mentores expertos y proyectos que suman a tu portfolio.
          </p>

          {/* CTAs principales con shimmer effects */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            {/* Primary CTA - Con shimmer y glow */}
            <button
              onClick={cta}
              className="group/btn relative overflow-hidden px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

              <span className="relative flex items-center gap-2">
                Inscríbete Ahora
                <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
              </span>
            </button>

            {/* Secondary CTA - Con glassmorphism */}
            <button
              onClick={() => {
                document.getElementById('cursos-en-vivo')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group/sec relative overflow-hidden px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/30 hover:border-white/50 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-white/10"
            >
              {/* Subtle shimmer */}
              <div className="absolute inset-0 -translate-x-full group-hover/sec:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

              <span className="relative">Ver cursos disponibles</span>
            </button>
          </div>

          {/* Features con glassmorphism premium y 3D hover */}
          <LazyMotion features={domAnimation} strict>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                  className="group/feat relative overflow-hidden bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 rounded-xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: '1000px'
                  }}
                >
                  {/* Gradient overlay animado */}
                  <div className="absolute inset-0 opacity-0 group-hover/feat:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 rounded-xl"></div>

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover/feat:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                  {/* Icon con glow */}
                  <div className="relative w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-400/30 group-hover/feat:shadow-2xl group-hover/feat:shadow-blue-400/50 group-hover/feat:scale-110 transition-all duration-300">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>

                  <h3 className="relative text-white font-semibold text-lg mb-2 group-hover/feat:text-blue-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="relative text-white/70 text-sm group-hover/feat:text-white/90 transition-colors">
                    {feature.desc}
                  </p>
                </m.div>
              ))}
            </div>
          </LazyMotion>
        </div>
      </div>

      {/* Indicador de scroll sutil */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <m.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          />
        </div>
      </div>
    </section>
  );
}
