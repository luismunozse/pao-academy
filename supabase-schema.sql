-- =====================================================
-- SUPABASE SCHEMA PARA PLATAFORMA DE CURSOS
-- =====================================================
-- Este archivo contiene los schemas para gestionar:
-- - Usuarios y perfiles
-- - Inscripciones a cursos
-- - Progreso de lecciones
-- - Certificados
-- - Reseñas y comentarios
-- =====================================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLA: profiles (Perfiles de usuarios)
-- =====================================================
-- Extiende la tabla auth.users de Supabase con info adicional
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) para profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Trigger para crear perfil automáticamente al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- TABLA: course_enrollments (Inscripciones)
-- =====================================================
-- Relaciona usuarios con cursos de Strapi
CREATE TABLE IF NOT EXISTS public.course_enrollments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  course_id INTEGER NOT NULL, -- ID del curso en Strapi
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'suspended')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  UNIQUE(user_id, course_id)
);

-- RLS para enrollments
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own enrollments"
  ON public.course_enrollments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own enrollments"
  ON public.course_enrollments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Índices para performance
CREATE INDEX idx_enrollments_user_id ON public.course_enrollments(user_id);
CREATE INDEX idx_enrollments_course_id ON public.course_enrollments(course_id);

-- =====================================================
-- TABLA: lesson_progress (Progreso de lecciones)
-- =====================================================
-- Tracking granular de cada lección completada
CREATE TABLE IF NOT EXISTS public.lesson_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  course_id INTEGER NOT NULL, -- ID del curso en Strapi
  lesson_id INTEGER NOT NULL, -- ID de la lección en Strapi
  completed BOOLEAN DEFAULT FALSE,
  time_spent INTEGER DEFAULT 0, -- Tiempo en segundos
  last_position INTEGER DEFAULT 0, -- Para videos: último segundo visto
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- RLS para lesson_progress
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own lesson progress"
  ON public.lesson_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own lesson progress"
  ON public.lesson_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own lesson progress"
  ON public.lesson_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Índices para performance
CREATE INDEX idx_lesson_progress_user_id ON public.lesson_progress(user_id);
CREATE INDEX idx_lesson_progress_course_id ON public.lesson_progress(course_id);

-- =====================================================
-- TABLA: certificates (Certificados)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  course_id INTEGER NOT NULL,
  certificate_url TEXT, -- URL del PDF generado
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verification_code TEXT UNIQUE,
  UNIQUE(user_id, course_id)
);

-- RLS para certificates
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own certificates"
  ON public.certificates FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can verify certificates by code"
  ON public.certificates FOR SELECT
  USING (verification_code IS NOT NULL);

-- =====================================================
-- TABLA: course_reviews (Reseñas de cursos)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.course_reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  course_id INTEGER NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- RLS para reviews
ALTER TABLE public.course_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public reviews are viewable by everyone"
  ON public.course_reviews FOR SELECT
  USING (is_public = TRUE);

CREATE POLICY "Users can create own reviews"
  ON public.course_reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
  ON public.course_reviews FOR UPDATE
  USING (auth.uid() = user_id);

-- Índices para performance
CREATE INDEX idx_reviews_course_id ON public.course_reviews(course_id);
CREATE INDEX idx_reviews_rating ON public.course_reviews(rating);

-- =====================================================
-- TABLA: notifications (Notificaciones en tiempo real)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('course_update', 'new_lesson', 'certificate', 'message', 'system')),
  title TEXT NOT NULL,
  message TEXT,
  link TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS para notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- Índice para performance
CREATE INDEX idx_notifications_user_id_read ON public.notifications(user_id, read);
CREATE INDEX idx_notifications_created_at ON public.notifications(created_at DESC);

-- =====================================================
-- FUNCIONES ÚTILES
-- =====================================================

-- Función para actualizar el campo updated_at automáticamente
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger a tablas relevantes
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.lesson_progress
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.course_reviews
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Función para calcular progreso del curso basado en lecciones completadas
CREATE OR REPLACE FUNCTION public.calculate_course_progress(
  p_user_id UUID,
  p_course_id INTEGER,
  p_total_lessons INTEGER
)
RETURNS INTEGER AS $$
DECLARE
  v_completed_lessons INTEGER;
  v_progress INTEGER;
BEGIN
  SELECT COUNT(*)
  INTO v_completed_lessons
  FROM public.lesson_progress
  WHERE user_id = p_user_id
    AND course_id = p_course_id
    AND completed = TRUE;

  IF p_total_lessons > 0 THEN
    v_progress := (v_completed_lessons * 100) / p_total_lessons;
  ELSE
    v_progress := 0;
  END IF;

  RETURN v_progress;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- DATOS DE EJEMPLO (OPCIONAL - comentar en producción)
-- =====================================================
/*
-- Ejemplo de inscripción
INSERT INTO public.course_enrollments (user_id, course_id, progress, status)
VALUES
  ('user-uuid-here', 1, 45, 'active'),
  ('user-uuid-here', 2, 100, 'completed');

-- Ejemplo de progreso de lecciones
INSERT INTO public.lesson_progress (user_id, course_id, lesson_id, completed)
VALUES
  ('user-uuid-here', 1, 101, TRUE),
  ('user-uuid-here', 1, 102, FALSE);
*/

-- =====================================================
-- VISTAS ÚTILES
-- =====================================================

-- Vista: Cursos con estadísticas de reseñas
CREATE OR REPLACE VIEW public.course_stats AS
SELECT
  course_id,
  COUNT(*) as total_reviews,
  AVG(rating) as average_rating,
  COUNT(DISTINCT user_id) as total_students
FROM public.course_reviews
WHERE is_public = TRUE
GROUP BY course_id;

-- =====================================================
-- FIN DEL SCHEMA
-- =====================================================
