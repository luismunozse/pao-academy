'use client';

import Link from 'next/link';
import { TrendingUp, Users } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  slug: string;
  thumbnail_url?: string;
  enrollments_count: number;
  revenue: number;
}

interface PopularCoursesProps {
  courses: Course[];
}

export default function PopularCourses({ courses }: PopularCoursesProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Cursos Populares
        </h3>
        <Link
          href="/admin/cursos"
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Ver todos
        </Link>
      </div>

      {courses.length > 0 ? (
        <div className="space-y-4">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-semibold text-gray-600">
                {index + 1}
              </span>

              {course.thumbnail_url ? (
                <img
                  src={course.thumbnail_url}
                  alt={course.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-200 rounded-lg" />
              )}

              <div className="flex-1 min-w-0">
                <Link
                  href={`/admin/cursos/${course.id}`}
                  className="font-medium text-gray-900 hover:text-blue-600 truncate block"
                >
                  {course.title}
                </Link>
                <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Users size={14} />
                    {course.enrollments_count} estudiantes
                  </span>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  ${course.revenue.toLocaleString('es-ES')}
                </p>
                <p className="text-xs text-gray-500">ingresos</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center py-8">
          No hay cursos para mostrar
        </p>
      )}
    </div>
  );
}
