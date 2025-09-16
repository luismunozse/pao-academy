'use client';
import { Globe, GraduationCap, Mail, Phone, MapPin, ArrowRight, ExternalLink } from 'lucide-react';
import type { Lang } from '../lib/i18n';

export default function Footer({
  brandName, t, lang, setLang
}:{ brandName:string; t:(k:string)=>string; lang:Lang; setLang:(l:Lang)=>void; }){
  return (
    <footer className="section-academic">
      <div className="full-width-content">
        {/* Línea superior con gradiente */}
        <div className="footer-gradient-line mb-12"></div>
        
        {/* Contenido principal */}
        <div className="footer-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="footer-brand-section lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="footer-brand-logo w-12 h-12 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{brandName}</h3>
                <p className="text-sm text-white/70">Academia Profesional</p>
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed max-w-md">
              Formación práctica para líderes y equipos. Desarrollamos las habilidades del futuro con mentores expertos y proyectos reales.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className="footer-links-section">
            <h4 className="text-white font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <a href="#inicio" className="footer-link text-white/70 hover:text-[color:var(--neon-cyan)] flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  Inicio
                </a>
              </li>
              <li>
                <a href="#cursos-en-vivo" className="footer-link text-white/70 hover:text-[color:var(--neon-cyan)] flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  Cursos en Vivo
                </a>
              </li>
              <li>
                <a href="#featured" className="footer-link text-white/70 hover:text-[color:var(--neon-cyan)] flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  Cursos Destacados
                </a>
              </li>
              <li>
                <a href="#contacto" className="footer-link text-white/70 hover:text-[color:var(--neon-cyan)] flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="footer-contact-section">
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="footer-contact-item flex items-center gap-3 text-white/70">
                <Mail className="w-4 h-4 text-[color:var(--neon-cyan)]" />
                <span className="text-sm">info@glomind360.com</span>
              </li>
              <li className="footer-contact-item flex items-center gap-3 text-white/70">
                <Phone className="w-4 h-4 text-[color:var(--neon-cyan)]" />
                <span className="text-sm">+54 351 760-1441</span>
              </li>
              <li className="footer-contact-item flex items-center gap-3 text-white/70">
                <MapPin className="w-4 h-4 text-[color:var(--neon-cyan)]" />
                <span className="text-sm">Córdoba, Argentina</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="h-px bg-white/10 mb-8"></div>

        {/* Footer inferior */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-8">
          <div className="flex items-center gap-6 text-sm text-white/60">
            <span>© 2025 {brandName}</span>
            <span>•</span>
            <span>{t('rights')}</span>
          </div>

          {/* Idioma */}
          <div className="flex items-center gap-3">
            <Globe className="w-4 h-4 text-white/70" />
            <div className="flex gap-1 bg-white/5 rounded-lg p-1">
              <button
                onClick={() => setLang('es')}
                className={`footer-lang-button px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
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
                className={`footer-lang-button px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
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
