'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, HelpCircle, ChevronDown, Search, BookOpen, CreditCard, Award, Clock, Users, Headphones, Mail } from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Todas', icon: HelpCircle },
    { id: 'courses', label: 'Cursos', icon: BookOpen },
    { id: 'payments', label: 'Pagos', icon: CreditCard },
    { id: 'certificates', label: 'Certificados', icon: Award },
    { id: 'platform', label: 'Plataforma', icon: Clock },
  ];

  const faqs = [
    {
      category: 'courses',
      question: '¿Qué tipos de cursos ofrecen?',
      answer: 'Ofrecemos dos modalidades principales: <strong>Cursos en Vivo</strong> con clases sincrónicas donde interactúas en tiempo real con el instructor y otros estudiantes, y <strong>Cursos Asincrónicos</strong> que puedes tomar a tu propio ritmo. Nuestras áreas incluyen Ventas, Liderazgo, Análisis de Datos, Marketing Digital, Desarrollo Personal y más.'
    },
    {
      category: 'courses',
      question: '¿Cuánto duran los cursos?',
      answer: 'La duración varía según el programa. Los cursos en vivo suelen durar entre 4 y 12 semanas con sesiones semanales de 2-3 horas. Los cursos asincrónicos tienen entre 10 y 40 horas de contenido que puedes completar a tu ritmo, generalmente en 4-8 semanas recomendadas.'
    },
    {
      category: 'courses',
      question: '¿Necesito conocimientos previos para tomar los cursos?',
      answer: 'Depende del curso. Tenemos programas para todos los niveles: desde cursos introductorios que no requieren experiencia previa, hasta programas avanzados para profesionales con experiencia. Cada curso indica claramente los requisitos previos en su descripción.'
    },
    {
      category: 'courses',
      question: '¿Puedo acceder al contenido después de terminar el curso?',
      answer: 'Sí, una vez que completas la compra, tienes acceso al contenido del curso durante el período especificado (generalmente 12 meses o acceso de por vida, según el programa). Esto incluye videos, materiales descargables y recursos adicionales.'
    },
    {
      category: 'courses',
      question: '¿Los cursos incluyen proyectos prácticos?',
      answer: 'Absolutamente. Todos nuestros cursos están diseñados con un enfoque práctico. Incluyen ejercicios, casos de estudio reales, proyectos aplicados y, en muchos casos, un proyecto final que puedes agregar a tu portafolio profesional.'
    },
    {
      category: 'payments',
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos múltiples métodos de pago: tarjetas de crédito y débito (Visa, Mastercard, American Express), transferencias bancarias, y dependiendo de tu país, métodos locales como Mercado Pago, PayPal, y pagos en cuotas sin interés en tarjetas seleccionadas.'
    },
    {
      category: 'payments',
      question: '¿Ofrecen planes de pago o financiamiento?',
      answer: 'Sí, ofrecemos opciones de pago en cuotas para la mayoría de nuestros programas. Dependiendo del curso y tu ubicación, puedes acceder a 3, 6 o hasta 12 cuotas. También tenemos promociones especiales periódicamente con descuentos significativos.'
    },
    {
      category: 'payments',
      question: '¿Puedo obtener un reembolso si no estoy satisfecho?',
      answer: 'Sí, contamos con una política de reembolso conforme a la ley. Tienes derecho a solicitar un reembolso dentro del plazo legal establecido (generalmente 10 días desde la compra), siempre que no hayas consumido más del 25% del contenido. Consulta nuestra página de <a href="/arrepentimiento" style="color: #3B82F6; text-decoration: underline;">Botón de Arrepentimiento</a> para más detalles.'
    },
    {
      category: 'payments',
      question: '¿Los precios incluyen impuestos?',
      answer: 'Sí, todos los precios mostrados en nuestra plataforma incluyen los impuestos aplicables según tu país de residencia. El precio final que ves es el precio que pagas, sin cargos ocultos.'
    },
    {
      category: 'certificates',
      question: '¿Obtendré un certificado al finalizar?',
      answer: 'Sí, todos nuestros cursos incluyen un certificado de finalización digital que puedes descargar, compartir en LinkedIn y agregar a tu CV. El certificado incluye el nombre del curso, la cantidad de horas, y las competencias desarrolladas.'
    },
    {
      category: 'certificates',
      question: '¿Los certificados tienen validez oficial?',
      answer: 'Nuestros certificados son emitidos por Glomind360 y validan que has completado satisfactoriamente el programa. Si bien no son títulos universitarios oficiales, son reconocidos por empresas y pueden fortalecer significativamente tu perfil profesional. Algunos programas cuentan con avales de instituciones educativas o empresas partners.'
    },
    {
      category: 'certificates',
      question: '¿Qué requisitos debo cumplir para obtener el certificado?',
      answer: 'Para obtener tu certificado debes: completar todas las lecciones del curso, aprobar las evaluaciones requeridas (generalmente con un 70% mínimo), y entregar los proyectos o trabajos prácticos solicitados. En cursos en vivo, también se considera la asistencia mínima.'
    },
    {
      category: 'platform',
      question: '¿Cómo accedo a los cursos?',
      answer: 'Una vez que realizas tu compra, recibes un email de confirmación con las instrucciones de acceso. Puedes ingresar a tu cuenta desde cualquier dispositivo (computadora, tablet o celular) con conexión a internet. La plataforma está disponible 24/7.'
    },
    {
      category: 'platform',
      question: '¿Puedo ver los cursos en mi celular?',
      answer: 'Sí, nuestra plataforma es completamente responsive y está optimizada para dispositivos móviles. Puedes ver las clases, completar ejercicios y seguir tu progreso desde cualquier dispositivo. También puedes descargar algunos materiales para acceso offline.'
    },
    {
      category: 'platform',
      question: '¿Qué pasa si pierdo una clase en vivo?',
      answer: 'Todas las clases en vivo quedan grabadas y disponibles en la plataforma dentro de las 24-48 horas siguientes. Podrás ver la grabación completa, aunque te recomendamos asistir en vivo para aprovechar la interacción con el instructor y compañeros.'
    },
    {
      category: 'platform',
      question: '¿Tienen soporte técnico?',
      answer: 'Sí, contamos con un equipo de soporte disponible para ayudarte con cualquier problema técnico o duda sobre la plataforma. Puedes contactarnos por email, WhatsApp o a través del chat de soporte en la plataforma. Nuestro tiempo de respuesta promedio es de 24 horas hábiles.'
    },
    {
      category: 'platform',
      question: '¿Puedo tomar más de un curso a la vez?',
      answer: 'Sí, puedes inscribirte en múltiples cursos simultáneamente. Sin embargo, te recomendamos considerar tu disponibilidad de tiempo para poder aprovechar al máximo cada programa. Muchos estudiantes toman un curso a la vez para una mejor experiencia de aprendizaje.'
    },
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            <HelpCircle size={40} color="white" />
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            color: '#0F172A',
            marginBottom: '1rem',
            lineHeight: 1.2
          }}>
            Preguntas Frecuentes
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: '#475569',
            maxWidth: '600px',
            margin: '0 auto 2rem',
            lineHeight: 1.6
          }}>
            Encuentra respuestas a las preguntas más comunes sobre nuestros cursos, pagos, certificados y más.
          </p>

          {/* Search */}
          <div style={{
            maxWidth: '500px',
            margin: '0 auto',
            position: 'relative'
          }}>
            <Search
              size={20}
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#94A3B8'
              }}
            />
            <input
              type="text"
              placeholder="Buscar pregunta..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem 1rem 1rem 3rem',
                borderRadius: '0.75rem',
                border: '1px solid #E5E7EB',
                fontSize: '1rem',
                outline: 'none',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
              }}
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <main style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '3rem 1.5rem'
      }}>

        {/* Categories */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '2rem',
          justifyContent: 'center'
        }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                border: activeCategory === cat.id ? '2px solid #3B82F6' : '1px solid #E5E7EB',
                background: activeCategory === cat.id ? '#EFF6FF' : 'white',
                color: activeCategory === cat.id ? '#3B82F6' : '#64748B',
                fontWeight: activeCategory === cat.id ? 600 : 500,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <cat.icon size={16} />
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  borderRadius: '1rem',
                  border: '1px solid #E5E7EB',
                  overflow: 'hidden',
                  boxShadow: openIndex === index ? '0 4px 12px rgba(0,0,0,0.08)' : 'none',
                  transition: 'box-shadow 0.2s'
                }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.25rem 1.5rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span style={{
                    fontWeight: 600,
                    color: '#0F172A',
                    fontSize: '1rem',
                    paddingRight: '1rem'
                  }}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    style={{
                      flexShrink: 0,
                      color: '#64748B',
                      transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s'
                    }}
                  />
                </button>
                {openIndex === index && (
                  <div style={{
                    padding: '0 1.5rem 1.5rem',
                    color: '#475569',
                    lineHeight: 1.7,
                    fontSize: '0.938rem'
                  }}
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                )}
              </div>
            ))
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              background: 'white',
              borderRadius: '1rem',
              border: '1px solid #E5E7EB'
            }}>
              <HelpCircle size={48} color="#94A3B8" style={{ marginBottom: '1rem' }} />
              <p style={{ color: '#64748B', fontSize: '1rem' }}>
                No se encontraron preguntas que coincidan con tu búsqueda.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                style={{
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  background: '#3B82F6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                Ver todas las preguntas
              </button>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <section style={{ marginTop: '3rem' }}>
          <div style={{
            padding: '2rem',
            background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
            borderRadius: '1.5rem',
            border: '1px solid #BFDBFE'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
                ¿No encontraste lo que buscabas?
              </h2>
              <p style={{ color: '#475569' }}>
                Nuestro equipo está listo para ayudarte con cualquier consulta adicional.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              <a
                href="https://wa.me/5493517601441?text=Hola, tengo una consulta sobre los cursos de Glomind360"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 1.5rem',
                  background: 'white',
                  borderRadius: '0.75rem',
                  border: '1px solid #E5E7EB',
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: '#25D366',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Headphones size={20} color="white" />
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '0.938rem' }}>WhatsApp</div>
                  <div style={{ color: '#64748B', fontSize: '0.813rem' }}>Respuesta inmediata</div>
                </div>
              </a>

              <a
                href="mailto:soporte@glomind360.com"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 1.5rem',
                  background: 'white',
                  borderRadius: '0.75rem',
                  border: '1px solid #E5E7EB',
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Mail size={20} color="white" />
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '0.938rem' }}>Email</div>
                  <div style={{ color: '#64748B', fontSize: '0.813rem' }}>soporte@glomind360.com</div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          paddingTop: '3rem',
          marginTop: '2rem',
          borderTop: '1px solid #E5E7EB'
        }}>
          <p style={{ color: '#94A3B8', fontSize: '0.875rem' }}>
            © {new Date().getFullYear()} Glomind360. Todos los derechos reservados.
          </p>
        </div>
      </main>
    </div>
  );
}
