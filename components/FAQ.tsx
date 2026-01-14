'use client';
import { m } from 'framer-motion';
import { ChevronRight, HelpCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function FAQ({ t }:{ t:(k:string)=>string }){
  const items = [[t('q1'),t('a1')],[t('q2'),t('a2')],[t('q3'),t('a3')]];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-academic">
      <div className="relative full-width-content py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header mejorado */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full px-6 py-3 mb-6">
              <HelpCircle className="h-5 w-5 text-blue-400" />
              <span className="text-white font-semibold">Preguntas Frecuentes</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('faq')} <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">resueltas</span>
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Encuentra respuestas rápidas a las dudas más comunes sobre nuestros cursos
            </p>
          </m.div>

          {/* FAQ items con glassmorphism premium */}
          <div className="space-y-4">
            {items.map(([q,a], index)=>(
              <m.details
                key={q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-md border border-white/20 hover:border-blue-400/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
                onToggle={(e) => setOpenIndex((e.target as HTMLDetailsElement).open ? index : null)}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                {/* Icon indicator */}
                <div className="absolute top-6 left-6 w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg shadow-blue-400/30 group-hover:shadow-blue-400/50 transition-all duration-300 group-hover:scale-110">
                  {openIndex === index ? (
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  ) : (
                    <Sparkles className="h-4 w-4 text-white" />
                  )}
                </div>

                <summary className="cursor-pointer list-none text-lg font-semibold text-white flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 rounded-lg pl-12 pr-2">
                  <span className="group-hover:text-blue-300 transition-colors">{q}</span>
                  <ChevronRight className="size-5 text-white/70 transition-all duration-300 group-open:rotate-90 group-hover:text-blue-400 flex-shrink-0 ml-4" />
                </summary>

                <m.div
                  initial={false}
                  animate={{ height: openIndex === index ? 'auto' : 0 }}
                  className="overflow-hidden"
                >
                  <p className="mt-4 pl-12 text-white/80 leading-relaxed">{a}</p>
                </m.div>
              </m.details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
