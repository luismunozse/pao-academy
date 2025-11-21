'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log del error para debugging (solo en desarrollo)
    if (process.env.NODE_ENV === 'development') {
      console.error('Error capturado:', error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-white mb-4">500</h1>
        <h2 className="text-2xl font-semibold text-gray-300 mb-6">
          Algo salió mal
        </h2>
        <p className="text-gray-400 mb-8">
          Lo sentimos, ocurrió un error inesperado. Por favor, intenta nuevamente.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-block bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-200"
          >
            Intentar nuevamente
          </button>
          <Link
            href="/"
            className="inline-block bg-white/10 text-white px-8 py-3 rounded-lg font-medium hover:bg-white/20 transition-all duration-200"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
