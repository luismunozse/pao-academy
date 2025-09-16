'use client';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import { BookOpen, Users, Award, Star, Clock, GraduationCap, ArrowRight, Megaphone, Shield } from 'lucide-react';

export default function Hero({
  brandName, t, cta, reducedMotion, whatsappUrl
}:{ brandName:string; t:(k:string)=>string; cta:()=>void; reducedMotion:boolean; whatsappUrl:string; }){
  const stats = [
    { number: '500+', label: 'Estudiantes', icon: Users },
    { number: '95%',  label: 'Satisfacción', icon: Star },
    { number: '50+',  label: 'Cursos',      icon: BookOpen },
    { number: '24/7', label: 'Soporte',     icon: Shield },
  ];
  const features = [
    { icon: GraduationCap, title: t('bullet1'), desc: 'Mentores expertos' },
    { icon: Award,         title: t('bullet2'), desc: 'Proyectos reales' },
    { icon: Star,          title: t('bullet3'), desc: 'Certificación válida' },
  ];

  return (
    <section id="inicio" className="section-academic hero-wrap overflow-hidden">
      {/* Imagen de fondo hero.jpg con overlay académico */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero.jpg')",
          filter: "brightness(0.4) saturate(0.8)",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      />
      
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

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-16 safe-bottom">
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

          {/* CTAs (apiladas en XS) */}
          <LazyMotion features={domAnimation} strict>
            <m.div
              initial={reducedMotion ? false : { opacity:0, y:24 }}
              animate={reducedMotion ? undefined : { opacity:1, y:0 }}
              transition={{ delay:.45, duration:.5 }}
              className="hero-ctas mb-8 sm:mb-10 px-2"
            >
              <button className="btn-academic-primary px-5 sm:px-6 py-3 flex items-center justify-center gap-2 group" onClick={cta}>
                {t('knowMore')}
                <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform"/>
              </button>
              <button
                className="btn-academic-secondary px-5 sm:px-6 py-3 flex items-center justify-center gap-2 group"
                onClick={() => document.querySelector('#catalogo')?.scrollIntoView({behavior:'smooth'})}
              >
                {t('viewCatalog')}
                <BookOpen className="size-5 group-hover:scale-110 transition-transform"/>
              </button>
            </m.div>
          </LazyMotion>

          {/* stats */}
          <LazyMotion features={domAnimation} strict>
            <m.div
              initial={reducedMotion ? false : { opacity:0, y:24 }}
              animate={reducedMotion ? undefined : { opacity:1, y:0 }}
              transition={{ delay:.6, duration:.5 }}
              className="hero-stats mb-12 max-w-3xl mx-auto px-2"
            >
              {stats.map(({number,label,icon:Icon})=>(
                <div key={label} className="stat-academic">
                  <Icon className="w-7 h-7 text-[color:var(--academic-secondary)] mx-auto mb-1.5"/>
                  <div className="stat-number text-2xl">{number}</div>
                  <div className="stat-label text-xs sm:text-sm">{label}</div>
                </div>
              ))}
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
                  <p className="text-white/70 text-sm font-academic">{f.desc}</p>
                </div>
              ))}
            </m.div>
          </LazyMotion>

          {/* CTA WhatsApp (full width en XS) */}
          <LazyMotion features={domAnimation} strict>
            <m.div
              initial={reducedMotion ? false : { opacity:0, y:24 }}
              animate={reducedMotion ? undefined : { opacity:1, y:0 }}
              transition={{ delay:.9, duration:.5 }}
              className="mt-10 px-2"
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-academic-heading transition-all duration-300 group shadow-lg hover:shadow-xl"
              >
                <Megaphone className="size-5 group-hover:scale-110 transition-transform"/>
                {t('whatsappCTA')}
                <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform"/>
              </a>
            </m.div>
          </LazyMotion>
        </div>
      </div>
    </section>
  );
}
