'use client';

import Link from 'next/link';
import { ArrowLeft, FileText, UserCheck, BookOpen, CreditCard, Key, Copyright, Award, RefreshCw, UserX, AlertTriangle, Gavel, Settings, Scale, Mail } from 'lucide-react';

export default function TermsConditionsPage() {
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
            <FileText size={40} color="white" />
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            color: '#0F172A',
            marginBottom: '1rem',
            lineHeight: 1.2
          }}>
            Términos y Condiciones
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: '#475569',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Bienvenido a Glomind360. Estos términos regulan el acceso y uso de nuestra plataforma educativa.
          </p>
        </div>
      </section>

      {/* Content */}
      <main style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '3rem 1.5rem'
      }}>

        {/* Section 1 - Definitions */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
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
              <BookOpen size={24} color="#3B82F6" />
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>
                1. Definiciones
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '0.75rem'
              }}>
                {[
                  { term: '"Glomind360"', def: 'La plataforma educativa y sus operadores' },
                  { term: '"Usuario"', def: 'Toda persona que accede o utiliza la plataforma' },
                  { term: '"Plataforma"', def: 'El sitio web y servicios digitales' },
                  { term: '"Contenido"', def: 'Materiales educativos: videos, textos, ejercicios' },
                  { term: '"Curso"', def: 'Programa educativo estructurado' },
                ].map((item, i) => (
                  <div key={i} style={{
                    padding: '1rem',
                    background: 'white',
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB'
                  }}>
                    <span style={{ color: '#3B82F6', fontWeight: 600, fontSize: '0.875rem' }}>{item.term}</span>
                    <p style={{ color: '#64748B', fontSize: '0.813rem', marginTop: '0.25rem' }}>{item.def}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 - Acceptance */}
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
              <UserCheck size={24} color="#3B82F6" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>
                2. Aceptación de los Términos
              </h2>
              <p style={{ color: '#475569', lineHeight: 1.7 }}>
                Al crear una cuenta, realizar una compra o simplemente navegar por nuestro sitio, confirmas que has
                leído, entendido y aceptado estos Términos y Condiciones, así como nuestra Política de Privacidad.
                Si no estás de acuerdo con alguno de estos términos, te pedimos que no utilices nuestros servicios.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 - Registration */}
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
              <UserCheck size={24} color="#3B82F6" />
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>
                3. Registro y Cuenta de Usuario
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{
                  padding: '1.5rem',
                  background: 'white',
                  borderRadius: '16px',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                }}>
                  <h3 style={{ fontWeight: 600, color: '#0F172A', marginBottom: '0.75rem' }}>3.1. Requisitos de registro</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {[
                      'Debes ser mayor de 18 años para crear una cuenta.',
                      'La información proporcionada debe ser veraz, completa y actualizada.',
                      'Eres responsable de mantener la confidencialidad de tu contraseña.',
                      'No puedes crear múltiples cuentas ni compartir tu cuenta con terceros.',
                    ].map((item, i) => (
                      <li key={i} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.5rem',
                        color: '#475569',
                        fontSize: '0.875rem',
                        marginBottom: '0.5rem'
                      }}>
                        <span style={{ color: '#10B981', fontWeight: 600 }}>✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{
                  padding: '1.5rem',
                  background: 'white',
                  borderRadius: '16px',
                  border: '1px solid #E5E7EB'
                }}>
                  <h3 style={{ fontWeight: 600, color: '#0F172A', marginBottom: '0.5rem' }}>3.2. Responsabilidad de la cuenta</h3>
                  <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.6 }}>
                    Eres responsable de todas las actividades que ocurran bajo tu cuenta. Debes notificarnos
                    inmediatamente si sospechas de cualquier uso no autorizado. Glomind360 no será
                    responsable por pérdidas derivadas del uso no autorizado de tu cuenta.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 - Services */}
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
              <BookOpen size={24} color="#3B82F6" />
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>
                4. Servicios y Contenido Educativo
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{
                  padding: '1.5rem',
                  background: 'white',
                  borderRadius: '16px',
                  border: '1px solid #E5E7EB'
                }}>
                  <h3 style={{ fontWeight: 600, color: '#0F172A', marginBottom: '0.5rem' }}>4.1. Descripción del servicio</h3>
                  <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.6 }}>
                    Glomind360 proporciona acceso a cursos online de formación profesional en diversas áreas
                    incluyendo liderazgo, ventas, análisis de datos, marketing digital y desarrollo profesional.
                    Los cursos pueden incluir videos, materiales de lectura, ejercicios prácticos, evaluaciones
                    y certificados de finalización.
                  </p>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem'
                }}>
                  <div style={{
                    padding: '1rem',
                    background: 'white',
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB'
                  }}>
                    <h3 style={{ fontWeight: 600, color: '#0F172A', marginBottom: '0.5rem', fontSize: '0.875rem' }}>4.2. Disponibilidad</h3>
                    <p style={{ color: '#64748B', fontSize: '0.813rem', lineHeight: 1.5 }}>
                      Nos esforzamos por mantener la plataforma disponible 24/7, sin embargo no garantizamos
                      disponibilidad ininterrumpida.
                    </p>
                  </div>
                  <div style={{
                    padding: '1rem',
                    background: 'white',
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB'
                  }}>
                    <h3 style={{ fontWeight: 600, color: '#0F172A', marginBottom: '0.5rem', fontSize: '0.875rem' }}>4.3. Modificaciones</h3>
                    <p style={{ color: '#64748B', fontSize: '0.813rem', lineHeight: 1.5 }}>
                      Nos reservamos el derecho de actualizar contenido para mantenerlo actualizado y relevante.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 - Payments */}
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
                5. Precios y Pagos
              </h2>

              <div style={{
                padding: '1.5rem',
                background: 'white',
                borderRadius: '16px',
                border: '1px solid #E5E7EB',
                marginBottom: '1rem'
              }}>
                <h3 style={{ fontWeight: 600, color: '#0F172A', marginBottom: '0.75rem' }}>5.1. Precios</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {[
                    'Los precios incluyen impuestos aplicables.',
                    'Nos reservamos el derecho de modificar precios sin previo aviso.',
                    'Las promociones tienen condiciones específicas y fechas de validez.',
                  ].map((item, i) => (
                    <li key={i} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.5rem',
                      color: '#475569',
                      fontSize: '0.875rem',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{ color: '#3B82F6' }}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
              }}>
                <div style={{
                  padding: '1rem',
                  background: 'white',
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB'
                }}>
                  <h3 style={{ fontWeight: 600, color: '#0F172A', marginBottom: '0.5rem', fontSize: '0.875rem' }}>5.2. Métodos de pago</h3>
                  <p style={{ color: '#64748B', fontSize: '0.813rem' }}>
                    Todos los pagos son procesados a través de pasarelas de pago seguras y certificadas.
                  </p>
                </div>
                <div style={{
                  padding: '1rem',
                  background: 'white',
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB'
                }}>
                  <h3 style={{ fontWeight: 600, color: '#0F172A', marginBottom: '0.5rem', fontSize: '0.875rem' }}>5.3. Facturación</h3>
                  <p style={{ color: '#64748B', fontSize: '0.813rem' }}>
                    Al completar una compra, recibirás un comprobante de pago por correo electrónico.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6 - Course Access */}
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
              <Key size={24} color="#3B82F6" />
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>
                6. Acceso a los Cursos
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem'
              }}>
                <div style={{
                  padding: '1.5rem',
                  background: 'white',
                  borderRadius: '16px',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                }}>
                  <h3 style={{ fontWeight: 600, color: '#0F172A', marginBottom: '0.5rem' }}>6.1. Duración del acceso</h3>
                  <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.6 }}>
                    El período de acceso se especifica en cada curso. Algunos cursos pueden ofrecer acceso de por vida.
                  </p>
                </div>
                <div style={{
                  padding: '1.5rem',
                  background: 'white',
                  borderRadius: '16px',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                }}>
                  <h3 style={{ fontWeight: 600, color: '#0F172A', marginBottom: '0.5rem' }}>6.2. Licencia de uso</h3>
                  <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.6 }}>
                    Se te otorga una licencia personal, no exclusiva, no transferible y revocable para acceder al contenido.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7 - Intellectual Property */}
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
              <Copyright size={24} color="#3B82F6" />
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>
                7. Propiedad Intelectual
              </h2>

              <div style={{
                padding: '1.5rem',
                background: 'white',
                borderRadius: '16px',
                border: '1px solid #E5E7EB',
                marginBottom: '1rem'
              }}>
                <h3 style={{ fontWeight: 600, color: '#0F172A', marginBottom: '0.5rem' }}>7.1. Derechos de Glomind360</h3>
                <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.6 }}>
                  Todo el contenido de la plataforma es propiedad de Glomind360 o de sus licenciantes y está
                  protegido por leyes de propiedad intelectual nacionales e internacionales.
                </p>
              </div>

              <div style={{
                padding: '1.5rem',
                background: 'linear-gradient(135deg, #FEF2F2, #FEE2E2)',
                borderRadius: '16px',
                border: '1px solid #FECACA'
              }}>
                <h3 style={{ fontWeight: 600, color: '#0F172A', marginBottom: '0.75rem' }}>7.2. Restricciones de uso</h3>
                <p style={{ color: '#475569', fontSize: '0.875rem', marginBottom: '0.75rem' }}>Queda expresamente prohibido:</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {[
                    'Copiar, reproducir, distribuir o modificar el contenido sin autorización.',
                    'Descargar, grabar o capturar videos u otros materiales.',
                    'Compartir credenciales o permitir acceso a terceros.',
                    'Utilizar el contenido con fines comerciales.',
                    'Utilizar herramientas automatizadas para extraer contenido.',
                  ].map((item, i) => (
                    <li key={i} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.5rem',
                      color: '#475569',
                      fontSize: '0.875rem',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{ color: '#EF4444', fontWeight: 600 }}>✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8 - Certificates */}
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
              <Award size={24} color="#3B82F6" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>
                8. Certificados
              </h2>
              <p style={{ color: '#475569', lineHeight: 1.7 }}>
                Los certificados emitidos por Glomind360 acreditan la finalización del curso correspondiente.
                Estos certificados son emitidos por Glomind360 y no representan títulos académicos oficiales
                ni están avalados por instituciones educativas gubernamentales, salvo que se indique
                expresamente lo contrario.
              </p>
            </div>
          </div>
        </section>

        {/* Section 9 - Refunds */}
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
              <RefreshCw size={24} color="#3B82F6" />
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>
                9. Política de Reembolsos
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{
                  padding: '1.5rem',
                  background: 'white',
                  borderRadius: '16px',
                  border: '1px solid #E5E7EB'
                }}>
                  <h3 style={{ fontWeight: 600, color: '#0F172A', marginBottom: '0.5rem' }}>9.1. Derecho de desistimiento</h3>
                  <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.6 }}>
                    De acuerdo con la legislación aplicable, tienes derecho a desistir de tu compra dentro de los
                    plazos establecidos por ley. Consulta nuestra página de{' '}
                    <Link href="/arrepentimiento" style={{ color: '#3B82F6', textDecoration: 'underline' }}>
                      Botón de Arrepentimiento
                    </Link>{' '}
                    para más detalles.
                  </p>
                </div>

                <div style={{
                  padding: '1.5rem',
                  background: 'white',
                  borderRadius: '16px',
                  border: '1px solid #E5E7EB'
                }}>
                  <h3 style={{ fontWeight: 600, color: '#0F172A', marginBottom: '0.75rem' }}>9.2. Excepciones</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {[
                      'Has accedido o descargado una parte sustancial del contenido.',
                      'Ha expirado el plazo legal de desistimiento.',
                      'El curso fue adquirido con un descuento que excluía reembolsos.',
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
          </div>
        </section>

        {/* Section 10 - User Conduct */}
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
              <UserX size={24} color="#3B82F6" />
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>
                10. Conducta del Usuario
              </h2>
              <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1rem' }}>Al utilizar nuestra plataforma, te comprometes a:</p>
              <div style={{
                padding: '1.5rem',
                background: 'white',
                borderRadius: '16px',
                border: '1px solid #E5E7EB'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '0.5rem'
                }}>
                  {[
                    'No usar el servicio para fines ilegales',
                    'No acceder a áreas restringidas',
                    'No interferir con el funcionamiento',
                    'No acosar o discriminar a otros',
                    'No publicar contenido ofensivo',
                    'Respetar la propiedad intelectual',
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
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
            </div>
          </div>
        </section>

        {/* Section 11 - Liability */}
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
              <AlertTriangle size={24} color="#3B82F6" />
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>
                11. Limitación de Responsabilidad
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1rem'
              }}>
                {[
                  { title: '11.1. Disponibilidad', desc: 'No garantizamos que la plataforma estará libre de errores o interrupciones.' },
                  { title: '11.2. Contenido', desc: 'No garantizamos resultados específicos derivados de la aplicación de lo aprendido.' },
                  { title: '11.3. Límite', desc: 'La responsabilidad total no excederá el monto pagado en los últimos 12 meses.' },
                ].map((item, i) => (
                  <div key={i} style={{
                    padding: '1rem',
                    background: 'white',
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB'
                  }}>
                    <h3 style={{ fontWeight: 600, color: '#0F172A', marginBottom: '0.5rem', fontSize: '0.875rem' }}>{item.title}</h3>
                    <p style={{ color: '#64748B', fontSize: '0.813rem', lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 12 - Termination */}
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
              <UserX size={24} color="#3B82F6" />
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>
                12. Suspensión y Terminación
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem'
              }}>
                <div style={{
                  padding: '1.5rem',
                  background: 'white',
                  borderRadius: '16px',
                  border: '1px solid #E5E7EB'
                }}>
                  <h3 style={{ fontWeight: 600, color: '#0F172A', marginBottom: '0.5rem' }}>12.1. Por parte del usuario</h3>
                  <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.6 }}>
                    Puedes cancelar tu cuenta en cualquier momento contactando a nuestro equipo de soporte.
                    La cancelación no dará derecho a reembolso de cursos ya adquiridos.
                  </p>
                </div>
                <div style={{
                  padding: '1.5rem',
                  background: 'white',
                  borderRadius: '16px',
                  border: '1px solid #E5E7EB'
                }}>
                  <h3 style={{ fontWeight: 600, color: '#0F172A', marginBottom: '0.5rem' }}>12.2. Por parte de Glomind360</h3>
                  <p style={{ color: '#475569', fontSize: '0.875rem', marginBottom: '0.5rem', lineHeight: 1.6 }}>
                    Nos reservamos el derecho de suspender tu cuenta si:
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li style={{ color: '#64748B', fontSize: '0.813rem', marginBottom: '0.25rem' }}>• Violas estos Términos y Condiciones</li>
                    <li style={{ color: '#64748B', fontSize: '0.813rem', marginBottom: '0.25rem' }}>• Realizas actividades fraudulentas</li>
                    <li style={{ color: '#64748B', fontSize: '0.813rem' }}>• Compartes tu cuenta sin autorización</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sections 13-15 */}
        <section style={{ marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
              <Settings size={24} color="#3B82F6" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
                13. Modificaciones de los Términos
              </h2>
              <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.6 }}>
                Glomind360 se reserva el derecho de modificar estos Términos en cualquier momento.
                Te notificaremos sobre cambios significativos por correo electrónico o mediante un aviso en el sitio.
              </p>
            </div>
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
              <Gavel size={24} color="#3B82F6" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
                14. Ley Aplicable y Jurisdicción
              </h2>
              <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.6 }}>
                Estos Términos se rigen por las leyes del país donde Glomind360 tiene su sede principal.
                Cualquier disputa será sometida a la jurisdicción de los tribunales competentes de dicha localidad.
              </p>
            </div>
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
                15. Disposiciones Generales
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '0.75rem'
              }}>
                {[
                  { title: 'Independencia', desc: 'Si una disposición resulta inválida, las demás permanecen en vigor' },
                  { title: 'Cesión', desc: 'No puedes ceder tus derechos sin nuestro consentimiento' },
                  { title: 'Renuncia', desc: 'No ejercer un derecho no constituye renuncia al mismo' },
                  { title: 'Acuerdo completo', desc: 'Estos términos constituyen el acuerdo completo entre las partes' },
                ].map((item, i) => (
                  <div key={i} style={{
                    padding: '1rem',
                    background: 'white',
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB'
                  }}>
                    <span style={{ color: '#3B82F6', fontWeight: 600, fontSize: '0.875rem' }}>{item.title}</span>
                    <p style={{ color: '#64748B', fontSize: '0.813rem', marginTop: '0.25rem' }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 16 - Contact */}
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
                  16. Contacto
                </h2>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  Para cualquier consulta relacionada con estos Términos y Condiciones, puedes contactarnos
                  a través de nuestros canales oficiales de atención al cliente o redes sociales.
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
