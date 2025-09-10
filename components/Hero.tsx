'use client';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import { CheckCircle2, ChevronRight } from 'lucide-react';

export default function Hero({
  brandName, t, cta, reducedMotion
}:{
  brandName:string; t:(k:string)=>string; cta:()=>void; reducedMotion:boolean;
}){
  const [first, ...restArr] = t('brandTagline').split(' ');
  const rest = restArr.join(' ');

  return (
    <section className="relative hero-neon">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24 text-white">
        <LazyMotion features={domAnimation} strict>
          <m.h1
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: .5 }}
            className="text-4xl md:text-6xl font-bold leading-tight tracking-tight"
          >
            {first}{' '}
            <span className="bg-white/95 bg-clip-text text-transparent drop-shadow">
              {rest}
            </span>
          </m.h1>
        </LazyMotion>

        <p className="mt-4 max-w-2xl text-lg text-white/90">
          {brandName} {t('heroDesc')}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          {/* CTA principal neón */}
          <button className="btn-neon" onClick={cta}>
            {t('knowMore')}
          </button>

          {/* Secundario tipo link */}
          <button
            className="btn-link link-neon inline-flex items-center gap-1"
            onClick={() => document.querySelector("#catalogo")?.scrollIntoView({ behavior: "smooth" })}
          >
            {t('viewCatalog')}
            <ChevronRight className="size-4" />
          </button>
        </div>

        <ul className="mt-8 flex flex-wrap gap-4 text-sm text-white/85">
          <li className="flex items-center gap-2"><CheckCircle2 className="size-4" /> {t('bullet1')}</li>
          <li className="flex items-center gap-2"><CheckCircle2 className="size-4" /> {t('bullet2')}</li>
          <li className="flex items-center gap-2"><CheckCircle2 className="size-4" /> {t('bullet3')}</li>
        </ul>
      </div>
    </section>
  );
}
