'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import { User, Mail, Phone, Loader2, CheckCircle } from 'lucide-react';

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setEmail(user.email || '');

      const { data } = await (supabase
        .from('profiles') as any)
        .select('*')
        .eq('id', user.id)
        .single();

      if (data) {
        const profileData = data as any;
        setProfile(profileData);
        setFullName(profileData.full_name || '');
        setPhone(profileData.phone || '');
      }

      setLoading(false);
    };

    loadProfile();
  }, [supabase]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await (supabase
      .from('profiles') as any)
      .update({
        full_name: fullName,
        phone: phone,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mi Perfil</h1>
        <p className="text-gray-600 mt-1">Actualiza tu información personal</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <form onSubmit={handleSave} className="space-y-5">
          {/* Email (readonly) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                disabled
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-500"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">El email no se puede cambiar</p>
          </div>

          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre completo
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Tu nombre"
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono (opcional)
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+54 11 1234-5678"
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Guardando...
                </>
              ) : saved ? (
                <>
                  <CheckCircle size={20} />
                  ¡Guardado!
                </>
              ) : (
                'Guardar cambios'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Account Info */}
      <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Información de cuenta</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Rol</span>
            <span className="text-gray-900 capitalize">{profile?.role || 'student'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Miembro desde</span>
            <span className="text-gray-900">
              {profile?.created_at
                ? new Date(profile.created_at).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })
                : '-'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
