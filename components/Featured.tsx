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
    <section id="featured" className="section-academic">
      <div className="relative full-width-content py-16 md:py-20">
          <div>
            <h2 className="text-white text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
            <p className="mt-2 text-white/80">{lead}</p>
          </div>

        {/* Desktop Grid - 3 cursos */}
        <div className="mt-8 hidden lg:block">
          <div className="relative featured-grid-container">
            {/* Contenedor con padding para las flechas */}
            <div className="px-16">
              <m.div 
                className="grid grid-cols-3 gap-6"
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                {cursos.slice(currentIndex, currentIndex + 3).map((c, i) => (
                  <m.article
                    key={`${c.titulo}-${currentIndex}-${i}`}
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ 
                      duration: 0.7, 
                      delay: i * 0.2,
                      ease: "easeOut"
                    }}
                    className="card-neon featured-card group p-8 relative overflow-hidden min-h-[400px] flex flex-col justify-between"
                  >
              {/* Background gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--neon-blue)]/10 via-transparent to-[color:var(--neon-cyan)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Featured badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1 bg-[color:var(--neon-accent)] text-black px-3 py-1 rounded-full text-xs font-semibold">
                <Star className="size-3" />
                Destacado
              </div>

              <div className="relative z-10 text-center flex flex-col h-full">
                {/* Imagen de referencia del curso */}
                <div className="mb-4">
                  <div className="w-full h-32 rounded-lg overflow-hidden mb-4 relative">
                    <img 
                      src={
                        c.tag === 'Power BI' ? 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop&auto=format&q=80' :
                        c.tag === 'Liderazgo' ? 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=200&fit=crop&auto=format&q=80' :
                        c.tag === 'Ventas' ? 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop&auto=format&q=80' :
                        c.tag === 'Marca Personal' ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop&auto=format&q=80' :
                        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop&auto=format&q=80'
                      }
                      alt={`Imagen representativa del curso de ${c.tag || 'formación'}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback a gradiente si la imagen falla
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallback) {
                          fallback.style.display = 'flex';
                        }
                      }}
                    />
                    <div className="w-full h-full bg-gradient-to-br from-[color:var(--neon-blue)]/20 to-[color:var(--neon-cyan)]/20 flex items-center justify-center absolute inset-0" style={{display: 'none'}}>
                      <div className="text-4xl">
                        {c.tag === 'Power BI' && '📊'}
                        {c.tag === 'Liderazgo' && '👥'}
                        {c.tag === 'Ventas' && '💼'}
                        {c.tag === 'Marca Personal' && '🎯'}
                        {!['Power BI', 'Liderazgo', 'Ventas', 'Marca Personal'].includes(c.tag) && '🎓'}
                      </div>
                    </div>
                  </div>
                  {c.tag && <span className="badge-neon">{c.tag}</span>}
                </div>

                <h3 className="text-xl font-bold tracking-tight text-white mb-4">
                  {c.titulo}
                </h3>

                <div className="space-y-3 mb-6 flex-grow">
                  <ul className="space-y-2 text-sm text-white/80">
                    {c.duracion && (
                      <li className="flex items-center justify-center gap-2">
                        <Clock className="size-4 text-[color:var(--neon-cyan)]" /> 
                        {c.duracion}
                      </li>
                    )}
                    <li className="flex items-center justify-center gap-2">
                      <Users className="size-4 text-[color:var(--neon-cyan)]" /> 
                      {c.modalidad}
                    </li>
                    {c.inicio && (
                      <li className="flex items-center justify-center gap-2">
                        <MapPin className="size-4 text-[color:var(--neon-cyan)]" /> 
                        {t('nextCohort')}: {c.inicio}
                      </li>
                    )}
                  </ul>
                  
                  <div className="flex flex-col gap-2 items-center">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="size-4 text-[color:var(--neon-accent)] fill-current" />
                      ))}
                      <span className="text-sm text-white/70 ml-2">4.9/5</span>
                    </div>
                    <p className="text-xs text-white/60">+500 estudiantes satisfechos</p>
                  </div>
                </div>

                <div className="flex gap-3 justify-center">
                  <button 
                    onClick={()=>onClickCourse(c.titulo)} 
                    className="btn-primary group-hover:scale-105 transition-transform duration-500 px-6"
                  >
                    {t('knowMore')} <ChevronRight className="size-4" />
                  </button>
                  <button className="btn-icon">
                    <PlayCircle className="size-5 text-[color:var(--neon-cyan)]" />
                  </button>
                </div>
              </div>
                  </m.article>
                ))}
              </m.div>
            </div>

            {/* Desktop Navigation Buttons - Mejorados */}
            <button 
              onClick={prevSlide}
              className="featured-nav-button absolute left-2 top-1/2 -translate-y-1/2 p-4 rounded-full group shadow-2xl z-10"
            >
              <ChevronLeft className="size-6 text-white group-hover:text-[color:var(--neon-cyan)] transition-colors" />
            </button>
            
            <button 
              onClick={nextSlide}
              className="featured-nav-button absolute right-2 top-1/2 -translate-y-1/2 p-4 rounded-full group shadow-2xl z-10"
            >
              <ChevronRight className="size-6 text-white group-hover:text-[color:var(--neon-cyan)] transition-colors" />
            </button>

            {/* Desktop Dots Indicator - Mejorado */}
            <div className="flex justify-center mt-8 gap-3">
              {Array.from({ length: Math.ceil(cursos.length / 3) }).map((_, index) => {
                const groupStart = index * 3;
                const isActive = currentIndex >= groupStart && currentIndex < groupStart + 3;
                return (
                  <button
                    key={index}
                    onClick={() => goToSlide(groupStart)}
                    className={`featured-dot w-4 h-4 rounded-full ${
                      isActive ? 'active' : ''
                    }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 rounded-full bg-[color:var(--neon-cyan)] animate-ping opacity-30" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Carrusel Container */}
        <div className="mt-8 relative lg:hidden">
          <div className="overflow-hidden rounded-2xl">
            <m.div 
              className="flex transition-transform duration-700 ease-in-out"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              {cursos.map((c, i) => (
                <div key={c.titulo} className="w-full flex-shrink-0">
                  <m.article
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                    className="card-neon group mx-4 p-8 relative overflow-hidden min-h-[450px] flex flex-col justify-between"
                  >
                    {/* Background gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--neon-blue)]/10 via-transparent to-[color:var(--neon-cyan)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    {/* Featured badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-[color:var(--neon-accent)] text-black px-3 py-1 rounded-full text-xs font-semibold">
                      <Star className="size-3" />
                      Destacado
                    </div>

                    <div className="relative z-10 text-center flex flex-col h-full">
                      {/* Imagen de referencia del curso */}
                      <div className="mb-4">
                        <div className="w-full h-36 rounded-lg overflow-hidden mb-4 relative">
                          <img 
                            src={
                              c.tag === 'Power BI' ? 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop&auto=format&q=80' :
                              c.tag === 'Liderazgo' ? 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=200&fit=crop&auto=format&q=80' :
                              c.tag === 'Ventas' ? 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop&auto=format&q=80' :
                              c.tag === 'Marca Personal' ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop&auto=format&q=80' :
                              'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop&auto=format&q=80'
                            }
                            alt={`Imagen representativa del curso de ${c.tag || 'formación'}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback a gradiente si la imagen falla
                              e.currentTarget.style.display = 'none';
                              const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                              if (fallback) {
                                fallback.style.display = 'flex';
                              }
                            }}
                          />
                          <div className="w-full h-full bg-gradient-to-br from-[color:var(--neon-blue)]/20 to-[color:var(--neon-cyan)]/20 flex items-center justify-center absolute inset-0" style={{display: 'none'}}>
                            <div className="text-5xl">
                              {c.tag === 'Power BI' && '📊'}
                              {c.tag === 'Liderazgo' && '👥'}
                              {c.tag === 'Ventas' && '💼'}
                              {c.tag === 'Marca Personal' && '🎯'}
                              {!['Power BI', 'Liderazgo', 'Ventas', 'Marca Personal'].includes(c.tag) && '🎓'}
                            </div>
                          </div>
                        </div>
                        {c.tag && <span className="badge-neon">{c.tag}</span>}
                      </div>

                      <h3 className="text-2xl font-bold tracking-tight text-white mb-4">
                        {c.titulo}
                      </h3>

                      <div className="space-y-3 mb-6 flex-grow">
                        <ul className="space-y-2 text-sm text-white/80">
                          {c.duracion && (
                            <li className="flex items-center justify-center gap-2">
                              <Clock className="size-4 text-[color:var(--neon-cyan)]" /> 
                              {c.duracion}
                            </li>
                          )}
                          <li className="flex items-center justify-center gap-2">
                            <Users className="size-4 text-[color:var(--neon-cyan)]" /> 
                            {c.modalidad}
                          </li>
                          {c.inicio && (
                            <li className="flex items-center justify-center gap-2">
                              <MapPin className="size-4 text-[color:var(--neon-cyan)]" /> 
                              {t('nextCohort')}: {c.inicio}
                            </li>
                          )}
                        </ul>
                        
                        <div className="flex flex-col gap-2 items-center">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="size-4 text-[color:var(--neon-accent)] fill-current" />
                            ))}
                            <span className="text-sm text-white/70 ml-2">4.9/5</span>
                          </div>
                          <p className="text-xs text-white/60">+500 estudiantes satisfechos</p>
                        </div>
                      </div>

                      <div className="flex gap-3 justify-center">
                        <button 
                          onClick={()=>onClickCourse(c.titulo)} 
                          className="btn-primary group-hover:scale-105 transition-transform duration-500 px-8"
                        >
                          {t('knowMore')} <ChevronRight className="size-4" />
                        </button>
                        <button className="btn-icon">
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
            className="absolute left-2 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/10 transition-all duration-500 group"
          >
            <ChevronLeft className="size-5 text-white group-hover:text-[color:var(--neon-cyan)] transition-colors" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/10 transition-all duration-500 group"
          >
            <ChevronRight className="size-5 text-white group-hover:text-[color:var(--neon-cyan)] transition-colors" />
          </button>

          {/* Dots Indicator - Solo en mobile */}
          <div className="flex justify-center mt-6 gap-2">
            {cursos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
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
