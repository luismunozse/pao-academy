'use client';

import { useState } from 'react';
import { ExternalLink, Loader2 } from 'lucide-react';

interface SSOButtonProps {
  courseId?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export function SSOButton({
  courseId,
  children,
  className,
  variant = 'primary',
}: SSOButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleSSO = async () => {
    setLoading(true);
    try {
      const params = courseId ? `?course=${courseId}` : '';
      const response = await fetch(`/api/trainercentral/sso${params}`);
      const data = await response.json();

      if (data.url) {
        window.open(data.url, '_blank');
      } else if (data.error) {
        console.error('SSO Error:', data.error);
      }
    } catch (error) {
      console.error('SSO Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const baseStyles = 'flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
  };

  return (
    <button
      onClick={handleSSO}
      disabled={loading}
      className={className || `${baseStyles} ${variantStyles[variant]}`}
    >
      {loading ? (
        <Loader2 className="animate-spin" size={18} />
      ) : (
        <ExternalLink size={18} />
      )}
      {children || 'Acceder al Curso'}
    </button>
  );
}
