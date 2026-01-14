'use client';
import { ArrowRight } from 'lucide-react';

interface HeroMinimalProps {
  brandName: string;
  t: (k: string) => string;
  cta: () => void;
}

export default function HeroMinimal({ brandName, t, cta }: HeroMinimalProps) {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background limpio */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100" />

      {/* Patrón sutil */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge minimalista */}
          <div className="inline-flex items-center gap-2 bg-black/5 border border-black/10 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-gray-700 text-sm font-medium">
              Nuevos cursos disponibles
            </span>
          </div>

          {/* Título limpio */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            Aprende.
            <br />
            Crea.
            <br />
            <span className="text-blue-600">Destaca.</span>
          </h1>

          {/* Subtítulo */}
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Formación práctica con impacto real en tu carrera profesional.
          </p>

          {/* CTA minimalista */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={cta}
              className="group px-8 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center gap-2">
                Comenzar
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button
              onClick={() => document.getElementById('cursos-en-vivo')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Ver cursos
            </button>
          </div>

          {/* Features minimalistas */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { title: 'Mentores expertos', desc: 'Aprende de profesionales activos' },
              { title: 'Proyectos reales', desc: 'Portfolio que impresiona' },
              { title: 'Certificación', desc: 'Reconocimiento profesional' }
            ].map((item, idx) => (
              <div key={idx} className="text-left">
                <h3 className="text-gray-900 font-semibold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator minimalista */}
      <button
        onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Scroll to content"
      >
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce" />
        </div>
      </button>
    </section>
  );
}
