'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Phone, User, Mail, Globe } from 'lucide-react';
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
      <div className={fieldErrors.name ? 'field-error' : ''}>
        <div className="input-group">
          <User className="input-icon" />
          <input
            className="input-modern input-with-icon"
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
      <div className={fieldErrors.email ? 'field-error' : ''}>
        <div className="input-group">
          <Mail className="input-icon" />
          <input
            type="email"
            className="input-modern input-with-icon"
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
      <div className={fieldErrors.phone ? 'field-error' : ''}>
        <div className="input-group">
          <Phone className="input-icon" />
          <input
            type="tel"
            className="input-modern input-with-icon"
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
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
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



