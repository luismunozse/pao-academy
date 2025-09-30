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
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Building2 className="size-8 text-[color:var(--academic-secondary)]" />
              <h2 className="text-white text-2xl md:text-3xl font-semibold tracking-tight">
                {title}
              </h2>
            </div>
            <p className="text-white/80 text-base md:text-lg max-w-3xl mx-auto">
              {desc}
            </p>
          </div>

          {/* Métricas */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {metrics.map((metric, index) => (
              <div key={index} className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                <metric.icon className="size-8 text-[color:var(--academic-secondary)] mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">{metric.number}</div>
                <div className="text-sm text-white/70">{metric.label}</div>
              </div>
            ))}
          </m.div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left: Bullets */}
            <div className="space-y-6">
              {bullets.map((bullet, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[color:var(--academic-secondary)]/20 flex items-center justify-center">
                    <bullet.icon className="size-5 text-[color:var(--academic-secondary)]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-base font-medium leading-relaxed">
                      ✔ {bullet.text}
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

                {/* CTA Button */}
                <m.button
                  onClick={onClickCTA}
                  className="btn-corporate group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{ctaText}</span>
                  <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                </m.button>
              </m.div>
            </div>
          </div>

          {/* Casos de Éxito */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h3 className="text-2xl font-semibold text-white text-center mb-8">
              Casos de Éxito Reales
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {successCases.map((case_, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 rounded-xl p-6 border border-white/10"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">{case_.company}</h4>
                      <p className="text-sm text-white/70">{case_.industry}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-white/60">Duración</div>
                      <div className="text-sm font-semibold text-[color:var(--academic-secondary)]">{case_.duration}</div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm text-white/80 mb-1">
                      <strong>Desafío:</strong> {case_.challenge}
                    </div>
                    <div className="text-sm text-white/80">
                      <strong>Solución:</strong> {case_.solution}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {case_.results.map((result, resultIndex) => (
                      <div key={resultIndex} className="text-center">
                        <div className="text-lg font-bold text-[color:var(--academic-secondary)]">{result.metric}</div>
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
