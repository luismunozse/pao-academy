'use client';
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Phone, User, Mail, Globe, Check } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  defaultCourse?: string;
  onSuccess?: () => void;
  lang?: 'es' | 'en';
};

type ReservationPayload = {
  name: string;
  email: string;
  phone?: string;
  country?: string;
  course: string;
  date?: string;
  message?: string;
  referralCode?: string | null;
};

// Textos internacionalizados
const texts = {
  es: {
    name: 'Nombre y Apellido',
    email: 'Email',
    phone: 'Teléfono (opcional)',
    country: 'País',
    course: 'Curso o programa',
    date: 'Fecha preferida',
    message: 'Mensaje (opcional)',
    submit: 'Reservar mi lugar',
    submitting: 'Enviando...',
    success: '¡Reserva recibida!',
    successMessage: 'Te contactaremos a la brevedad para confirmar tu lugar.',
    error: 'Error al enviar el formulario',
    required: 'Este campo es obligatorio',
    invalidEmail: 'Email inválido',
    invalidPhone: 'Teléfono inválido',
    minLength: 'Mínimo 2 caracteres'
  },
  en: {
    name: 'Full Name',
    email: 'Email',
    phone: 'Phone (optional)',
    country: 'Country',
    course: 'Course or program',
    date: 'Preferred date',
    message: 'Message (optional)',
    submit: 'Reserve my spot',
    submitting: 'Sending...',
    success: 'Reservation received!',
    successMessage: 'We will contact you shortly to confirm your spot.',
    error: 'Error sending form',
    required: 'This field is required',
    invalidEmail: 'Invalid email',
    invalidPhone: 'Invalid phone',
    minLength: 'Minimum 2 characters'
  }
};

type FieldStatus = 'idle' | 'valid' | 'invalid';

