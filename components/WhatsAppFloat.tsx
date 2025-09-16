'use client';
import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { m } from 'framer-motion';

export default function WhatsAppFloat({
  phoneNumber,
  message,
  brandName
}: {
  phoneNumber: string;
  message: string;
  brandName: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Mostrar el botón después de 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Ocultar el botón cuando el usuario hace scroll hacia abajo
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        // Scrolling down
        setIsVisible(false);
        setIsExpanded(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleToggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isVisible) return null;

  return (
    <m.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-[1000]"
    >
      {/* Botón principal expandible */}
      <div className="relative">
        {/* Mensaje de burbuja */}
        {isExpanded && (
          <m.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            className="absolute bottom-16 right-0 mb-2 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 max-w-xs"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-1">
                  ¡Hola! 👋
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  ¿Tienes dudas sobre nuestros cursos? ¡Estamos aquí para ayudarte!
                </p>
              </div>
              <button
                onClick={handleToggleExpanded}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Flecha */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-gray-200 transform rotate-45" />
          </m.div>
        )}

        {/* Botón principal */}
        <m.button
          onClick={isExpanded ? handleWhatsAppClick : handleToggleExpanded}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`
            relative w-14 h-14 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center group
            ${isExpanded 
              ? 'bg-green-500 hover:bg-green-600' 
              : 'bg-[color:var(--neon-cyan)] hover:bg-[color:var(--neon-blue)]'
            }
          `}
        >
          {/* Efecto de pulso */}
          <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30" />
          
          {/* Icono */}
          {isExpanded ? (
            <MessageCircle className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          )}

          {/* Indicador de notificación */}
          {!isExpanded && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">1</span>
            </div>
          )}
        </m.button>
      </div>

      {/* Efecto de ondas */}
      <div className="absolute inset-0 rounded-full">
        <div className="absolute inset-0 rounded-full bg-green-400 animate-pulse opacity-20" />
        <div className="absolute inset-0 rounded-full bg-green-400 animate-pulse opacity-10" style={{ animationDelay: '0.5s' }} />
      </div>
    </m.div>
  );
}

