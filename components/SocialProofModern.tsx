'use client';
import { m } from 'framer-motion';
import { Quote, Star, Award, TrendingUp, Users, CheckCircle, Briefcase } from 'lucide-react';

export default function SocialProofModern({
  t, lang, testimonios, idx
}:{ t:(k:string)=>string; lang:'es'|'en'; testimonios:any[]; idx:number; }){
  const test = testimonios[idx][lang];

  const companies = [
    { name: 'TechStart Argentina', logo: 'https://via.placeholder.com/120x60/3B82F6/ffffff?text=TechStart' },
    { name: 'DataCorp', logo: 'https://via.placeholder.com/120x60/22C55E/ffffff?text=DataCorp' },
    { name: 'RetailPro', logo: 'https://via.placeholder.com/120x60/EF4444/ffffff?text=RetailPro' },
    { name: 'FinanceMax', logo: 'https://via.placeholder.com/120x60/8B5CF6/ffffff?text=FinanceMax' },
    { name: 'EduTech', logo: 'https://via.placeholder.com/120x60/F97316/ffffff?text=EduTech' }
  ];

  return (
    <section className="section-modern-gray">
      <div className="container-modern py-16">
        {/* Header */}
        <m.div
          initial={{opacity:0,y:20}}
          whileInView={{opacity:1,y:0}}
          viewport={{once:true}}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 border border-blue-200 rounded-full px-6 py-3 mb-6">
            <Award className="h-5 w-5" />
            <span className="font-semibold">Testimonios Reales</span>
          </div>

          <h2 className="text-modern-h2 mb-4">
            Lo que dicen nuestros <span className="text-gradient-blue">estudiantes</span>
          </h2>

          {/* Stats Grid - EducaciónIT Style */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
            {/* Stat 1 - Estudiantes */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="stat-modern"
            >
              <div className="stat-modern-icon green">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="stat-modern-value">10,000+</div>
              <div className="stat-modern-label">Estudiantes graduados</div>
            </m.div>

            {/* Stat 2 - Rating */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="stat-modern"
            >
              <div className="stat-modern-icon yellow">
                <Star className="w-8 h-8 text-white fill-current" />
              </div>
              <div className="stat-modern-value">4.9/5</div>
              <div className="stat-modern-label">Calificación promedio</div>
            </m.div>

            {/* Stat 3 - Empleo */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="stat-modern"
            >
              <div className="stat-modern-icon purple">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <div className="stat-modern-value">95%</div>
              <div className="stat-modern-label">Consigue trabajo</div>
            </m.div>

            {/* Stat 4 - Crecimiento */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="stat-modern"
            >
              <div className="stat-modern-icon blue">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="stat-modern-value">40%</div>
              <div className="stat-modern-label">Aumento salarial promedio</div>
            </m.div>
          </div>
        </m.div>

        {/* Testimonio destacado - Card blanca */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="card-modern max-w-4xl mx-auto p-8 md:p-10 mb-12"
        >
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="relative">
                <img
                  src={test.imagen}
                  alt={test.autor}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-blue-100"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/96/3B82F6/ffffff?text=' + test.autor.charAt(0);
                  }}
                />
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <Quote className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              {/* Rating stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4 font-medium">
                "{test.frase}"
              </blockquote>

              {/* Author info */}
              <div className="flex items-center gap-3">
                <div>
                  <div className="font-bold text-gray-900">{test.autor}</div>
                  <div className="text-sm text-gray-600">{test.rol}</div>
                </div>
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
        </m.div>

        {/* Empresas que confían - Platzi style */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
            Empresas que confían en nuestros egresados
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 hover:opacity-100 transition-opacity duration-300">
            {companies.map((company, index) => (
              <div
                key={index}
                className="grayscale hover:grayscale-0 transition-all duration-300"
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-12 w-auto object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}
