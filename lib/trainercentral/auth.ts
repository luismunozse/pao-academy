import { TC_CONFIG } from './config';

// Cache del token en memoria
let cachedToken: { token: string; expiresAt: number } | null = null;

/**
 * Obtiene un access token de TrainerCentral usando OAuth 2.0
 * Usa el mismo endpoint de Zoho OAuth que CRM
 * El token se cachea por 50 minutos (los tokens duran 1 hora)
 */
export async function getTCAccessToken(): Promise<string> {
  // Verificar cache (con 1 minuto de margen)
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60000) {
    return cachedToken.token;
  }

  const clientId = process.env.TRAINERCENTRAL_CLIENT_ID;
  const clientSecret = process.env.TRAINERCENTRAL_CLIENT_SECRET;
  const refreshToken = process.env.TRAINERCENTRAL_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('TrainerCentral: Missing OAuth credentials (CLIENT_ID, CLIENT_SECRET, or REFRESH_TOKEN)');
  }

  const response = await fetch(TC_CONFIG.oauthUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'refresh_token',
    }),
  });

  const data = await response.json();

  if (!data.access_token) {
    console.error('TrainerCentral OAuth Error:', data);
    throw new Error(`TrainerCentral Auth Error: ${data.error || 'Failed to get access token'}`);
  }

  // Cache por 50 minutos (tokens duran 1 hora)
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + 50 * 60 * 1000,
  };

  return data.access_token;
}

/**
 * Invalida el cache del token (útil para forzar refresh)
 */
export function invalidateTokenCache(): void {
  cachedToken = null;
}
