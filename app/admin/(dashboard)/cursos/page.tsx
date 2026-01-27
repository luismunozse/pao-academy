import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, Edit, Eye, BookOpen, Layers } from 'lucide-react';

export default async function AdminCoursesPage() {
  const supabase = await createClient();

  const { data: courses } = await (supabase
    .from('courses') as any)
    .select('*')
    .order('created_at', { ascending: false });

  const courseList = courses as any[];

  // Contar lecciones por curso
  const { data: lessonCounts } = await (supabase
    .from('lessons') as any)
    .select('course_id');

  const lessonCountMap = (lessonCounts as any[])?.reduce((acc: any, lesson: any) => {
    acc[lesson.course_id] = (acc[lesson.course_id] || 0) + 1;
    return acc;
  }, {}) || {};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cursos</h1>
          <p className="text-gray-600">Gestiona los cursos de la plataforma</p>
        </div>

        <Link
          href="/admin/cursos/nuevo"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Nuevo Curso
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Curso</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Nivel</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Lecciones</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Estado</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {courseList?.map((course: any) => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{course.title}</p>
                      <p className="text-sm text-gray-500">{course.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    course.level === 'beginner'
                      ? 'bg-green-100 text-green-700'
                      : course.level === 'intermediate'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {course.level === 'beginner' ? 'Principiante' :
                     course.level === 'intermediate' ? 'Intermedio' : 'Avanzado'}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-gray-600">
                    {lessonCountMap[course.id] || 0} lecciones
                  </span>
                </td>
                <td className="px-4 py-4">
                  {course.is_published ? (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      Publicado
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                      Borrador
                    </span>
                  )}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/cursos/${course.slug}`}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      title="Ver curso"
                    >
                      <Eye size={18} />
                    </Link>
                    <Link
                      href={`/admin/cursos/${course.id}`}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Editar"
                    >
                      <Edit size={18} />
                    </Link>
                    <Link
                      href={`/admin/cursos/${course.id}/lecciones`}
                      className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
                      title="Lecciones"
                    >
                      <Layers size={18} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {(!courseList || courseList.length === 0) && (
          <div className="p-8 text-center text-gray-500">
            No hay cursos aun. <Link href="/admin/cursos/nuevo" className="text-blue-600 hover:underline">Crea el primero</Link>
          </div>
        )}
      </div>
    </div>
  );
}
