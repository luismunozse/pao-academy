'use client';
import { useState } from 'react';
import { Mail, CheckCircle, ArrowRight, Gift } from 'lucide-react';
import { m } from 'framer-motion';

interface NewsletterSectionProps {
  t: (key: string) => string;
}

export default function NewsletterSection({ t }: NewsletterSectionProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;

    setLoading(true);
    
    // Simular envío (reemplazar con tu API real)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubscribed(true);
    setLoading(false);
    setEmail('');
    
    // Reset después de 5 segundos
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <section className="section-academic bg-gradient-to-br from-[color:var(--academic-primary)] via-[color:var(--academic-secondary)] to-[color:var(--academic-primary)]">
      <div className="container mx-auto px-4">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Decoración de fondo */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[color:var(--academic-accent)] to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[color:var(--academic-secondary)] to-transparent rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 text-center">
              {/* Icono */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[color:var(--academic-accent)] to-[color:var(--academic-secondary)] rounded-2xl mb-6">
                <Mail className="w-8 h-8 text-white" />
              </div>

              {/* Título */}
              <h2 className="text-3xl md:text-4xl font-academic-heading text-white mb-4">
                📬 Mantenete actualizado
              </h2>
              
              {/* Descripción */}
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Recibí tips prácticos, novedades de cursos y contenido exclusivo para acelerar tu carrera profesional.
              </p>

              {/* Beneficios */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <Gift className="w-4 h-4 text-[color:var(--academic-accent)]" />
                  <span className="text-sm text-white/90">Contenido exclusivo</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <CheckCircle className="w-4 h-4 text-[color:var(--academic-accent)]" />
                  <span className="text-sm text-white/90">Sin spam</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <CheckCircle className="w-4 h-4 text-[color:var(--academic-accent)]" />
                  <span className="text-sm text-white/90">Descuentos anticipados</span>
                </div>
              </div>

              {/* Formulario */}
              {!subscribed ? (
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      required
                      className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--academic-accent)] focus:border-transparent transition-all"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-4 bg-gradient-to-r from-[color:var(--academic-accent)] to-[color:var(--academic-secondary)] text-white font-bold rounded-xl hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Suscribiendo...
                        </>
                      ) : (
                        <>
                          Suscribirme
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-white/60 mt-3">
                    Al suscribirte, aceptás recibir emails con novedades. Podés cancelar cuando quieras.
                  </p>
                </form>
              ) : (
                <m.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 py-6"
                >
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2">¡Listo! Ya estás suscrito 🎉</h3>
                    <p className="text-white/70">Revisá tu email para confirmar tu suscripción.</p>
                  </div>
                </m.div>
              )}
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
