import { tcClient } from './client';
import { TCEnrollment, TCEnrollResponse, TCApiResponse } from './types';

/**
 * Inscribe un learner en un curso
 */
export async function enrollLearnerInCourse(
  learnerId: string,
  courseId: string
): Promise<TCEnrollment> {
  const response = await tcClient.post<TCEnrollResponse>(
    `/courses/${courseId}/enrollments`,
    {
      learners: [{ learner_id: learnerId }],
    }
  );

  if (!response.data || response.data.length === 0) {
    throw new Error('TrainerCentral: Failed to enroll learner');
  }

  return response.data[0];
}

/**
 * Obtiene las inscripciones de un learner
 */
export async function getLearnerEnrollments(
  learnerId: string
): Promise<TCEnrollment[]> {
  const response = await tcClient.get<TCApiResponse<TCEnrollment>>(
    `/learners/${learnerId}/enrollments`
  );
  return response.data || [];
}

/**
 * Obtiene una inscripción específica de un learner en un curso
 */
export async function getCourseEnrollment(
  learnerId: string,
  courseId: string
): Promise<TCEnrollment | null> {
  try {
    const enrollments = await getLearnerEnrollments(learnerId);
    return enrollments.find(e => e.course_id === courseId) || null;
  } catch {
    return null;
  }
}

/**
 * Obtiene todas las inscripciones de un curso
 */
export async function getCourseEnrollments(
  courseId: string,
  limit = 50,
  startIndex = 0
): Promise<TCApiResponse<TCEnrollment>> {
  return tcClient.get<TCApiResponse<TCEnrollment>>(
    `/courses/${courseId}/enrollments?limit=${limit}&si=${startIndex}`
  );
}

/**
 * Verifica si un learner está inscrito en un curso
 */
export async function isLearnerEnrolled(
  learnerId: string,
  courseId: string
): Promise<boolean> {
  const enrollment = await getCourseEnrollment(learnerId, courseId);
  return enrollment !== null;
}
