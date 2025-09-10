'use client';

export default function Paths({
  t, lang, onSelect
}:{ t:(k:string)=>string; lang:'es'|'en'; onSelect:(name:string)=>void; }){
  const data = [
    { nombre: lang==='es'? 'Ruta Datos: Power BI':'Data Path: Power BI', items: lang==='es'? ['Fundamentos de Datos','Power BI desde Cero','DAX Avanzado','Dashboarding y Storytelling'] : ['Data Fundamentals','Power BI from Zero','Advanced DAX','Dashboarding & Storytelling'] },
    { nombre: lang==='es'? 'Ruta Data Analytics':'Data Analytics Path',    items: lang==='es'? ['SQL para Analítica','ETL y Calidad','Métricas y KPIs','Analítica de Negocio'] : ['SQL for Analytics','ETL & Quality','Metrics & KPIs','Business Analytics'] },
    { nombre: lang==='es'? 'Ruta Data Science':'Data Science Path',        items: lang==='es'? ['Python Básico','EDA y Visualización','Modelos Clásicos','Proyecto Integrador'] : ['Python Basics','EDA & Visualization','Classic Models','Capstone Project'] },
  ];

  return (
    <section id="rutas" className="section-neon">
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">{t('learningPaths')}</h2>
        <p className="mt-2 max-w-2xl text-white/80">{t('learningPathsDesc')}</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.map(r => (
            <div key={r.nombre} className="card-neon">
              <h3 className="text-lg font-semibold text-white">{r.nombre}</h3>
              <ol className="mt-3 space-y-2">
                {r.items.map((it,i)=> (
                  <li key={it} className="flex items-start gap-2 text-sm text-white/85">
                    <span className="mt-1 size-4 shrink-0 text-white/60">•</span>
                    <span><b>{i+1}.</b> {it}</span>
                  </li>
                ))}
              </ol>
              <button onClick={()=>onSelect(r.nombre)} className="btn-neon mt-5">
                {t('wantThisPath')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
