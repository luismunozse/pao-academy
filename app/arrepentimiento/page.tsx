'use client';

import Link from 'next/link';
import { ArrowLeft, RotateCcw, Clock, CheckCircle, XCircle, FileText, CreditCard, HelpCircle, Scale, Mail, AlertCircle } from 'lucide-react';

export default function WithdrawalPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #E5E7EB',
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#64748B',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: 500,
              transition: 'color 0.2s'
            }}
          >
            <ArrowLeft size={18} />
            <span>Volver al inicio</span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
        padding: '4rem 1.5rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            borderRadius: '1.5rem',
            background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
            marginBottom: '1.5rem',
            boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)'
          }}>
            <RotateCcw size={40} color="white" />
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            color: '#0F172A',
            marginBottom: '1rem',
            lineHeight: 1.2
          }}>
            Botón de Arrepentimiento
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: '#475569',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            En Glomind360 respetamos y garantizamos tu derecho de desistimiento conforme a las leyes de protección al consumidor.
          </p>
        </div>
      </section>

      {/* Content */}
      <main style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '3rem 1.5rem'
      }}>

        {/* Section 1 - What is it */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{
              flexShrink: 0,
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #DBEAFE, #E0E7FF)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <HelpCircle size={24} color="#3B82F6" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>
                1. ¿Qué es el Derecho de Arrepentimiento?
              </h2>
              <div style={{
                padding: '1.5rem',
                background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
                borderRadius: '16px',
                border: '1px solid #BFDBFE'
              }}>
                <p style={{ color: '#475569', lineHeight: 1.7 }}>
                  El derecho de arrepentimiento (también conocido como derecho de desistimiento o retracto) es
                  la facultad que tienen los consumidores de dejar sin efecto una compra realizada a distancia
                  o por medios electrónicos, <strong style={{ color: '#0F172A' }}>sin necesidad de justificar su decisión</strong> y
                  sin penalización alguna, dentro del plazo establecido por la ley.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 - Deadlines */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{
              flexShrink: 0,
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #DBEAFE, #E0E7FF)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Clock size={24} color="#3B82F6" />
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>
                2. Plazo para Ejercer el Derecho
              </h2>
              <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1rem' }}>
                Tienes un plazo de <strong style={{ color: '#3B82F6' }}>10 días corridos</strong> desde la fecha de compra.
                Este plazo puede variar según tu país de residencia:
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '0.75rem'
              }}>
                {[
                  { country: 'Argentina', days: '10 días corridos', law: 'Ley 24.240', flag: '🇦🇷' },
                  { country: 'España / UE', days: '14 días naturales', law: 'Directiva 2011/83/UE', flag: '🇪🇺' },
                  { country: 'México', days: '5 días hábiles', law: 'LFPC', flag: '🇲🇽' },
                  { country: 'Chile', days: '10 días corridos', law: 'Ley 19.496', flag: '🇨🇱' },
                  { country: 'Colombia', days: '5 días hábiles', law: 'Ley 1480', flag: '🇨🇴' },
                  { country: 'Otros', days: 'Consultar', law: 'Legislación local', flag: '🌍' },
                ].map((item, i) => (
                  <div key={i} style={{
                    padding: '1rem',
                    background: 'white',
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '1.5rem' }}>{item.flag}</span>
                      <span style={{ fontWeight: 600, color: '#0F172A', fontSize: '0.875rem' }}>{item.country}</span>
                    </div>
                    <p style={{ color: '#3B82F6', fontWeight: 700, fontSize: '0.875rem' }}>{item.days}</p>
                    <p style={{ color: '#94A3B8', fontSize: '0.75rem', marginTop: '0.25rem' }}>{item.law}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 - Conditions */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{
              flexShrink: 0,
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #DBEAFE, #E0E7FF)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CheckCircle size={24} color="#3B82F6" />
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>
                3. Condiciones para el Reembolso
              </h2>
              <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1rem' }}>
                Para que tu solicitud de arrepentimiento sea procesada, deben cumplirse las siguientes condiciones:
              </p>

              <div style={{
                padding: '1.5rem',
                background: 'white',
                borderRadius: '16px',
                border: '1px solid #E5E7EB'
              }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {[
                    'La solicitud debe realizarse dentro del plazo legal establecido.',
                    'No debes haber accedido o consumido más del 25% del contenido del curso.',
                    'No debes haber descargado materiales complementarios del curso.',
                    'No debes haber solicitado ni obtenido el certificado de finalización.',
                  ].map((item, i) => (
                    <li key={i} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      color: '#475569',
                      marginBottom: '0.75rem'
                    }}>
                      <span style={{
                        flexShrink: 0,
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #D1FAE5, #A7F3D0)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <CheckCircle size={14} color="#10B981" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 - Exceptions */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{
              flexShrink: 0,
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #FEE2E2, #FECACA)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <XCircle size={24} color="#EF4444" />
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>
                4. Excepciones al Derecho de Arrepentimiento
              </h2>
              <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1rem' }}>
                El derecho de arrepentimiento <strong style={{ color: '#EF4444' }}>NO aplica</strong> en los siguientes casos:
              </p>

              <div style={{
                padding: '1.5rem',
                background: 'linear-gradient(135deg, #FEF2F2, #FEE2E2)',
                borderRadius: '16px',
                border: '1px solid #FECACA'
              }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {[
                    'Cuando hayas accedido o visualizado más del 25% del contenido del curso.',
                    'Cuando hayas descargado materiales, recursos o archivos del curso.',
                    'Cuando el contenido digital haya comenzado a ejecutarse con tu consentimiento expreso.',
                    'Cuando el curso fue adquirido bajo una promoción que excluía el derecho de reembolso.',
                    'Cuando haya expirado el plazo legal para ejercer el derecho.',
                  ].map((item, i) => (
                    <li key={i} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      color: '#475569',
                      marginBottom: '0.75rem'
                    }}>
                      <span style={{ color: '#EF4444', fontWeight: 600, marginTop: '2px' }}>✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 - How to request */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{
              flexShrink: 0,
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #DBEAFE, #E0E7FF)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FileText size={24} color="#3B82F6" />
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>
                5. Cómo Solicitar el Reembolso
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Step 1 */}
                <div style={{
                  padding: '1.5rem',
                  background: 'white',
                  borderRadius: '16px',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <span style={{
                      flexShrink: 0,
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.875rem'
                    }}>1</span>
                    <h3 style={{ fontWeight: 600, color: '#0F172A' }}>Prepara la información necesaria</h3>
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '0.5rem'
                  }}>
                    {[
                      'Tu nombre completo',
                      'Correo electrónico registrado',
                      'Nombre del curso',
                      'Fecha de compra',
                      'Número de orden',
                      'Motivo (opcional)',
                    ].map((item, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#475569',
                        fontSize: '0.875rem'
                      }}>
                        <span style={{ color: '#3B82F6' }}>•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 2 */}
                <div style={{
                  padding: '1.5rem',
                  background: 'white',
                  borderRadius: '16px',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <span style={{
                      flexShrink: 0,
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.875rem'
                    }}>2</span>
                    <h3 style={{ fontWeight: 600, color: '#0F172A' }}>Envía tu solicitud</h3>
                  </div>
                  <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.6 }}>
                    Contáctanos a través de nuestros canales oficiales indicando en el asunto
                    <span style={{ color: '#3B82F6', fontWeight: 500 }}> &quot;Solicitud de Arrepentimiento&quot;</span> o
                    <span style={{ color: '#3B82F6', fontWeight: 500 }}> &quot;Solicitud de Reembolso&quot;</span>.
                  </p>
                </div>

                {/* Step 3 */}
                <div style={{
                  padding: '1.5rem',
                  background: 'white',
                  borderRadius: '16px',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <span style={{
                      flexShrink: 0,
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.875rem'
                    }}>3</span>
                    <h3 style={{ fontWeight: 600, color: '#0F172A' }}>Confirmación</h3>
                  </div>
                  <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.6 }}>
                    Recibirás una confirmación de recepción dentro de las <strong style={{ color: '#0F172A' }}>24-48 horas hábiles</strong>.
                    Nuestro equipo revisará tu caso y te informará sobre la procedencia del reembolso.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6 - Refund Process */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{
              flexShrink: 0,
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #DBEAFE, #E0E7FF)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CreditCard size={24} color="#3B82F6" />
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>
                6. Proceso de Reembolso
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1rem'
              }}>
                {[
                  { icon: FileText, title: '6.1. Evaluación', desc: '2-5 días hábiles para verificar condiciones' },
                  { icon: CreditCard, title: '6.2. Procesamiento', desc: '5-10 días hábiles para tarjetas de crédito' },
                  { icon: CheckCircle, title: '6.3. Confirmación', desc: 'Recibirás email con detalles' },
                ].map((item, i) => (
                  <div key={i} style={{
                    padding: '1.5rem',
                    background: 'white',
                    borderRadius: '16px',
                    border: '1px solid #E5E7EB',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #DBEAFE, #E0E7FF)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 0.75rem'
                    }}>
                      <item.icon size={24} color="#3B82F6" />
                    </div>
                    <h3 style={{ fontWeight: 600, color: '#0F172A', marginBottom: '0.5rem', fontSize: '0.875rem' }}>{item.title}</h3>
                    <p style={{ color: '#64748B', fontSize: '0.813rem' }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 7 - Effects */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{
              flexShrink: 0,
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #DBEAFE, #E0E7FF)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <AlertCircle size={24} color="#3B82F6" />
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>
                7. Efectos del Arrepentimiento
              </h2>
              <div style={{
                padding: '1.5rem',
                background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
                borderRadius: '16px',
                border: '1px solid #FCD34D'
              }}>
                <p style={{ color: '#475569', marginBottom: '0.75rem' }}>Una vez procesado el reembolso:</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {[
                    'Tu acceso al curso será revocado inmediatamente.',
                    'Se eliminarán los registros de progreso asociados al curso.',
                    'No podrás volver a solicitar reembolso por el mismo curso si lo adquieres nuevamente.',
                  ].map((item, i) => (
                    <li key={i} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.5rem',
                      color: '#475569',
                      fontSize: '0.875rem',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{ color: '#F59E0B', fontWeight: 600 }}>!</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Sections 8-10 */}
        <section style={{ marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{
            padding: '1.5rem',
            background: 'white',
            borderRadius: '16px',
            border: '1px solid #E5E7EB'
          }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
              8. Reembolsos Parciales
            </h2>
            <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.6 }}>
              En casos excepcionales (problemas técnicos graves, contenido significativamente diferente al ofrecido),
              podemos evaluar la posibilidad de un reembolso parcial. Estas situaciones se analizan caso por caso.
            </p>
          </div>

          <div style={{
            padding: '1.5rem',
            background: 'white',
            borderRadius: '16px',
            border: '1px solid #E5E7EB'
          }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
              9. Resolución de Disputas
            </h2>
            <p style={{ color: '#475569', fontSize: '0.875rem', marginBottom: '0.75rem', lineHeight: 1.6 }}>
              Si no estás conforme con la resolución de tu solicitud, puedes:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ color: '#64748B', fontSize: '0.875rem', marginBottom: '0.25rem' }}>• Solicitar una revisión de tu caso contactando nuevamente</li>
              <li style={{ color: '#64748B', fontSize: '0.875rem', marginBottom: '0.25rem' }}>• Presentar una queja ante el organismo de defensa del consumidor de tu país</li>
              <li style={{ color: '#64748B', fontSize: '0.875rem' }}>• Utilizar los mecanismos de resolución de disputas de tu proveedor de pagos</li>
            </ul>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{
              flexShrink: 0,
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #DBEAFE, #E0E7FF)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Scale size={24} color="#3B82F6" />
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>
                10. Marco Legal
              </h2>
              <p style={{ color: '#475569', fontSize: '0.875rem', marginBottom: '0.75rem', lineHeight: 1.6 }}>
                Este derecho se enmarca en las siguientes normativas según tu jurisdicción:
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '0.5rem'
              }}>
                {[
                  { flag: '🇦🇷', law: 'Ley 24.240 de Defensa del Consumidor' },
                  { flag: '🇪🇺', law: 'Directiva 2011/83/UE' },
                  { flag: '🇲🇽', law: 'Ley Federal de Protección al Consumidor' },
                  { flag: '🇨🇱', law: 'Ley 19.496' },
                  { flag: '🇨🇴', law: 'Ley 1480 de 2011' },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#64748B',
                    fontSize: '0.875rem'
                  }}>
                    <span>{item.flag}</span>
                    <span>{item.law}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 11 - FAQ */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{
              flexShrink: 0,
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #DBEAFE, #E0E7FF)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <HelpCircle size={24} color="#3B82F6" />
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>
                11. Preguntas Frecuentes
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  {
                    q: '¿Puedo cancelar si ya empecé el curso?',
                    a: 'Sí, siempre que no hayas superado el 25% del contenido y estés dentro del plazo legal.'
                  },
                  {
                    q: '¿Cuánto tardaré en recibir mi dinero?',
                    a: 'Una vez aprobada, generalmente entre 5 y 10 días hábiles para tarjetas de crédito.'
                  },
                  {
                    q: '¿Puedo solicitar reembolso por un curso en promoción?',
                    a: 'Depende de los términos específicos de la promoción, que se indican al momento de la compra.'
                  },
                  {
                    q: '¿Qué pasa si compré varios cursos en un paquete?',
                    a: 'Los paquetes se tratan como una única compra. El arrepentimiento aplica al paquete completo.'
                  },
                ].map((faq, i) => (
                  <div key={i} style={{
                    padding: '1.25rem',
                    background: 'white',
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB'
                  }}>
                    <h3 style={{ fontWeight: 600, color: '#3B82F6', marginBottom: '0.5rem', fontSize: '0.938rem' }}>{faq.q}</h3>
                    <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.6 }}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 12 - Contact */}
        <section style={{ marginBottom: '2rem' }}>
          <div style={{
            padding: '2rem',
            background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
            borderRadius: '20px',
            border: '1px solid #BFDBFE'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{
                flexShrink: 0,
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
              }}>
                <Mail size={28} color="white" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
                  12. Contacto
                </h2>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  Para ejercer tu derecho de arrepentimiento o realizar consultas sobre este tema,
                  contáctanos a través de nuestros canales oficiales de atención al cliente o redes sociales.
                  Estamos aquí para ayudarte.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          paddingTop: '2rem',
          borderTop: '1px solid #E5E7EB'
        }}>
          <p style={{ color: '#94A3B8', fontSize: '0.875rem' }}>Última actualización: 14 de enero de 2026</p>
        </div>
      </main>
    </div>
  );
}
