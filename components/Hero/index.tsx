'use client';
import { LazyMotion, domAnimation } from 'framer-motion';
import { Award, Star, GraduationCap, ArrowRight } from 'lucide-react';
import HeroBadge from './HeroBadge';
import HeroFeature from './HeroFeature';
import ScrollIndicator from './ScrollIndicator';
import HeroBackground from './HeroBackground';

interface HeroProps {
  brandName: string;
  t: (k: string) => string;
  cta: () => void;
  variant?: 'default' | 'gradient' | 'minimal';
}

export default function Hero({
  brandName,
  t,
  cta,
  variant = 'default'
}: HeroProps) {

  const features = [
    {
      icon: GraduationCap,
      title: t('bullet1'),
      desc: 'Mentores expertos'
    },
    {
      icon: Award,
      title: t('bullet2'),
      desc: 'Proyectos reales'
    },
    {
      icon: Star,
      title: t('bullet3'),
      desc: 'Certificación válida'
    },
  ];

  return (
    <section
      id="inicio"
      className="hero-wrap overflow-hidden"
      aria-label="Hero section"
    >
      <HeroBackground variant={variant === 'default' ? 'image' : variant} />

      <div className="relative z-10 container mx-auto px-4 pt-32 pb-12 md:pt-36 md:pb-20">
        <div className="max-w-5xl mx-auto text-center">

          {/* Badge de confianza */}
          <div className="mb-6">
            <HeroBadge
              text="+500 profesionales ya transformaron su carrera"
              variant="trust"
            />
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
            Desarrollá habilidades reales, aplicá lo que aprendés y destacate en el mercado laboral.
            Clases en vivo con mentores expertos y proyectos que suman a tu portfolio.
          </p>

          {/* CTAs principales */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button
              onClick={cta}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
              aria-label="Inscríbete ahora a nuestros cursos"
            >
              <span className="flex items-center gap-2">
                Inscríbete Ahora
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </span>
            </button>

            <button
              onClick={() => {
                document.getElementById('cursos-en-vivo')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95"
              aria-label="Ver todos los cursos disponibles"
            >
              Ver cursos disponibles
            </button>
          </div>

          {/* Features elegantes */}
          <LazyMotion features={domAnimation} strict>
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
              role="list"
            >
              {features.map((feature, index) => (
                <HeroFeature
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.desc}
                  index={index}
                />
              ))}
            </div>
          </LazyMotion>
        </div>
      </div>

      {/* Indicador de scroll */}
      <ScrollIndicator />
    </section>
  );
}
