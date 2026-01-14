'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log del error a un servicio de reporting
    console.error('Error de aplicación:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 text-center">
          {/* Icono de error */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>

          {/* Título */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¡Ups! Algo salió mal
          </h1>

          {/* Descripción */}
          <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
            Lo sentimos, encontramos un problema inesperado. Nuestro equipo ha sido notificado.
          </p>

          {/* Detalles del error (solo en desarrollo) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-8 text-left">
              <details className="bg-black/30 border border-white/10 rounded-lg p-4">
                <summary className="cursor-pointer text-white/80 font-semibold mb-2 hover:text-white">
                  Detalles técnicos
                </summary>
                <div className="mt-4 space-y-2">
                  <div className="text-red-400 font-mono text-sm break-all">
                    <strong>Error:</strong> {error.message}
                  </div>
                  {error.digest && (
                    <div className="text-white/60 font-mono text-xs">
                      <strong>Digest:</strong> {error.digest}
                    </div>
                  )}
                </div>
              </details>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="group px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              Intentar de nuevo
            </button>

            <a
              href="/"
              className="px-6 py-3 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Volver al inicio
            </a>
          </div>

          {/* Información de contacto */}
          <p className="text-white/50 text-sm mt-8">
            Si el problema persiste, contacta a soporte en{' '}
            <a
              href="https://wa.me/5493517601441?text=Necesito ayuda con un error en el sitio web"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline"
            >
              WhatsApp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
