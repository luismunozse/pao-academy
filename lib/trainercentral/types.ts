// Tipos de TrainerCentral API

export interface TCCourse {
  course_id: string;
  course_key: string;
  course_name: string;
  course_description?: string;
  course_type: string;
  course_status: 'published' | 'draft' | 'archived';
  thumbnail_url?: string;
  duration_minutes?: number;
  created_time: string;
  modified_time: string;
}

export interface TCLearner {
  learner_id: string;
  email: string;
  first_name: string;
  last_name: string;
  status: 'active' | 'inactive';
  created_time: string;
}

export interface TCEnrollment {
  enrollment_id: string;
  learner_id: string;
  course_id: string;
  enrollment_status: 'enrolled' | 'completed' | 'expired';
  progress_percentage: number;
  enrolled_date: string;
  completion_date?: string;
}

export interface TCProgress {
  course_id: string;
  learner_id: string;
  progress_percentage: number;
  time_spent_minutes: number;
  last_accessed: string;
  lessons_completed: number;
  total_lessons: number;
}

export interface TCApiResponse<T> {
  data: T[];
  page_context?: {
    has_more: boolean;
    next_page_index: number;
  };
}

export interface TCSSOPayload {
  email: string;
  first_name: string;
  last_name: string;
  timestamp: number;
  redirect_url?: string;
}

// Tipos para respuestas de la API
export interface TCApiError {
  code: string;
  message: string;
  status: number;
}

export interface TCCreateLearnerResponse {
  data: TCLearner[];
}

export interface TCEnrollResponse {
  data: TCEnrollment[];
}
