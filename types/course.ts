export interface Course {
  id?: string;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  thumbnail_url: string;
  promo_video_url?: string;
  price: number;
  currency: string;
  original_price?: number;
  duration_hours?: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  instructor_name: string;
  instructor_avatar?: string;
  instructor_bio?: string;
  is_published: boolean;
  is_featured: boolean;
  category: string;
  tags: string[];
  what_you_learn: string[];
  requirements: string[];
  target_audience: string[];
  faq: FAQ[];
  certificate_enabled: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface CourseSection {
  id?: string;
  course_id?: string;
  title: string;
  description?: string;
  order_index: number;
  created_at?: string;
  lessons?: Lesson[];
}

export interface Lesson {
  id?: string;
  course_id?: string;
  section_id?: string;
  title: string;
  description?: string;
  content?: string;
  video_url?: string;
  duration_minutes?: number;
  order_index: number;
  is_free: boolean;
  content_type: 'video' | 'text' | 'quiz' | 'assignment';
  resources: LessonResource[];
  created_at?: string;
  updated_at?: string;
}

export interface LessonResource {
  name: string;
  url: string;
  type: 'pdf' | 'doc' | 'xlsx' | 'link' | 'other';
}

export interface CourseFormData {
  course: Omit<Course, 'id' | 'created_at' | 'updated_at'>;
  sections: CourseSection[];
}

export const COURSE_CATEGORIES = [
  'Ventas',
  'Marketing',
  'Liderazgo',
  'Productividad',
  'Tecnologia',
  'Finanzas',
  'Recursos Humanos',
  'Comunicacion',
  'Desarrollo Personal',
  'Otro'
] as const;

export const COURSE_LEVELS = [
  { value: 'beginner', label: 'Principiante' },
  { value: 'intermediate', label: 'Intermedio' },
  { value: 'advanced', label: 'Avanzado' }
] as const;

export const CURRENCIES = [
  { value: 'USD', label: 'USD - Dolar', symbol: '$' },
  { value: 'MXN', label: 'MXN - Peso Mexicano', symbol: '$' },
  { value: 'ARS', label: 'ARS - Peso Argentino', symbol: '$' },
  { value: 'EUR', label: 'EUR - Euro', symbol: '€' },
  { value: 'COP', label: 'COP - Peso Colombiano', symbol: '$' }
] as const;

export const CONTENT_TYPES = [
  { value: 'video', label: 'Video' },
  { value: 'text', label: 'Texto/Lectura' },
  { value: 'quiz', label: 'Quiz' },
  { value: 'assignment', label: 'Tarea' }
] as const;

export const getEmptyCourse = (): Omit<Course, 'id' | 'created_at' | 'updated_at'> => ({
  title: '',
  slug: '',
  description: '',
  short_description: '',
  thumbnail_url: '',
  promo_video_url: '',
  price: 0,
  currency: 'USD',
  original_price: undefined,
  duration_hours: undefined,
  level: 'beginner',
  instructor_name: '',
  instructor_avatar: '',
  instructor_bio: '',
  is_published: false,
  is_featured: false,
  category: '',
  tags: [],
  what_you_learn: [],
  requirements: [],
  target_audience: [],
  faq: [],
  certificate_enabled: false
});

export const getEmptySection = (): Omit<CourseSection, 'id' | 'course_id' | 'created_at'> => ({
  title: '',
  description: '',
  order_index: 0,
  lessons: []
});

export const getEmptyLesson = (): Omit<Lesson, 'id' | 'course_id' | 'created_at' | 'updated_at'> => ({
  section_id: undefined,
  title: '',
  description: '',
  content: '',
  video_url: '',
  duration_minutes: undefined,
  order_index: 0,
  is_free: false,
  content_type: 'video',
  resources: []
});
