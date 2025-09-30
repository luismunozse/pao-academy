'use client';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import { Award, Star, GraduationCap, ArrowRight, Rocket, Calendar, Users, Target, Shield } from 'lucide-react';
import Image from 'next/image';
import { useABTest, getVariantConfig, trackConversion } from '../lib/ab-testing';
import { useCTATracking } from '../hooks/useAnalytics';
import { useEffect, useState } from 'react';

export default function Hero({
  brandName, t, cta
}:{ brandName:string; t:(k:string)=>string; cta:()=>void; }){
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

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
  // const stats = [
  //   { number: '500+', label: 'Estudiantes', icon: Users },
  //   { number: '95%',  label: 'Satisfacción', icon: Star },
  //   { number: '50+',  label: 'Cursos',      icon: BookOpen },
  //   { number: '24/7', label: 'Soporte',     icon: Shield },
  // ];
  const features = [
    { icon: GraduationCap, title: t('bullet1'), desc: 'Mentores expertos', metric: '15+ años exp.' },
    { icon: Award,         title: t('bullet2'), desc: 'Proyectos reales', metric: '100% aplicable' },
    { icon: Star,          title: t('bullet3'), desc: 'Certificación válida', metric: 'Universidad' },
  ];

  // Estadísticas de prueba social
  const socialProof = [
    { number: '2,500+', label: 'Estudiantes graduados', icon: Users },
    { number: '95%', label: 'Tasa de empleabilidad', icon: Target },
    { number: '4.8/5', label: 'Satisfacción promedio', icon: Star },
    { number: '24/7', label: 'Soporte incluido', icon: Shield },
  ];

  return (
    <section id="inicio" className="section-academic hero-wrap overflow-hidden">
      {/* Imagen de fondo optimizada con next/image */}
      <div className="hero-bg-desktop absolute inset-0">
        <Image
          src="/hero.jpg"
          alt="GLOMIND360 - Formación profesional"
          fill
          priority
          quality={85}
          className="object-cover brightness-[0.4] saturate-[0.8]"
          sizes="100vw"
        />
      </div>
      
      {/* Imagen responsive para móviles */}
      <div className="hero-bg-mobile absolute inset-0 md:hidden">
        <Image
          src="/hero.jpg"
          alt="GLOMIND360 - Formación profesional"
          fill
          priority
          quality={85}
          className="object-cover object-top brightness-[0.4] saturate-[0.8]"
          sizes="100vw"
        />
      </div>
      
      {/* Imagen para tablets */}
      <div className="hero-bg-tablet absolute inset-0 hidden md:block lg:hidden">
        <Image
          src="/hero.jpg"
          alt="GLOMIND360 - Formación profesional"
          fill
          priority
          quality={85}
          className="object-cover brightness-[0.4] saturate-[0.8]"
          sizes="100vw"
        />
      </div>
      
      {/* Overlay académico para integrar con la paleta de colores */}
      <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--academic-gray-900)]/90 via-[color:var(--academic-primary)]/30 to-[color:var(--academic-secondary)]/40" />
      
      {/* fondo gradiente + patrón suave */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='0.12'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />
      {/* orbes (ocultos en XS) */}
      <div className="hero-bg-orbs pointer-events-none">
        <div className="absolute -top-8 left-8 w-64 h-64 rounded-full bg-[color:var(--academic-secondary)]/14 md:block"/>
        <div className="absolute -bottom-10 right-10 w-80 h-80 rounded-full bg-[color:var(--academic-accent)]/12 md:block"/>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] rounded-full bg-[color:var(--academic-primary)]/10 md:block"/>
      </div>

      <div className="relative z-10 full-width-content py-10 sm:py-16 safe-bottom">
        <div className="text-center hero-mobile w-full">
          {/* badge */}
          <LazyMotion features={domAnimation} strict>
            <m.div
              initial={reducedMotion ? false : { opacity:0, y:20 }}
              animate={reducedMotion ? undefined : { opacity:1, y:0 }}
              transition={{ duration:.5 }}
              className="hero-certification-badge inline-flex items-center gap-3 px-6 py-3 rounded-full mb-6"
            >
              <GraduationCap className="size-6 text-[color:var(--neon-accent)]"/>
              <span className="hero-certification-text text-base text-white tracking-wide">
                CURSOS Y DIPLOMATURAS CON <span className="hero-certification-highlight">CERTIFICACIÓN UNIVERSITARIA</span>
              </span>
            </m.div>
          </LazyMotion>

          {/* título fluido */}
          <LazyMotion features={domAnimation} strict>
            <m.h1
              initial={reducedMotion ? false : { opacity:0, y:24 }}
              animate={reducedMotion ? undefined : { opacity:1, y:0 }}
              transition={{ delay:.15, duration:.5 }}
              className="hero-title font-academic-heading mb-4 sm:mb-6 text-white px-2"
            >
              {t('brandTagline')}
            </m.h1>
          </LazyMotion>

          {/* subtítulo */}
          <LazyMotion features={domAnimation} strict>
            <m.p
              initial={reducedMotion ? false : { opacity:0, y:24 }}
              animate={reducedMotion ? undefined : { opacity:1, y:0 }}
              transition={{ delay:.3, duration:.5 }}
              className="text-[15px] sm:text-base md:text-lg text-white/80 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed font-academic px-2"
            >
              {t('heroDesc')}
            </m.p>
          </LazyMotion>

          {/* CTA Principal - Inscríbete Ahora */}
          <LazyMotion features={domAnimation} strict>
            <m.div
              initial={reducedMotion ? false : { opacity:0, y:24 }}
              animate={reducedMotion ? undefined : { opacity:1, y:0 }}
              transition={{ delay:.45, duration:.5 }}
              className="hero-ctas mb-8 sm:mb-10 px-2"
            >
              <button 
                className="btn-primary btn-lg flex items-center justify-center gap-3 group"
                onClick={cta}
              >
                <GraduationCap className="size-6 group-hover:scale-110 transition-transform"/>
                Inscríbete Ahora
                <ArrowRight className="size-6 group-hover:translate-x-1 transition-transform"/>
              </button>
            </m.div>
          </LazyMotion>

          {/* Prueba social - Estadísticas */}
          <LazyMotion features={domAnimation} strict>
            <m.div
              initial={reducedMotion ? false : { opacity:0, y:24 }}
              animate={reducedMotion ? undefined : { opacity:1, y:0 }}
              transition={{ delay:.6, duration:.5 }}
              className="hero-stats mb-12 max-w-4xl mx-auto px-2"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {socialProof.map(({number,label,icon:Icon})=>(
                  <div key={label} className="stat-academic text-center group">
                    <Icon className="w-6 h-6 text-[color:var(--academic-secondary)] mx-auto mb-2 group-hover:scale-110 transition-transform"/>
                    <div className="stat-number text-xl md:text-2xl font-bold text-white">{number}</div>
                    <div className="stat-label text-xs md:text-sm text-white/80">{label}</div>
                  </div>
                ))}
              </div>
            </m.div>
          </LazyMotion>

          {/* beneficios */}
          <LazyMotion features={domAnimation} strict>
            <m.div
              initial={reducedMotion ? false : { opacity:0, y:24 }}
              animate={reducedMotion ? undefined : { opacity:1, y:0 }}
              transition={{ delay:.75, duration:.5 }}
              className="hero-features max-w-5xl mx-auto px-2"
            >
              {features.map((f)=>(
                <div key={f.title} className="card-academic text-center group">
                  <div className="w-14 h-14 rounded-2xl bg-[color:var(--academic-secondary)]/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <f.icon className="size-7 text-[color:var(--academic-secondary)]"/>
                  </div>
                  <h3 className="font-academic-heading text-white text-base sm:text-lg mb-1.5">{f.title}</h3>
                  <p className="text-white/70 text-sm font-academic mb-2">{f.desc}</p>
                  <div className="text-[color:var(--academic-secondary)] text-xs font-semibold bg-[color:var(--academic-secondary)]/10 px-2 py-1 rounded-full inline-block">
                    {f.metric}
                  </div>
                </div>
              ))}
            </m.div>
          </LazyMotion>

        </div>
      </div>
    </section>
  );
}
