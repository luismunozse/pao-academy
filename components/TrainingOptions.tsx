'use client';
import React from 'react';
import { m } from 'framer-motion';
import { Users, PlayCircle, Building2, ArrowRight } from 'lucide-react';

export default function TrainingOptions({
  t, onLiveClick, onAsyncClick, onCorporateClick
}:{ 
  t:(k:string)=>string; 
  onLiveClick:()=>void;
  onAsyncClick:()=>void;
  onCorporateClick:()=>void;
}){
  const title = t('optionsTitle');

  const options = [
    {
      icon: Users,
      title: t('liveProgramsTitle'),
      desc: t('liveProgramsDesc'),
      cta: t('liveProgramsCTA'),
      onClick: onLiveClick,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: PlayCircle,
      title: t('asyncCoursesTitle'),
      desc: t('asyncCoursesDesc'),
      cta: t('asyncCoursesCTA'),
      onClick: onAsyncClick,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Building2,
      title: t('corporateTrainingTitle'),
      desc: t('corporateTrainingDesc'),
      cta: t('corporateTrainingCTA'),
      onClick: onCorporateClick,
      gradient: 'from-emerald-500 to-teal-500'
    }
  ];

  return (
    <section id="training-options" className="section-options">
      <div className="relative full-width-content py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              {title}
            </h2>
          </div>

          {/* Grid de opciones */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {options.map((option, index) => (
              <m.div
                key={option.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                className="option-card group relative overflow-hidden"
              >
                {/* Background gradient effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Card content */}
                <div className="relative z-10 p-8 h-full flex flex-col">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <option.icon className="size-8 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-white text-xl md:text-2xl font-bold mb-4">
                    {option.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/80 text-base md:text-lg mb-8 flex-grow leading-relaxed">
                    {option.desc}
                  </p>

                  {/* CTA Button */}
                  <m.button
                    onClick={option.onClick}
                    className="btn-option group-hover:scale-105 transition-transform duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>{option.cta}</span>
                    <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                  </m.button>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
