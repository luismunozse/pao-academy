'use client';
import { m } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star, Award, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';

export default function SocialProof({
  t, lang, testimonios, idx
}:{ t:(k:string)=>string; lang:'es'|'en'; testimonios:any[]; idx:number; }){
  const test = testimonios[idx][lang];
  const [currentPage, setCurrentPage] = useState(0);

  // Empresas que usan tecnologías similares (más realista)
  const companies = [
    { name: 'TechStart Argentina', logo: 'https://via.placeholder.com/120x60/1e40af/ffffff?text=TechStart', type: 'Startup' },
    { name: 'DataCorp', logo: 'https://via.placeholder.com/120x60/059669/ffffff?text=DataCorp', type: 'Analytics' },
    { name: 'RetailPro', logo: 'https://via.placeholder.com/120x60/dc2626/ffffff?text=RetailPro', type: 'Retail' },
    { name: 'FinanceMax', logo: 'https://via.placeholder.com/120x60/7c3aed/ffffff?text=FinanceMax', type: 'Fintech' },
    { name: 'EduTech Solutions', logo: 'https://via.placeholder.com/120x60/ea580c/ffffff?text=EduTech', type: 'EdTech' },
    { name: 'LogiCorp', logo: 'https://via.placeholder.com/120x60/0891b2/ffffff?text=LogiCorp', type: 'Logistics' },
    { name: 'HealthTech', logo: 'https://via.placeholder.com/120x60/be123c/ffffff?text=HealthTech', type: 'Healthcare' },
    { name: 'AgriData', logo: 'https://via.placeholder.com/120x60/16a34a/ffffff?text=AgriData', type: 'AgTech' }
  ];

  // Paginar logos en grupos de 5
  const logosPerPage = 5;
  const companyPages = useMemo(() => {
    const pages: typeof companies[] = [] as any;
    for (let i = 0; i < companies.length; i += logosPerPage) {
      pages.push(companies.slice(i, i + logosPerPage));
    }
    return pages;
  }, [companies]);

  // Auto-rotación por página
  useEffect(() => {
    if (companyPages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % companyPages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [companyPages.length]);

  return (
    <section className="section-academic">
      <div className="relative full-width-content py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header con estadísticas */}
          <m.div 
            initial={{opacity:0,y:20}} 
            whileInView={{opacity:1,y:0}} 
            viewport={{once:true}}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full px-6 py-3 mb-8">
              <Award className="h-5 w-5 text-blue-400" />
              <span className="text-white font-semibold">Testimonios Reales</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Lo que dicen nuestros <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">estudiantes</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">500+</div>
                <div className="text-white/70">Estudiantes graduados</div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">4.9/5</div>
                <div className="text-white/70">Calificación promedio</div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">95%</div>
                <div className="text-white/70">Consiguen trabajo</div>
              </div>
            </div>
          </m.div>

          {/* Testimonio principal mejorado */}
          <m.div 
            initial={{opacity:0,y:30}} 
            whileInView={{opacity:1,y:0}} 
            viewport={{once:true}}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="relative">
              {/* Card principal con gradiente */}
              <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 overflow-hidden">
                {/* Patrón de fondo */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-400/10 to-blue-400/10 rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="relative z-10">
                  {/* Quote icon */}
                  <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                      <Quote className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  {/* Testimonio text */}
                  <blockquote className="text-xl md:text-2xl leading-relaxed text-white text-center mb-8 font-medium">
                    "{test.frase}"
                  </blockquote>

                  {/* Rating stars */}
                  <div className="flex justify-center gap-1 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Autor info mejorada */}
                  <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <div className="relative">
                      <img 
                        src={test.imagen} 
                        alt={test.autor}
                        className="w-20 h-20 rounded-full object-cover border-4 border-white/20 shadow-xl"
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(test.autor)}&background=6366f1&color=fff&size=150`;
                        }}
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    
                    <div className="text-center md:text-left">
                      <h4 className="text-xl font-bold text-white mb-1">{test.autor}</h4>
                      <p className="text-white/70 text-lg">{test.rol}</p>
                      <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-green-400 text-sm font-medium">Estudiante Verificado</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </m.div>
        </div>

        {/* Carrusel de empresas mejorado */}
        <m.div 
          initial={{opacity:0,y:20}} 
          whileInView={{opacity:1,y:0}} 
          viewport={{once:true}}
          transition={{ delay: 0.3 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 rounded-full px-6 py-3 mb-6">
              <Award className="h-5 w-5 text-emerald-400" />
              <span className="text-white font-semibold">Empresas Colaboradoras</span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Confían en nuestros <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">egresados</span>
            </h3>
            <p className="text-white/70 text-lg mb-6 max-w-2xl mx-auto">
              Más de 500+ empresas han contratado a nuestros estudiantes y confían en la calidad de nuestra formación
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-white/60 bg-white/5 px-4 py-2 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Empresas verificadas</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 bg-white/5 px-4 py-2 rounded-full">
                <TrendingUp className="h-4 w-4 text-blue-400" />
                <span>Alta tasa de contratación</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 bg-white/5 px-4 py-2 rounded-full">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>Excelente feedback</span>
              </div>
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto">
            {/* Carrusel container mejorado */}
            <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-2">
              <m.div 
                className="flex transition-transform duration-1000 ease-in-out"
                animate={{ x: `-${currentPage * 100}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              >
                {companyPages.map((page, pageIndex) => (
                  <div key={pageIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 px-6 py-8">
                      {page.map((comp, compIndex) => (
                        <m.div 
                          key={comp.name} 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: compIndex * 0.1 }}
                          className="group relative"
                        >
                          <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 group-hover:scale-105 bg-gradient-to-br from-white/5 via-white/10 to-white/5 hover:from-white/10 hover:to-white/15 backdrop-blur-sm">
                            {/* Logo container con gradiente */}
                            <div className="relative mb-4">
                              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                  {comp.name.charAt(0)}
                                </span>
                              </div>
                              {/* Efecto de brillo */}
                              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            
                            <div className="text-center">
                              <h4 className="text-white font-bold text-sm mb-2 group-hover:text-blue-300 transition-colors">
                                {comp.name}
                              </h4>
                              <div className="inline-flex items-center gap-1 text-xs text-white/60 bg-white/10 px-3 py-1 rounded-full">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <span>{comp.type}</span>
                              </div>
                            </div>
                            
                            {/* Efecto de hover */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        </m.div>
                      ))}
                    </div>
                  </div>
                ))}
              </m.div>
            </div>

            {/* Navigation buttons mejorados */}
            <button 
              onClick={() => setCurrentPage((prev) => prev === 0 ? companyPages.length - 1 : prev - 1)}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/30 rounded-full hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 group shadow-lg hover:shadow-xl"
            >
              <ChevronLeft className="size-6 text-white group-hover:scale-110 transition-transform" />
            </button>
            
            <button 
              onClick={() => setCurrentPage((prev) => (prev + 1) % companyPages.length)}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/30 rounded-full hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 group shadow-lg hover:shadow-xl"
            >
              <ChevronRight className="size-6 text-white group-hover:scale-110 transition-transform" />
            </button>

            {/* Dots indicator mejorado */}
            <div className="flex justify-center mt-8 gap-3">
              {companyPages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`relative transition-all duration-300 ${
                    index === currentPage
                      ? 'w-8 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full' 
                      : 'w-3 h-3 bg-white/30 hover:bg-white/50 rounded-full hover:scale-125'
                  }`}
                >
                  {index === currentPage && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
