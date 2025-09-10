'use client';
import { ChevronRight } from 'lucide-react';

export default function FAQ({ t }:{ t:(k:string)=>string }){
  const items = [[t('q1'),t('a1')],[t('q2'),t('a2')],[t('q3'),t('a3')]];

  return (
    <section id="faq" className="section-neon">
      <div className="relative mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">{t('faq')}</h2>

        <div className="mt-6 space-y-3">
          {items.map(([q,a])=>(
            <details key={q} className="card-neon p-5 group">
              <summary className="cursor-pointer list-none text-lg font-medium text-white flex items-center justify-between">
                {q}
                <ChevronRight className="size-4 text-white/70 transition-transform group-open:rotate-90" />
              </summary>
              <p className="mt-2 text-white/80">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
