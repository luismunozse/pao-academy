'use client';
import { useEffect, useState } from 'react';
import { Menu, X, Globe, GraduationCap, BookOpen, Users, Target, Info, Phone, ChevronRight, ChevronDown, Video, FileText } from 'lucide-react';

export default function HeaderModern({
  brandName,
  onClickCTA,
  t,
  lang,
  setLang,
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
  const [scrolled, setScrolled] = useState(false);
  const [showPromo, setShowPromo] = useState(showPromoBar);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [nestedDropdownOpen, setNestedDropdownOpen] = useState<string | null>(null);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [mobileNestedOpen, setMobileNestedOpen] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const orig = document.body.style.overflow;
    document.body.style.overflow = open ? 'hidden' : orig || '';
    return () => { document.body.style.overflow = orig; };
  }, [open]);

  const liveCoursesList = [
    { name: 'Ventas Consultivas', tag: 'Comercial', href: '#cursos-en-vivo' },
    { name: 'Liderazgo Ágil', tag: 'Liderazgo', href: '#cursos-en-vivo' },
    { name: 'Motivación y Hábitos', tag: 'Mindset', href: '#cursos-en-vivo' },
    { name: 'Marca Personal', tag: 'Branding', href: '#cursos-en-vivo' },
    { name: 'Power BI desde Cero', tag: 'Datos', href: '#cursos-en-vivo' },
    { name: 'Data Analytics Bootcamp', tag: 'Datos', href: '#cursos-en-vivo' },
  ];

  const asyncCoursesCategories = [
    { name: '📊 Análisis de Datos', href: 'https://wa.me/5493517601441?text=¡Hola! Me interesa información sobre cursos de Análisis de Datos asincrónicos.' },
    { name: '💼 Negocios y Finanzas', href: 'https://wa.me/5493517601441?text=¡Hola! Me interesa información sobre cursos de Negocios y Finanzas asincrónicos.' },
    { name: '⚙️ Gestión de Procesos', href: 'https://wa.me/5493517601441?text=¡Hola! Me interesa información sobre cursos de Gestión de Procesos asincrónicos.' },
    { name: '🚀 Desarrollo Personal', href: 'https://wa.me/5493517601441?text=¡Hola! Me interesa información sobre cursos de Desarrollo Personal asincrónicos.' },
    { name: '💻 Tecnología', href: 'https://wa.me/5493517601441?text=¡Hola! Me interesa información sobre cursos de Tecnología asincrónicos.' },
    { name: '📱 Marketing Digital', href: 'https://wa.me/5493517601441?text=¡Hola! Me interesa información sobre cursos de Marketing Digital asincrónicos.' },
  ];

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
    { href: '#inicio', label: t('home'), icon: GraduationCap },
    {
      label: 'Cursos',
      icon: BookOpen,
      hasSubmenu: true,
      submenu: coursesSubmenu
    },
    { href: '#corporate-training', label: 'Corporate Training', icon: Target },
    { href: '#sobre-nosotros', label: t('aboutUs'), icon: Info },
    {
      label: t('contact'),
      icon: Phone,
      isWhatsApp: true,
      href: 'https://wa.me/5493517601441?text=¡Hola! Me interesa recibir más información sobre los cursos de GLOMIND360.'
    },
  ];

  return (
    <>
      {/* Barra de Promoción Urgente - EducaciónIT Style */}
      {showPromo && (
        <div className="fixed top-0 left-0 right-0 z-[1001] bg-gradient-to-r from-red-500 to-orange-500">
          <div className="max-w-7xl mx-auto px-4 py-2.5 relative">
            <div className="flex items-center justify-center gap-3">
              <span className="font-bold text-xs sm:text-sm text-white">
                🔥 {promoMessage}
              </span>
              <span className="hidden sm:inline text-xs sm:text-sm text-white/90">
                {promoSubMessage}
              </span>
            </div>
            <button
              onClick={() => setShowPromo(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Cerrar promoción"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Header blanco limpio - Platzi/EducaciónIT Style */}
      <header
        className={`fixed ${showPromo ? 'top-[42px]' : 'top-0'} left-0 right-0 z-[1000] bg-white border-b border-gray-200 transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}
        role="banner"
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-blue-600 text-white px-3 py-1 rounded"
        >
          {t('skip')}
        </a>

        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#inicio" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg transition-all group-hover:shadow-xl" style={{
                background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)'
              }}>
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="text-gray-900 font-bold text-lg leading-none block">
                  {brandName}
                </span>
                <span className="text-gray-500 text-xs leading-none">{t('brandTagline')}</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigationItems.map((item, index) => (
                item.hasSubmenu ? (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => {
                      setDropdownOpen(false);
                      setNestedDropdownOpen(null);
                    }}
                  >
                    <button
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 text-sm font-medium"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown moderno blanco */}
                    {dropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 min-w-[360px] rounded-xl border border-gray-200 bg-white shadow-2xl z-[1200]">
                        <div className="flex divide-x divide-gray-200">
                          <div className="w-64 overflow-hidden rounded-l-xl">
                            {item.submenu?.map((subitem, subIndex) => (
                              <div
                                key={subIndex}
                                className="relative"
                                onMouseEnter={() => setNestedDropdownOpen(subitem.label)}
                              >
                                <div className="flex items-start gap-3 px-4 py-3 hover:bg-blue-50 transition-all duration-200 group cursor-pointer">
                                  <subitem.icon className="w-5 h-5 text-blue-600 mt-0.5 group-hover:scale-110 transition-transform" />
                                  <div className="flex-1">
                                    <div className="text-gray-900 font-semibold text-sm group-hover:text-blue-600 transition-colors">
                                      {subitem.label}
                                    </div>
                                    <div className="text-gray-500 text-xs mt-0.5">
                                      {subitem.description}
                                    </div>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                </div>

                                {/* Nested dropdown */}
                                {nestedDropdownOpen === subitem.label && subitem.hasNestedSubmenu && (
                                  <div className="absolute left-full top-0 ml-1 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl z-[1300]" style={{
                                    maxHeight: '500px'
                                  }}>
                                    <div className="p-3 border-b border-gray-200 bg-gray-50">
                                      <div className="text-gray-900 font-bold text-sm">
                                        {subitem.label}
                                      </div>
                                    </div>
                                    <div className="overflow-y-auto" style={{ maxHeight: '440px' }}>
                                      {subitem.nestedItems?.map((course: any, courseIndex: number) => (
                                        <a
                                          key={courseIndex}
                                          href={course.href}
                                          target={course.href.includes('wa.me') ? '_blank' : undefined}
                                          rel={course.href.includes('wa.me') ? 'noopener noreferrer' : undefined}
                                          className="flex items-center justify-between px-4 py-2.5 hover:bg-blue-50 transition-all duration-200 group"
                                        >
                                          <div className="flex-1">
                                            <div className="text-gray-900 text-sm font-medium group-hover:text-blue-600 transition-colors">
                                              {course.name}
                                            </div>
                                            {course.tag && (
                                              <div className="text-gray-500 text-xs mt-0.5">
                                                {course.tag}
                                              </div>
                                            )}
                                          </div>
                                          {course.href.includes('wa.me') ? (
                                            <span className="text-green-500 text-xs">💬</span>
                                          ) : (
                                            <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
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
                  <a
                    key={item.href}
                    href={item.href}
                    target={item.isWhatsApp ? '_blank' : undefined}
                    rel={item.isWhatsApp ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 text-sm font-medium"
                  >
                    <span>{item.label}</span>
                  </a>
                )
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              {setLang && (
                <button
                  onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                  aria-label="Change language"
                >
                  <Globe className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-900 text-sm font-semibold">{lang?.toUpperCase()}</span>
                </button>
              )}
              <button
                onClick={onClickCTA}
                className="btn-modern-primary btn-modern-sm"
              >
                {t('enrollNow')}
              </button>
            </div>

            {/* Mobile: Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Abrir menú"
              aria-expanded={open}
            >
              {open ? <X className="w-6 h-6 text-gray-900" /> : <Menu className="w-6 h-6 text-gray-900" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Blanco moderno */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-[1100] ${
          open ? 'translate-x-0' : 'translate-x-full'
        } lg:hidden`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-gray-900 font-bold text-lg">{brandName}</h2>
              <p className="text-gray-500 text-sm">Academia Profesional</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6 text-gray-900" />
          </button>
        </div>

        <nav className="p-4 space-y-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
          {navigationItems.map((item, index) => (
            item.hasSubmenu ? (
              <div key={index} className="space-y-1">
                <button
                  onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50 transition-all text-gray-900"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileCoursesOpen ? 'rotate-180' : ''}`} />
                </button>

                {mobileCoursesOpen && (
                  <div className="ml-4 space-y-1 mt-2">
                    {item.submenu?.map((subitem, subIndex) => (
                      <div key={subIndex} className="space-y-1">
                        <button
                          onClick={() => setMobileNestedOpen(mobileNestedOpen === subitem.label ? null : subitem.label)}
                          className="w-full flex items-start gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-all"
                        >
                          <subitem.icon className="w-4 h-4 text-blue-600 mt-0.5" />
                          <div className="flex-1 text-left">
                            <div className="text-gray-900 font-semibold text-sm">
                              {subitem.label}
                            </div>
                            <div className="text-gray-500 text-xs mt-0.5">
                              {subitem.description}
                            </div>
                          </div>
                          <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform ${mobileNestedOpen === subitem.label ? 'rotate-180' : ''}`} />
                        </button>

                        {mobileNestedOpen === subitem.label && subitem.hasNestedSubmenu && (
                          <div className="ml-6 space-y-1 mt-1">
                            {subitem.nestedItems?.map((course: any, courseIndex: number) => (
                              <a
                                key={courseIndex}
                                href={course.href}
                                target={course.href.includes('wa.me') ? '_blank' : undefined}
                                rel={course.href.includes('wa.me') ? 'noopener noreferrer' : undefined}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all"
                                onClick={() => {
                                  if (!course.href.includes('wa.me')) {
                                    setOpen(false);
                                    setMobileCoursesOpen(false);
                                    setMobileNestedOpen(null);
                                  }
                                }}
                              >
                                <div className="flex-1">
                                  <div className="text-gray-900 text-sm font-medium">
                                    {course.name}
                                  </div>
                                  {course.tag && (
                                    <div className="text-gray-500 text-xs">
                                      {course.tag}
                                    </div>
                                  )}
                                </div>
                                {course.href.includes('wa.me') ? (
                                  <span className="text-green-500 text-xs">💬</span>
                                ) : (
                                  <ChevronRight className="w-3 h-3 text-gray-400" />
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
              <a
                key={item.href}
                href={item.href}
                target={item.isWhatsApp ? '_blank' : undefined}
                rel={item.isWhatsApp ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-all text-gray-900"
                onClick={() => setOpen(false)}
              >
                <item.icon className="w-5 h-5 text-blue-600" />
                <span className="font-medium">{item.label}</span>
                {item.isWhatsApp && <span className="text-green-500 text-sm ml-auto">💬</span>}
              </a>
            )
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white space-y-3">
          {setLang && (
            <button
              onClick={() => {
                setLang(lang === 'es' ? 'en' : 'es');
                setOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all"
            >
              <Globe className="w-4 h-4 text-gray-600" />
              <span className="text-gray-900 font-medium">
                {lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
              </span>
            </button>
          )}
          <button
            onClick={onClickCTA}
            className="btn-modern-primary w-full"
          >
            {t('enrollNow')}
          </button>
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-[1050] lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
