'use client';
import { useEffect, useState } from 'react';
import { Menu, X, Globe, GraduationCap, BookOpen, Users, Target, Info, Phone, ChevronRight, ChevronDown, Video, FileText } from 'lucide-react';

export default function Header({
  brandName,
  onClickCTA,
  t,
  lang,
  setLang,        // si no lo pasás, no se muestra el selector (queda solo en footer)
  promoMessage = "40% OFF en cursos y formaciones",
  promoSubMessage = "¡Aprovecha esta oferta limitada!",
  showPromoBar = true,
}: {
  brandName: string;
  onClickCTA: () => void;
  t: (k: string) => string;
  lang?: 'es' | 'en';
  setLang?: (lang: 'es' | 'en') => void;
  promoMessage?: string;
  promoSubMessage?: string;
  showPromoBar?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);
  const [showPromo, setShowPromo] = useState(showPromoBar);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [nestedDropdownOpen, setNestedDropdownOpen] = useState<string | null>(null);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [mobileNestedOpen, setMobileNestedOpen] = useState<string | null>(null);

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

  // Cursos en vivo
  const liveCoursesList = [
    { name: 'Ventas Consultivas', tag: 'Comercial', href: '#cursos-en-vivo' },
    { name: 'Liderazgo Ágil', tag: 'Liderazgo', href: '#cursos-en-vivo' },
    { name: 'Motivación y Hábitos', tag: 'Mindset', href: '#cursos-en-vivo' },
    { name: 'Marca Personal', tag: 'Branding', href: '#cursos-en-vivo' },
    { name: 'Power BI desde Cero', tag: 'Datos', href: '#cursos-en-vivo' },
    { name: 'Data Analytics Bootcamp', tag: 'Datos', href: '#cursos-en-vivo' },
  ];

  // Categorías de cursos asincrónicos - Redirigen a WhatsApp
  const asyncCoursesCategories = [
    { name: '📊 Análisis de Datos', href: 'https://wa.me/5493517601441?text=¡Hola! Me interesa información sobre cursos de Análisis de Datos asincrónicos.' },
    { name: '💼 Negocios y Finanzas', href: 'https://wa.me/5493517601441?text=¡Hola! Me interesa información sobre cursos de Negocios y Finanzas asincrónicos.' },
    { name: '⚙️ Gestión de Procesos', href: 'https://wa.me/5493517601441?text=¡Hola! Me interesa información sobre cursos de Gestión de Procesos asincrónicos.' },
    { name: '🚀 Desarrollo Personal', href: 'https://wa.me/5493517601441?text=¡Hola! Me interesa información sobre cursos de Desarrollo Personal asincrónicos.' },
    { name: '💻 Tecnología', href: 'https://wa.me/5493517601441?text=¡Hola! Me interesa información sobre cursos de Tecnología asincrónicos.' },
    { name: '📱 Marketing Digital', href: 'https://wa.me/5493517601441?text=¡Hola! Me interesa información sobre cursos de Marketing Digital asincrónicos.' },
  ];

  // Estructura de navegación con submenu para cursos
  const coursesSubmenu = [
    { 
      label: t('liveCourses'), 
      icon: Video, 
      description: 'Clases en vivo con mentores',
      hasNestedSubmenu: true,
      nestedItems: liveCoursesList
    },
    { 
      label: t('asyncCourses'), 
      icon: FileText, 
      description: 'Aprende a tu ritmo',
      hasNestedSubmenu: true,
      nestedItems: asyncCoursesCategories
    },
  ];

  const navigationItems = [
    { href: '#inicio',            label: t('home'),          icon: GraduationCap },
    { 
      label: 'Cursos', 
      icon: BookOpen, 
      hasSubmenu: true, 
      submenu: coursesSubmenu 
    },
    { href: '#corporate-training', label: 'Corporate Training', icon: Target },
    { href: '#sobre-nosotros',    label: t('aboutUs'),       icon: Info },
    { 
      label: t('contact'), 
      icon: Phone, 
      isWhatsApp: true,
      href: 'https://wa.me/5493517601441?text=¡Hola! Me interesa recibir más información sobre los cursos de GLOMIND360.'
    },
  ];

  return (
    <>
      {/* Barra de Promoción */}
      {showPromo && (
        <div className={`fixed top-0 left-0 right-0 z-[1001] announcement-bar transition-all duration-300 ${elevated ? 'elevated text-white' : 'text-black'}`}>
          <div className="full-width-content py-2">
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <span className={`font-bold text-sm sm:text-base drop-shadow-sm ${elevated ? 'text-white' : 'text-black'}`}>🎉 {promoMessage}</span>
                <span className={`hidden sm:inline text-sm drop-shadow-sm ${elevated ? 'text-white' : 'text-black'}`}>{promoSubMessage}</span>
              </div>
              <button
                onClick={() => setShowPromo(false)}
                className={`announcement-bar-close p-1 rounded-full ${elevated ? 'text-white hover:bg-white/20' : 'text-black hover:bg-black/10'}`}
                aria-label="Cerrar promoción"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <header
        className={`fixed ${showPromo ? 'top-10' : 'top-0'} left-0 right-0 z-[1000] header-glass ${elevated ? 'header-elevated' : ''}`}
        role="banner"
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-[color:var(--academic-primary)] text-white px-3 py-1 rounded"
        >
          {t('skip')}
        </a>

        <div className={`full-width-content header-size ${elevated ? 'py-2' : 'py-3'}`}>
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
              {navigationItems.map((item, index) => (
                item.hasSubmenu ? (
                  // Menú con dropdown
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button
                      className="header-nav-link flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-white/70 hover:text-white hover:bg-white/8 transition-all duration-200 text-sm font-medium"
                    >
                      <item.icon className="w-3.5 h-3.5" />
                      <span>{item.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown menu principal */}
                    {dropdownOpen && (
                      <div className="absolute top-full left-0 mt-3 min-w-[360px] rounded-2xl border border-white/12 bg-[#0b0f1d]/98 backdrop-blur-md shadow-[0_24px_70px_rgba(0,0,0,0.55)] overflow-hidden z-[1200]">
                        <div className="flex divide-x divide-white/10">
                          {/* Primera columna: Categorías principales */}
                          <div className="w-64">
                            {item.submenu?.map((subitem, subIndex) => (
                              <div
                                key={subIndex}
                                className="relative"
                                onMouseEnter={() => setNestedDropdownOpen(subitem.label)}
                                onMouseLeave={() => setNestedDropdownOpen(null)}
                              >
                                <div className="flex items-start gap-3 px-4 py-2.5 hover:bg-white/10 transition-all duration-200 group cursor-pointer">
                                  <subitem.icon className="w-5 h-5 text-[color:var(--academic-accent)] mt-0.5 group-hover:scale-110 transition-transform" />
                                  <div className="flex-1">
                                    <div className="text-white font-semibold text-sm group-hover:text-[color:var(--academic-accent)] transition-colors">
                                      {subitem.label}
                                    </div>
                                    <div className="text-white/60 text-xs mt-0.5">
                                      {subitem.description}
                                    </div>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                                </div>

                                {/* Segunda columna: Lista de cursos */}
                                {nestedDropdownOpen === subitem.label && subitem.hasNestedSubmenu && (
                                  <div className="absolute left-full top-0 ml-0 w-72 bg-[#0b0f1d]/98 backdrop-blur-md border border-white/12 rounded-xl shadow-[0_24px_70px_rgba(0,0,0,0.55)] overflow-hidden z-[1300]">
                                    <div className="p-2 border-b border-white/10 bg-white/5">
                                      <div className="text-white font-bold text-sm px-3 py-1">
                                        {subitem.label}
                                      </div>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                      {subitem.nestedItems?.map((course: any, courseIndex: number) => (
                                        <a
                                          key={courseIndex}
                                          href={course.href}
                                          target={course.href.includes('wa.me') ? '_blank' : undefined}
                                          rel={course.href.includes('wa.me') ? 'noopener noreferrer' : undefined}
                                          className="flex items-center justify-between px-4 py-2.5 hover:bg-white/10 transition-all duration-200 group"
                                        >
                                          <div className="flex-1">
                                            <div className="text-white text-sm font-medium group-hover:text-[color:var(--academic-accent)] transition-colors">
                                              {course.name}
                                            </div>
                                            {course.tag && (
                                              <div className="text-white/50 text-xs mt-0.5">
                                                {course.tag}
                                              </div>
                                            )}
                                          </div>
                                          {course.href.includes('wa.me') ? (
                                            <span className="text-green-400 text-xs">💬</span>
                                          ) : (
                                            <ChevronRight className="w-3.5 h-3.5 text-white/40 group-hover:text-[color:var(--academic-accent)] group-hover:translate-x-0.5 transition-all" />
                                          )}
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // Menú normal sin dropdown
                  <a
                    key={item.href}
                    href={item.href}
                    target={item.isWhatsApp ? '_blank' : undefined}
                    rel={item.isWhatsApp ? 'noopener noreferrer' : undefined}
                    className="header-nav-link flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-white/70 hover:text-white hover:bg-white/8 transition-all duration-200 text-sm font-medium"
                  >
                    <item.icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                    {item.isWhatsApp && <span className="text-xs text-green-400">💬</span>}
                  </a>
                )
              ))}
            </nav>

            {/* Desktop actions */}
            <div className="hidden lg:flex items-center gap-2">
              {setLang && (
                <button
                  onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
                  className="header-lang-button flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-gradient-to-r from-white/10 to-white/15 hover:from-white/20 hover:to-white/25 transition-all duration-200 border border-white/20 hover:border-white/30"
                  aria-label="Change language"
                >
                  <Globe className="w-3.5 h-3.5 text-[color:var(--neon-cyan)]" />
                  <span className="text-white text-sm font-semibold">{lang?.toUpperCase()}</span>
                </button>
              )}
              <button onClick={onClickCTA} className="btn-primary btn-sm">
                {t('enrollNow')}
              </button>
            </div>

            {/* Mobile actions */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* CTA reducido en mobile (opcional) */}
              <button
                onClick={onClickCTA}
                className="hidden xs:inline-flex px-3 py-1.5 rounded-lg bg-gradient-to-r from-[color:var(--neon-accent)] to-[color:var(--neon-cyan)] text-white font-bold text-sm hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
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
          {navigationItems.map((item, index) => (
            item.hasSubmenu ? (
              // Item con submenu
              <div key={index} className="space-y-1">
                <button
                  onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
                  className="mobile-menu-link group w-full"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>{item.label}</span>
                    <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${mobileCoursesOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {/* Submenu expandible */}
                {mobileCoursesOpen && (
                  <div className="ml-4 space-y-1 mt-2">
                    {item.submenu?.map((subitem, subIndex) => (
                      <div key={subIndex} className="space-y-1">
                        <button
                          onClick={() => setMobileNestedOpen(mobileNestedOpen === subitem.label ? null : subitem.label)}
                          className="w-full flex items-start gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-all group"
                        >
                          <subitem.icon className="w-4 h-4 text-[color:var(--academic-accent)] mt-0.5 group-hover:scale-110 transition-transform" />
                          <div className="flex-1 text-left">
                            <div className="text-white font-semibold text-sm">
                              {subitem.label}
                            </div>
                            <div className="text-white/60 text-xs mt-0.5">
                              {subitem.description}
                            </div>
                          </div>
                          <ChevronDown className={`w-3.5 h-3.5 text-white/60 transition-transform ${mobileNestedOpen === subitem.label ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Lista de cursos nested */}
                        {mobileNestedOpen === subitem.label && subitem.hasNestedSubmenu && (
                          <div className="ml-6 space-y-1 mt-1">
                            {subitem.nestedItems?.map((course: any, courseIndex: number) => (
                              <a
                                key={courseIndex}
                                href={course.href}
                                target={course.href.includes('wa.me') ? '_blank' : undefined}
                                rel={course.href.includes('wa.me') ? 'noopener noreferrer' : undefined}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-all group"
                                onClick={() => {
                                  if (!course.href.includes('wa.me')) {
                                    setOpen(false);
                                    setMobileCoursesOpen(false);
                                    setMobileNestedOpen(null);
                                  }
                                }}
                              >
                                <div className="flex-1">
                                  <div className="text-white text-sm font-medium">
                                    {course.name}
                                  </div>
                                  {course.tag && (
                                    <div className="text-white/50 text-xs">
                                      {course.tag}
                                    </div>
                                  )}
                                </div>
                                {course.href.includes('wa.me') ? (
                                  <span className="text-green-400 text-xs">💬</span>
                                ) : (
                                  <ChevronRight className="w-3 h-3 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                                )}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // Item normal sin submenu
              <a
                key={item.href}
                href={item.href}
                target={item.isWhatsApp ? '_blank' : undefined}
                rel={item.isWhatsApp ? 'noopener noreferrer' : undefined}
                className="mobile-menu-link group"
                onClick={() => setOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>{item.label}</span>
                  {item.isWhatsApp ? (
                    <span className="text-green-400 text-sm ml-auto">💬</span>
                  ) : (
                    <ChevronRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                  )}
                </div>
              </a>
            )
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
          <button onClick={onClickCTA} className="btn-primary btn-full">
            {t('enrollNow')}
          </button>
        </div>
      </div>

      {/* Overlay */}
      {open && <div className="fixed inset-0 bg-black/50 z-[998] lg:hidden" onClick={() => setOpen(false)} />}
      {/* Spacer para evitar solapar contenido con header fijo */}
      <div aria-hidden className={`${showPromo ? 'h-[104px] sm:h-[112px]' : 'h-[64px] sm:h-[72px]'}`} />
    </>
  );
}
