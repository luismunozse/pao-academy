'use client';
import { useEffect, useState } from 'react';
import { Menu, X, Globe, GraduationCap, BookOpen, Users, Target, Info, Phone, ChevronRight } from 'lucide-react';

export default function Header({
  brandName,
  onClickCTA,
  t,
  lang,
  setLang,        // si no lo pasás, no se muestra el selector (queda solo en footer)
}: {
  brandName: string;
  onClickCTA: () => void;
  t: (k: string) => string;
  lang?: 'es' | 'en';
  setLang?: (lang: 'es' | 'en') => void;
}) {
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // bloquea scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    const orig = document.body.style.overflow;
    document.body.style.overflow = open ? 'hidden' : orig || '';
    return () => { document.body.style.overflow = orig; };
  }, [open]);

  const navigationItems = [
    { href: '#inicio',            label: t('home'),          icon: GraduationCap },
    { href: '#cursos-en-vivo',    label: t('liveCourses'),   icon: BookOpen },
    { href: '#cursos-asincronos', label: t('asyncCourses'),  icon: BookOpen },
    { href: '#areas',             label: t('areas'),         icon: Target },
    { href: '#sobre-nosotros',    label: t('aboutUs'),       icon: Info },
    { href: '#contacto',          label: t('contact'),       icon: Phone },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] header-glass ${elevated ? 'header-elevated' : ''}`}
        role="banner"
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-[color:var(--academic-primary)] text-white px-3 py-1 rounded"
        >
          {t('skip')}
        </a>

        <div className={`mx-auto max-w-7xl px-4 sm:px-6 header-size ${elevated ? 'py-2' : 'py-3'}`}>
          <div className="flex items-center justify-between">
            {/* Logo group */}
            <a href="#inicio" className="flex items-center gap-3 group">
              <div className={`logo-badge grid place-items-center ${elevated ? 'w-10 h-10' : 'w-12 h-12'}`}>
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              {/* Oculto en XS para no robar ancho; visible ≥sm */}
              <div className="hidden sm:block">
                <span className="text-white font-academic-heading text-lg leading-none block">
                  {brandName}
                </span>
                <span className="text-white/60 text-xs font-academic leading-none lg:hidden">{t('brandTagline')}</span>
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all font-academic"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>

            {/* Desktop actions */}
            <div className="hidden lg:flex items-center gap-3">
              {setLang && (
                <button
                  onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                  aria-label="Change language"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-white font-academic font-medium">{lang?.toUpperCase()}</span>
                </button>
              )}
              <button onClick={onClickCTA} className="btn-academic-primary">
                {t('enrollNow')}
              </button>
            </div>

            {/* Mobile actions */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* CTA reducido en mobile (opcional) */}
              <button
                onClick={onClickCTA}
                className="hidden xs:inline-flex px-3 py-2 rounded-xl bg-[color:var(--academic-accent)] text-black font-semibold"
              >
                {t('knowMore')}
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setOpen(!open)}
                className={`hamburger ${open ? 'active' : ''}`}
                aria-label="Abrir menú"
                aria-expanded={open}
                aria-controls="mobile-menu"
              >
                <div className="hamburger-line"></div>
                <div className="hamburger-line"></div>
                <div className="hamburger-line"></div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu (slide) */}
      <div
        id="mobile-menu"
        className={`mobile-menu ${open ? 'active' : ''}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="mobile-menu-header">
          <div className="flex items-center gap-3">
            <div className="logo-badge w-10 h-10 grid place-items-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-academic-heading text-lg">{brandName}</h2>
              <p className="text-white/60 text-sm font-academic">Academia Profesional</p>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <nav className="mobile-menu-links">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="mobile-menu-link group"
              onClick={() => setOpen(false)}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          ))}
        </nav>

        <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
          {setLang && (
            <button
              onClick={() => {
                setLang(lang === 'es' ? 'en' : 'es');
                setOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
            >
              <Globe className="w-4 h-4" />
              <span className="text-white font-academic font-medium">
                {lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
              </span>
            </button>
          )}
          <button onClick={onClickCTA} className="w-full btn-academic-primary">
            {t('enrollNow')}
          </button>
        </div>
      </div>

      {/* Overlay */}
      {open && <div className="fixed inset-0 bg-black/50 z-[998] lg:hidden" onClick={() => setOpen(false)} />}
      {/* Spacer para evitar solapar contenido con header fijo */}
      <div aria-hidden className="h-[64px] sm:h-[72px]" />
    </>
  );
}
