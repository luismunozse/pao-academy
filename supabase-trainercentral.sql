-- =====================================================
-- MIGRACIÓN: INTEGRACIÓN TRAINERCENTRAL
-- =====================================================
-- Ejecutar este SQL en Supabase SQL Editor después del schema principal

-- =====================================================
-- 1. TC_COURSE_MAPPINGS - Mapeo entre cursos locales y TC
-- =====================================================
CREATE TABLE IF NOT EXISTS public.tc_course_mappings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  local_course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  tc_course_id VARCHAR(100) NOT NULL,
  tc_course_key VARCHAR(100),
  tc_course_name VARCHAR(255),
  last_synced_at TIMESTAMPTZ,
  sync_status VARCHAR(20) DEFAULT 'pending' CHECK (sync_status IN ('pending', 'synced', 'error')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(local_course_id),
  UNIQUE(tc_course_id)
);

CREATE INDEX IF NOT EXISTS idx_tc_course_mappings_local ON public.tc_course_mappings(local_course_id);
CREATE INDEX IF NOT EXISTS idx_tc_course_mappings_tc ON public.tc_course_mappings(tc_course_id);

-- =====================================================
-- 2. TC_LEARNER_MAPPINGS - Mapeo entre usuarios locales y TC
-- =====================================================
CREATE TABLE IF NOT EXISTS public.tc_learner_mappings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  tc_learner_id VARCHAR(100) NOT NULL,
  tc_email VARCHAR(255),
  last_synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id),
  UNIQUE(tc_learner_id)
);

CREATE INDEX IF NOT EXISTS idx_tc_learner_mappings_user ON public.tc_learner_mappings(user_id);
CREATE INDEX IF NOT EXISTS idx_tc_learner_mappings_tc ON public.tc_learner_mappings(tc_learner_id);

-- =====================================================
-- 3. TC_PENDING_ENROLLMENTS - Cola de inscripciones pendientes
-- =====================================================
-- Para reintentar inscripciones que fallaron
CREATE TABLE IF NOT EXISTS public.tc_pending_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  error TEXT,
  retry_count INTEGER DEFAULT 0,
  last_retry_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

CREATE INDEX IF NOT EXISTS idx_tc_pending_retry ON public.tc_pending_enrollments(retry_count, created_at);

-- =====================================================
-- 4. ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on new tables
ALTER TABLE public.tc_course_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tc_learner_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tc_pending_enrollments ENABLE ROW LEVEL SECURITY;

-- TC_COURSE_MAPPINGS policies
CREATE POLICY "Admins can manage course mappings"
  ON public.tc_course_mappings FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Authenticated users can view course mappings"
  ON public.tc_course_mappings FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- TC_LEARNER_MAPPINGS policies
CREATE POLICY "Users can view their own learner mapping"
  ON public.tc_learner_mappings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage learner mappings"
  ON public.tc_learner_mappings FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- TC_PENDING_ENROLLMENTS policies
CREATE POLICY "Admins can manage pending enrollments"
  ON public.tc_pending_enrollments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- 5. SERVICE ROLE ACCESS (para webhooks)
-- =====================================================
-- Las tablas necesitan ser accesibles por el service role
-- para que los webhooks de Stripe puedan insertar/actualizar

-- Permitir insert/update con service role en tc_learner_mappings
CREATE POLICY "Service role can manage learner mappings"
  ON public.tc_learner_mappings FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Permitir insert en tc_pending_enrollments con service role
CREATE POLICY "Service role can manage pending enrollments"
  ON public.tc_pending_enrollments FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');
