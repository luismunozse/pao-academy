'use client';
import { useEffect } from 'react';
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
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#050915]/80 backdrop-blur-md"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-xl rounded-3xl border border-white/12 bg-gradient-to-br from-[#0d172a]/92 to-[#0b1224]/92 p-6 md:p-8 text-white shadow-[0_24px_90px_rgba(0,0,0,0.45)]"
      >
        <div className="absolute inset-0 pointer-events-none rounded-3xl border border-white/8" />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[var(--acc1)] via-[var(--acc2)] to-[#7c3aed]" />

        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          aria-label={t('close')}
        >
          <X className="size-5" />
        </button>
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
}
