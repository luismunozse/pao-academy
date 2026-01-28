import crypto from 'crypto';
import { TCSSOPayload } from './types';

/**
 * Genera una URL de SSO para acceder a TrainerCentral
 * El usuario será autenticado automáticamente en TC
 */
export function generateSSOUrl(
  user: {
    email: string;
    firstName: string;
    lastName: string;
  },
  courseKey?: string
): string {
  const academy = process.env.TRAINERCENTRAL_ACADEMY_SUBDOMAIN;
  const secret = process.env.TRAINERCENTRAL_SSO_SECRET;

  if (!academy) {
    throw new Error('TrainerCentral: Missing TRAINERCENTRAL_ACADEMY_SUBDOMAIN');
  }

  if (!secret) {
    throw new Error('TrainerCentral: Missing TRAINERCENTRAL_SSO_SECRET');
  }

  const timestamp = Date.now();

  const payload: TCSSOPayload = {
    email: user.email,
    first_name: user.firstName,
    last_name: user.lastName,
    timestamp,
  };

  const payloadStr = JSON.stringify(payload);
  const encoded = Buffer.from(payloadStr).toString('base64');

  // HMAC-SHA256 signature
  const signature = crypto
    .createHmac('sha256', secret)
    .update(encoded)
    .digest('hex');

  let ssoUrl = `https://${academy}.trainercentral.com/sso?data=${encoded}&signature=${signature}`;

  // Agregar redirección a curso específico si se proporciona
  if (courseKey) {
    ssoUrl += `&redirect=/courses/${courseKey}`;
  }

  return ssoUrl;
}

/**
 * Verifica la firma de un callback SSO
 */
export function verifySSOCallback(data: string, signature: string): boolean {
  const secret = process.env.TRAINERCENTRAL_SSO_SECRET;

  if (!secret) {
    return false;
  }

  const expectedSig = crypto
    .createHmac('sha256', secret)
    .update(data)
    .digest('hex');

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSig)
    );
  } catch {
    return false;
  }
}

/**
 * Decodifica el payload SSO
 */
export function decodeSSOPayload(data: string): TCSSOPayload | null {
  try {
    const decoded = Buffer.from(data, 'base64').toString('utf-8');
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}
