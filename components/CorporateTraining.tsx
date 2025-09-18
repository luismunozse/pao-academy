'use client';
import { m } from 'framer-motion';
import { Building2, CheckCircle, ArrowRight, Users, Target, BarChart3 } from 'lucide-react';

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
    { text: t('corporateBullet3'), icon: BarChart3 },
  ];

  return (
    <section id="corporate-training" className="section-corporate">
      <div className="relative full-width-content py-12 md:py-16">
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

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
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
        </m.div>
      </div>
    </section>
  );
}
