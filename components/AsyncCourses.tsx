'use client';
import React from 'react';
import { m } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { getCourseImage, getCourseFallback } from '../lib/course-images';

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

  // Información específica para cada categoría
  const categoryInfo = {
    '📊 Análisis de Datos': {
      description: 'Domina herramientas de análisis y visualización de datos',
      courseCount: '12+ cursos',
      duration: '2-4 horas cada uno',
      level: 'Principiante a Avanzado',
      cta: 'Explorar cursos de datos'
    },
    '💼 Negocios y Finanzas': {
      description: 'Estrategias empresariales y gestión financiera',
      courseCount: '8+ cursos',
      duration: '1-3 horas cada uno',
      level: 'Intermedio',
      cta: 'Ver cursos de negocios'
    },
    '🎨 Diseño y Creatividad': {
      description: 'Herramientas de diseño y desarrollo creativo',
      courseCount: '15+ cursos',
      duration: '2-5 horas cada uno',
      level: 'Principiante a Intermedio',
      cta: 'Descubrir diseño'
    },
    '🚀 Marketing Digital': {
      description: 'Estrategias de marketing online y redes sociales',
      courseCount: '10+ cursos',
      duration: '1-4 horas cada uno',
      level: 'Principiante a Avanzado',
      cta: 'Aprender marketing'
    },
    '💻 Programación': {
      description: 'Lenguajes de programación y desarrollo web',
      courseCount: '20+ cursos',
      duration: '3-8 horas cada uno',
      level: 'Principiante a Experto',
      cta: 'Comenzar a programar'
    },
    '🎯 Liderazgo': {
      description: 'Habilidades de liderazgo y gestión de equipos',
      courseCount: '6+ cursos',
      duration: '2-3 horas cada uno',
      level: 'Intermedio a Avanzado',
      cta: 'Desarrollar liderazgo'
    },
    '📈 Ventas': {
      description: 'Técnicas de ventas y cierre de negocios',
      courseCount: '9+ cursos',
      duration: '1-3 horas cada uno',
      level: 'Principiante a Intermedio',
      cta: 'Mejorar ventas'
    },
    '🧠 Desarrollo Personal': {
      description: 'Crecimiento personal y productividad',
      courseCount: '7+ cursos',
      duration: '1-2 horas cada uno',
      level: 'Todos los niveles',
      cta: 'Crecer personalmente'
    }
  };

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
            {categorias.map((categoria, i) => {
              // Usar funciones centralizadas para imágenes confiables
              const categoryImage = getCourseImage(categoria);
              const categoryFallback = getCourseFallback(categoria);
              const info = categoryInfo[categoria as keyof typeof categoryInfo] || {
                description: 'Cursos especializados en esta área',
                courseCount: '5+ cursos',
                duration: '2-4 horas cada uno',
                level: 'Todos los niveles',
                cta: 'Ver cursos'
              };

              return (
                <m.article
                key={categoria}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative overflow-hidden flex flex-col rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                {/* Media */}
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  {/* Fallback visual en caso de que no cargue la imagen local ni remota */}
                  <div className="absolute inset-0 bg-white/10 flex items-center justify-center z-0">
                    <span className="text-5xl opacity-70 select-none">
                      {getCategoryEmoji(categoria)}
                    </span>
                  </div>
                  <Image
                    src={categoryImage}
                    alt={categoria}
                    fill
                    className="relative z-10 object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    quality={80}
                    unoptimized
                    loader={({ src }) => src}
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      if (img.onerror) return; // Evitar bucle infinito
                      img.onerror = null;

                      // Intentar con imagen de fallback
                      if (img.src !== categoryFallback) {
                        img.src = categoryFallback;
                      } else {
                        // Si ya es el fallback, usar placeholder
                        img.style.display = 'none';
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20" />
                  <div className="absolute bottom-2 left-2 text-2xl z-30">
                    {getCategoryEmoji(categoria)}
                  </div>
                  <div className="absolute top-2 right-2 z-30">
                    <div className="bg-[color:var(--academic-secondary)]/90 text-white text-xs px-2 py-1 rounded-full font-semibold">
                      {info.courseCount}
                    </div>
                  </div>
                </div>
                {/* Body */}
                <div className="p-4 flex flex-col gap-3 flex-1">
                  <h4 className="text-white text-base font-semibold leading-tight">
                    {categoria}
                  </h4>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {info.description}
                  </p>
                  
                  {/* Información adicional */}
                  <div className="space-y-2 text-xs text-white/60">
                    <div className="flex items-center justify-between">
                      <span>Duración:</span>
                      <span className="text-white/80">{info.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Nivel:</span>
                      <span className="text-white/80">{info.level}</span>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <button
                      onClick={() => onClickCourse(categoria)}
                      className="w-full btn-primary-compact text-sm px-3 py-2 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-1"
                    >
                      {info.cta} <ChevronRight className="size-4" />
                    </button>
                  </div>
                </div>
              </m.article>
              );
            })}
          </div>
        </div>

        <div className="neon-divider mt-8" />
      </div>
    </section>
  );
}
