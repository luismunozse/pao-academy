'use client';
import { Globe, GraduationCap, Mail, ArrowRight, MessageCircle, Linkedin, Instagram, Youtube } from 'lucide-react';
import type { Lang } from '../lib/i18n';

export default function Footer({
  brandName, t, lang, setLang
}:{ brandName:string; t:(k:string)=>string; lang:Lang; setLang:(l:Lang)=>void; }){
  return (
    <footer className="section-academic">
      <div className="full-width-content">
        {/* Línea superior con gradiente */}
        <div className="footer-gradient-line mb-8 sm:mb-12"></div>
        
        {/* Contenido principal */}
        <div className="footer-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Brand */}
          <div className="footer-brand-section">
            <div className="flex items-center gap-3 mb-4">
              <div className="footer-brand-logo w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">{brandName}</h3>
                <p className="text-xs sm:text-sm text-white/70">Academia Profesional</p>
              </div>
            </div>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
              Formación práctica para líderes y equipos. Desarrollamos las habilidades del futuro con mentores expertos y proyectos reales.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className="footer-links-section">
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Enlaces Rápidos</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="#inicio" className="footer-link text-white/70 hover:text-[color:var(--neon-cyan)] flex items-center gap-2 group text-xs sm:text-sm">
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  Inicio
                </a>
              </li>
              <li>
                <a href="#cursos-en-vivo" className="footer-link text-white/70 hover:text-[color:var(--neon-cyan)] flex items-center gap-2 group text-xs sm:text-sm">
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  Cursos en Vivo
                </a>
              </li>
              <li>
                <a href="#cursos-asincronos" className="footer-link text-white/70 hover:text-[color:var(--neon-cyan)] flex items-center gap-2 group text-xs sm:text-sm">
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  Cursos Asincrónicos
                </a>
              </li>
              <li>
                <a href="#contacto" className="footer-link text-white/70 hover:text-[color:var(--neon-cyan)] flex items-center gap-2 group text-xs sm:text-sm">
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="footer-contact-section">
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{t('footerContact')}</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li className="footer-contact-item flex items-center gap-2 sm:gap-3 text-white/70">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-[color:var(--neon-cyan)] flex-shrink-0" />
                <span className="text-xs sm:text-sm break-all">{t('footerContactEmail')}</span>
              </li>
              <li className="footer-contact-item flex items-center gap-2 sm:gap-3 text-white/70">
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-[color:var(--neon-cyan)] flex-shrink-0" />
                <span className="text-xs sm:text-sm">{t('footerContactWhatsApp')}</span>
              </li>
              <li className="footer-contact-item flex items-center gap-2 sm:gap-3 text-white/70">
                <div className="flex items-center gap-2">
                  <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 text-[color:var(--neon-cyan)]" />
                  <Instagram className="w-3 h-3 sm:w-4 sm:h-4 text-[color:var(--neon-cyan)]" />
                  <Youtube className="w-3 h-3 sm:w-4 sm:h-4 text-[color:var(--neon-cyan)]" />
                </div>
                <span className="text-xs sm:text-sm">{t('footerSocialMedia')}</span>
              </li>
            </ul>
          </div>

          {/* Legales */}
          <div className="footer-legal-section">
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{t('footerLegal')}</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="/politicas-privacidad" className="footer-link text-white/70 hover:text-[color:var(--neon-cyan)] flex items-center gap-2 group text-xs sm:text-sm">
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  {t('footerPrivacyPolicy')}
                </a>
              </li>
              <li>
                <a href="/terminos-condiciones" className="footer-link text-white/70 hover:text-[color:var(--neon-cyan)] flex items-center gap-2 group text-xs sm:text-sm">
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  {t('footerTermsConditions')}
                </a>
              </li>
              <li>
                <a href="/arrepentimiento" className="footer-link text-white/70 hover:text-[color:var(--neon-cyan)] flex items-center gap-2 group text-xs sm:text-sm">
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  {t('footerWithdrawalButton')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="h-px bg-white/10 mb-6 sm:mb-8"></div>

        {/* Footer inferior */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 pb-6 sm:pb-8">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs sm:text-sm text-white/60 text-center sm:text-left">
            <span>© 2025 {brandName}</span>
            <span className="hidden sm:inline">•</span>
            <span>{t('rights')}</span>
          </div>

          {/* Idioma */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-white/70" />
            <div className="flex gap-1 bg-white/5 rounded-lg p-1">
              <button
                onClick={() => setLang('es')}
                className={`footer-lang-button px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
                  lang === 'es' 
                    ? 'bg-[color:var(--neon-cyan)] text-black' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
                aria-pressed={lang === 'es'}
              >
                ES
              </button>
              <button
                onClick={() => setLang('en')}
                className={`footer-lang-button px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
                  lang === 'en' 
                    ? 'bg-[color:var(--neon-cyan)] text-black' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
                aria-pressed={lang === 'en'}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
