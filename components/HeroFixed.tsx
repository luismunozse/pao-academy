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
      {/* Imagen de fondo optimizada */}
      <div className="hero-bg-desktop absolute inset-0">
        <Image
          src="/hero.jpg"
          alt="GLOMIND360 - Formación profesional"
          fill
          priority
          quality={85}
          className="object-cover brightness-[0.3] saturate-[0.8]"
          sizes="100vw"
        />
      </div>
      
      {/* Overlay sutil - Colores neutros */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-gray-900/60 to-slate-800/70"></div>

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Badge de confianza elegante */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-6">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="text-white/90 text-sm font-medium">
              +500 profesionales ya transformaron su carrera
            </span>
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

          {/* CTAs principales */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button
              onClick={cta}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="flex items-center gap-2">
                Inscríbete Ahora
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button
              onClick={() => {
                document.getElementById('cursos-en-vivo')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Ver cursos disponibles
            </button>
          </div>

          {/* Features elegantes */}
          <LazyMotion features={domAnimation} strict>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center hover:bg-white/15 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 text-sm">
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
