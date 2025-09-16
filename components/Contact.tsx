'use client';
import { useMemo, useState } from 'react';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import {
  User, Mail, Phone, MessageSquareText, ShieldCheck, Clock, CheckCircle2, ArrowRight
} from 'lucide-react';

export default function Contact({
  t,
  interes,            // no usado, lo dejamos por compat
  setInteres,         // idem
  whatsappUrl,        // idem
  openModal,          // opcional: si querés abrir modal post-submit
}:{
  t:(k:string)=>string;
  interes:string;
  setInteres:(v:string)=>void;
  whatsappUrl:string;
  openModal:()=>void;
}){
  const [code, setCode] = useState<string>('+54'); // código pre-seteado (AR)
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const countries = useMemo(() => ([
    { code:'+54', label:'AR' },
    { code:'+34', label:'ES' },
    { code:'+52', label:'MX' },
    { code:'+57', label:'CO' },
    { code:'+1',  label:'US' },
  ]), []);

  async function onSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get('name')||'').trim(),
      email: String(fd.get('email')||'').trim(),
      phone: `${code} ${String(fd.get('phone')||'').trim()}`,
      message: String(fd.get('message')||'').trim(),
    };

    // Validación simple en cliente
    if(!payload.name || !payload.email || !payload.phone){
      // podrías mostrar un toast; por ahora marcamos como “error suave”
      (e.currentTarget.querySelector('button[type="submit"]') as HTMLButtonElement)?.focus();
      return;
    }

    setLoading(true);
    try {
      // 🔌 Aquí enchufás Zoho / API route / email service.
      // Ejemplo futuro:
      // await fetch('/api/contact', { method:'POST', body: JSON.stringify(payload) });

      await new Promise(r => setTimeout(r, 900)); // simulación
      setSent(true);
      // openModal?.(); // si querés abrir el modal de Gracias
      (e.currentTarget as HTMLFormElement).reset();
    } finally {
      setLoading(false);
    }
  }

  // Textos profesionales (usa t(...) si existe, con fallback)
  const txt = {
    title:      t('contactTitlePro')   || 'Solicitar información',
    desc:       t('contactDescPro')    || 'Dejanos tus datos y un asesor académico te contactará para diseñar la mejor propuesta de formación.',
    name:       t('name')              || 'Nombre completo',
    email:      t('email')             || 'Email',
    phone:      t('phone')             || 'Teléfono',
    phonePH:    t('phonePH')           || 'Número sin el 0 ni el 15',
    message:    t('message')           || 'Mensaje',
    messagePH:  t('messagePH')         || 'Contanos brevemente tu necesidad o el programa de interés…',
    send:       t('send')              || 'Enviar',
    privacy:    t('privacy')           || 'Tus datos se almacenan de forma segura. No compartimos información con terceros.',
    response:   t('responseTime')      || 'Respondemos en menos de 24 horas hábiles.',
    consent:    t('consentNote')       || 'Al enviar, aceptás que nos comuniquemos para brindarte información académica.',
    success:    t('successMsg')        || '¡Gracias! Recibimos tu consulta y nos pondremos en contacto a la brevedad.',
  };

  return (
    <section id="contacto" className="section-neon">
      <div className="full-width-content py-16">
        <LazyMotion features={domAnimation} strict>
          <m.div
            initial={{opacity:0, y:12}}
            whileInView={{opacity:1, y:0}}
            viewport={{once:true}}
            className="card-neon overflow-hidden p-0"
          >
            <div className="h-1 w-full bg-gradient-to-r from-[color:var(--neon-blue)] via-[color:var(--neon-cyan)] to-[color:var(--neon-purple)]" />

            <div className="p-8 md:p-10 grid gap-8 md:grid-cols-5">
              {/* Lado informativo */}
              <div className="md:col-span-2">
                <h2 className="text-2xl md:text-3xl font-semibold text-white">
                  {txt.title}
                </h2>
                <p className="mt-2 text-white/80">{txt.desc}</p>

                <ul className="mt-6 space-y-3 text-white/85">
                  <li className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[color:var(--neon-cyan)] mt-0.5"/>
                    <span>{txt.privacy}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[color:var(--neon-cyan)] mt-0.5"/>
                    <span>{txt.response}</span>
                  </li>
                </ul>
              </div>

              {/* Formulario */}
              <form onSubmit={onSubmit} className="md:col-span-3 grid gap-4">
                {/* Nombre */}
                <div className="input-group">
                  <User className="input-icon"/>
                  <input
                    className="input-neon input-with-icon"
                    placeholder={txt.name}
                    name="name"
                    autoComplete="name"
                    required
                  />
                </div>

                {/* Email */}
                <div className="input-group">
                  <Mail className="input-icon" />
                  <input
                    type="email"
                    className="input-neon input-with-icon"
                    placeholder={t('email')}
                    name="email"
                    autoComplete="email"
                    required
                  />
                </div>

                {/* Teléfono con prefijo */}
                <div className="phone-row">
                  <div className="phone-prefix">+54 AR</div>
                  <div className="input-group">
                    {/* si querés icono, podés usar <Phone className="input-icon" /> */}
                    <input
                      className="input-neon input-with-icon"
                      placeholder={t('phonePH')}
                      name="phone"
                      inputMode="tel"
                      autoComplete="tel"
                    />
                  </div>
                </div>

                {/* Mensaje */}
                <div className="input-group">
                  <MessageSquareText className="input-icon input-icon--top" />
                  <textarea
                    rows={4}
                    className="input-neon input-with-icon textarea-neon"
                    placeholder={t('messagePH')}
                    name="message"
                  />
                </div>

                {/* Acciones */}
                <div className="mt-2 flex flex-wrap gap-3">
                  <button
                    type="submit"
                    className="btn-neon inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {loading ? (t('sending') || 'Enviando…') : txt.send}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-white/60">{txt.consent}</p>

                {sent && (
                  <div className="mt-4 flex items-start gap-2 rounded-xl border border-white/15 bg-white/5 p-3 text-white/90">
                    <CheckCircle2 className="w-5 h-5 text-[color:var(--neon-cyan)] mt-0.5" />
                    <span>{txt.success}</span>
                  </div>
                )}
              </form>
            </div>
          </m.div>
        </LazyMotion>
      </div>
    </section>
  );
}
