'use client';

import Link from 'next/link';
import { ArrowLeft, Shield, Database, Lock, Eye, Users, Globe, Clock, FileText, Cookie, Mail } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #E5E7EB',
        padding: '1rem',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#64748B',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: 500
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
        padding: '4rem 1rem'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            borderRadius: '1rem',
            background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
            marginBottom: '1.5rem',
            boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)'
          }}>
            <Shield size={40} color="white" />
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            color: '#0F172A',
            marginBottom: '1rem'
          }}>
            Políticas de Privacidad
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: '#475569',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            En Glomind360 nos comprometemos a proteger tu privacidad y garantizar la seguridad de tu información personal.
          </p>
        </div>
      </section>

      {/* Content */}
      <main style={{ padding: '3rem 1rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>

          {/* Section 1 */}
          <section style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{
                flexShrink: 0,
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#EFF6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FileText size={24} color="#3B82F6" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.75rem' }}>
                  1. Responsable del Tratamiento de Datos
                </h2>
                <p style={{ color: '#475569', lineHeight: 1.7 }}>
                  Glomind360 es responsable del tratamiento de los datos personales recogidos a través de este sitio web.
                  Para cualquier consulta relacionada con la privacidad, puedes contactarnos a través de nuestros canales oficiales.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{
                flexShrink: 0,
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#EFF6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Database size={24} color="#3B82F6" />
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.75rem' }}>
                  2. Datos Personales que Recopilamos
                </h2>
                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  Recopilamos diferentes tipos de información según cómo interactúes con nuestra plataforma:
                </p>

                <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                  <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}>
                    <h3 style={{ fontWeight: 600, color: '#0F172A', marginBottom: '1rem' }}>Datos proporcionados por ti</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#475569', fontSize: '0.875rem' }}>
                        <span style={{ color: '#3B82F6' }}>•</span>
                        <span><strong>Registro:</strong> nombre, email, teléfono y contraseña.</span>
                      </li>
                      <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#475569', fontSize: '0.875rem' }}>
                        <span style={{ color: '#3B82F6' }}>•</span>
                        <span><strong>Perfil:</strong> foto, ocupación, empresa e intereses.</span>
                      </li>
                      <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#475569', fontSize: '0.875rem' }}>
                        <span style={{ color: '#3B82F6' }}>•</span>
                        <span><strong>Pago:</strong> gestionados por procesadores seguros.</span>
                      </li>
                    </ul>
                  </div>

                  <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}>
                    <h3 style={{ fontWeight: 600, color: '#0F172A', marginBottom: '1rem' }}>Datos recopilados automáticamente</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#475569', fontSize: '0.875rem' }}>
                        <span style={{ color: '#3B82F6' }}>•</span>
                        <span><strong>Uso:</strong> cursos, progreso y preferencias.</span>
                      </li>
                      <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#475569', fontSize: '0.875rem' }}>
                        <span style={{ color: '#3B82F6' }}>•</span>
                        <span><strong>Técnicos:</strong> IP, navegador, dispositivo.</span>
                      </li>
                      <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#475569', fontSize: '0.875rem' }}>
                        <span style={{ color: '#3B82F6' }}>•</span>
                        <span><strong>Cookies:</strong> navegación y preferencias.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{
                flexShrink: 0,
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#EFF6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Eye size={24} color="#3B82F6" />
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.75rem' }}>
                  3. Finalidades del Tratamiento
                </h2>
                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1rem' }}>
                  Utilizamos tus datos personales para los siguientes propósitos:
                </p>
                <div style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  border: '1px solid #E5E7EB'
                }}>
                  <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                    {[
                      { title: 'Prestación de servicios', desc: 'gestión de cuenta y cursos' },
                      { title: 'Procesamiento de pagos', desc: 'transacciones y facturas' },
                      { title: 'Comunicaciones', desc: 'notificaciones y actualizaciones' },
                      { title: 'Marketing', desc: 'ofertas con tu consentimiento' },
                      { title: 'Mejora del servicio', desc: 'análisis y optimización' },
                      { title: 'Seguridad', desc: 'prevención de fraudes' },
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                        <span style={{ color: '#22C55E', marginTop: '2px' }}>✓</span>
                        <span style={{ color: '#475569', fontSize: '0.875rem' }}>
                          <strong style={{ color: '#0F172A' }}>{item.title}:</strong> {item.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{
                flexShrink: 0,
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#EFF6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FileText size={24} color="#3B82F6" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.75rem' }}>
                  4. Base Legal del Tratamiento
                </h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    { title: 'Ejecución de contrato', desc: 'para prestarte los servicios educativos contratados.' },
                    { title: 'Consentimiento', desc: 'para comunicaciones comerciales y cookies no esenciales.' },
                    { title: 'Interés legítimo', desc: 'para mejorar servicios y garantizar seguridad.' },
                    { title: 'Obligación legal', desc: 'para cumplir requisitos fiscales y regulatorios.' },
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#475569' }}>
                      <span style={{ color: '#3B82F6' }}>•</span>
                      <span><strong style={{ color: '#0F172A' }}>{item.title}:</strong> {item.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{
                flexShrink: 0,
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#EFF6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Users size={24} color="#3B82F6" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.75rem' }}>
                  5. Compartición de Datos
                </h2>
                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1rem' }}>
                  No vendemos ni alquilamos tus datos personales a terceros. Solo compartimos información en los siguientes casos:
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#475569' }}>
                    <span style={{ color: '#3B82F6' }}>•</span>
                    <span><strong style={{ color: '#0F172A' }}>Proveedores de servicios:</strong> hosting, pagos, análisis y soporte.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#475569' }}>
                    <span style={{ color: '#3B82F6' }}>•</span>
                    <span><strong style={{ color: '#0F172A' }}>Requisitos legales:</strong> cuando sea requerido por ley u orden judicial.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#475569' }}>
                    <span style={{ color: '#3B82F6' }}>•</span>
                    <span><strong style={{ color: '#0F172A' }}>Protección de derechos:</strong> para proteger derechos y seguridad.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 6-7 */}
          <section style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid #E5E7EB'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <Globe size={24} color="#3B82F6" />
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A' }}>6. Transferencias Internacionales</h2>
                </div>
                <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.7 }}>
                  Tus datos pueden ser transferidos a servidores fuera de tu país. Garantizamos medidas de protección adecuadas según las autoridades de protección de datos.
                </p>
              </div>

              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid #E5E7EB'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <Clock size={24} color="#3B82F6" />
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A' }}>7. Conservación de Datos</h2>
                </div>
                <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.7 }}>
                  Conservamos tus datos mientras mantengas cuenta activa y durante los plazos legalmente establecidos.
                </p>
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{
                flexShrink: 0,
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#EFF6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Lock size={24} color="#3B82F6" />
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.75rem' }}>
                  8. Seguridad de los Datos
                </h2>
                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1rem' }}>
                  Implementamos medidas técnicas y organizativas para proteger tus datos personales:
                </p>
                <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                  {[
                    '🔒 Encriptación de datos',
                    '🛡️ Controles de acceso',
                    '📊 Monitoreo de seguridad',
                    '👥 Formación del equipo',
                  ].map((item, i) => (
                    <div key={i} style={{
                      background: '#F1F5F9',
                      borderRadius: '8px',
                      padding: '0.75rem 1rem',
                      fontSize: '0.875rem',
                      color: '#475569'
                    }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 9 - Rights */}
          <section style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{
                flexShrink: 0,
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#EFF6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Shield size={24} color="#3B82F6" />
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.75rem' }}>
                  9. Tus Derechos
                </h2>
                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1rem' }}>
                  Como titular de los datos, tienes los siguientes derechos:
                </p>
                <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
                  {[
                    { title: 'Acceso', desc: 'Solicitar información' },
                    { title: 'Rectificación', desc: 'Corregir datos' },
                    { title: 'Supresión', desc: 'Eliminar datos' },
                    { title: 'Oposición', desc: 'Oponerte al uso' },
                    { title: 'Limitación', desc: 'Restringir uso' },
                    { title: 'Portabilidad', desc: 'Recibir tus datos' },
                  ].map((right, i) => (
                    <div key={i} style={{
                      background: 'white',
                      borderRadius: '12px',
                      padding: '1rem',
                      border: '1px solid #E5E7EB',
                      textAlign: 'center'
                    }}>
                      <h4 style={{ fontWeight: 600, color: '#3B82F6', marginBottom: '0.25rem', fontSize: '0.875rem' }}>{right.title}</h4>
                      <p style={{ color: '#64748B', fontSize: '0.75rem', margin: 0 }}>{right.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 10 */}
          <section style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{
                flexShrink: 0,
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#EFF6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Cookie size={24} color="#3B82F6" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.75rem' }}>
                  10. Cookies
                </h2>
                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1rem' }}>
                  Utilizamos cookies para mejorar tu experiencia. Tipos:
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {[
                    { title: 'Esenciales', desc: 'funcionamiento básico del sitio' },
                    { title: 'Rendimiento', desc: 'entender cómo usas el sitio' },
                    { title: 'Funcionalidad', desc: 'recordar tus preferencias' },
                    { title: 'Marketing', desc: 'contenido relevante (con consentimiento)' },
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#475569' }}>
                      <span style={{ color: '#3B82F6' }}>•</span>
                      <span><strong style={{ color: '#0F172A' }}>{item.title}:</strong> {item.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Sections 11-13 */}
          <section style={{ marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { title: '11. Menores de Edad', text: 'Nuestros servicios están dirigidos a personas mayores de 18 años. No recopilamos intencionalmente información de menores.' },
              { title: '12. Enlaces a Terceros', text: 'Nuestro sitio puede contener enlaces a sitios de terceros. No somos responsables de sus prácticas de privacidad.' },
              { title: '13. Cambios en esta Política', text: 'Podemos actualizar esta política periódicamente. Te notificaremos sobre cambios significativos.' },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'white',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid #E5E7EB'
              }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>{item.title}</h2>
                <p style={{ color: '#475569', fontSize: '0.875rem', margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </section>

          {/* Contact Section */}
          <section style={{ marginBottom: '2rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid #BFDBFE'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{
                  flexShrink: 0,
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                }}>
                  <Mail size={28} color="white" />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>14. Contacto</h2>
                  <p style={{ color: '#475569', lineHeight: 1.7, margin: 0 }}>
                    Si tienes preguntas sobre esta Política de Privacidad o el tratamiento de tus datos personales,
                    puedes contactarnos a través de nuestros canales oficiales de atención al cliente o redes sociales.
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
            <p style={{ color: '#94A3B8', fontSize: '0.875rem', margin: 0 }}>
              Última actualización: 14 de enero de 2026
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
