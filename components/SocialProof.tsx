'use client';
import { m } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function SocialProof({
  t, lang, testimonios, idx
}:{ t:(k:string)=>string; lang:'es'|'en'; testimonios:any[]; idx:number; }){
  const test = testimonios[idx][lang];

  return (
    <section className="section-neon">
      <div className="relative full-width-content py-16">
        <div className="flex justify-center">
          {/* Testimonio */}
          <m.div initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="max-w-2xl w-full">
            <div className="flex items-center justify-center gap-2 text-sm text-white/70 mb-4">
              <Quote className="size-4" /> {t('whatTheySay')}
            </div>

            <div className="card-neon p-6 mt-3 text-center">
              <p className="text-lg leading-relaxed text-white mb-6">
                "{test.frase}"
              </p>
              
              {/* Información del autor con imagen */}
              <div className="flex items-center justify-center gap-4">
                <div className="relative">
                  <img 
                    src={test.imagen} 
                    alt={test.autor}
                    className="testimonial-image"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(test.autor)}&background=6366f1&color=fff&size=150`;
                    }}
                  />
                  <div className="testimonial-online-indicator"></div>
                </div>
                <div className="testimonial-author-info">
                  <p className="testimonial-author-name">
                    {test.autor}
                  </p>
                  <p className="testimonial-author-role">
                    {test.rol}
                  </p>
                </div>
              </div>
            </div>
          </m.div>

          {/* Métricas + logos */}
          {/* <m.div initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
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
                <div key={i} className="aspect-[3/1] rounded-xl border border-[color:var(--neon-border)] bg-white/[.03] flex items-center justify-center text-white/70 logo-box-neon">
                  LOGO
                </div>
              ))}
            </div>
          </m.div> */}
        </div>
      </div>
    </section>
  );
}
