'use client';
import React from 'react';
import { m } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

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

  // Agrupar microcursos por categoría
  const cursosPorCategoria = microcursos.reduce((acc, curso) => {
    if (!acc[curso.categoria]) {
      acc[curso.categoria] = [];
    }
    acc[curso.categoria].push(curso);
    return acc;
  }, {} as Record<string, any[]>);

  const categorias = Object.keys(cursosPorCategoria);

  function normalize(input: string){
    return (input || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{M}+/gu, '')
      .trim();
  }

  function getCategoryImage(categoria: string){
    const c = normalize(categoria);
    // Imágenes fijas por categoría (URLs externas)
    if (c.includes('datos') || c.includes('analitica') || c.includes('analisis') || c.includes('data'))
      return 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1600&auto=format&fit=crop';
    if (c.includes('gestion de procesos') || c.includes('procesos'))
      return 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=1600&auto=format&fit=crop';
    if (c.includes('negocios') || c.includes('finanzas'))
      return 'https://images.unsplash.com/photo-1556157382-97eda2f9e69b?q=80&w=1600&auto=format&fit=crop';
    if (c.includes('mindset') || c.includes('desarrollo personal'))
      return 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1600&auto=format&fit=crop';
    if (c.includes('tech') || c.includes('program'))
      return 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1600&auto=format&fit=crop';
    if (c.includes('marketing digital'))
      return 'https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=1600&auto=format&fit=crop';
    if (c.includes('diseño') || c.includes('creatividad') || c.includes('ux') || c.includes('ui'))
      return 'https://images.unsplash.com/photo-1557264337-e8a93017fe92?q=80&w=1600&auto=format&fit=crop';
    if (c.includes('ventas') || c.includes('customer'))
      return 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1600&auto=format&fit=crop';
    return 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=1600&auto=format&fit=crop';
  }

  function getCategoryFallback(categoria: string){
    const c = normalize(categoria);
    if (c.includes('datos') || c.includes('analitica') || c.includes('analisis') || c.includes('data'))
      return 'https://images.unsplash.com/photo-1551281044-8e3f9b35afe5?q=80&w=1600&auto=format&fit=crop';
    if (c.includes('negocios') || c.includes('finanzas'))
      return 'https://images.unsplash.com/photo-1554224155-3a589877462f?q=80&w=1600&auto=format&fit=crop';
    return 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=1600&auto=format&fit=crop';
  }

  function getCategoryEmoji(categoria: string){
    const first = categoria?.[0];
    // Si la categoría ya trae emoji al inicio lo usamos, sino fallback
    const hasEmoji = /\p{Extended_Pictographic}/u.test(first || '');
    return hasEmoji ? first : '📚';
  }

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

        {/* Cards de categorías */}
        <div className="max-w-7xl mx-auto px-2 md:px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {categorias.map((categoria, i) => (
              <m.article
                key={categoria}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative overflow-hidden flex flex-col rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              >
                {/* Media */}
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  {/* Fallback visual en caso de que no cargue la imagen local ni remota */}
                  <div className="absolute inset-0 bg-white/10 flex items-center justify-center z-0">
                    <span className="text-5xl opacity-70 select-none">
                      {getCategoryEmoji(categoria)}
                    </span>
                  </div>
                  <img
                    src={getCategoryImage(categoria)}
                    alt={categoria}
                    className="relative z-10 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      img.onerror = null;
                      img.src = getCategoryFallback(categoria);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-20" />
                  <div className="absolute bottom-2 left-2 text-2xl z-30">
                    {getCategoryEmoji(categoria)}
                  </div>
                </div>
                {/* Body */}
                <div className="p-4 flex flex-col gap-3">
                  <h4 className="text-white text-base font-semibold leading-tight">
                    {categoria}
                  </h4>
                  <div className="mt-auto">
                    <button
                      onClick={() => onClickCourse(categoria)}
                      className="w-full btn-primary-compact text-sm px-3 py-2 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-1"
                    >
                      Ver cursos <ChevronRight className="size-4" />
                    </button>
                  </div>
                </div>
              </m.article>
            ))}
          </div>
        </div>

        <div className="neon-divider mt-8" />
      </div>
    </section>
  );
}
