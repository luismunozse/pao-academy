'use client';
import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { X, Clock, Users, Star, ArrowRight } from 'lucide-react';
import { Flame } from 'lucide-react';
import { useABTest, trackConversion } from '../lib/ab-testing';
import { trackUserInteraction } from '../lib/analytics';

interface UrgencyPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: () => void;
  variant?: 'A' | 'B' | 'C';
}

export default function UrgencyPopup({ 
  isOpen, 
  onClose, 
  onAction,
  variant: forcedVariant 
}: UrgencyPopupProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });
  const [spotsLeft, setSpotsLeft] = useState(3);
  const [isVisible, setIsVisible] = useState(false);

  // A/B Testing
  const abVariant = useABTest('urgency_popup');
  const variant = forcedVariant || abVariant;
  const isTestActive = variant !== 'A';

  // Configuración por variante
  const getVariantConfig = () => {
    switch (variant) {
      case 'A':
        return {
          title: '¡Últimos cupos disponibles!',
          message: 'Solo quedan 3 lugares para la próxima cohorte',
          cta: 'Reservar ahora',
          icon: Users,
          color: 'from-red-500 to-orange-500',
          urgency: 'spots',
        };
      case 'B':
        return {
          title: '¡Oferta por tiempo limitado!',
          message: '50% de descuento solo por hoy',
          cta: 'Aprovechar oferta',
          icon: Clock,
          color: 'from-purple-500 to-pink-500',
          urgency: 'time',
        };
      case 'C':
        return {
          title: '¡No te quedes fuera!',
          message: 'Última oportunidad para unirte a esta cohorte',
          cta: 'Únete ahora',
          icon: Flame,
          color: 'from-yellow-500 to-red-500',
          urgency: 'fear',
        };
      default:
        return {
          title: '¡Últimos cupos disponibles!',
          message: 'Solo quedan 3 lugares para la próxima cohorte',
          cta: 'Reservar ahora',
          icon: Users,
          color: 'from-red-500 to-orange-500',
          urgency: 'spots',
        };
    }
  };

  const config = getVariantConfig();
  const Icon = config.icon;

  // Timer countdown
  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  // Simular reducción de cupos
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setSpotsLeft(prev => {
        if (prev > 1 && Math.random() < 0.1) {
          return prev - 1;
        }
        return prev;
      });
    }, 30000); // Cada 30 segundos

    return () => clearInterval(interval);
  }, [isOpen]);

  // Mostrar popup después de un delay
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleAction = () => {
    trackConversion('urgency_popup', variant, 'cta_click');
    trackUserInteraction('urgency_popup_action', variant);
    onAction();
  };

  const handleClose = () => {
    trackUserInteraction('urgency_popup_close', variant);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <m.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
          >
            {/* Header con gradiente */}
            <div className={`bg-gradient-to-r ${config.color} p-6 text-white relative overflow-hidden`}>
              {/* Patrón de fondo */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23fff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/svg%3E')] bg-repeat" />
              </div>
              
              <div className="relative z-10">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>

                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/20 rounded-full">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{config.title}</h3>
                    <p className="text-white/90 text-sm">{config.message}</p>
                  </div>
                </div>

                {/* Indicadores de urgencia */}
                <div className="flex items-center gap-4 text-sm">
                  {config.urgency === 'time' && (
                    <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                      <Clock className="h-4 w-4" />
                      <span className="font-mono">
                        {String(timeLeft.hours).padStart(2, '0')}:
                        {String(timeLeft.minutes).padStart(2, '0')}:
                        {String(timeLeft.seconds).padStart(2, '0')}
                      </span>
                    </div>
                  )}
                  
                  {config.urgency === 'spots' && (
                    <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                      <Users className="h-4 w-4" />
                      <span>Solo {spotsLeft} cupos</span>
                    </div>
                  )}

                  {config.urgency === 'fear' && (
                    <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                      <Star className="h-4 w-4" />
                      <span>Última oportunidad</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contenido */}
            <div className="p-6">
              <div className="text-center mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  ¿Listo para transformar tu carrera?
                </h4>
                <p className="text-gray-600 text-sm">
                  Únete a miles de profesionales que ya están desarrollando las habilidades del futuro.
                </p>
              </div>

              {/* Beneficios rápidos */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Certificación universitaria incluida</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Mentores expertos en la industria</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Proyectos reales aplicables</span>
                </div>
              </div>

              {/* CTA Principal */}
              <button
                onClick={handleAction}
                className={`w-full bg-gradient-to-r ${config.color} text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group`}
              >
                {config.cta}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* CTA Secundario */}
              <button
                onClick={handleClose}
                className="w-full mt-3 text-gray-500 hover:text-gray-700 transition-colors text-sm"
              >
                Tal vez más tarde
              </button>
            </div>

            {/* Footer con testimonio */}
            <div className="bg-gray-50 px-6 py-4 border-t">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                  alt="Testimonio"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm text-gray-700">
                    &ldquo;Duplicamos la tasa de cierre en 90 días&rdquo;
                  </p>
                  <p className="text-xs text-gray-500">- Mariana Pérez, Líder Comercial</p>
                </div>
              </div>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
