'use client';
import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';

export default function Header({
  brandName,
  onClickCTA,
  t,
}: {
  brandName: string;
  onClickCTA: () => void;
  t: (k: string) => string;
}) {
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* glass dinámico; en top=0 es transparente, al scrollear toma fondo */}
      <div
        className={[
          'transition-colors border-b',
          elevated
            ? 'backdrop-blur-md bg-black/30 border-white/10'
            : 'bg-transparent border-transparent',
        ].join(' ')}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-[color:var(--neon-blue)] text-white px-3 py-1 rounded"
        >
          {t('skip')}
        </a>

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-white">
          <a href="#" className="flex items-center gap-2">
            <div className="size-6 rounded-md bg-[color:var(--neon-blue)]/90" />
            <span className="text-sm font-bold tracking-wider uppercase">
              {brandName}
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm opacity-90">
            <a href="#catalogo" className="hover:opacity-100">{t('catalog')}</a>
            <a href="#rutas" className="hover:opacity-100">{t('paths')}</a>
            <a href="#contacto" className="hover:opacity-100">{t('contact')}</a>
            <a href="#faq" className="hover:opacity-100">{t('faq')}</a>
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={onClickCTA} className="hidden sm:inline-flex btn-neon">
              {t('knowMore')}
            </button>
            <button
              className="md:hidden rounded-lg border border-white/20 bg-white/10 p-2 text-white"
              onClick={() => setOpen(o => !o)}
              aria-label={t('openMenu')}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </div>

      {/* menú móvil vidrio */}
      {open && (
        <div className="md:hidden px-6 pb-4 text-white">
          <div className="card-neon p-4 flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-4 mt-2">
              <a href="#catalogo" className="hover:text-white">{t('catalog')}</a>
              <a href="#rutas" className="hover:text-white">{t('paths')}</a>
              <a href="#contacto" className="hover:text-white">{t('contact')}</a>
              <a href="#faq" className="hover:text-white">{t('faq')}</a>
            </div>
            <button onClick={onClickCTA} className="mt-2 inline-flex btn-neon w-max">
              {t('knowMore')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
