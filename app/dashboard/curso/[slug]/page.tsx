import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Play, CheckCircle, Lock, Clock, User } from 'lucide-react';

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  // Obtener curso
  const { data: course } = await (supabase
    .from('courses') as any)
    .select('*')
    .eq('slug', slug)
    .single();

  if (!course) notFound();

  const courseData = course as any;

  // Verificar inscripción
  const { data: enrollment } = await (supabase
    .from('enrollments') as any)
    .select('*')
    .eq('user_id', user.id)
    .eq('course_id', courseData.id)
    .single();

  const enrollmentData = enrollment as any;

  // Obtener lecciones
  const { data: lessons } = await (supabase
    .from('lessons') as any)
    .select('*')
    .eq('course_id', courseData.id)
    .order('order_index', { ascending: true });

  const lessonsList = (lessons as any[]) || [];

  // Obtener progreso de lecciones
  const { data: progress } = await (supabase
    .from('lesson_progress') as any)
    .select('lesson_id, completed')
    .eq('user_id', user.id);

  const progressList = (progress as any[]) || [];
  const completedLessons = new Set(
    progressList.filter((p: any) => p.completed).map((p: any) => p.lesson_id)
  );

  // Si no está inscrito, inscribirlo automáticamente
  if (!enrollmentData) {
    await (supabase.from('enrollments') as any).insert({
      user_id: user.id,
      course_id: courseData.id,
      progress: 0,
      status: 'active',
    });
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={18} />
        Volver a mis cursos
      </Link>

      {/* Course Header */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        <div className="aspect-[3/1] bg-gradient-to-br from-blue-600 to-purple-700 relative">
          {courseData.thumbnail_url && (
            <img
              src={courseData.thumbnail_url}
              alt={`Portada del curso: ${courseData.title}`}
              className="w-full h-full object-cover opacity-50"
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-3xl font-bold text-white text-center px-4">
              {courseData.title}
            </h1>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{courseData.duration_hours || 0} horas</span>
            </div>
            <div className="flex items-center gap-1">
              <User size={16} />
              <span>{courseData.instructor_name || 'Instructor'}</span>
            </div>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              {courseData.level === 'beginner' ? 'Principiante' :
               courseData.level === 'intermediate' ? 'Intermedio' : 'Avanzado'}
            </span>
          </div>

          <p className="text-gray-600">{courseData.description}</p>

          {/* Progress */}
          {enrollmentData && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progreso del curso</span>
                <span className="text-sm text-gray-500">{enrollmentData.progress}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${enrollmentData.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lessons List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">
            Contenido del curso ({lessonsList.length} lecciones)
          </h2>
        </div>

        <div className="divide-y divide-gray-100">
          {lessonsList.map((lesson: any, index: number) => {
            const isCompleted = completedLessons.has(lesson.id);
            const isLocked = !lesson.is_free && !enrollmentData;

            return (
              <Link
                key={lesson.id}
                href={isLocked ? '#' : `/dashboard/curso/${slug}/leccion/${lesson.id}`}
                className={`flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${
                  isLocked ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {/* Status Icon */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isCompleted
                    ? 'bg-green-100 text-green-600'
                    : isLocked
                    ? 'bg-gray-100 text-gray-400'
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  {isCompleted ? (
                    <CheckCircle size={18} />
                  ) : isLocked ? (
                    <Lock size={16} />
                  ) : (
                    <Play size={16} />
                  )}
                </div>

                {/* Lesson Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Lección {index + 1}</span>
                    {lesson.is_free && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                        Gratis
                      </span>
                    )}
                  </div>
                  <h3 className="font-medium text-gray-900 truncate">{lesson.title}</h3>
                </div>

                {/* Duration */}
                {lesson.duration_minutes && (
                  <span className="text-sm text-gray-500">
                    {lesson.duration_minutes} min
                  </span>
                )}
              </Link>
            );
          })}

          {lessonsList.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              Este curso aún no tiene lecciones disponibles
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
