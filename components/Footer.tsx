'use client';
import { Globe } from 'lucide-react';
import type { Lang } from '../lib/i18n';

export default function Footer({
  brandName, t, lang, setLang
}:{ brandName:string; t:(k:string)=>string; lang:Lang; setLang:(l:Lang)=>void; }){
  return (
    <footer className="section-neon">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="size-5 rounded-md bg-[color:var(--neon-blue)]/90" />
          <span className="text-white/90">{brandName}</span>
        </div>

        <div className="flex gap-4">
          <a href="#catalogo" className="text-white/80 hover:text-white">{t('catalog')}</a>
          <a href="#contacto" className="text-white/80 hover:text-white">{t('contact')}</a>
        </div>

        {/* Idioma */}
        <div className="flex items-center gap-2">
          <Globe className="size-4 text-white/70" />
          <button
            onClick={() => setLang('es')}
            className={`chip-neon ${lang === 'es' ? 'chip-neon-active' : ''}`}
            aria-pressed={lang === 'es'}
          >
            ES
          </button>
          <button
            onClick={() => setLang('en')}
            className={`chip-neon ${lang === 'en' ? 'chip-neon-active' : ''}`}
            aria-pressed={lang === 'en'}
          >
            EN
          </button>
        </div>
      </div>

      <div className="pb-6 text-center text-xs text-white/60">© 2025 — {t('rights')}</div>
    </footer>
  );
}
