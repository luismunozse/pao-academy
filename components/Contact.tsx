'use client';
export default function Contact({
  t, interes, setInteres, whatsappUrl, openModal
}:{ t:(k:string)=>string; interes:string; setInteres:(v:string)=>void; whatsappUrl:string; openModal:()=>void; }){
  return (
    <section id="contacto" className="section-neon">
      <div className="relative mx-auto max-w-4xl px-6 py-16">
        <div className="card-neon p-0 overflow-hidden">
          <div className="p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-white">{t('contactTitle')}</h2>
            <p className="mt-2 text-white/80">{t('contactDesc')}</p>

            <form onSubmit={(e)=>e.preventDefault()} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-white/75">{t('name')}</label>
                <input className="input-neon w-full py-2 px-3" placeholder={t('name')}/>
              </div>

              <div>
                <label className="mb-1 block text-sm text-white/75">{t('email')}</label>
                <input type="email" className="input-neon w-full py-2 px-3" placeholder="tu@email.com"/>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm text-white/75">{t('interest')}</label>
                <input
                  value={interes}
                  onChange={(e)=>setInteres(e.target.value)}
                  className="input-neon w-full py-2 px-3"
                  placeholder={t('interestPH')}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm text-white/75">{t('message')}</label>
                <textarea rows={4} className="input-neon w-full py-2 px-3" placeholder={t('messagePH')}/>
              </div>

              <div className="mt-2 flex flex-wrap gap-3 sm:col-span-2">
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-neon">
                  {t('writeOnWhatsApp')}
                </a>
                <button type="button" onClick={openModal} className="btn-link link-neon">
                  {t('callMe')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
