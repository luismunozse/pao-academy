'use client';
import { useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  t: (k: string) => string;
};

export default function Modal({ children, onClose, t }: ModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);

    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <m.div
      className="fixed inset-0 z-[1200] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <m.div
        className="absolute inset-0 bg-[#050915]/80 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      />

      <m.div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-xl rounded-3xl border border-white/12 bg-gradient-to-br from-[#0d172a]/92 to-[#0b1224]/92 p-6 md:p-8 text-white shadow-[0_24px_90px_rgba(0,0,0,0.45)]"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1] // cubic-bezier ease-out
        }}
      >
        <div className="absolute inset-0 pointer-events-none rounded-3xl border border-white/8" />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[var(--acc1)] via-[var(--acc2)] to-[#7c3aed]" />

        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-white/87 hover:text-white hover:bg-white/10 transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label={t('close')}
        >
          <X className="size-5" />
        </button>
        <div className="space-y-6">
          {children}
        </div>
      </m.div>
    </m.div>
  );
}
