'use client';
import { m } from 'framer-motion';
import { PlayCircle, Users, Clock, MapPin, ChevronRight, ChevronLeft, Star, Award } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Featured({
  t, cursos, onClickCourse
}:{ t:(k:string)=>string; cursos:any[]; onClickCourse:(title:string)=>void; }){
  const title = t('featured');
  const lead  = t('featuredDesc');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cursos.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [cursos.length, isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      // En desktop, navegar de 3 en 3
      if (window.innerWidth >= 1024) {
        return nextIndex + 2 < cursos.length ? nextIndex : 0;
      }
      // En mobile, navegar de 1 en 1
      return nextIndex % cursos.length;
    });
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      // En desktop, navegar de 3 en 3
      if (window.innerWidth >= 1024) {
        return prevIndex >= 3 ? prevIndex - 3 : Math.max(0, cursos.length - 3);
      }
      // En mobile, navegar de 1 en 1
      return (prevIndex - 1 + cursos.length) % cursos.length;
    });
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section id="featured" className="section-neon">
      <div className="relative full-width-content py-16 md:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-white text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
            <p className="mt-2 text-white/80">{lead}</p>
          </div>
          <a href="#contacto" className="hidden md:inline-flex btn-ghost">{t('contact')}</a>
        </div>

        {/* Desktop Grid - 3 cursos */}
        <div className="mt-8 hidden lg:block">
          <div className="relative">
            <div className="grid grid-cols-3 gap-6">
              {cursos.slice(currentIndex, currentIndex + 3).map((c, i) => (
            <m.article
              key={c.titulo}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-neon group p-6 relative overflow-hidden"
            >
              {/* Background gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--neon-blue)]/10 via-transparent to-[color:var(--neon-cyan)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Featured badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1 bg-[color:var(--neon-accent)] text-black px-3 py-1 rounded-full text-xs font-semibold">
                <Star className="size-3" />
                Destacado
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  {c.tag && <span className="badge-neon">{c.tag}</span>}
                  <div className="flex items-center gap-2">
                    <Award className="size-5 text-[color:var(--neon-cyan)]" />
                    <span className="text-sm text-white/70">Certificado</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-white mb-4">
                  {c.titulo}
                </h3>

                <div className="space-y-3 mb-6">
                  <ul className="space-y-2 text-sm text-white/80">
                    {c.duracion && (
                      <li className="flex items-center gap-2">
                        <Clock className="size-4 text-[color:var(--neon-cyan)]" /> 
                        {c.duracion}
                      </li>
                    )}
                    <li className="flex items-center gap-2">
                      <Users className="size-4 text-[color:var(--neon-cyan)]" /> 
                      {c.modalidad}
                    </li>
                    {c.inicio && (
                      <li className="flex items-center gap-2">
                        <MapPin className="size-4 text-[color:var(--neon-cyan)]" /> 
                        {t('nextCohort')}: {c.inicio}
                      </li>
                    )}
                  </ul>
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="size-4 text-[color:var(--neon-accent)] fill-current" />
                      ))}
                      <span className="text-sm text-white/70 ml-2">4.9/5</span>
                    </div>
                    <p className="text-xs text-white/60">+500 estudiantes satisfechos</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={()=>onClickCourse(c.titulo)} 
                    className="btn-neon flex-1 group-hover:scale-105 transition-transform duration-300"
                  >
                    {t('knowMore')} <ChevronRight className="size-4" />
                  </button>
                  <button className="p-3 border border-[color:var(--neon-border)] rounded-lg hover:bg-white/10 transition-colors">
                    <PlayCircle className="size-5 text-[color:var(--neon-cyan)]" />
                  </button>
                </div>
              </div>
            </m.article>
              ))}
            </div>

            {/* Desktop Navigation Buttons */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300 group"
            >
              <ChevronLeft className="size-5 text-white group-hover:text-[color:var(--neon-cyan)] transition-colors" />
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300 group"
            >
              <ChevronRight className="size-5 text-white group-hover:text-[color:var(--neon-cyan)] transition-colors" />
            </button>

            {/* Desktop Dots Indicator */}
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: Math.ceil(cursos.length / 3) }).map((_, index) => {
                const groupStart = index * 3;
                const isActive = currentIndex >= groupStart && currentIndex < groupStart + 3;
                return (
                  <button
                    key={index}
                    onClick={() => goToSlide(groupStart)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-[color:var(--neon-cyan)] scale-125' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Carrusel Container */}
        <div className="mt-8 relative lg:hidden">
          <div className="overflow-hidden rounded-2xl">
            <m.div 
              className="flex transition-transform duration-500 ease-in-out"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {cursos.map((c, i) => (
                <div key={c.titulo} className="w-full flex-shrink-0">
                  <m.article
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="card-neon group mx-4 p-8 relative overflow-hidden"
                  >
                    {/* Background gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--neon-blue)]/10 via-transparent to-[color:var(--neon-cyan)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Featured badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-[color:var(--neon-accent)] text-black px-3 py-1 rounded-full text-xs font-semibold">
                      <Star className="size-3" />
                      Destacado
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        {c.tag && <span className="badge-neon">{c.tag}</span>}
                        <div className="flex items-center gap-2">
                          <Award className="size-5 text-[color:var(--neon-cyan)]" />
                          <span className="text-sm text-white/70">Certificado</span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold tracking-tight text-white mb-4">
                        {c.titulo}
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <ul className="space-y-2 text-sm text-white/80">
                          {c.duracion && (
                            <li className="flex items-center gap-2">
                              <Clock className="size-4 text-[color:var(--neon-cyan)]" /> 
                              {c.duracion}
                            </li>
                          )}
                          <li className="flex items-center gap-2">
                            <Users className="size-4 text-[color:var(--neon-cyan)]" /> 
                            {c.modalidad}
                          </li>
                          {c.inicio && (
                            <li className="flex items-center gap-2">
                              <MapPin className="size-4 text-[color:var(--neon-cyan)]" /> 
                              {t('nextCohort')}: {c.inicio}
                            </li>
                          )}
                        </ul>
                        
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="size-4 text-[color:var(--neon-accent)] fill-current" />
                            ))}
                            <span className="text-sm text-white/70 ml-2">4.9/5</span>
                          </div>
                          <p className="text-xs text-white/60">+500 estudiantes satisfechos</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button 
                          onClick={()=>onClickCourse(c.titulo)} 
                          className="btn-neon flex-1 group-hover:scale-105 transition-transform duration-300"
                        >
                          {t('knowMore')} <ChevronRight className="size-4" />
                        </button>
                        <button className="p-3 border border-[color:var(--neon-border)] rounded-lg hover:bg-white/10 transition-colors">
                          <PlayCircle className="size-5 text-[color:var(--neon-cyan)]" />
                        </button>
                      </div>
                    </div>
                  </m.article>
                </div>
              ))}
            </m.div>
          </div>

          {/* Navigation Buttons - Solo en mobile */}
          <button 
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300 group"
          >
            <ChevronLeft className="size-5 text-white group-hover:text-[color:var(--neon-cyan)] transition-colors" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300 group"
          >
            <ChevronRight className="size-5 text-white group-hover:text-[color:var(--neon-cyan)] transition-colors" />
          </button>

          {/* Dots Indicator - Solo en mobile */}
          <div className="flex justify-center mt-6 gap-2">
            {cursos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-[color:var(--neon-cyan)] scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="neon-divider mt-12" />
      </div>
    </section>
  );
}
