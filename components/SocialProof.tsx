'use client';
import { m } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SocialProof({
  t, lang, testimonios, idx
}:{ t:(k:string)=>string; lang:'es'|'en'; testimonios:any[]; idx:number; }){
  const test = testimonios[idx][lang];
  const [currentCompanyIndex, setCurrentCompanyIndex] = useState(0);

  // Logos de empresas importantes
  const companies = [
    { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
    { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
    { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { name: 'IBM', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg' },
    { name: 'Oracle', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg' },
    { name: 'Salesforce', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg' },
    { name: 'Adobe', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo.svg' },
    { name: 'SAP', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg' },
    { name: 'Accenture', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Accenture.svg' },
    { name: 'Deloitte', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Deloitte_Logo.svg' }
  ];

  // Auto-rotate del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCompanyIndex((prev) => (prev + 1) % companies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [companies.length]);

  return (
    <section className="section-academic">
      <div className="relative full-width-content py-16">
        <div className="flex justify-center">
          {/* Testimonio */}
          <m.div initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="max-w-2xl w-full">
            <div className="flex items-center justify-center gap-2 text-sm text-white/70 mb-4">
              <Quote className="size-4" /> {t('whatTheySay')}
            </div>

            <div className="card-neon p-6 mt-3 text-center">
              <p className="text-lg leading-relaxed text-white mb-6">
                "{test.frase}"
              </p>
              
              {/* Información del autor con imagen */}
              <div className="flex items-center justify-center gap-4">
                <div className="relative">
                  <img 
                    src={test.imagen} 
                    alt={test.autor}
                    className="testimonial-image"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(test.autor)}&background=6366f1&color=fff&size=150`;
                    }}
                  />
                  <div className="testimonial-online-indicator"></div>
                </div>
                <div className="testimonial-author-info">
                  <p className="testimonial-author-name">
                    {test.autor}
                  </p>
                  <p className="testimonial-author-role">
                    {test.rol}
                  </p>
                </div>
              </div>
            </div>
          </m.div>
        </div>

        {/* Carrusel de empresas */}
        <m.div 
          initial={{opacity:0,y:20}} 
          whileInView={{opacity:1,y:0}} 
          viewport={{once:true}}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-academic-heading text-white mb-4">
              {t('companiesTrust') || 'Empresas que confían en nosotros'}
            </h3>
            <p className="text-white/70 text-lg">
              Más de 500+ empresas han confiado en nuestros programas
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Carrusel container */}
            <div className="overflow-hidden rounded-2xl">
              <m.div 
                className="flex transition-transform duration-1000 ease-in-out"
                animate={{ x: `-${currentCompanyIndex * 100}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              >
                {companies.map((company, index) => (
                  <div key={company.name} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 px-8 py-6">
                      {companies.slice(index, index + 5).map((comp, i) => (
                        <div key={comp.name} className="flex items-center justify-center p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-500 group">
                          <img 
                            src={comp.logo} 
                            alt={comp.name}
                            className="h-8 w-auto object-contain filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                              if (fallback) {
                                fallback.style.display = 'flex';
                              }
                            }}
                          />
                          <div className="hidden items-center justify-center text-white/70 font-semibold text-sm">
                            {comp.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </m.div>
            </div>

            {/* Navigation buttons */}
            <button 
              onClick={() => setCurrentCompanyIndex((prev) => prev === 0 ? companies.length - 1 : prev - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300 group"
            >
              <ChevronLeft className="size-5 text-white group-hover:text-[color:var(--academic-secondary)] transition-colors" />
            </button>
            
            <button 
              onClick={() => setCurrentCompanyIndex((prev) => (prev + 1) % companies.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300 group"
            >
              <ChevronRight className="size-5 text-white group-hover:text-[color:var(--academic-secondary)] transition-colors" />
            </button>

            {/* Dots indicator */}
            <div className="flex justify-center mt-6 gap-2">
              {companies.slice(0, Math.ceil(companies.length / 5)).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCompanyIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === Math.floor(currentCompanyIndex / 5)
                      ? 'bg-[color:var(--academic-secondary)] scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
