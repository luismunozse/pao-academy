'use client';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import { Award, Star, GraduationCap, ArrowRight, Rocket, Calendar } from 'lucide-react';
import Image from 'next/image';
import { useABTest, getVariantConfig, trackConversion } from '../lib/ab-testing';
import { useCTATracking } from '../hooks/useAnalytics';
import { useEffect, useState } from 'react';

export default function HeroOptimized({
  brandName, t, cta
}:{ brandName:string; t:(k:string)=>string; cta:()=>void; }){
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  // SIEMPRE llamar hooks en el mismo orden (reglas de React)
  const abVariantFromHook = useABTest('hero_cta');
  const { trackCTAClick } = useCTATracking();
  
  // Usar variante 'A' hasta que monte, luego usar la del hook
  const abVariant = mounted ? abVariantFromHook : 'A';
  const ctaConfig = getVariantConfig('hero_cta', abVariant);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener?.('change', listener);
    return () => mq.removeEventListener?.('change', listener);
  }, []);

  // Configuración de CTA basada en variante
  const getCTAConfig = () => {
    if (ctaConfig) {
      return {
        text: ctaConfig.text,
        icon: ctaConfig.icon === 'graduation' ? GraduationCap : 
              ctaConfig.icon === 'rocket' ? Rocket : 
              ctaConfig.icon === 'calendar' ? Calendar : ArrowRight,
        color: ctaConfig.color,
      };
    }
    
    // Fallback por defecto
    return {
      text: 'Inscríbete Ahora',
      icon: ArrowRight,
      color: 'primary',
    };
  };

  const ctaButtonConfig = getCTAConfig();
  const CTAIcon = ctaButtonConfig.icon;

  const features = [
    { icon: GraduationCap, title: t('bullet1'), desc: 'Mentores expertos' },
    { icon: Award,         title: t('bullet2'), desc: 'Proyectos reales' },
    { icon: Star,          title: t('bullet3'), desc: 'Certificación válida' },
  ];

  const handleCTAClick = () => {
    trackCTAClick('hero_cta', 'hero_section', abVariant);
    trackConversion('hero_cta', abVariant, 'cta_click');
    cta();
  };

  // Debug temporal
  useEffect(() => {
    console.log('🔍 Hero Debug:', {
      heroTitle: t('heroTitle'),
      heroSubtitle: t('heroSubtitle'),
      brandName,
      mounted,
      abVariant
    });
  }, [t, brandName, mounted, abVariant]);

  console.log('🎯 Hero RENDERIZANDO - Texto hardcodeado debería aparecer');

  return (
    <section id="inicio" className="section-academic hero-wrap overflow-hidden">
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

      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Badge de confianza elegante */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8"
          >
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="text-white/90 text-sm font-medium">
              +500 profesionales ya transformaron su carrera
            </span>
          </m.div>

          {/* Título principal - SIN ANIMACIONES */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Formación práctica que acelera tu carrera
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mt-2">
              con {brandName}
            </span>
          </h1>

          {/* Subtítulo - SIN ANIMACIONES */}
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Desarrollá habilidades reales, aplicá lo que aprendés y destacate en el mercado laboral. Clases en vivo con mentores expertos y proyectos que suman a tu portfolio.
          </p>

          {/* CTAs principales */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <button
              onClick={handleCTAClick}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="flex items-center gap-2">
                {ctaButtonConfig.text}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button
              onClick={() => {
                trackCTAClick('hero_secondary', 'hero_section');
                document.getElementById('cursos-en-vivo')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Ver cursos disponibles
            </button>
          </m.div>

          {/* Features elegantes */}
          <LazyMotion features={domAnimation} strict>
            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
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
            </m.div>
          </LazyMotion>
        </div>
      </div>

      {/* Indicador de scroll sutil */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <m.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          />
        </div>
      </m.div>
    </section>
  );
}

