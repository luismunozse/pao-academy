'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import Header from '../components/Header';
import Hero from '../components/Hero';
import LiveCourses from '../components/LiveCourses';
import Featured from '../components/Featured';
import Paths from '../components/Paths';
import SocialProof from '../components/SocialProof';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import { copy, cursosBase, type Lang } from '../lib/i18n';
import './globals.css';

export default function Page(){
  const brandName = 'GLOMIND360';
  const phoneAR = '5493517601441';

  const [modalOpen,setModalOpen] = useState(false);
  const [interes,setInteres] = useState('');
  const [lang,setLang] = useState<Lang>('es');
  const [reducedMotion,setReducedMotion] = useState(false);

  useEffect(()=>{
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const listener = (e:MediaQueryListEvent)=>setReducedMotion(e.matches);
    mq.addEventListener?.('change',listener);
    return ()=>mq.removeEventListener?.('change',listener);
  },[]);

  const t = (k:string)=> copy[lang][k] || k;

  const whatsappUrl = useMemo(()=>{
    const msg = encodeURIComponent(`${lang==='es'?'Hola':'Hi'}, ${lang==='es'?'me interesa recibir más info sobre':"I'm interested in more info about"}: ${interes || (lang==='es'?'programas':'programs')}
${lang==='es'?'Vengo desde la web de':'I come from the website of'} ${brandName}.`);
    return `https://wa.me/${phoneAR}?text=${msg}`;
  },[interes,lang]);

  const testimonios = [
    { es:{ frase:'Duplicamos la tasa de cierre en 90 días aplicando el método de Ventas Consultivas.', autor:'Mariana Pérez', rol:'Líder Comercial, Grupo Andino' }, en:{ frase:'We doubled the close rate in 90 days applying the Consultative Sales method.', autor:'Mariana Pérez', rol:'Head of Sales, Grupo Andino' } },
    { es:{ frase:'La ruta de Power BI nos permitió estandarizar reportes y tomar decisiones en tiempo real.', autor:'Julián Coria', rol:'Gerente de Operaciones, LogiSur' }, en:{ frase:'The Power BI path helped us standardize reports and make real-time decisions.', autor:'Julián Coria', rol:'Operations Manager, LogiSur' } },
    { es:{ frase:'El programa de Marca Personal nos dio posicionamiento y clientes inbound en semanas.', autor:'Belén Díaz', rol:'Consultora Independiente' }, en:{ frase:'Personal Branding gave us positioning and inbound clients within weeks.', autor:'Belén Díaz', rol:'Independent Consultant' } },
  ];
  const [idxTestimonio,setIdxTestimonio] = useState(0);
  useEffect(()=>{ const id=setInterval(()=>setIdxTestimonio(i=>(i+1)%testimonios.length),4500); return ()=>clearInterval(id); },[]);

  const cursos = cursosBase.map(c => ({ ...c[lang as 'es'|'en'], tag: c.tag }));

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
          whatsappUrl={whatsappUrl}
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

        {/* Cursos destacados */}
        <Featured
          t={t}
          cursos={cursos}
          onClickCourse={(title)=>{ setInteres(title); setModalOpen(true); }}
        />

        {/* Rutas */}
        <Paths
          t={t}
          lang={lang}
          onSelect={(name)=>{ setInteres(name); setModalOpen(true); }}
        />

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

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
          className="fixed bottom-4 right-4 z-[60] inline-flex items-center gap-2 rounded-full bg-[color:var(--acc1)] px-4 py-2 font-semibold text-white shadow-xl hover:opacity-95"
        >
          WhatsApp
        </a>
      </LazyMotion>
    </div>
  );
}
