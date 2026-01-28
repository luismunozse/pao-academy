import { tcClient } from './client';
import { TCCourse, TCApiResponse } from './types';
import { TC_CONFIG } from './config';

/**
 * Lista cursos de TrainerCentral con paginación
 */
export async function listTCCourses(
  limit = TC_CONFIG.defaultLimit,
  startIndex = 0
): Promise<TCApiResponse<TCCourse>> {
  return tcClient.get<TCApiResponse<TCCourse>>(
    `/courses.json?limit=${limit}&si=${startIndex}`
  );
}

/**
 * Obtiene un curso específico por ID
 */
export async function getTCCourse(courseId: string): Promise<TCCourse | null> {
  try {
    const response = await tcClient.get<{ data: TCCourse }>(
      `/courses/${courseId}.json`
    );
    return response.data;
  } catch {
    return null;
  }
}

/**
 * Obtiene todos los cursos (maneja paginación automáticamente)
 */
export async function getAllTCCourses(): Promise<TCCourse[]> {
  const allCourses: TCCourse[] = [];
  let hasMore = true;
  let startIndex = 0;

  while (hasMore) {
    const response = await listTCCourses(TC_CONFIG.defaultLimit, startIndex);

    if (response.data && response.data.length > 0) {
      allCourses.push(...response.data);
    }

    hasMore = response.page_context?.has_more ?? false;
    startIndex = response.page_context?.next_page_index ?? 0;

    // Seguridad: evitar loops infinitos
    if (!response.data || response.data.length === 0) {
      break;
    }
  }

  return allCourses;
}

/**
 * Busca un curso por su key (slug)
 */
export async function findCourseByKey(courseKey: string): Promise<TCCourse | null> {
  const courses = await getAllTCCourses();
  return courses.find(c => c.course_key === courseKey) || null;
}
