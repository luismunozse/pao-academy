import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { BookOpen, Clock, ArrowRight, Play } from 'lucide-react';
import { SSOButton, TCCourseProgress } from '@/components/trainercentral';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Obtener inscripciones con datos del curso
  const { data: enrollments } = await (supabase
    .from('enrollments') as any)
    .select(`
      *,
      course:courses(*)
    `)
    .eq('user_id', user!.id)
    .order('enrolled_at', { ascending: false });

  const enrollmentsList = (enrollments as any[]) || [];

  // Obtener todos los cursos publicados
  const { data: allCourses } = await (supabase
    .from('courses') as any)
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  const coursesList = (allCourses as any[]) || [];

  const enrolledCourseIds = enrollmentsList.map((e: any) => e.course_id);
  const availableCourses = coursesList.filter((c: any) => !enrolledCourseIds.includes(c.id));

  // Obtener mappings de TrainerCentral para saber qué cursos tienen integración
  const { data: tcMappings } = await (supabase
    .from('tc_course_mappings') as any)
    .select('local_course_id, tc_course_key');

  const tcMappingsMap = new Map(
    (tcMappings || []).map((m: any) => [m.local_course_id, m.tc_course_key])
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mis Cursos</h1>
        <p className="text-gray-600 mt-1">Continúa tu aprendizaje donde lo dejaste</p>
      </div>

      {/* Enrolled Courses */}
      {enrollmentsList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollmentsList.map((enrollment: any) => (
            <div
              key={enrollment.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative">
                {enrollment.course?.thumbnail_url ? (
                  <img
                    src={enrollment.course.thumbnail_url}
                    alt={`Imagen del curso: ${enrollment.course.title}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen className="text-white/50" size={48} />
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-sm font-medium">
                  {enrollment.progress}% completado
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {enrollment.course?.title}
                </h3>

                <div className="mb-4">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all"
                      style={{ width: `${enrollment.progress}%` }}
                    />
                  </div>
                </div>

                {/* TrainerCentral Progress */}
                {tcMappingsMap.has(enrollment.course_id) && (
                  <div className="mb-3 pb-3 border-b border-gray-100">
                    <TCCourseProgress courseId={enrollment.course_id} showSyncButton={true} />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock size={16} />
                    <span>{enrollment.course?.duration_hours || 0}h</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {tcMappingsMap.has(enrollment.course_id) ? (
                      <SSOButton
                        courseId={enrollment.course_id}
                        variant="primary"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Acceder
                      </SSOButton>
                    ) : (
                      <Link
                        href={`/dashboard/curso/${enrollment.course?.slug}`}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        {enrollment.progress > 0 ? 'Continuar' : 'Comenzar'}
                        <Play size={16} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <BookOpen className="mx-auto text-gray-300 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aún no estás inscrito en ningún curso
          </h3>
          <p className="text-gray-500 mb-6">
            Explora nuestro catálogo y comienza tu aprendizaje hoy
          </p>
          <Link
            href="/#cursos-en-vivo"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ver Cursos Disponibles
            <ArrowRight size={18} />
          </Link>
        </div>
      )}

      {/* Available Courses */}
      {availableCourses.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Cursos Disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCourses.map((course: any) => (
              <div
                key={course.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-gradient-to-br from-green-500 to-teal-600 relative">
                  {course.thumbnail_url ? (
                    <img
                      src={course.thumbnail_url}
                      alt={`Imagen del curso: ${course.title}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="text-white/50" size={48} />
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {course.level === 'beginner' ? 'Principiante' :
                     course.level === 'intermediate' ? 'Intermedio' : 'Avanzado'}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {course.short_description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock size={16} />
                      <span>{course.duration_hours || 0}h</span>
                    </div>

                    <Link
                      href={`/cursos/${course.slug}`}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      Ver curso
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
