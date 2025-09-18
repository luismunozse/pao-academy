'use client';
import React, { useState } from 'react';
import { m } from 'framer-motion';
import { 
  Target, 
  Award, 
  Globe, 
  Smartphone, 
  GraduationCap, 
  Briefcase, 
  TrendingUp, 
  Users, 
  Zap, 
  Shield 
} from 'lucide-react';

export default function Benefits({
  t
}:{ 
  t:(k:string)=>string; 
}){
  const title = t('benefitsTitle');

  const benefits = [
    {
      icon: Target,
      title: t('benefit1Title'),
      desc: t('benefit1Desc'),
      emoji: '🎯'
    },
    {
      icon: Award,
      title: t('benefit2Title'),
      desc: t('benefit2Desc'),
      emoji: '📜'
    },
    {
      icon: Globe,
      title: t('benefit3Title'),
      desc: t('benefit3Desc'),
      emoji: '🌍'
    },
    {
      icon: Smartphone,
      title: t('benefit4Title'),
      desc: t('benefit4Desc'),
      emoji: '📱'
    },
    {
      icon: GraduationCap,
      title: t('benefit5Title'),
      desc: t('benefit5Desc'),
      emoji: '👨‍🏫'
    },
    {
      icon: Briefcase,
      title: t('benefit6Title'),
      desc: t('benefit6Desc'),
      emoji: '💼'
    },
    {
      icon: TrendingUp,
      title: t('benefit7Title'),
      desc: t('benefit7Desc'),
      emoji: '🚀'
    },
    {
      icon: Users,
      title: t('benefit8Title'),
      desc: t('benefit8Desc'),
      emoji: '🧑‍🤝‍🧑'
    },
    {
      icon: Zap,
      title: t('benefit9Title'),
      desc: t('benefit9Desc'),
      emoji: '📊'
    },
    {
      icon: Shield,
      title: t('benefit10Title'),
      desc: t('benefit10Desc'),
      emoji: '🏅'
    }
  ];

  return (
    <section id="benefits" className="section-benefits">
      <div className="relative full-width-content py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              {title}
            </h2>
          </div>

          {/* Grid de beneficios centrado: 2 filas x 5 columnas en desktop; en mobile mostramos 4 y opción de ver más */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
            {benefits.map((benefit, index) => (
              <m.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                className={`benefit-card group relative overflow-hidden w-full max-w-sm ${index >= 4 ? 'hidden sm:block' : ''}`}
              >
                {/* Background gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--neon-blue)]/5 via-transparent to-[color:var(--neon-cyan)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Card content */}
                <div className="relative z-10 p-6 h-full flex flex-col text-center">
                  {/* Emoji */}
                  <div className="text-4xl mb-4">
                    {benefit.emoji}
                  </div>

                  {/* Icon */}
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon className="size-6 text-[color:var(--neon-cyan)]" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-white text-lg font-bold mb-3 leading-tight">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 text-sm leading-relaxed flex-grow">
                    {benefit.desc}
                  </p>
                </div>
              </m.div>
            ))}
          </div>

          {/* Botón Ver más/menos solo en mobile */}
          <div className="mt-6 flex justify-center sm:hidden">
            <ToggleMore />
          </div>
        </div>
      </div>
    </section>
  );
}

function ToggleMore(){
  const [expanded, setExpanded] = useState(false);
  React.useEffect(() => {
    const hiddenCards = document.querySelectorAll('.benefit-card.hidden');
    hiddenCards.forEach((el) => {
      (el as HTMLElement).style.display = expanded ? 'block' : '';
    });
  }, [expanded]);
  return (
    <button
      onClick={() => setExpanded(v => !v)}
      className="btn-primary px-4 py-2 text-sm"
    >
      {expanded ? 'Ver menos' : 'Ver más'}
    </button>
  );
}
