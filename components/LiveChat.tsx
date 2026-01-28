'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

// Zoho SalesIQ - Chat en vivo integrado con Zoho CRM
export default function LiveChat(){
  const pathname = usePathname();

  // No mostrar en panel admin
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <Script id="zoho-salesiq-init" strategy="beforeInteractive">
        {`window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}`}
      </Script>
      <Script
        id="zsiqscript"
        src="https://salesiq.zohopublic.com/widget?wc=siq2f60b37af4e352c434418ffb5325a6bb169d87f9a417b33e30d25703cb6137f6"
        strategy="afterInteractive"
      />
    </>
  );
}



