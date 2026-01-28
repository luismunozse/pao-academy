import { tcClient } from './client';
import { TCLearner, TCCreateLearnerResponse, TCApiResponse } from './types';

/**
 * Crea un nuevo learner en TrainerCentral
 */
export async function createTCLearner(userData: {
  email: string;
  firstName: string;
  lastName: string;
}): Promise<TCLearner> {
  const response = await tcClient.post<TCCreateLearnerResponse>('/learners', {
    learners: [{
      email: userData.email,
      first_name: userData.firstName,
      last_name: userData.lastName,
    }],
  });

  if (!response.data || response.data.length === 0) {
    throw new Error('TrainerCentral: Failed to create learner');
  }

  return response.data[0];
}

/**
 * Busca un learner por email
 */
export async function findLearnerByEmail(email: string): Promise<TCLearner | null> {
  try {
    const response = await tcClient.get<TCApiResponse<TCLearner>>(
      `/learners?email=${encodeURIComponent(email)}`
    );
    return response.data?.[0] || null;
  } catch {
    return null;
  }
}

/**
 * Obtiene un learner por ID
 */
export async function getTCLearner(learnerId: string): Promise<TCLearner | null> {
  try {
    const response = await tcClient.get<{ data: TCLearner }>(
      `/learners/${learnerId}.json`
    );
    return response.data;
  } catch {
    return null;
  }
}

/**
 * Obtiene o crea un learner por email
 * Útil para inscripciones automáticas
 */
export async function getOrCreateLearner(userData: {
  email: string;
  firstName: string;
  lastName: string;
}): Promise<TCLearner> {
  // Primero intentar encontrar por email
  const existing = await findLearnerByEmail(userData.email);
  if (existing) {
    return existing;
  }

  // Si no existe, crear nuevo
  return createTCLearner(userData);
}

/**
 * Lista todos los learners (con paginación)
 */
export async function listLearners(
  limit = 50,
  startIndex = 0
): Promise<TCApiResponse<TCLearner>> {
  return tcClient.get<TCApiResponse<TCLearner>>(
    `/learners?limit=${limit}&si=${startIndex}`
  );
}
