'use client';
import { m } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function ScrollIndicator() {
  const handleScroll = () => {
    window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleScroll}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 focus:outline-none focus:ring-2 focus:ring-white/30 rounded-full p-2"
      aria-label="Scroll to content"
    >
      <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center relative">
        <m.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-1 h-3 bg-white/60 rounded-full mt-2"
          aria-hidden="true"
        />
      </div>
      <ChevronDown className="h-4 w-4 text-white/50 absolute -bottom-2 left-1/2 transform -translate-x-1/2" />
    </button>
  );
}
