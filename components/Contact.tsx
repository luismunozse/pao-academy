'use client';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import {
  User, Mail, Bookmark, MessageSquareText, ShieldCheck, Clock, ArrowRight
} from 'lucide-react';

export default function Contact({
  t, interes, setInteres, whatsappUrl, openModal
}:{
  t:(k:string)=>string; interes:string; setInteres:(v:string)=>void; whatsappUrl:string; openModal:()=>void;
}){
  return (
    <section id="contacto" className="section-neon">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <LazyMotion features={domAnimation} strict>
          <m.div
            initial={{opacity:0, y:12}}
            whileInView={{opacity:1, y:0}}
            viewport={{once:true}}
            className="card-neon overflow-hidden p-0"
          >
            {/* tira superior de acento */}
            <div className="h-1 w-full bg-gradient-to-r from-[color:var(--neon-blue)] via-[color:var(--neon-cyan)] to-[color:var(--neon-purple)]" />

            <div className="p-8 md:p-10 grid gap-8 md:grid-cols-5">
              {/* Lado texto/beneficios */}
              <div className="md:col-span-2">
                <h2 className="text-2xl md:text-3xl font-semibold text-white">
                  {t('contactTitle')}
                </h2>
                <p className="mt-2 text-white/80">
                  {t('contactDesc')}
                </p>

                <ul className="mt-6 space-y-3 text-white/85">
                  <li className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[color:var(--neon-cyan)] mt-0.5"/>
                    <span>{t('privacy') || 'Datos protegidos y soporte humano.'}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[color:var(--neon-cyan)] mt-0.5"/>
                    <span>{t('responseTime') || 'Respondemos en menos de 24 horas.'}</span>
                  </li>
                </ul>
              </div>

              {/* Formulario */}
              <form
                onSubmit={(e)=>e.preventDefault()}
                className="md:col-span-3 grid gap-4"
              >
                {/* Name */}
                <div className="input-group">
                  <User className="input-icon"/>
                  <input
                    className="input-neon input-with-icon"
                    placeholder={t('name')}
                    name="name"
                    autoComplete="name"
                    required
                  />
                </div>

                {/* Email */}
                <div className="input-group">
                  <Mail className="input-icon"/>
                  <input
                    type="email"
                    className="input-neon input-with-icon"
                    placeholder="tu@email.com"
                    name="email"
                    autoComplete="email"
                    required
                  />
                </div>

                {/* Interés */}
                <div className="input-group">
                  <Bookmark className="input-icon"/>
                  <input
                    value={interes}
                    onChange={(e)=>setInteres(e.target.value)}
                    className="input-neon input-with-icon"
                    placeholder={t('interestPH')}
                    name="interest"
                  />
                </div>

                {/* Mensaje */}
                <div className="input-group">
                  <MessageSquareText className="input-icon top-4"/>
                  <textarea
                    rows={4}
                    className="input-neon input-with-icon textarea-neon"
                    placeholder={t('messagePH')}
                    name="message"
                  />
                </div>

                {/* Acciones */}
                <div className="mt-2 flex flex-wrap gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-neon"
                  >
                    {t('writeOnWhatsApp')}
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={openModal}
                    className="btn-outline-white"
                  >
                    {t('callMe')}
                  </button>
                </div>

                <p className="text-xs text-white/60">
                  {t('consentNote') || 'Al enviar, aceptás ser contactado para coordinar la mejor propuesta.'}
                </p>
              </form>
            </div>
          </m.div>
        </LazyMotion>
      </div>
    </section>
  );
}
