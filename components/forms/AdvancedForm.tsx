'use client';
import React, { useState, useRef, useEffect } from 'react';
import { m } from 'framer-motion';
import { CheckCircle, AlertCircle, Loader2, Mail, Phone, User, MessageSquare } from 'lucide-react';
import { trackFormSubmission, trackUserInteraction } from '../../lib/analytics';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder: string;
  required: boolean;
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    custom?: (value: string) => string | null;
  };
  options?: { value: string; label: string }[];
}

interface AdvancedFormProps {
  formName: string;
  fields: FormField[];
  onSubmit: (data: Record<string, string>) => Promise<boolean>;
  submitText: string;
  successMessage: string;
  errorMessage: string;
  className?: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function AdvancedForm({
  formName,
  fields,
  onSubmit,
  submitText,
  successMessage,
  errorMessage,
  className = '',
}: AdvancedFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const formRef = useRef<HTMLFormElement>(null);

  // Validar campo individual
  const validateField = (field: FormField, value: string): string | null => {
    if (field.required && !value.trim()) {
      return `${field.label} es requerido`;
    }

    if (!value.trim()) return null;

    if (field.validation?.minLength && value.length < field.validation.minLength) {
      return `${field.label} debe tener al menos ${field.validation.minLength} caracteres`;
    }

    if (field.validation?.maxLength && value.length > field.validation.maxLength) {
      return `${field.label} no puede tener más de ${field.validation.maxLength} caracteres`;
    }

    if (field.validation?.pattern && !field.validation.pattern.test(value)) {
      return `${field.label} tiene un formato inválido`;
    }

    if (field.validation?.custom) {
      return field.validation.custom(value);
    }

    return null;
  };

  // Validar todo el formulario
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    fields.forEach(field => {
      const value = formData[field.name] || '';
      const error = validateField(field, value);
      if (error) {
        newErrors[field.name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Manejar cambio en campos
  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validar en tiempo real si el campo ya fue tocado
    if (touched[name]) {
      const field = fields.find(f => f.name === name);
      if (field) {
        const error = validateField(field, value);
        setErrors(prev => ({
          ...prev,
          [name]: error || '',
        }));
      }
    }

    // Trackear interacción
    trackUserInteraction('form_field_change', name);
  };

  // Manejar blur (campo perdió foco)
  const handleBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const field = fields.find(f => f.name === name);
    if (field) {
      const value = formData[field.name] || '';
      const error = validateField(field, value);
      setErrors(prev => ({
        ...prev,
        [name]: error || '',
      }));
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Marcar todos los campos como tocados
    const allTouched = fields.reduce((acc, field) => {
      acc[field.name] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);

    if (!validateForm()) {
      trackFormSubmission(formName, false, fields.map(f => f.name));
      return;
    }

    setIsSubmitting(true);
    
    try {
      const success = await onSubmit(formData);
      
      if (success) {
        setIsSuccess(true);
        trackFormSubmission(formName, true, fields.map(f => f.name));
        
        // Resetear formulario después de 3 segundos
        setTimeout(() => {
          setFormData({});
          setTouched({});
          setIsSuccess(false);
        }, 3000);
      } else {
        trackFormSubmission(formName, false, fields.map(f => f.name));
      }
    } catch (error) {
      console.error('Form submission error:', error);
      trackFormSubmission(formName, false, fields.map(f => f.name));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Obtener icono para el campo
  const getFieldIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail;
      case 'tel': return Phone;
      case 'textarea': return MessageSquare;
      default: return User;
    }
  };

  if (isSuccess) {
    return (
      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 bg-green-50 rounded-xl border border-green-200"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-green-800 mb-2">¡Enviado correctamente!</h3>
        <p className="text-green-600">{successMessage}</p>
      </m.div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {fields.map((field, index) => {
        const Icon = getFieldIcon(field.type);
        const hasError = errors[field.name];
        const isTouched = touched[field.name];

        return (
          <m.div
            key={field.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-2"
          >
            <label className="block text-sm font-medium text-white/90">
              {field.label}
              {field.required && <span className="text-red-400 ml-1">*</span>}
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon className="h-5 w-5 text-white/60" />
              </div>

              {field.type === 'textarea' ? (
                <textarea
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  onBlur={() => handleBlur(field.name)}
                  placeholder={field.placeholder}
                  rows={4}
                  className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 transition-colors ${
                    hasError && isTouched
                      ? 'border-red-400 focus:ring-red-400/50'
                      : 'border-white/20 focus:ring-blue-400/50'
                  }`}
                />
              ) : field.type === 'select' ? (
                <select
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  onBlur={() => handleBlur(field.name)}
                  className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-lg text-white focus:outline-none focus:ring-2 transition-colors ${
                    hasError && isTouched
                      ? 'border-red-400 focus:ring-red-400/50'
                      : 'border-white/20 focus:ring-blue-400/50'
                  }`}
                >
                  <option value="" className="bg-gray-800 text-white">
                    {field.placeholder}
                  </option>
                  {field.options?.map(option => (
                    <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  onBlur={() => handleBlur(field.name)}
                  placeholder={field.placeholder}
                  className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 transition-colors ${
                    hasError && isTouched
                      ? 'border-red-400 focus:ring-red-400/50'
                      : 'border-white/20 focus:ring-blue-400/50'
                  }`}
                />
              )}

              {hasError && isTouched && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
              )}
            </div>

            {hasError && isTouched && (
              <m.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-400 flex items-center gap-1"
              >
                <AlertCircle className="h-4 w-4" />
                {errors[field.name]}
              </m.p>
            )}
          </m.div>
        );
      })}

      <m.button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Enviando...
          </>
        ) : (
          submitText
        )}
      </m.button>

      {errorMessage && (
        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-red-400 text-center"
        >
          {errorMessage}
        </m.p>
      )}
    </form>
  );
}

