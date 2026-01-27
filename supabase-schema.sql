-- =====================================================
-- SCHEMA DE BASE DE DATOS - PAO ACADEMY
-- =====================================================
-- Ejecutar este SQL en Supabase SQL Editor

-- =====================================================
-- 1. PROFILES (extends auth.users)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'admin', 'instructor')),
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger para crear perfil automáticamente al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- 2. COURSES
-- =====================================================
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  thumbnail_url TEXT,
  price DECIMAL(10,2) DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  duration_hours INTEGER,
  level TEXT DEFAULT 'beginner' CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  instructor_name TEXT,
  instructor_avatar TEXT,
  instructor_bio TEXT,
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  category TEXT,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 3. LESSONS
-- =====================================================
CREATE TABLE IF NOT EXISTS public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  video_url TEXT,
  duration_minutes INTEGER,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_free BOOLEAN DEFAULT false,
  resources JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lessons_course_id ON public.lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_order ON public.lessons(course_id, order_index);

-- =====================================================
-- 4. ENROLLMENTS
-- =====================================================
CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, course_id)
);

CREATE INDEX IF NOT EXISTS idx_enrollments_user ON public.enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON public.enrollments(course_id);

-- =====================================================
-- 5. LESSON PROGRESS
-- =====================================================
CREATE TABLE IF NOT EXISTS public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  watched_seconds INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

CREATE INDEX IF NOT EXISTS idx_lesson_progress_user ON public.lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_lesson ON public.lesson_progress(lesson_id);

-- =====================================================
-- 6. CERTIFICATES
-- =====================================================
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  certificate_code TEXT UNIQUE NOT NULL,
  certificate_url TEXT,
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- =====================================================
-- 7. ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- PROFILES policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- COURSES policies
CREATE POLICY "Anyone can view published courses"
  ON public.courses FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can do everything with courses"
  ON public.courses FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- LESSONS policies
CREATE POLICY "Anyone can view lessons of published courses"
  ON public.lessons FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.courses
      WHERE id = course_id AND is_published = true
    )
  );

CREATE POLICY "Admins can do everything with lessons"
  ON public.lessons FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ENROLLMENTS policies
CREATE POLICY "Users can view their own enrollments"
  ON public.enrollments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own enrollments"
  ON public.enrollments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own enrollments"
  ON public.enrollments FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all enrollments"
  ON public.enrollments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- LESSON PROGRESS policies
CREATE POLICY "Users can view their own progress"
  ON public.lesson_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
  ON public.lesson_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON public.lesson_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- CERTIFICATES policies
CREATE POLICY "Users can view their own certificates"
  ON public.certificates FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage certificates"
  ON public.certificates FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- 8. FUNCTIONS
-- =====================================================

-- Function to calculate course progress
CREATE OR REPLACE FUNCTION public.calculate_course_progress(p_user_id UUID, p_course_id UUID)
RETURNS INTEGER AS $$
DECLARE
  total_lessons INTEGER;
  completed_lessons INTEGER;
BEGIN
  SELECT COUNT(*) INTO total_lessons
  FROM public.lessons
  WHERE course_id = p_course_id;

  IF total_lessons = 0 THEN
    RETURN 0;
  END IF;

  SELECT COUNT(*) INTO completed_lessons
  FROM public.lesson_progress lp
  JOIN public.lessons l ON l.id = lp.lesson_id
  WHERE lp.user_id = p_user_id
    AND l.course_id = p_course_id
    AND lp.completed = true;

  RETURN ROUND((completed_lessons::DECIMAL / total_lessons) * 100);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update enrollment progress when lesson is completed
CREATE OR REPLACE FUNCTION public.update_enrollment_progress()
RETURNS TRIGGER AS $$
DECLARE
  v_course_id UUID;
  v_progress INTEGER;
BEGIN
  -- Get course_id from lesson
  SELECT course_id INTO v_course_id
  FROM public.lessons
  WHERE id = NEW.lesson_id;

  -- Calculate new progress
  v_progress := public.calculate_course_progress(NEW.user_id, v_course_id);

  -- Update enrollment
  UPDATE public.enrollments
  SET
    progress = v_progress,
    completed_at = CASE WHEN v_progress = 100 THEN NOW() ELSE completed_at END,
    status = CASE WHEN v_progress = 100 THEN 'completed' ELSE status END
  WHERE user_id = NEW.user_id AND course_id = v_course_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_lesson_progress_change ON public.lesson_progress;
CREATE TRIGGER on_lesson_progress_change
  AFTER INSERT OR UPDATE ON public.lesson_progress
  FOR EACH ROW
  WHEN (NEW.completed = true)
  EXECUTE FUNCTION public.update_enrollment_progress();

-- =====================================================
-- 9. SEED DATA (4 cursos existentes)
-- =====================================================
INSERT INTO public.courses (title, slug, description, short_description, level, instructor_name, is_published, category, duration_hours, price) VALUES
('Ventas Consultivas', 'ventas-consultivas', 'Aprende técnicas avanzadas de ventas consultivas para cerrar más negocios.', 'Domina el arte de las ventas consultivas', 'intermediate', 'Expert Instructor', true, 'Ventas', 20, 0),
('Liderazgo Ágil', 'liderazgo-agil', 'Desarrolla habilidades de liderazgo ágil para equipos de alto rendimiento.', 'Lidera equipos con metodologías ágiles', 'intermediate', 'Expert Instructor', true, 'Liderazgo', 16, 0),
('Marca Personal', 'marca-personal', 'Construye y potencia tu marca personal para destacar profesionalmente.', 'Destaca con tu marca personal', 'beginner', 'Expert Instructor', true, 'Marketing', 12, 0),
('Power BI desde Cero', 'power-bi-desde-cero', 'Domina Power BI desde cero y crea dashboards profesionales.', 'Visualiza datos con Power BI', 'beginner', 'Expert Instructor', true, 'Productividad', 24, 0)
ON CONFLICT (slug) DO NOTHING;
