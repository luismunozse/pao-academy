'use client';
import { m } from 'framer-motion';
import { Building2, CheckCircle, ArrowRight, Users, Target, BarChart, TrendingUp, Award, Clock, Star } from 'lucide-react';

export default function CorporateTraining({
  t, onClickCTA
}:{ 
  t:(k:string)=>string; 
  onClickCTA:()=>void; 
}){
  const title = t('corporateTitle');
  const desc = t('corporateDesc');
  const ctaText = t('corporateCTA');

  const bullets = [
    { text: t('corporateBullet1'), icon: Target },
    { text: t('corporateBullet2'), icon: Users },
    { text: t('corporateBullet3'), icon: BarChart },
  ];

  // Casos de éxito y métricas
  const successCases = [
    {
      company: 'TechCorp Argentina',
      industry: 'Tecnología',
      challenge: 'Mejorar liderazgo de equipos remotos',
      solution: 'Programa de Liderazgo Ágil',
      results: [
        { metric: '40%', label: 'aumento en productividad' },
        { metric: '85%', label: 'satisfacción del equipo' },
        { metric: '60%', label: 'reducción en rotación' }
      ],
      duration: '3 meses'
    },
    {
      company: 'RetailMax',
      industry: 'Retail',
      challenge: 'Capacitar equipos de ventas',
      solution: 'Ventas Consultivas + Power BI',
      results: [
        { metric: '35%', label: 'incremento en ventas' },
        { metric: '90%', label: 'adopción de herramientas' },
        { metric: '25%', label: 'mejora en KPIs' }
      ],
      duration: '4 meses'
    }
  ];

  const metrics = [
    { number: '500+', label: 'Empresas capacitadas', icon: Building2 },
    { number: '15,000+', label: 'Profesionales formados', icon: Users },
    { number: '95%', label: 'Satisfacción promedio', icon: Star },
    { number: '40%', label: 'Mejora promedio en KPIs', icon: TrendingUp },
  ];

  return (
    <section id="corporate-training" className="section-corporate">
      <div className="relative full-width-content py-8 md:py-12">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Header mejorado */}
          <div className="text-center mb-12">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full px-6 py-3 mb-6"
            >
              <Building2 className="h-5 w-5 text-blue-400" />
              <span className="text-white font-semibold">Formación Corporativa</span>
            </m.div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {title} <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">empresas</span>
            </h2>
            <p className="text-white/80 text-lg max-w-3xl mx-auto">
              {desc}
            </p>
          </div>

          {/* Métricas con glow effects */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {metrics.map((metric, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden text-center p-6 bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                <div className="relative w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg shadow-blue-400/30 group-hover:shadow-2xl group-hover:shadow-blue-400/50 group-hover:scale-110 transition-all duration-300">
                  <metric.icon className="size-6 text-white" />
                </div>
                <div className="relative text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">{metric.number}</div>
                <div className="relative text-sm text-white/80 group-hover:text-white transition-colors">{metric.label}</div>
              </m.div>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left: Benefits cards animados */}
            <div className="space-y-4">
              {bullets.map((bullet, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden flex items-start gap-4 p-4 bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/10"
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                  <div className="relative flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center shadow-lg shadow-blue-400/30 group-hover:shadow-blue-400/50 group-hover:scale-110 transition-all duration-300">
                    <bullet.icon className="size-5 text-white" />
                  </div>
                  <div className="relative flex-1">
                    <p className="text-white text-base font-medium leading-relaxed group-hover:text-blue-300 transition-colors">
                      {bullet.text}
                    </p>
                  </div>
                </m.div>
              ))}
            </div>

            {/* Right: Visual + CTA */}
            <div className="text-center lg:text-left">
              <m.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Background Image/Visual */}
                <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-6 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop&auto=format&q=80"
                    alt="Equipo de trabajo en capacitación corporativa"
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
                  <div className="w-full h-full bg-gradient-to-br from-[color:var(--academic-primary)]/20 to-[color:var(--academic-secondary)]/20 flex items-center justify-center absolute inset-0" style={{display: 'none'}}>
                    <div className="text-center">
                      <Building2 className="size-16 text-[color:var(--academic-secondary)] mx-auto mb-4" />
                      <p className="text-white text-lg font-semibold">Formación Corporativa</p>
                    </div>
                  </div>
                </div>

                {/* CTA Button con shimmer */}
                <m.button
                  onClick={onClickCTA}
                  className="btn-corporate group/cta relative overflow-hidden shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover/cta:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                  <span className="relative">{ctaText}</span>
                  <ArrowRight className="relative size-5 group-hover/cta:translate-x-1 transition-transform" />
                </m.button>
              </m.div>
            </div>
          </div>

          {/* Casos de Éxito Premium */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h3 className="text-3xl font-bold text-white text-center mb-10">
              Casos de Éxito <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Reales</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {successCases.map((case_, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-green-400/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-green-500/20"
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                  <div className="relative flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-white group-hover:text-green-300 transition-colors mb-1">{case_.company}</h4>
                      <p className="text-sm text-white/70">{case_.industry}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-white/60">Duración</div>
                      <div className="text-sm font-semibold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">{case_.duration}</div>
                    </div>
                  </div>

                  <div className="relative mb-4">
                    <div className="text-sm text-white/80 mb-1">
                      <strong className="text-white">Desafío:</strong> {case_.challenge}
                    </div>
                    <div className="text-sm text-white/80">
                      <strong className="text-white">Solución:</strong> {case_.solution}
                    </div>
                  </div>

                  <div className="relative grid grid-cols-3 gap-3">
                    {case_.results.map((result, resultIndex) => (
                      <div key={resultIndex} className="text-center p-3 bg-white/5 rounded-lg border border-white/10 group-hover:border-green-400/30 transition-all">
                        <div className="text-lg font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">{result.metric}</div>
                        <div className="text-xs text-white/70">{result.label}</div>
                      </div>
                    ))}
                  </div>
                </m.div>
              ))}
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
