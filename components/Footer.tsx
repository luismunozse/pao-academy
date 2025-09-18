'use client';
import { Linkedin, Instagram, Youtube } from 'lucide-react';
import type { Lang } from '../lib/i18n';

export default function Footer({
  brandName, t, lang: _lang, setLang: _setLang
}:{ brandName:string; t:(k:string)=>string; lang:Lang; setLang:(l:Lang)=>void; }){
  const year = new Date().getFullYear();
  return (
    <footer className="section-academic">
      <div className="full-width-content">
        <div className="footer-gradient-line mb-8 sm:mb-12"></div>
        <div className="flex flex-col items-center justify-center gap-4 pb-10">
          <div className="flex items-center gap-3">
            <img
              src="/logo.svg"
              alt={`${brandName} logo`}
              className="h-8 w-auto"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
            <span className="text-white text-lg font-semibold">{brandName}</span>
          </div>
          {/* Redes sociales */}
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-white hover:text-[color:var(--neon-cyan)] transition-colors" />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-white hover:text-[color:var(--neon-cyan)] transition-colors" />
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Youtube className="w-5 h-5 sm:w-6 sm:h-6 text-white hover:text-[color:var(--neon-cyan)] transition-colors" />
            </a>
          </div>
          {/* Legales */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-white/70">
            <a href="/politicas-privacidad" className="hover:text-white transition-colors">
              {t('footerPrivacyPolicy') || 'Políticas de Privacidad'}
            </a>
            <span className="hidden sm:inline">•</span>
            <a href="/terminos-condiciones" className="hover:text-white transition-colors">
              {t('footerTermsConditions') || 'Términos y Condiciones'}
            </a>
            <span className="hidden sm:inline">•</span>
            <a href="/arrepentimiento" className="hover:text-white transition-colors">
              {t('footerWithdrawalButton') || 'Botón de Arrepentimiento'}
            </a>
          </div>
          <div className="text-xs sm:text-sm text-white/60 text-center">
            © {year} {brandName}. {t('rights') || 'Todos los derechos reservados.'}
          </div>
        </div>
      </div>
    </footer>
  );
}
