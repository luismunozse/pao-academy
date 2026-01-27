'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import CourseForm from '@/components/admin/courses/CourseForm';
import { Course, CourseSection, Lesson } from '@/types/course';
import { Loader2 } from 'lucide-react';

export default function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [course, setCourse] = useState<Course | null>(null);
  const [sections, setSections] = useState<CourseSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const { id } = await params;

        // Cargar curso
        const { data: courseData, error: courseError } = await supabase
          .from('courses')
          .select('*')
          .eq('id', id)
          .single();

        if (courseError) throw courseError;

        // Cargar secciones
        const { data: sectionsData } = await (supabase
          .from('course_sections') as any)
          .select('*')
          .eq('course_id', id)
          .order('order_index');

        // Cargar lecciones
        const { data: lessonsData } = await (supabase
          .from('lessons') as any)
          .select('*')
          .eq('course_id', id)
          .order('order_index');

        // Organizar lecciones dentro de secciones
        const sectionsWithLessons: CourseSection[] = ((sectionsData || []) as any[]).map((section: any) => ({
          ...section,
          lessons: ((lessonsData || []) as any[]).filter((l: any) => l.section_id === section.id)
        }));

        setCourse(courseData as Course);
        setSections(sectionsWithLessons);
      } catch (err: any) {
        setError(err.message || 'Error al cargar el curso');
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [params, supabase]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-red-700">
        {error || 'Curso no encontrado'}
      </div>
    );
  }

  return (
    <CourseForm
      initialCourse={course}
      initialSections={sections}
    />
  );
}
