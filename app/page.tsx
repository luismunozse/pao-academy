'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Catalog from '../components/Catalog';
import Featured from '../components/Featured';
import Paths from '../components/Paths';
import SocialProof from '../components/SocialProof';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import { copy, cursosBase, translateTag, type Lang } from '../lib/i18n';
import './globals.css';

export default function Page(){
  const brandName = 'GLOMIND360';
  const phoneAR = '5493517601441';

  const [modalOpen,setModalOpen] = useState(false);
  const [interes,setInteres] = useState('');
  const [query,setQuery] = useState('');
  const [tag,setTag] = useState<string>('Todos');
  const [lang,setLang] = useState<Lang>('es');
  const [reducedMotion,setReducedMotion] = useState(false);

  useEffect(()=>{
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const listener = (e:MediaQueryListEvent)=>setReducedMotion(e.matches);
    mq.addEventListener?.('change',listener);
    return ()=>mq.removeEventListener?.('change',listener);
  },[]);

  useEffect(()=>{ setTag(copy[lang].all); },[lang]);
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

  const cursos = cursosBase.map(c => ({ ...c[lang as 'es'|'en'], tag: lang==='es'? c.tag : translateTag(c.tag) }));
  const cursosFiltrados = cursos.filter(c=>{
    const matchTag = tag===t('all') || c.tag===tag;
    const q = query.trim().toLowerCase();
    const matchQuery = !q || c.titulo.toLowerCase().includes(q) || c.modalidad.toLowerCase().includes(q);
    return matchTag && matchQuery;
  });

  useEffect(()=>{
    const tests:{name:string;pass:boolean;info?:string}[] = [];
    tests.push({ name:'Tag All/Todos presente', pass: !!copy[lang].all });
    tests.push({ name:'Cursos filtrados no vacíos con All', pass: cursosFiltrados.length>0, info: `count=${cursosFiltrados.length}` });
    tests.push({ name:'WhatsApp URL construida', pass: typeof whatsappUrl==='string' && whatsappUrl.includes('wa.me') });
    if(tests.some(t=>!t.pass)) console.warn('Self-tests failing:', tests.filter(t=>!t.pass));
  },[lang,cursosFiltrados.length,whatsappUrl]);

  return (
    <div data-theme="euro">
      {/* Header */}
      <Header
        brandName={brandName}
        t={t}
        onClickCTA={()=>{ setInteres(lang==='es'?'programas':'programs'); setModalOpen(true); }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="hero-euro absolute inset-0 -z-10"/>
        <Hero brandName={brandName} t={t} cta={()=>{ setInteres(lang==='es'?'programas':'programs'); setModalOpen(true); }} reducedMotion={reducedMotion}/>
      </section>

      <LazyMotion features={domAnimation} strict>
        {/* Catálogo / Beneficios */}
        <Catalog
          t={t}
          lang={lang}
          query={query}
          setQuery={setQuery}
          tag={tag}
          setTag={setTag}
          onClickCard={(title)=>{ setInteres(title); setModalOpen(true); }}
        />

        {/* Cursos destacados */}
        <Featured
          t={t}
          cursos={cursosFiltrados}
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
