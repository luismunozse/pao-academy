'use client';
import { useEffect, useState } from 'react';
import { X, Globe, GraduationCap, BookOpen, Users, Target, Info, Phone, ChevronRight, ChevronDown, Video, FileText, Menu } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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

  const asyncCoursesCategories: { name: string; href: string; tag?: string }[] = [
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
      nestedItems: liveCoursesList
    },
    {
      label: t('asyncCourses'),
      icon: FileText,
      description: 'Aprende a tu ritmo',
      nestedItems: asyncCoursesCategories
    },
  ];

  return (
    <>
      {/* Barra de Promoción */}
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

      {/* Header */}
      <header
        className={`fixed ${showPromo ? 'top-[42px]' : 'top-0'} left-0 right-0 z-[1000] bg-white border-b border-gray-200 transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}
        role="banner"
      >
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

            {/* Desktop Navigation con shadcn NavigationMenu */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                {/* Inicio */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#inicio"
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                  >
                    {t('home')}
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Cursos - Con Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900 data-[state=open]:bg-gray-100">
                    <BookOpen className="w-4 h-4 mr-1.5" />
                    Cursos
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[600px] p-4">
                      <div className="grid grid-cols-2 gap-4">
                        {coursesSubmenu.map((category, idx) => (
                          <div key={idx} className="space-y-3">
                            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                              <category.icon className="w-5 h-5 text-blue-600" />
                              <div>
                                <div className="font-semibold text-gray-900">{category.label}</div>
                                <div className="text-xs text-gray-500">{category.description}</div>
                              </div>
                            </div>
                            <div className="space-y-1">
                              {category.nestedItems.map((course, courseIdx) => (
                                <NavigationMenuLink
                                  key={courseIdx}
                                  href={course.href}
                                  target={course.href.includes('wa.me') ? '_blank' : undefined}
                                  rel={course.href.includes('wa.me') ? 'noopener noreferrer' : undefined}
                                  className="block px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors group"
                                >
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                                        {course.name}
                                      </div>
                                      {course.tag && (
                                        <div className="text-xs text-gray-500">{course.tag}</div>
                                      )}
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                                  </div>
                                </NavigationMenuLink>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Corporate Training */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#corporate-training"
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                  >
                    Corporate Training
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Sobre Nosotros */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#sobre-nosotros"
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                  >
                    {t('aboutUs')}
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Contacto */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="https://wa.me/5493517601441?text=¡Hola! Me interesa recibir más información sobre los cursos de GLOMIND360."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                  >
                    {t('contact')}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

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

      {/* Mobile Menu */}
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
          {/* Inicio */}
          <a
            href="#inicio"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-all text-gray-900"
            onClick={() => setOpen(false)}
          >
            <GraduationCap className="w-5 h-5 text-blue-600" />
            <span className="font-medium">{t('home')}</span>
          </a>

          {/* Cursos con submenu */}
          <div className="space-y-1">
            <button
              onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50 transition-all text-gray-900"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Cursos</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileCoursesOpen ? 'rotate-180' : ''}`} />
            </button>

            {mobileCoursesOpen && (
              <div className="ml-4 space-y-1 mt-2">
                {coursesSubmenu.map((subitem, subIndex) => (
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

                    {mobileNestedOpen === subitem.label && (
                      <div className="ml-6 space-y-1 mt-1">
                        {subitem.nestedItems.map((course, courseIndex) => (
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
                            <ChevronRight className="w-3 h-3 text-gray-400" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Corporate Training */}
          <a
            href="#corporate-training"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-all text-gray-900"
            onClick={() => setOpen(false)}
          >
            <Target className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Corporate Training</span>
          </a>

          {/* Sobre Nosotros */}
          <a
            href="#sobre-nosotros"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-all text-gray-900"
            onClick={() => setOpen(false)}
          >
            <Info className="w-5 h-5 text-blue-600" />
            <span className="font-medium">{t('aboutUs')}</span>
          </a>

          {/* Contacto */}
          <a
            href="https://wa.me/5493517601441?text=¡Hola! Me interesa recibir más información sobre los cursos de GLOMIND360."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-all text-gray-900"
          >
            <Phone className="w-5 h-5 text-blue-600" />
            <span className="font-medium">{t('contact')}</span>
          </a>
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
