'use client';
import { m } from 'framer-motion';
import { PlayCircle, Users, Clock, MapPin, ChevronRight } from 'lucide-react';

export default function Featured({
  t, cursos, onClickCourse
}:{ t:(k:string)=>string; cursos:any[]; onClickCourse:(title:string)=>void; }){
  const title = t('featured');
  const lead  = t('featuredDesc');

  return (
    <section id="featured" className="section-neon">
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-white text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
            <p className="mt-2 text-white/80">{lead}</p>
          </div>
          <a href="#contacto" className="hidden md:inline-flex btn-ghost">{t('contact')}</a>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cursos.map((c,i)=>(
            <m.article
              key={c.titulo}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="card-neon group"
            >
              <div className="flex items-center justify-between">
                {c.tag && <span className="badge-neon">{c.tag}</span>}
                <PlayCircle className="size-5 text-white/70" />
              </div>

              <h3 className="mt-3 text-lg font-semibold tracking-tight text-white">
                {c.titulo}
              </h3>

              <ul className="mt-3 space-y-1 text-sm text-white/80">
                {c.duracion && (
                  <li className="flex items-center gap-2"><Clock className="size-4 text-white/60" /> {c.duracion}</li>
                )}
                <li className="flex items-center gap-2"><Users className="size-4 text-white/60" /> {c.modalidad}</li>
                {c.inicio && (
                  <li className="flex items-center gap-2"><MapPin className="size-4 text-white/60" /> {t('nextCohort')}: {c.inicio}</li>
                )}
              </ul>

              <div className="mt-5">
                <button onClick={()=>onClickCourse(c.titulo)} className="btn-neon">
                  {t('knowMore')} <ChevronRight className="size-4" />
                </button>
              </div>
            </m.article>
          ))}
        </div>

        <div className="neon-divider mt-12" />
      </div>
    </section>
  );
}
