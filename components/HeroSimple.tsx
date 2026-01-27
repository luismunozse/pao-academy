'use client';
import { ArrowRight, Play } from 'lucide-react';

export default function HeroSimple({
  brandName, t, cta
}:{ brandName:string; t:(k:string)=>string; cta:()=>void; }){

  return (
    <section className="bg-gradient-to-br from-blue-50 to-blue-100 pt-32 pb-8 px-4 min-h-[600px]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">

          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold mb-8">
            <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block"></span>
            Únete a nuestra comunidad de aprendizaje
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(2rem,5vw,3.75rem)] font-bold text-slate-900 mb-6 leading-tight">
            Aprende las habilidades que{' '}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              demandan las empresas
            </span>
          </h1>

          {/* Description - Feature highlights */}
          <div className="flex flex-row flex-wrap gap-6 justify-center mb-8">
            <div className="flex items-center gap-2 text-lg text-slate-700">
              <span className="text-emerald-500 text-xl">✓</span>
              Cursos en vivo con mentores expertos
            </div>
            <div className="flex items-center gap-2 text-lg text-slate-700">
              <span className="text-emerald-500 text-xl">✓</span>
              Certificación válida en el mercado
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-row gap-4 justify-center mb-8 flex-wrap">
            {/* Primary Button */}
            <button
              onClick={cta}
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-green-500 border-none rounded-lg cursor-pointer shadow-lg shadow-green-500/30 transition-all duration-200 hover:bg-green-600 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
            >
              <span>Inscribirme Ahora</span>
              <ArrowRight size={20} />
            </button>

            {/* Secondary Button */}
            <button
              onClick={() => {
                document.getElementById('cursos-en-vivo')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-slate-900 bg-white border-2 border-gray-200 rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-500 hover:bg-gray-50 active:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              <span>Ver todos los cursos</span>
              <Play size={20} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
