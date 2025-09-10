'use client';
import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({
  children, onClose, t
}:{ children:React.ReactNode; onClose:()=>void; t:(k:string)=>string; }){
  useEffect(()=>{
    const onKey=(e:KeyboardEvent)=>e.key==='Escape' && onClose();
    window.addEventListener('keydown',onKey);
    return ()=>window.removeEventListener('keydown',onKey);
  },[onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* overlay con blur + tinte neón */}
      <div
        className="absolute inset-0 backdrop-blur-md"
        style={{
          background:
            'radial-gradient(60% 40% at 20% 10%, rgba(0,247,239,.20), transparent), ' +
            'radial-gradient(60% 40% at 80% 0%, rgba(0,119,255,.18), transparent), ' +
            'rgba(0,0,0,.55)'
        }}
        onClick={onClose}
      />

      {/* panel vidrio */}
      <div className="relative w-full max-w-md rounded-2xl border border-[color:var(--neon-border)] p-6 text-[color:var(--neon-fg)] shadow-2xl"
           style={{background:'linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03))'}}>
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-1 text-white/80 hover:bg-white/10"
          aria-label={t('close')}
        >
          <X className="size-5"/>
        </button>
        {children}
      </div>
    </div>
  );
}
