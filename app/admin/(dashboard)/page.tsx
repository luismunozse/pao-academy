import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { BookOpen, Users, UserCheck, TrendingUp } from 'lucide-react';

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Obtener estadisticas
  const [coursesResult, usersResult, enrollmentsResult] = await Promise.all([
    supabase.from('courses').select('id', { count: 'exact' }),
    supabase.from('profiles').select('id', { count: 'exact' }),
    supabase.from('enrollments').select('id', { count: 'exact' }),
  ]);

  const stats = [
    {
      label: 'Total Cursos',
      value: coursesResult.count || 0,
      icon: BookOpen,
      color: 'bg-blue-500',
      href: '/admin/cursos',
    },
    {
      label: 'Usuarios Registrados',
      value: usersResult.count || 0,
      icon: Users,
      color: 'bg-green-500',
      href: '/admin/usuarios',
    },
    {
      label: 'Inscripciones',
      value: enrollmentsResult.count || 0,
      icon: UserCheck,
      color: 'bg-purple-500',
      href: '/admin/usuarios',
    },
  ];

  // Obtener inscripciones recientes
  const { data: recentEnrollments } = await supabase
    .from('enrollments')
    .select(`
      *,
      profile:profiles(full_name),
      course:courses(title)
    `)
    .order('enrolled_at', { ascending: false })
    .limit(5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Vista general de la plataforma</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Enrollments */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Inscripciones Recientes</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {recentEnrollments?.map((enrollment: any) => (
            <div key={enrollment.id} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">
                  {enrollment.profile?.full_name || 'Usuario'}
                </p>
                <p className="text-sm text-gray-500">
                  Se inscribio en <span className="font-medium">{enrollment.course?.title}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {new Date(enrollment.enrolled_at).toLocaleDateString('es-ES')}
                </p>
                <p className="text-sm font-medium text-blue-600">
                  {enrollment.progress}% completado
                </p>
              </div>
            </div>
          ))}

          {(!recentEnrollments || recentEnrollments.length === 0) && (
            <div className="p-8 text-center text-gray-500">
              No hay inscripciones aun
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