export default function ReservationForm({ defaultCourse, onSuccess, lang = 'es' }: Props){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [course, setCourse] = useState(defaultCourse || '');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const t = texts[lang];

  useEffect(() => { if (defaultCourse) setCourse(defaultCourse); }, [defaultCourse]);

  const validateField = useCallback((field: string, value: string): { error: string | null; status: FieldStatus } => {
    switch (field) {
      case 'name':
        if (!value.trim()) return { error: null, status: 'idle' };
        if (value.trim().length < 2) return { error: t.minLength, status: 'invalid' };
        return { error: null, status: 'valid' };
      case 'email':
        if (!value.trim()) return { error: null, status: 'idle' };
        if (!/@/.test(value)) return { error: t.invalidEmail, status: 'invalid' };
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return { error: t.invalidEmail, status: 'invalid' };
        return { error: null, status: 'valid' };
      case 'phone':
        if (!value.trim()) return { error: null, status: 'idle' };
        if (!/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/\s/g, ''))) return { error: t.invalidPhone, status: 'invalid' };
        return { error: null, status: 'valid' };
      case 'course':
        if (!value.trim()) return { error: null, status: 'idle' };
        if (value.trim().length < 2) return { error: t.required, status: 'invalid' };
        return { error: null, status: 'valid' };
      default:
        return { error: null, status: 'idle' };
    }
  }, [t]);

  // Validación en tiempo real
  const nameValidation = useMemo(() => validateField('name', name), [name, validateField]);
  const emailValidation = useMemo(() => validateField('email', email), [email, validateField]);
  const phoneValidation = useMemo(() => validateField('phone', phone), [phone, validateField]);

  const isValid = useMemo(() => {
    return nameValidation.status === 'valid' &&
           emailValidation.status === 'valid' &&
           course.trim().length >= 2;
  }, [nameValidation.status, emailValidation.status, course]);

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const getFieldClasses = (field: string, validation: { status: FieldStatus }) => {
    const base = 'input-modern input-with-icon transition-all duration-200';
    if (!touched[field]) return base;
    if (validation.status === 'valid') return `${base} border-green-500 focus:border-green-500 focus:ring-green-500/20`;
    if (validation.status === 'invalid') return `${base} border-red-500 focus:border-red-500 focus:ring-red-500/20`;
    return base;
  };

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault();

    // Marcar todos los campos como tocados
    setTouched({ name: true, email: true, phone: true, course: true });

    if (!isValid) return;

    // Validar todos los campos
    const errors: Record<string, string> = {};
    if (nameValidation.error) errors.name = nameValidation.error;
    if (emailValidation.error) errors.email = emailValidation.error;
    if (phoneValidation.error) errors.phone = phoneValidation.error;

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    setError(null);
    setFieldErrors({});

    try{
      const referralCode = typeof window !== 'undefined' ? (localStorage.getItem('ref_code') || sessionStorage.getItem('ref_code')) : null;
      const payload: ReservationPayload = {
        name,
        email,
        phone: phone || undefined,
        country: country || undefined,
        course,
        date,
        message,
        referralCode
      };
      const res = await fetch('/api/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(t.error);
      setOk(true);
      if (onSuccess) onSuccess();
    } catch(err: any){
      setError(err?.message || t.error);
    } finally {
      setLoading(false);
    }
  }

  if (ok) {
    return (
      <div className="p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{t.success}</h3>
        <p className="text-[var(--text-secondary)]">{t.successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
      {/* Nombre */}
      <div className={touched.name && nameValidation.status === 'invalid' ? 'field-error' : ''}>
        <div className="input-group relative">
          <User className="input-icon" />
          <input
            className={getFieldClasses('name', nameValidation)}
            placeholder={t.name}
            value={name}
            onChange={e => setName(e.target.value)}
            onBlur={() => handleBlur('name')}
            aria-invalid={touched.name && nameValidation.status === 'invalid'}
            aria-describedby={nameValidation.error ? 'name-error' : undefined}
          />
          {touched.name && nameValidation.status === 'valid' && (
            <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
          )}
        </div>
        {touched.name && nameValidation.error && (
          <p id="name-error" className="text-red-500 text-xs mt-1" role="alert">{nameValidation.error}</p>
        )}
      </div>

      {/* Email */}
      <div className={touched.email && emailValidation.status === 'invalid' ? 'field-error' : ''}>
        <div className="input-group relative">
          <Mail className="input-icon" />
          <input
            type="email"
            className={getFieldClasses('email', emailValidation)}
            placeholder={t.email}
            value={email}
            onChange={e => setEmail(e.target.value)}
            onBlur={() => handleBlur('email')}
            aria-invalid={touched.email && emailValidation.status === 'invalid'}
            aria-describedby={emailValidation.error ? 'email-error' : undefined}
          />
          {touched.email && emailValidation.status === 'valid' && (
            <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
          )}
        </div>
        {touched.email && emailValidation.error && (
          <p id="email-error" className="text-red-500 text-xs mt-1" role="alert">{emailValidation.error}</p>
        )}
      </div>

      {/* Teléfono */}
      <div className={touched.phone && phoneValidation.status === 'invalid' ? 'field-error' : ''}>
        <div className="input-group relative">
          <Phone className="input-icon" />
          <input
            type="tel"
            className={getFieldClasses('phone', phoneValidation)}
            placeholder={t.phone}
            value={phone}
            onChange={e => setPhone(e.target.value)}
            onBlur={() => handleBlur('phone')}
            aria-invalid={touched.phone && phoneValidation.status === 'invalid'}
            aria-describedby={phoneValidation.error ? 'phone-error' : undefined}
          />
          {touched.phone && phoneValidation.status === 'valid' && (
            <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
          )}
        </div>
        {touched.phone && phoneValidation.error && (
          <p id="phone-error" className="text-red-500 text-xs mt-1" role="alert">{phoneValidation.error}</p>
        )}
      </div>

      {/* País */}
      <div>
        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger className="select-trigger-modern h-11 w-full">
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-[var(--text-tertiary)]" />
              <SelectValue placeholder={t.country} />
            </div>
          </SelectTrigger>
          <SelectContent className="select-content-modern">
            <SelectItem value="AR" className="select-item-modern">Argentina</SelectItem>
            <SelectItem value="MX" className="select-item-modern">México</SelectItem>
            <SelectItem value="CO" className="select-item-modern">Colombia</SelectItem>
            <SelectItem value="PE" className="select-item-modern">Perú</SelectItem>
            <SelectItem value="CL" className="select-item-modern">Chile</SelectItem>
            <SelectItem value="UY" className="select-item-modern">Uruguay</SelectItem>
            <SelectItem value="BR" className="select-item-modern">Brasil</SelectItem>
            <SelectItem value="US" className="select-item-modern">Estados Unidos</SelectItem>
            <SelectItem value="ES" className="select-item-modern">España</SelectItem>
            <SelectItem value="other" className="select-item-modern">Otro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Mensaje */}
      <div>
        <textarea
          className="input-modern min-h-[100px] resize-y py-3"
          placeholder={t.message}
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg" role="alert">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!isValid || loading}
        className="btn-primary w-full h-12 text-base"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            {t.submitting}
          </>
        ) : (
          t.submit
        )}
      </button>
    </form>
  );
}
