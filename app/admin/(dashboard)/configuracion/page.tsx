'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  Settings,
  CreditCard,
  Globe,
  Mail,
  Phone,
  MapPin,
  Save,
  Loader2,
  CheckCircle,
  Eye,
  EyeOff,
  ExternalLink
} from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
import {
  GeneralSettings,
  SocialSettings,
  DEFAULT_GENERAL_SETTINGS
} from '@/types/settings';

export default function ConfigurationPage() {
  const supabase = createClient();

  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showSecrets, setShowSecrets] = useState(false);

  // Estados para cada seccion
  const [general, setGeneral] = useState<GeneralSettings>(DEFAULT_GENERAL_SETTINGS);
  const [social, setSocial] = useState<SocialSettings>({});
  const [stripeConfig, setStripeConfig] = useState({
    publishable_key: '',
    secret_key: '',
    webhook_secret: '',
    currency: 'USD'
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const { data } = await (supabase
      .from('site_settings') as any)
      .select('key, value');

    if (data) {
      const settings: Record<string, any> = {};
      (data as any[]).forEach((s: any) => { settings[s.key] = s.value; });

      if (settings.general) setGeneral(settings.general);
      if (settings.social) setSocial(settings.social);
      if (settings.stripe) setStripeConfig(settings.stripe);
    }
  };

  const saveSetting = async (key: string, value: any) => {
    setSaving(true);
    setSaved(false);

    const { error } = await (supabase
      .from('site_settings') as any)
      .upsert({
        key,
        value,
        updated_at: new Date().toISOString()
      }, { onConflict: 'key' });

    if (error) {
      console.error('Error saving setting:', error);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }

    setSaving(false);
  };

  const handleSaveGeneral = () => saveSetting('general', general);
  const handleSaveSocial = () => saveSetting('social', social);
  const handleSaveStripe = () => saveSetting('stripe', stripeConfig);

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'stripe', label: 'Stripe', icon: CreditCard },
    { id: 'social', label: 'Redes Sociales', icon: Globe }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configuracion</h1>
        <p className="text-gray-600">Ajustes generales de la plataforma</p>
      </div>

      {/* Saved notification */}
      {saved && (
        <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          <CheckCircle size={20} />
          Configuracion guardada correctamente
        </div>
      )}

      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <Tabs.List className="flex border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Tabs.Trigger
                key={tab.id}
                value={tab.id}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>

        {/* General Settings */}
        <Tabs.Content value="general" className="mt-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informacion del Sitio</h3>

              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre del Sitio
                  </label>
                  <input
                    type="text"
                    value={general.site_name}
                    onChange={(e) => setGeneral(prev => ({ ...prev, site_name: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripcion
                  </label>
                  <textarea
                    value={general.site_description}
                    onChange={(e) => setGeneral(prev => ({ ...prev, site_description: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <hr />

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informacion de Contacto</h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Mail size={14} className="inline mr-1" />
                    Email de Contacto
                  </label>
                  <input
                    type="email"
                    value={general.contact_email}
                    onChange={(e) => setGeneral(prev => ({ ...prev, contact_email: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Phone size={14} className="inline mr-1" />
                    Telefono
                  </label>
                  <input
                    type="tel"
                    value={general.contact_phone || ''}
                    onChange={(e) => setGeneral(prev => ({ ...prev, contact_phone: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <MapPin size={14} className="inline mr-1" />
                    Direccion
                  </label>
                  <input
                    type="text"
                    value={general.address || ''}
                    onChange={(e) => setGeneral(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSaveGeneral}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                Guardar Cambios
              </button>
            </div>
          </div>
        </Tabs.Content>

        {/* Stripe Settings */}
        <Tabs.Content value="stripe" className="mt-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Configuracion de Stripe</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Configura las claves de API para procesar pagos
                </p>
              </div>
              <a
                href="https://dashboard.stripe.com/apikeys"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
              >
                <ExternalLink size={14} />
                Obtener claves
              </a>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-700">
                <strong>Importante:</strong> Guarda las claves de API de forma segura. Usa las claves de prueba
                (test) para desarrollo y las claves en vivo (live) para produccion.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Clave Publica (Publishable Key)
                </label>
                <input
                  type="text"
                  value={stripeConfig.publishable_key}
                  onChange={(e) => setStripeConfig(prev => ({ ...prev, publishable_key: e.target.value }))}
                  placeholder="pk_test_..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Clave Secreta (Secret Key)
                </label>
                <div className="relative">
                  <input
                    type={showSecrets ? 'text' : 'password'}
                    value={stripeConfig.secret_key}
                    onChange={(e) => setStripeConfig(prev => ({ ...prev, secret_key: e.target.value }))}
                    placeholder="sk_test_..."
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecrets(!showSecrets)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showSecrets ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Secreto de Webhook
                </label>
                <div className="relative">
                  <input
                    type={showSecrets ? 'text' : 'password'}
                    value={stripeConfig.webhook_secret}
                    onChange={(e) => setStripeConfig(prev => ({ ...prev, webhook_secret: e.target.value }))}
                    placeholder="whsec_..."
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecrets(!showSecrets)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showSecrets ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Necesario para recibir notificaciones de pago. Configura el webhook en Stripe apuntando a:
                  <code className="ml-1 px-1 py-0.5 bg-gray-100 rounded">/api/stripe/webhook</code>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Moneda por defecto
                </label>
                <select
                  value={stripeConfig.currency}
                  onChange={(e) => setStripeConfig(prev => ({ ...prev, currency: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="USD">USD - Dolar Estadounidense</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="MXN">MXN - Peso Mexicano</option>
                  <option value="ARS">ARS - Peso Argentino</option>
                  <option value="COP">COP - Peso Colombiano</option>
                  <option value="CLP">CLP - Peso Chileno</option>
                  <option value="PEN">PEN - Sol Peruano</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSaveStripe}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                Guardar Cambios
              </button>
            </div>
          </div>
        </Tabs.Content>

        {/* Social Settings */}
        <Tabs.Content value="social" className="mt-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Redes Sociales</h3>
              <p className="text-sm text-gray-500 mt-1">
                Enlaces a tus perfiles en redes sociales
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Facebook
                </label>
                <input
                  type="url"
                  value={social.facebook || ''}
                  onChange={(e) => setSocial(prev => ({ ...prev, facebook: e.target.value }))}
                  placeholder="https://facebook.com/..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instagram
                </label>
                <input
                  type="url"
                  value={social.instagram || ''}
                  onChange={(e) => setSocial(prev => ({ ...prev, instagram: e.target.value }))}
                  placeholder="https://instagram.com/..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Twitter / X
                </label>
                <input
                  type="url"
                  value={social.twitter || ''}
                  onChange={(e) => setSocial(prev => ({ ...prev, twitter: e.target.value }))}
                  placeholder="https://twitter.com/..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={social.linkedin || ''}
                  onChange={(e) => setSocial(prev => ({ ...prev, linkedin: e.target.value }))}
                  placeholder="https://linkedin.com/..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  YouTube
                </label>
                <input
                  type="url"
                  value={social.youtube || ''}
                  onChange={(e) => setSocial(prev => ({ ...prev, youtube: e.target.value }))}
                  placeholder="https://youtube.com/..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSaveSocial}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                Guardar Cambios
              </button>
            </div>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
