export interface SiteSetting {
  id: string;
  key: string;
  value: any;
  updated_at: string;
}

export interface GeneralSettings {
  site_name: string;
  site_description: string;
  contact_email: string;
  contact_phone?: string;
  address?: string;
  logo_url?: string;
  favicon_url?: string;
}

export interface StripeSettings {
  publishable_key: string;
  secret_key: string;
  webhook_secret: string;
  currency: string;
}

export interface SocialSettings {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
}

export const DEFAULT_GENERAL_SETTINGS: GeneralSettings = {
  site_name: 'Glomind360',
  site_description: 'Plataforma de cursos online',
  contact_email: '',
  contact_phone: '',
  address: '',
  logo_url: '',
  favicon_url: ''
};

export const DEFAULT_STRIPE_SETTINGS: StripeSettings = {
  publishable_key: '',
  secret_key: '',
  webhook_secret: '',
  currency: 'USD'
};
