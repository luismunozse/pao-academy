'use client';
import { m } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function SocialProof({
  t, lang, testimonios, idx
}:{ t:(k:string)=>string; lang:'es'|'en'; testimonios:any[]; idx:number; }){
  const test = testimonios[idx][lang];

  return (
    <section className="section-neon">
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Testimonio */}
          <m.div initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Quote className="size-4" /> {t('whatTheySay')}
            </div>

            <div className="card-neon p-6 mt-3">
              <p className="text-lg leading-relaxed text-white">
                “{test.frase}”
              </p>
              <p className="mt-3 text-white/80">
                {test.autor} — {test.rol}
              </p>
            </div>
          </m.div>

          {/* Métricas + logos */}
          <m.div initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[{k:'+4.9/5',v:t('satisfaction')},{k:'+3,000',v:t('students')},{k:'120+',v:t('companies')}].map(met => (
                <div key={met.v} className="card-neon p-5 text-center">
                  <div className="text-2xl font-bold text-white">{met.k}</div>
                  <div className="text-sm text-white/70">{met.v}</div>
                </div>
              ))}
            </div>

            <p className="mt-4 text-sm text-white/70">{t('companiesTrust')}</p>

            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Array.from({length:6}).map((_,i)=>(
                <div className="aspect-[3/1] rounded-xl border border-[color:var(--neon-border)] bg-white/[.03] flex items-center justify-center text-white/70 logo-box-neon">
                  LOGO
                </div>
              ))}
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
