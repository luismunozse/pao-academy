'use client';
import { m } from 'framer-motion';
import { Search, Filter, TrendingUp, Megaphone, Sparkles, Users, BarChart4, Database, Brain, ChevronRight } from 'lucide-react';
import { featureText, type Lang } from '../lib/i18n';

const featuresBase = [
  { id: 'ventas',    icon: <TrendingUp className="size-6" />, fallbackTag: 'Comercial'  },
  { id: 'marca',     icon: <Megaphone className="size-6"  />, fallbackTag: 'Branding'   },
  { id: 'habitos',   icon: <Sparkles className="size-6"   />, fallbackTag: 'Mindset'    },
  { id: 'liderazgo', icon: <Users className="size-6"      />, fallbackTag: 'Liderazgo'  },
  { id: 'powerbi',   icon: <BarChart4 className="size-6"  />, fallbackTag: 'Datos'      },
  { id: 'analytics', icon: <Database className="size-6"   />, fallbackTag: 'Datos'      },
  { id: 'datasci',   icon: <Brain className="size-6"      />, fallbackTag: 'Datos'      },
] as const;

type Feature = typeof featuresBase[number];

export type CatalogProps = {
  t:(k:string)=>string;
  lang:Lang;
  query:string;
  setQuery:(v:string)=>void;
  tag:string;
  setTag:(v:string)=>void;
  onClickCard:(title:string)=>void;
};

export function buildFeatureData(lang:Lang){
  return featuresBase.map(f => ({
    id:f.id,
    icon:f.icon,
    title: featureText[lang][f.id as keyof typeof featureText['es']].title,
    desc:  featureText[lang][f.id as keyof typeof featureText['es']].desc,
    tagLabel: featureText[lang][f.id as keyof typeof featureText['es']].tag ?? f.fallbackTag,
  }));
}

export default function Catalog({ t, lang, query, setQuery, tag, setTag, onClickCard }: CatalogProps){
  const features = buildFeatureData(lang);
  const tags = [t('all'), ...Array.from(new Set(features.map(f=>f.tagLabel)))];

  return (
    <section id="catalogo" className="section-neon">
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <m.h2
          initial={{opacity:0,y:10}}
          whileInView={{opacity:1,y:0}}
          viewport={{once:true}}
          className="text-2xl md:text-3xl font-semibold tracking-tight text-white"
        >
          {t('sectionPrograms')}
        </m.h2>

        <p className="mt-3 max-w-2xl text-white/80">{t('sectionProgramsDesc')}</p>

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* buscador */}
          <div className="relative w-full md:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/60"/>
            <input
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="input-neon w-full pl-10 pr-3 py-2"
              aria-label={t('searchPlaceholder')}
            />
          </div>

          {/* filtros */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-sm text-white/70">
              <Filter className="size-4"/> {t('filterLabel')}
            </span>
            {tags.map(tLabel => (
              <button
                key={tLabel}
                onClick={()=>setTag(tLabel)}
                className={`chip-neon ${tag===tLabel ? 'chip-neon-active' : ''}`}
                aria-pressed={tag===tLabel}
              >
                {tLabel}
              </button>
            ))}
          </div>
        </div>

        {/* grid de features */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f,i)=> (
            <m.div
              key={f.id}
              initial={{opacity:0,y:10}}
              whileInView={{opacity:1,y:0}}
              viewport={{once:true}}
              transition={{delay:i*0.03}}
              className="card-neon"
            >
              <div className="flex items-center gap-3">
                <div className="neon-icon">{f.icon}</div>
                <div className="text-[11px] uppercase tracking-wider text-white/70">{f.tagLabel}</div>
              </div>

              <h3 className="mt-3 text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-1 text-white/80">{f.desc}</p>

              <button
                onClick={()=>onClickCard(f.title)}
                className="btn-neon mt-4"
                aria-label={`${t('learnMoreAbout')} ${f.title}`}
              >
                {t('knowMore')} <ChevronRight className="size-4"/>
              </button>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
