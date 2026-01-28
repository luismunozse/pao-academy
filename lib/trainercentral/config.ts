// Configuración de TrainerCentral
export const TC_CONFIG = {
  // URL base de la API (se construye con subdomain y orgId)
  get baseUrl() {
    const subdomain = process.env.TRAINERCENTRAL_ACADEMY_SUBDOMAIN;
    const orgId = process.env.TRAINERCENTRAL_ORG_ID;
    if (!subdomain || !orgId) {
      throw new Error('TrainerCentral: Missing TRAINERCENTRAL_ACADEMY_SUBDOMAIN or TRAINERCENTRAL_ORG_ID');
    }
    return `https://${subdomain}.trainercentral.com/api/v4/${orgId}`;
  },

  // URL de OAuth (mismo que Zoho CRM)
  oauthUrl: 'https://accounts.zoho.com/oauth/v2/token',

  // Scopes de la API
  scopes: {
    courseRead: 'TrainerCentral.courseapi.READ',
    courseCreate: 'TrainerCentral.courseapi.CREATE',
    learnerRead: 'TrainerCentral.learnerapi.READ',
    learnerCreate: 'TrainerCentral.learnerapi.CREATE',
    enrollmentRead: 'TrainerCentral.enrollmentapi.READ',
    enrollmentCreate: 'TrainerCentral.enrollmentapi.CREATE',
  },

  // Límite por defecto para paginación
  defaultLimit: 50,
} as const;
