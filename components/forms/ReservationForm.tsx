'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Phone, MapPin, Calendar, User, Mail, MessageSquare, Globe } from 'lucide-react';

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
    invalidPhone: 'Teléfono inválido'
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
    invalidPhone: 'Invalid phone'
  }
};

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

  const t = texts[lang];

  useEffect(() => { if (defaultCourse) setCourse(defaultCourse); }, [defaultCourse]);

  const validateField = (field: string, value: string): string | null => {
    switch (field) {
      case 'name':
        return value.trim().length < 2 ? t.required : null;
      case 'email':
        return !/@/.test(value) ? t.invalidEmail : null;
      case 'phone':
        return value && !/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/\s/g, '')) ? t.invalidPhone : null;
      case 'course':
        return value.trim().length < 2 ? t.required : null;
      default:
        return null;
    }
  };

  const isValid = useMemo(() => {
    return name.trim().length >= 2 && /@/.test(email) && course.trim().length >= 2;
  }, [name, email, course]);

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault();
    if (!isValid) return;
    
    // Validar todos los campos
    const errors: Record<string, string> = {};
    const fields = { name, email, phone, course };
    
    Object.entries(fields).forEach(([field, value]) => {
      const error = validateField(field, value);
      if (error) errors[field] = error;
    });
    
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
      <div className="p-2 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{t.success}</h3>
        <p className="opacity-80 mt-1">{t.successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
      {/* Nombre */}
      <div>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            className={`input-neon input-with-icon w-full h-11 text-base ${fieldErrors.name ? 'border-red-500' : ''}`}
            placeholder={t.name}
            value={name}
            onChange={e => {
              setName(e.target.value);
              if (fieldErrors.name) {
                setFieldErrors(prev => ({ ...prev, name: '' }));
              }
            }}
          />
        </div>
        {fieldErrors.name && <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            className={`input-neon input-with-icon w-full h-11 text-base ${fieldErrors.email ? 'border-red-500' : ''}`}
            type="email"
            placeholder={t.email}
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              if (fieldErrors.email) {
                setFieldErrors(prev => ({ ...prev, email: '' }));
              }
            }}
          />
        </div>
        {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
      </div>

      {/* Teléfono */}
      <div>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            className={`input-neon input-with-icon w-full h-11 text-base ${fieldErrors.phone ? 'border-red-500' : ''}`}
            type="tel"
            placeholder={t.phone}
            value={phone}
            onChange={e => {
              setPhone(e.target.value);
              if (fieldErrors.phone) {
                setFieldErrors(prev => ({ ...prev, phone: '' }));
              }
            }}
          />
        </div>
        {fieldErrors.phone && <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>}
      </div>

      {/* País */}
      <div>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            className="input-neon input-with-icon w-full h-11 text-base appearance-none"
            value={country}
            onChange={e => setCountry(e.target.value)}
          >
            <option value="">{t.country}</option>
            <option value="AR">Argentina</option>
            <option value="MX">México</option>
            <option value="CO">Colombia</option>
            <option value="PE">Perú</option>
            <option value="CL">Chile</option>
            <option value="UY">Uruguay</option>
            <option value="BR">Brasil</option>
            <option value="US">Estados Unidos</option>
            <option value="ES">España</option>
            <option value="other">Otro</option>
          </select>
        </div>
      </div>


      {/* Mensaje */}
      <div>
        <textarea
          className="textarea-neon input-with-icon w-full min-h-[100px] text-base bg-[rgba(255,255,255,0.04)]"
          placeholder={t.message}
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
      </div>

      {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}
      
      <button
        type="submit"
        disabled={!isValid || loading}
        className="btn-accent w-full h-12 text-center disabled:opacity-60 flex items-center justify-center gap-2 rounded-xl"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            {t.submitting}
          </>
        ) : (
          t.submit
        )}
      </button>
    </form>
  );
}



