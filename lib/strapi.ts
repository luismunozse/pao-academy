/**
 * Strapi API Client
 * Funciones helper para consumir contenido del CMS Strapi
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN

interface StrapiResponse<T> {
  data: T
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

interface StrapiError {
  error: {
    status: number
    name: string
    message: string
  }
}

/**
 * Fetch genérico para Strapi con manejo de errores
 */
async function fetchStrapi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
    ...options.headers,
  }

  const url = `${STRAPI_URL}/api${endpoint}`

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      next: options.next || { revalidate: 60 }, // Cache por 60s por defecto
    })

    if (!response.ok) {
      const error: StrapiError = await response.json()
      throw new Error(
        `Strapi Error: ${error.error.message} (${error.error.status})`
      )
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching from Strapi:', error)
    throw error
  }
}

// =====================================================
// CURSOS
// =====================================================

export interface Course {
  id: number
  documentId: string
  title: string
  slug: string
  description: string
  short_description?: string
  price: number
  currency?: string
  duration_hours?: number
  level: 'beginner' | 'intermediate' | 'advanced'
  thumbnail?: {
    url: string
    alternativeText?: string
  }
  instructor?: Instructor
  category?: Category
  lessons?: Lesson[]
  tags?: string[]
  is_published: boolean
  published_at?: string
  created_at: string
  updated_at: string
}

export async function getCourses(params?: {
  populate?: string
  filters?: Record<string, any>
  sort?: string
  pagination?: { page?: number; pageSize?: number }
}): Promise<StrapiResponse<Course[]>> {
  const queryParams = new URLSearchParams()

  if (params?.populate) queryParams.append('populate', params.populate)
  if (params?.sort) queryParams.append('sort', params.sort)
  if (params?.pagination?.page)
    queryParams.append('pagination[page]', params.pagination.page.toString())
  if (params?.pagination?.pageSize)
    queryParams.append('pagination[pageSize]', params.pagination.pageSize.toString())

  // Filtros
  if (params?.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      queryParams.append(`filters[${key}]`, String(value))
    })
  }

  const query = queryParams.toString()
  const endpoint = `/courses${query ? `?${query}` : ''}`

  return fetchStrapi<StrapiResponse<Course[]>>(endpoint)
}

export async function getCourseBySlug(
  slug: string,
  populate = 'deep'
): Promise<Course | null> {
  try {
    const response = await fetchStrapi<StrapiResponse<Course[]>>(
      `/courses?filters[slug][$eq]=${slug}&populate=${populate}`
    )

    return response.data[0] || null
  } catch (error) {
    console.error('Error fetching course by slug:', error)
    return null
  }
}

export async function getCourseById(
  id: number,
  populate = 'deep'
): Promise<Course | null> {
  try {
    const response = await fetchStrapi<StrapiResponse<Course>>(
      `/courses/${id}?populate=${populate}`
    )

    return response.data
  } catch (error) {
    console.error('Error fetching course by ID:', error)
    return null
  }
}

// =====================================================
// INSTRUCTORES
// =====================================================

export interface Instructor {
  id: number
  documentId: string
  name: string
  slug: string
  bio?: string
  avatar?: {
    url: string
    alternativeText?: string
  }
  title?: string
  social_links?: {
    linkedin?: string
    twitter?: string
    website?: string
  }
  courses?: Course[]
}

export async function getInstructors(
  populate = 'avatar,courses'
): Promise<StrapiResponse<Instructor[]>> {
  return fetchStrapi<StrapiResponse<Instructor[]>>(
    `/instructors?populate=${populate}`
  )
}

export async function getInstructorBySlug(
  slug: string
): Promise<Instructor | null> {
  try {
    const response = await fetchStrapi<StrapiResponse<Instructor[]>>(
      `/instructors?filters[slug][$eq]=${slug}&populate=deep`
    )

    return response.data[0] || null
  } catch (error) {
    console.error('Error fetching instructor:', error)
    return null
  }
}

// =====================================================
// LECCIONES
// =====================================================

export interface Lesson {
  id: number
  documentId: string
  title: string
  content?: string
  video_url?: string
  duration_minutes?: number
  order: number
  is_free?: boolean
  resources?: Array<{
    title: string
    url: string
    type: 'pdf' | 'link' | 'download'
  }>
}

export async function getLessonsByCourse(
  courseId: number
): Promise<StrapiResponse<Lesson[]>> {
  return fetchStrapi<StrapiResponse<Lesson[]>>(
    `/lessons?filters[course][id][$eq]=${courseId}&sort=order:asc`
  )
}

// =====================================================
// CATEGORÍAS
// =====================================================

export interface Category {
  id: number
  documentId: string
  name: string
  slug: string
  description?: string
  courses?: Course[]
}

export async function getCategories(): Promise<StrapiResponse<Category[]>> {
  return fetchStrapi<StrapiResponse<Category[]>>('/categories?populate=courses')
}

// =====================================================
// TESTIMONIOS
// =====================================================

export interface Testimonial {
  id: number
  documentId: string
  student_name: string
  content: string
  rating: number
  avatar?: {
    url: string
  }
  course?: Course
  is_featured?: boolean
}

export async function getTestimonials(
  featured = false
): Promise<StrapiResponse<Testimonial[]>> {
  const filter = featured ? '&filters[is_featured][$eq]=true' : ''
  return fetchStrapi<StrapiResponse<Testimonial[]>>(
    `/testimonials?populate=avatar,course${filter}`
  )
}

// =====================================================
// BÚSQUEDA
// =====================================================

export async function searchCourses(
  query: string
): Promise<StrapiResponse<Course[]>> {
  return fetchStrapi<StrapiResponse<Course[]>>(
    `/courses?filters[$or][0][title][$containsi]=${query}&filters[$or][1][description][$containsi]=${query}&populate=thumbnail,instructor`
  )
}

// =====================================================
// REVALIDACIÓN
// =====================================================

/**
 * Usar en Server Actions para revalidar cache de Next.js cuando Strapi actualiza contenido
 * Configurar webhook en Strapi: POST /api/revalidate?secret=your-secret&path=/courses
 */
export async function revalidatePath(path: string) {
  if (typeof window === 'undefined') {
    const { revalidatePath: nextRevalidate } = await import('next/cache')
    nextRevalidate(path)
  }
}
