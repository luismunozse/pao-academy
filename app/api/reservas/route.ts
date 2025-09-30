import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest){
  try{
    const data = await req.json();
    // Validación mínima
    if (!data?.name || !data?.email || !data?.course) {
      return NextResponse.json({ ok:false, error:'Datos incompletos' }, { status: 400 });
    }

    // Simulación de persistencia: loguear en servidor (en real: DB / CRM / Email)
    console.log('Reserva recibida:', {
      name: data.name,
      email: data.email,
      course: data.course,
      date: data.date || null,
      referralCode: data.referralCode || null,
    });

    return NextResponse.json({ ok:true });
  } catch(err: any){
    return NextResponse.json({ ok:false, error: err?.message || 'Error' }, { status: 500 });
  }
}



