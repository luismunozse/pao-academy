import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-300 mb-6">
          Página no encontrada
        </h2>
        <p className="text-gray-400 mb-8">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Link
          href="/"
          className="inline-block bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-200"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
