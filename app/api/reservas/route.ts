import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_PASSWORD,
  },
});

// Función para obtener access token de Zoho CRM
async function getZohoAccessToken(): Promise<string> {
  const response = await fetch('https://accounts.zoho.com/oauth/v2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      refresh_token: process.env.ZOHO_CRM_REFRESH_TOKEN!,
      client_id: process.env.ZOHO_CRM_CLIENT_ID!,
      client_secret: process.env.ZOHO_CRM_CLIENT_SECRET!,
      grant_type: 'refresh_token',
    }),
  });
  const data = await response.json();
  if (!data.access_token) throw new Error('Failed to get Zoho access token');
  return data.access_token;
}

// Función para crear Lead en Zoho CRM
async function createZohoLead(leadData: {
  name: string;
  email: string;
  phone?: string;
  country?: string;
  course: string;
  message?: string;
}) {
  const accessToken = await getZohoAccessToken();

  // Separar nombre y apellido
  const nameParts = leadData.name.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '-';

  const response = await fetch('https://www.zohoapis.com/crm/v2/Leads', {
    method: 'POST',
    headers: {
      'Authorization': `Zoho-oauthtoken ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: [{
        First_Name: firstName,
        Last_Name: lastName,
        Email: leadData.email,
        Phone: leadData.phone || null,
        Country: leadData.country || null,
        Lead_Source: 'Web Form',
        Description: `Curso de interés: ${leadData.course}${leadData.message ? `\n\nMensaje: ${leadData.message}` : ''}`,
      }],
      trigger: ['workflow'],
    }),
  });

  const result = await response.json();
  if (result.data?.[0]?.code !== 'SUCCESS') {
    console.error('Error creating Zoho lead:', result);
    throw new Error(result.data?.[0]?.message || 'Failed to create lead');
  }
  return result;
}

export async function POST(req: NextRequest){
  try{
    const data = await req.json();

    if (!data?.name || !data?.email || !data?.course) {
      return NextResponse.json({ ok:false, error:'Datos incompletos' }, { status: 400 });
    }

    const { name, email, phone, country, course, message, referralCode } = data;

    // Construir el contenido del email
    const emailContent = `
Nueva inscripción recibida desde la web de GLOMIND360

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 DATOS DEL INTERESADO

Nombre: ${name}
Email: ${email}
Teléfono: ${phone || 'No proporcionado'}
País: ${country || 'No especificado'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📚 INTERÉS

Curso/Programa: ${course}
${message ? `Mensaje: ${message}` : ''}
${referralCode ? `Código de referido: ${referralCode}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 Fecha de solicitud: ${new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })}
    `.trim();

    // Enviar email y crear lead en paralelo
    const [emailResult, crmResult] = await Promise.allSettled([
      transporter.sendMail({
        from: `"GLOMIND360 Web" <${process.env.ZOHO_EMAIL}>`,
        to: 'contacto@glomind360.com',
        replyTo: email,
        subject: `🎓 Nueva inscripción: ${name} - ${course}`,
        text: emailContent,
      }),
      createZohoLead({ name, email, phone, country, course, message }),
    ]);

    // Log de resultados
    if (emailResult.status === 'fulfilled') {
      console.log('Email enviado:', { name, email, course });
    } else {
      console.error('Error enviando email:', emailResult.reason);
    }

    if (crmResult.status === 'fulfilled') {
      console.log('Lead creado en Zoho CRM:', { name, email });
    } else {
      console.error('Error creando lead en CRM:', crmResult.reason);
    }

    return NextResponse.json({ ok: true });
  } catch(err: any){
    console.error('Error al enviar email:', err);
    return NextResponse.json({ ok:false, error: err?.message || 'Error' }, { status: 500 });
  }
}



