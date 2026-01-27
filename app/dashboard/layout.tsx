import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Award, User, LogOut, Home, LayoutDashboard } from 'lucide-react';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await (supabase
    .from('profiles') as any)
    .select('*')
    .eq('id', user.id)
    .single();

  const profileData = profile as any;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="font-bold text-xl text-gray-900">
                Glomind360
              </Link>
              <div className="hidden md:flex items-center gap-1">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <LayoutDashboard size={18} />
                  Mis Cursos
                </Link>
                <Link
                  href="/dashboard/certificados"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Award size={18} />
                  Certificados
                </Link>
                <Link
                  href="/dashboard/perfil"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <User size={18} />
                  Perfil
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {profileData?.role === 'admin' && (
                <Link
                  href="/admin"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Panel Admin
                </Link>
              )}
              <span className="text-sm text-gray-600 hidden sm:block">
                {profileData?.full_name || user.email}
              </span>
              <form action="/api/auth/signout" method="post">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-red-600 transition-colors"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline">Salir</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
