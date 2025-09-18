'use client';
import React, { useState } from 'react';
import { m } from 'framer-motion';
import { PlayCircle, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';

export default function AsyncCourses({
  t, microcursos, onClickCourse
}:{ 
  t:(k:string)=>string; 
  microcursos:any[]; 
  onClickCourse:(title:string)=>void; 
}){
  const title = t('asyncCoursesTitle');
  const desc = t('asyncCoursesDesc');
  const ctaText = t('exploreAsyncCourses');
  const priceText = t('price');
  const aiText = t('aiPowered');

  // Estados para el carrusel
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Agrupar microcursos por categoría
  const cursosPorCategoria = microcursos.reduce((acc, curso) => {
    if (!acc[curso.categoria]) {
      acc[curso.categoria] = [];
    }
    acc[curso.categoria].push(curso);
    return acc;
  }, {} as Record<string, any[]>);

  const categorias = Object.keys(cursosPorCategoria);
  const totalSlides = categorias.length;

  // Auto-play functionality
  React.useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalSlides, isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section id="cursos-asincronos" className="section-academic">
      <div className="relative full-width-content py-12 md:py-16">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-white text-xl md:text-2xl font-semibold tracking-tight mb-2">
            {title}
          </h2>
          <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto">
            {desc}
          </p>
        </div>

        {/* Carrusel de categorías compacto */}
        <div className="relative max-w-6xl mx-auto">
          {/* Título de categoría actual */}
          <div className="text-center mb-6">
            <h3 className="text-white text-xl md:text-2xl font-semibold">
              {categorias[currentSlide]}
            </h3>
          </div>

          {/* Contenedor del carrusel */}
          <div className="overflow-hidden rounded-xl">
            <m.div 
              className="flex transition-transform duration-500 ease-in-out"
              animate={{ x: `-${currentSlide * 100}%` }}
            >
              {categorias.map((categoria, categoriaIndex) => {
                const cursosEnCategoria = cursosPorCategoria[categoria];
                const cantidadCursos = cursosEnCategoria.length;
                
                // Determinar el grid apropiado basado en la cantidad de cursos
                const getGridClasses = () => {
                  if (cantidadCursos === 1) return 'grid-cols-1 max-w-xs mx-auto';
                  if (cantidadCursos === 2) return 'grid-cols-2 max-w-md mx-auto';
                  if (cantidadCursos === 3) return 'grid-cols-3 max-w-2xl mx-auto';
                  return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
                };

                return (
                <div key={categoria} className="w-full flex-shrink-0 px-2">
                  {/* Grid de cursos de la categoría - centrado cuando hay pocos elementos */}
                  <div className={`grid gap-3 ${getGridClasses()}`}>
                    {cursosPorCategoria[categoria].map((curso: any, cursoIndex: number) => (
                      <m.article
                        key={curso.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: cursoIndex * 0.05,
                          ease: "easeOut"
                        }}
                        className="async-course-card-compact group relative overflow-hidden flex flex-col"
                      >
                        {/* AI Badge */}
                        {curso.conIA && (
                          <div className="absolute top-2 right-2 flex items-center gap-1 bg-[color:var(--neon-accent)] text-black px-1.5 py-0.5 rounded-full text-xs font-semibold z-10">
                            <Sparkles className="size-2.5" />
                            {aiText}
                          </div>
                        )}

                        <div className="relative z-10 flex flex-col h-full p-3">
                          {/* Título del curso */}
                          <h4 className="text-white text-sm font-semibold mb-2 line-clamp-2 leading-tight">
                            {curso.titulo}
                          </h4>

                          {/* Descripción */}
                          <p className="text-white/70 text-xs mb-3 flex-grow line-clamp-2 leading-relaxed">
                            {curso.desc}
                          </p>

                          {/* Footer con botón compacto */}
                          <div className="mt-auto">
                            <button 
                              onClick={() => onClickCourse(curso.titulo)}
                              className="w-full btn-primary-compact text-xs px-3 py-1.5 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-1"
                            >
                              Ver planes <ChevronRight className="size-3" />
                            </button>
                          </div>
                        </div>
                      </m.article>
                    ))}
                  </div>
                </div>
                );
              })}
            </m.div>
          </div>

          {/* Botones de navegación compactos */}
          <button 
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300 group z-10"
          >
            <ChevronLeft className="size-4 text-white group-hover:text-[color:var(--neon-cyan)] transition-colors" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300 group z-10"
          >
            <ChevronRight className="size-4 text-white group-hover:text-[color:var(--neon-cyan)] transition-colors" />
          </button>

          {/* Indicadores de slides compactos */}
          <div className="flex justify-center mt-6 gap-1.5">
            {categorias.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-[color:var(--neon-cyan)] scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA Final */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <button 
            onClick={() => onClickCourse('cursos asincrónicos')}
            className="btn-accent px-8 py-3 text-sm md:text-base font-semibold group"
          >
            <PlayCircle className="size-5 mr-2" />
            {ctaText}
            <ChevronRight className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </m.div>

        <div className="neon-divider mt-8" />
      </div>
    </section>
  );
}
