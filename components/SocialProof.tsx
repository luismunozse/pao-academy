'use client';
import { m } from 'framer-motion';
import { Quote, Star, Award, TrendingUp, Users, CheckCircle } from 'lucide-react';

export default function SocialProof({
  t, lang, testimonios, idx
}:{ t:(k:string)=>string; lang:'es'|'en'; testimonios:any[]; idx:number; }){
  const test = testimonios[idx][lang];

  return (
    <section className="section-academic">
          <div className="relative full-width-content pt-4 pb-8 md:pt-6 md:pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header con estadísticas */}
              <m.div 
                initial={{opacity:0,y:20}} 
                whileInView={{opacity:1,y:0}} 
                viewport={{once:true}}
                className="text-center mb-8"
              >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full px-6 py-3 mb-6">
              <Award className="h-5 w-5 text-blue-400" />
              <span className="text-white font-semibold">Testimonios Reales</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Lo que dicen nuestros <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">estudiantes</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              {/* Stat 1 - Estudiantes */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="group relative overflow-hidden bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-md border border-white/20 hover:border-green-400/40 rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                <div className="relative w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-400/30 group-hover:shadow-2xl group-hover:shadow-green-400/50 group-hover:scale-110 transition-all duration-300">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="relative text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">500+</div>
                <div className="relative text-white group-hover:text-green-300 transition-colors">Estudiantes graduados</div>
              </m.div>

              {/* Stat 2 - Rating */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group relative overflow-hidden bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-md border border-white/20 hover:border-yellow-400/40 rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                <div className="relative w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-yellow-400/30 group-hover:shadow-2xl group-hover:shadow-yellow-400/50 group-hover:scale-110 transition-all duration-300">
                  <Star className="h-6 w-6 text-white fill-current" />
                </div>
                <div className="relative text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">4.9/5</div>
                <div className="relative text-white group-hover:text-yellow-300 transition-colors">Calificación promedio</div>
              </m.div>

              {/* Stat 3 - Empleo */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="group relative overflow-hidden bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-md border border-white/20 hover:border-purple-400/40 rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                <div className="relative w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-400/30 group-hover:shadow-2xl group-hover:shadow-purple-400/50 group-hover:scale-110 transition-all duration-300">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div className="relative text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">95%</div>
                <div className="relative text-white group-hover:text-purple-300 transition-colors">Consiguen trabajo</div>
              </m.div>
            </div>
          </m.div>

          {/* Testimonio principal con premium effects */}
          <m.div
            initial={{opacity:0,y:30}}
            whileInView={{opacity:1,y:0}}
            viewport={{once:true}}
            transition={{ delay: 0.4 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="relative group">
              {/* Card principal con gradiente y shimmer */}
              <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 hover:border-white/30 rounded-3xl p-8 md:p-12 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20">
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1500 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                {/* Patrón de fondo */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-400/10 to-blue-400/10 rounded-full translate-y-12 -translate-x-12 group-hover:scale-110 transition-transform duration-500"></div>
                
                <div className="relative z-10">
                  {/* Quote icon con glow */}
                  <div className="flex justify-center mb-8">
                    <div className="relative w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg shadow-blue-400/30 group-hover:shadow-2xl group-hover:shadow-blue-400/50 group-hover:scale-110 transition-all duration-300">
                      <Quote className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  {/* Testimonio text */}
                  <blockquote className="text-xl md:text-2xl leading-relaxed text-white text-center mb-8 font-medium">
                    &ldquo;{test.frase}&rdquo;
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
                      <p className="text-white text-lg">{test.rol}</p>
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
      </div>
    </section>
  );
}
