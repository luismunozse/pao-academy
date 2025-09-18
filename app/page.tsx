'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import Header from '../components/Header';
import Hero from '../components/Hero';
import LiveCourses from '../components/LiveCourses';
import Featured from '../components/Featured';
import AsyncCourses from '../components/AsyncCourses';
import CorporateTraining from '../components/CorporateTraining';
import TrainingOptions from '../components/TrainingOptions';
import Benefits from '../components/Benefits';
import SocialProof from '../components/SocialProof';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import NewsletterModal from '../components/NewsletterModal';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { copy, cursosBase, microcursos, type Lang } from '../lib/i18n';
import './globals.css';

export default function Page(){
  const brandName = 'GLOMIND360';
  const phoneAR = '5493517601441';

  const [modalOpen,setModalOpen] = useState(false);
  const [newsletterOpen,setNewsletterOpen] = useState(false);
  const [interes,setInteres] = useState('');
  const [lang,setLang] = useState<Lang>('es');
  const [reducedMotion,setReducedMotion] = useState(false);

  const NEWSLETTER_SESSION_KEY = 'newsletter_shown_session';

  const openNewsletterOnce = () => {
    if (typeof window === 'undefined') return;
    try {
      if (sessionStorage.getItem(NEWSLETTER_SESSION_KEY) === '1') return;
      sessionStorage.setItem(NEWSLETTER_SESSION_KEY, '1');
    } catch {}
    setNewsletterOpen(true);
  };

  useEffect(()=>{
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const listener = (e:MediaQueryListEvent)=>setReducedMotion(e.matches);
    mq.addEventListener?.('change',listener);
    return ()=>mq.removeEventListener?.('change',listener);
  },[]);

  // Newsletter modal - show after 3 seconds (only on client side)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (sessionStorage.getItem(NEWSLETTER_SESSION_KEY) === '1') return;
    } catch {}
    const timer = setTimeout(() => {
      openNewsletterOnce();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Also show newsletter on first interaction (fallback for SSG)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (sessionStorage.getItem(NEWSLETTER_SESSION_KEY) === '1') return;
    } catch {}
    const handleFirstInteraction = () => {
      openNewsletterOnce();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('scroll', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
    };
  }, []);

  const t = (k:string)=> copy[lang][k] || k;

  const whatsappUrl = useMemo(()=>{
    const msg = encodeURIComponent(`${lang==='es'?'Hola':'Hi'}, ${lang==='es'?'me interesa recibir más info sobre':"I'm interested in more info about"}: ${interes || (lang==='es'?'programas':'programs')}
${lang==='es'?'Vengo desde la web de':'I come from the website of'} ${brandName}.`);
    return `https://wa.me/${phoneAR}?text=${msg}`;
  },[interes,lang]);

  const testimonios = [
    { 
      es:{ 
        frase:'Duplicamos la tasa de cierre en 90 días aplicando el método de Ventas Consultivas.', 
        autor:'Mariana Pérez', 
        rol:'Líder Comercial, Grupo Andino',
        imagen:'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face&auto=format&q=80'
      }, 
      en:{ 
        frase:'We doubled the close rate in 90 days applying the Consultative Sales method.', 
        autor:'Mariana Pérez', 
        rol:'Head of Sales, Grupo Andino',
        imagen:'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face&auto=format&q=80'
      } 
    },
    { 
      es:{ 
        frase:'La ruta de Power BI nos permitió estandarizar reportes y tomar decisiones en tiempo real.', 
        autor:'Julián Coria', 
        rol:'Gerente de Operaciones, LogiSur',
        imagen:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80'
      }, 
      en:{ 
        frase:'The Power BI path helped us standardize reports and make real-time decisions.', 
        autor:'Julián Coria', 
        rol:'Operations Manager, LogiSur',
        imagen:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80'
      } 
    },
    { 
      es:{ 
        frase:'El programa de Marca Personal nos dio posicionamiento y clientes inbound en semanas.', 
        autor:'Belén Díaz', 
        rol:'Consultora Independiente',
        imagen:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format&q=80'
      }, 
      en:{ 
        frase:'Personal Branding gave us positioning and inbound clients within weeks.', 
        autor:'Belén Díaz', 
        rol:'Independent Consultant',
        imagen:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format&q=80'
      } 
    },
  ];
  const [idxTestimonio,setIdxTestimonio] = useState(0);
  useEffect(()=>{ const id=setInterval(()=>setIdxTestimonio(i=>(i+1)%testimonios.length),4500); return ()=>clearInterval(id); },[]);

  const cursos = cursosBase.map(c => ({ ...c[lang as 'es'|'en'], tag: c.tag }));
  const microcursosData = microcursos.map(c => ({ ...c[lang as 'es'|'en'], id: c.id, categoria: c.categoria, precio: c.precio, conIA: c.conIA }));

  useEffect(()=>{
    const tests:{name:string;pass:boolean;info?:string}[] = [];
    tests.push({ name:'WhatsApp URL construida', pass: typeof whatsappUrl==='string' && whatsappUrl.includes('wa.me') });
    if(tests.some(t=>!t.pass)) console.warn('Self-tests failing:', tests.filter(t=>!t.pass));
  },[whatsappUrl]);

  return (
    <div data-theme="euro">
      {/* Header */}
      <Header
        brandName={brandName}
        t={t}
        onClickCTA={()=>{ setInteres(lang==='es'?'programas':'programs'); setModalOpen(true); }}
        lang={lang}
        setLang={setLang}
      />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="hero-euro absolute inset-0 -z-10"/>
        <Hero 
          brandName={brandName} 
          t={t} 
          cta={()=>{ setInteres(lang==='es'?'programas':'programs'); setModalOpen(true); }} 
          reducedMotion={reducedMotion}
        />
      </section>

      <LazyMotion features={domAnimation} strict>
        {/* Cursos en Vivo - Sección Principal */}
        <LiveCourses
          t={t}
          lang={lang}
          onCourseClick={(title)=>{ setInteres(title); setModalOpen(true); }}
          onCatalogClick={()=>{ setInteres(lang==='es'?'programas':'programs'); setModalOpen(true); }}
        />

        {/* Cursos destacados - OCULTO */}
        {/* <Featured
          t={t}
          cursos={cursos}
          onClickCourse={(title)=>{ setInteres(title); setModalOpen(true); }}
        /> */}

        {/* Cursos asincrónicos */}
        <AsyncCourses
          t={t}
          microcursos={microcursosData}
          onClickCourse={(title)=>{ setInteres(title); setModalOpen(true); }}
        />

        {/* Formación corporativa */}
        <CorporateTraining
          t={t}
          onClickCTA={()=>{ setInteres('formación corporativa'); setModalOpen(true); }}
        />

        {/* Opciones de formación */}
        <TrainingOptions
          t={t}
          onLiveClick={()=>{ setInteres('programas en vivo'); setModalOpen(true); }}
          onAsyncClick={()=>{ setInteres('cursos asincrónicos'); setModalOpen(true); }}
          onCorporateClick={()=>{ setInteres('formación corporativa'); setModalOpen(true); }}
        />

        {/* Beneficios diferenciales */}
        <Benefits t={t} />

        {/* Social proof */}
        <SocialProof
          t={t}
          lang={lang}
          testimonios={testimonios}
          idx={idxTestimonio}
        />

        {/* FAQ */}
        <FAQ t={t} />

        {/* Contacto */}
        <Contact
          t={t}
          interes={interes}
          setInteres={setInteres}
          whatsappUrl={whatsappUrl}
          openModal={()=>{ setInteres(''); setModalOpen(true); }}
        />

        {/* Footer con selector de idioma */}
        <Footer brandName={brandName} t={t} lang={lang} setLang={setLang} />

        {/* Modal + CTA flotante */}
        {modalOpen && (
          <Modal onClose={()=>setModalOpen(false)} t={t}>
            <h3 className="text-xl font-semibold">{t('speak')}</h3>
            <p className="mt-1 opacity-80">{t('contactLead')} <span className="font-semibold">{interes || (lang==='es'? 'nuestros programas':'our programs')}</span>.</p>
            <div className="mt-4 grid grid-cols-1 gap-3">
              <input className="input" placeholder={t('name')} />
              <input className="input" placeholder={t('email')} />
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-accent w-full text-center">{t('writeOnWhatsApp')}</a>
            </div>
          </Modal>
        )}

      </LazyMotion>

              {/* WhatsApp Floating Button */}
              <WhatsAppFloat
                phoneNumber={phoneAR}
                message={`¡Hola! Me interesa recibir más información sobre los cursos de ${brandName}. Vengo desde la web.`}
                brandName={brandName}
              />


      {/* Newsletter Modal */}
      <NewsletterModal
        t={t}
        isOpen={newsletterOpen}
        onClose={() => { try { if (typeof window !== 'undefined') sessionStorage.setItem(NEWSLETTER_SESSION_KEY, '1'); } catch {} setNewsletterOpen(false); }}
      />
    </div>
  );
}
