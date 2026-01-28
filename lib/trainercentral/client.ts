import { getTCAccessToken, invalidateTokenCache } from './auth';
import { TC_CONFIG } from './config';

/**
 * Cliente HTTP para la API de TrainerCentral
 * Maneja autenticación automática y retry en caso de token expirado
 */
class TCClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    retryCount = 0
  ): Promise<T> {
    const token = await getTCAccessToken();

    const url = endpoint.startsWith('http')
      ? endpoint
      : `${TC_CONFIG.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Zoho-oauthtoken ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    // Si el token expiró, invalidar cache y reintentar una vez
    if (response.status === 401 && retryCount === 0) {
      invalidateTokenCache();
      return this.request<T>(endpoint, options, retryCount + 1);
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`TrainerCentral API Error (${response.status}): ${errorText}`);
    }

    // Manejar respuestas vacías
    const text = await response.text();
    if (!text) {
      return {} as T;
    }

    return JSON.parse(text);
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async put<T>(endpoint: string, body: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Exportar instancia singleton
export const tcClient = new TCClient();
