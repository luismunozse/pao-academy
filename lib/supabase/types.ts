export type UserRole = 'student' | 'admin' | 'instructor';
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
export type EnrollmentStatus = 'active' | 'completed' | 'cancelled';

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  thumbnail_url: string | null;
  price: number;
  currency: string;
  duration_hours: number | null;
  level: CourseLevel;
  instructor_name: string | null;
  instructor_avatar: string | null;
  instructor_bio: string | null;
  is_published: boolean;
  is_featured: boolean;
  category: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  content: string | null;
  video_url: string | null;
  duration_minutes: number | null;
  order_index: number;
  is_free: boolean;
  resources: LessonResource[];
  created_at: string;
  updated_at: string;
}

export interface LessonResource {
  title: string;
  url: string;
  type: 'pdf' | 'link' | 'download';
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  progress: number;
  status: EnrollmentStatus;
  enrolled_at: string;
  completed_at: string | null;
  // Joined data
  course?: Course;
}

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  watched_seconds: number;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Certificate {
  id: string;
  user_id: string;
  course_id: string;
  certificate_code: string;
  certificate_url: string | null;
  issued_at: string;
  // Joined data
  course?: Course;
}

// Database types for Supabase
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>;
      };
      courses: {
        Row: Course;
        Insert: Omit<Course, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Course, 'id' | 'created_at'>>;
      };
      lessons: {
        Row: Lesson;
        Insert: Omit<Lesson, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Lesson, 'id' | 'created_at'>>;
      };
      enrollments: {
        Row: Enrollment;
        Insert: Omit<Enrollment, 'id' | 'enrolled_at'>;
        Update: Partial<Omit<Enrollment, 'id' | 'user_id' | 'course_id' | 'enrolled_at'>>;
      };
      lesson_progress: {
        Row: LessonProgress;
        Insert: Omit<LessonProgress, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<LessonProgress, 'id' | 'user_id' | 'lesson_id' | 'created_at'>>;
      };
      certificates: {
        Row: Certificate;
        Insert: Omit<Certificate, 'id' | 'issued_at'>;
        Update: Partial<Omit<Certificate, 'id' | 'user_id' | 'course_id' | 'issued_at'>>;
      };
    };
  };
};
