import Script from 'next/script';

// Integración ligera con Crisp. Define NEXT_PUBLIC_CRISP_WEBSITE_ID.
const CRISP_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;

export default function LiveChat(){
  if (!CRISP_ID) return null;
  return (
    <Script id="crisp-chat" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
      window.$crisp=[];window.CRISP_WEBSITE_ID='${CRISP_ID}';
      (function(){
        var d=document,s=d.createElement('script');
        s.src='https://client.crisp.chat/l.js';s.async=1;
        d.getElementsByTagName('head')[0].appendChild(s);
      })();
    ` }} />
  );
}



