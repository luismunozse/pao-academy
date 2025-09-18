'use client';
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop(){
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setVisible(y > 400);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true } as any);
    return () => window.removeEventListener('scroll', onScroll as any);
  }, []);

  const scrollTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollTop}
      aria-label="Volver al inicio"
      className="fixed bottom-6 left-6 z-[1000] p-3 rounded-full bg-[color:var(--neon-cyan)] text-black shadow-lg hover:opacity-90 transition-opacity"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}

