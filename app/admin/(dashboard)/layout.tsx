import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, BookOpen, Users, Settings, ArrowLeft } from 'lucide-react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  // Verificar que es admin
  const { data: profile } = await (supabase
    .from('profiles') as any)
    .select('role')
    .eq('id', user.id)
    .single();

  if ((profile as any)?.role !== 'admin') {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-gray-900 text-white">
        <div className="p-4 border-b border-gray-800">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold">
            Glomind360
          </Link>
          <span className="text-xs text-gray-400">Panel de Administracion</span>
        </div>

        <nav className="p-4 space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link
            href="/admin/cursos"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <BookOpen size={20} />
            Cursos
          </Link>
          <Link
            href="/admin/usuarios"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Users size={20} />
            Usuarios
          </Link>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Volver al panel de estudiante
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
