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
      <div style={{
        padding: '2rem',
        textAlign: 'center'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          background: '#D1FAE5',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem'
        }}>
          <svg style={{
            width: '32px',
            height: '32px',
            color: '#22C55E'
          }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '700',
          color: '#0F172A',
          marginBottom: '0.5rem'
        }}>{t.success}</h3>
        <p style={{
          fontSize: '0.9375rem',
          color: '#64748B'
        }}>{t.successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '1rem'
    }}>
      {/* Nombre */}
      <div>
        <div style={{ position: 'relative' }}>
          <User style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#94A3B8',
            width: '16px',
            height: '16px'
          }} />
          <input
            style={{
              width: '100%',
              height: '44px',
              paddingLeft: '2.75rem',
              paddingRight: '14px',
              background: 'white',
              border: `2px solid ${fieldErrors.name ? '#EF4444' : '#E5E7EB'}`,
              borderRadius: '0.75rem',
              fontSize: '1rem',
              color: '#0F172A',
              outline: 'none',
              transition: 'all 0.2s'
            }}
            placeholder={t.name}
            value={name}
            onChange={e => {
              setName(e.target.value);
              if (fieldErrors.name) {
                setFieldErrors(prev => ({ ...prev, name: '' }));
              }
            }}
            onFocus={(e) => {
              if (!fieldErrors.name) {
                e.currentTarget.style.borderColor = '#3B82F6';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }
            }}
            onBlur={(e) => {
              if (!fieldErrors.name) {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          />
        </div>
        {fieldErrors.name && <p style={{
          color: '#EF4444',
          fontSize: '0.75rem',
          marginTop: '0.25rem'
        }}>{fieldErrors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <div style={{ position: 'relative' }}>
          <Mail style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#94A3B8',
            width: '16px',
            height: '16px'
          }} />
          <input
            type="email"
            style={{
              width: '100%',
              height: '44px',
              paddingLeft: '2.75rem',
              paddingRight: '14px',
              background: 'white',
              border: `2px solid ${fieldErrors.email ? '#EF4444' : '#E5E7EB'}`,
              borderRadius: '0.75rem',
              fontSize: '1rem',
              color: '#0F172A',
              outline: 'none',
              transition: 'all 0.2s'
            }}
            placeholder={t.email}
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              if (fieldErrors.email) {
                setFieldErrors(prev => ({ ...prev, email: '' }));
              }
            }}
            onFocus={(e) => {
              if (!fieldErrors.email) {
                e.currentTarget.style.borderColor = '#3B82F6';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }
            }}
            onBlur={(e) => {
              if (!fieldErrors.email) {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          />
        </div>
        {fieldErrors.email && <p style={{
          color: '#EF4444',
          fontSize: '0.75rem',
          marginTop: '0.25rem'
        }}>{fieldErrors.email}</p>}
      </div>

      {/* Teléfono */}
      <div>
        <div style={{ position: 'relative' }}>
          <Phone style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#94A3B8',
            width: '16px',
            height: '16px'
          }} />
          <input
            type="tel"
            style={{
              width: '100%',
              height: '44px',
              paddingLeft: '2.75rem',
              paddingRight: '14px',
              background: 'white',
              border: `2px solid ${fieldErrors.phone ? '#EF4444' : '#E5E7EB'}`,
              borderRadius: '0.75rem',
              fontSize: '1rem',
              color: '#0F172A',
              outline: 'none',
              transition: 'all 0.2s'
            }}
            placeholder={t.phone}
            value={phone}
            onChange={e => {
              setPhone(e.target.value);
              if (fieldErrors.phone) {
                setFieldErrors(prev => ({ ...prev, phone: '' }));
              }
            }}
            onFocus={(e) => {
              if (!fieldErrors.phone) {
                e.currentTarget.style.borderColor = '#3B82F6';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }
            }}
            onBlur={(e) => {
              if (!fieldErrors.phone) {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          />
        </div>
        {fieldErrors.phone && <p style={{
          color: '#EF4444',
          fontSize: '0.75rem',
          marginTop: '0.25rem'
        }}>{fieldErrors.phone}</p>}
      </div>

      {/* País */}
      <div>
        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger style={{
            width: '100%',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0 14px',
            background: 'white',
            border: '2px solid #E5E7EB',
            borderRadius: '0.75rem',
            fontSize: '1rem',
            color: '#0F172A',
            outline: 'none',
            transition: 'all 0.2s'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <Globe style={{
                width: '16px',
                height: '16px',
                color: '#94A3B8'
              }} />
              <SelectValue placeholder={t.country} />
            </div>
          </SelectTrigger>
          <SelectContent style={{
            background: 'white',
            border: '1px solid #E5E7EB',
            borderRadius: '0.75rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}>
            <SelectItem value="AR" style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Argentina</SelectItem>
            <SelectItem value="MX" style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>México</SelectItem>
            <SelectItem value="CO" style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Colombia</SelectItem>
            <SelectItem value="PE" style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Perú</SelectItem>
            <SelectItem value="CL" style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Chile</SelectItem>
            <SelectItem value="UY" style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Uruguay</SelectItem>
            <SelectItem value="BR" style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Brasil</SelectItem>
            <SelectItem value="US" style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Estados Unidos</SelectItem>
            <SelectItem value="ES" style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>España</SelectItem>
            <SelectItem value="other" style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Otro</SelectItem>
          </SelectContent>
        </Select>
      </div>


      {/* Mensaje */}
      <div>
        <textarea
          style={{
            width: '100%',
            minHeight: '100px',
            padding: '14px',
            background: 'white',
            border: '2px solid #E5E7EB',
            borderRadius: '0.75rem',
            fontSize: '1rem',
            color: '#0F172A',
            outline: 'none',
            transition: 'all 0.2s',
            resize: 'vertical',
            lineHeight: '1.5'
          }}
          placeholder={t.message}
          value={message}
          onChange={e => setMessage(e.target.value)}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#3B82F6';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = '#E5E7EB';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
      </div>

      {error && <div style={{
        color: '#DC2626',
        fontSize: '0.875rem',
        background: '#FEE2E2',
        padding: '0.75rem',
        borderRadius: '0.5rem'
      }}>{error}</div>}

      <button
        type="submit"
        disabled={!isValid || loading}
        style={{
          width: '100%',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          fontSize: '1rem',
          fontWeight: '600',
          color: 'white',
          background: (!isValid || loading) ? '#94A3B8' : 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
          border: 'none',
          borderRadius: '0.75rem',
          cursor: (!isValid || loading) ? 'not-allowed' : 'pointer',
          boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)',
          transition: 'all 0.2s',
          opacity: (!isValid || loading) ? 0.6 : 1
        }}
        onMouseEnter={(e) => {
          if (isValid && !loading) {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(59, 130, 246, 0.4)';
          }
        }}
        onMouseLeave={(e) => {
          if (isValid && !loading) {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(59, 130, 246, 0.3)';
          }
        }}
      >
        {loading ? (
          <>
            <div style={{
              width: '16px',
              height: '16px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderTop: '2px solid white',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            {t.submitting}
          </>
        ) : (
          t.submit
        )}
      </button>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </form>
  );
}



