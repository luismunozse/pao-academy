'use client';
import { ChevronRight } from 'lucide-react';

export default function FAQ({ t }:{ t:(k:string)=>string }){
  const items = [[t('q1'),t('a1')],[t('q2'),t('a2')],[t('q3'),t('a3')]];

  return (
    <section id="faq" className="section-neon">
      <div className="relative full-width-content py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-8">{t('faq')}</h2>

          <div className="space-y-4">
            {items.map(([q,a])=>(
              <details key={q} className="card-neon p-6 group">
                <summary className="cursor-pointer list-none text-lg font-medium text-white flex items-center justify-between">
                  {q}
                  <ChevronRight className="size-5 text-white/70 transition-transform group-open:rotate-90 flex-shrink-0 ml-4" />
                </summary>
                <p className="mt-4 text-white/80 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
