'use client';
import { m } from 'framer-motion';
import { Star, CheckCircle, ArrowRight, Play } from 'lucide-react';
import Image from 'next/image';

export default function HeroModern({
  brandName, t, cta
}:{ brandName:string; t:(k:string)=>string; cta:()=>void; }){

  return (
    <section className="hero-modern relative overflow-hidden pt-32 pb-16" style={{ marginTop: '0' }}>
      {/* Background pattern sutil */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3B82F6" strokeWidth="0.5" opacity="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container-modern relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px]">

          {/* LEFT SIDE - Content */}
          <m.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Trust Badge - EducaciónIT Style */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              🚀 +10,000 profesionales ya avanzaron su carrera
            </m.div>

            {/* Headline */}
            <m.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              style={{ color: '#0F172A' }}
            >
              Aprende las habilidades que{' '}
              <span style={{
                background: 'linear-gradient(90deg, #3B82F6, #06B6D4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                demandan las empresas
              </span>
            </m.h1>

            {/* Description */}
            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl mb-8 leading-relaxed"
              style={{ color: '#475569' }}
            >
              Cursos en vivo con mentores expertos. Proyectos reales que suman a tu portfolio. Certificación válida en el mercado. Empieza gratis hoy.
            </m.p>

            {/* CTAs - Dual Strategy Platzi */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              {/* Primary CTA */}
              <button
                onClick={cta}
                className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 group"
                style={{
                  background: '#22C55E',
                  color: 'white',
                  border: 'none',
                  boxShadow: '0 10px 15px -3px rgba(34, 197, 94, 0.2)'
                }}
              >
                <span>Prueba 7 días gratis</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={() => {
                  document.getElementById('cursos-en-vivo')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold rounded-lg border-2 transition-all duration-200 group"
                style={{
                  background: 'white',
                  color: '#0F172A',
                  borderColor: '#E5E7EB'
                }}
              >
                <span>Ver todos los cursos</span>
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </m.div>

            {/* Trust Signals Inline - EducaciónIT */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-6 text-sm"
              style={{ color: '#64748B' }}
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="font-medium text-gray-900">4.9/5</span>
                <span>en Google</span>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="font-medium text-gray-900">10,000+</span>
                <span>graduados</span>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-500" />
                <span className="font-medium text-gray-900">95%</span>
                <span>consigue trabajo</span>
              </div>
            </m.div>
          </m.div>

          {/* RIGHT SIDE - Image/Illustration */}
          <m.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Placeholder para ilustración/imagen */}
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              {/* Puedes reemplazar esto con una imagen real */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-10"></div>

              {/* Floating cards decoration */}
              <m.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute top-10 left-10 bg-white p-6 rounded-xl shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">95%</div>
                    <div className="text-sm text-gray-600">Consigue trabajo</div>
                  </div>
                </div>
              </m.div>

              <m.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute bottom-10 right-10 bg-white p-6 rounded-xl shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-600 fill-current" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                    <div className="text-sm text-gray-600">Calificación</div>
                  </div>
                </div>
              </m.div>

              {/* Centro: Ilustración o imagen de estudiantes */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">👨‍💻</div>
                  <div className="text-2xl font-bold text-gray-900">Aprende haciendo</div>
                  <div className="text-gray-600">Con proyectos reales</div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 top-20 -right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute -z-10 bottom-20 -left-10 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          </m.div>

        </div>
      </div>

      {/* Wave divider bottom (opcional) */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white" opacity="0.1"/>
        </svg>
      </div>
    </section>
  );
}
