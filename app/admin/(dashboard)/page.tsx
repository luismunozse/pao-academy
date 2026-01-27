import { createClient } from '@/lib/supabase/server';
import StatsCards from '@/components/admin/dashboard/StatsCards';
import RevenueChart from '@/components/admin/dashboard/RevenueChart';
import EnrollmentsChart from '@/components/admin/dashboard/EnrollmentsChart';
import PopularCourses from '@/components/admin/dashboard/PopularCourses';
import RecentActivity from '@/components/admin/dashboard/RecentActivity';

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Obtener estadisticas generales
  const [coursesResult, usersResult, enrollmentsResult, paymentsResult] = await Promise.all([
    supabase.from('courses').select('id', { count: 'exact' }),
    supabase.from('profiles').select('id', { count: 'exact' }),
    supabase.from('enrollments').select('id', { count: 'exact' }),
    supabase.from('payments').select('amount').eq('status', 'completed')
  ]);

  const totalRevenue = (paymentsResult.data || []).reduce((sum: number, p: any) => sum + (p.amount || 0), 0);

  const stats = {
    totalRevenue,
    totalUsers: usersResult.count || 0,
    totalCourses: coursesResult.count || 0,
    totalEnrollments: enrollmentsResult.count || 0
  };

  // Obtener datos de ingresos por dia (ultimos 30 dias)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { data: revenueData } = await supabase
    .from('payments')
    .select('amount, created_at')
    .eq('status', 'completed')
    .gte('created_at', thirtyDaysAgo.toISOString())
    .order('created_at');

  // Agrupar por dia
  const revenueByDay = (revenueData || []).reduce((acc: any, p: any) => {
    const date = new Date(p.created_at).toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + (p.amount || 0);
    return acc;
  }, {});

  const revenueChartData = Object.entries(revenueByDay).map(([date, revenue]) => ({
    date,
    revenue: revenue as number
  }));

  // Obtener datos de inscripciones por dia
  const { data: enrollmentsData } = await supabase
    .from('enrollments')
    .select('enrolled_at')
    .gte('enrolled_at', thirtyDaysAgo.toISOString())
    .order('enrolled_at');

  const enrollmentsByDay = (enrollmentsData || []).reduce((acc: any, e: any) => {
    const date = new Date(e.enrolled_at).toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const enrollmentsChartData = Object.entries(enrollmentsByDay).map(([date, enrollments]) => ({
    date,
    enrollments: enrollments as number
  }));

  // Obtener cursos populares
  const { data: coursesData } = await supabase
    .from('courses')
    .select(`
      id,
      title,
      slug,
      thumbnail_url
    `)
    .eq('is_published', true)
    .limit(5);

  // Contar inscripciones por curso
  const { data: enrollmentCounts } = await supabase
    .from('enrollments')
    .select('course_id');

  const enrollmentCountMap = (enrollmentCounts || []).reduce((acc: any, e: any) => {
    acc[e.course_id] = (acc[e.course_id] || 0) + 1;
    return acc;
  }, {});

  // Obtener ingresos por curso
  const { data: coursePayments } = await supabase
    .from('payments')
    .select('course_id, amount')
    .eq('status', 'completed');

  const revenueByCoourse = (coursePayments || []).reduce((acc: any, p: any) => {
    acc[p.course_id] = (acc[p.course_id] || 0) + (p.amount || 0);
    return acc;
  }, {});

  const popularCourses = (coursesData || [])
    .map((course: any) => ({
      ...course,
      enrollments_count: enrollmentCountMap[course.id] || 0,
      revenue: revenueByCoourse[course.id] || 0
    }))
    .sort((a: any, b: any) => b.enrollments_count - a.enrollments_count)
    .slice(0, 5);

  // Obtener actividad reciente
  const { data: recentEnrollments } = await supabase
    .from('enrollments')
    .select(`
      id,
      enrolled_at,
      profile:profiles(full_name),
      course:courses(title)
    `)
    .order('enrolled_at', { ascending: false })
    .limit(5);

  const { data: recentUsers } = await supabase
    .from('profiles')
    .select('id, full_name, created_at')
    .order('created_at', { ascending: false })
    .limit(3);

  // Combinar actividades
  const activities = [
    ...(recentEnrollments || []).map((e: any) => ({
      id: `enrollment-${e.id}`,
      type: 'enrollment' as const,
      user_name: e.profile?.full_name || 'Usuario',
      course_title: e.course?.title,
      created_at: e.enrolled_at
    })),
    ...(recentUsers || []).map((u: any) => ({
      id: `user-${u.id}`,
      type: 'registration' as const,
      user_name: u.full_name || 'Usuario',
      created_at: u.created_at
    }))
  ]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 8);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Vista general de la plataforma</p>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={revenueChartData} />
        <EnrollmentsChart data={enrollmentsChartData} />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PopularCourses courses={popularCourses} />
        <RecentActivity activities={activities} />
      </div>
    </div>
  );
}
