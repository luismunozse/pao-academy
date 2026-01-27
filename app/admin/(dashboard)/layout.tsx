import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  CreditCard,
  Ticket,
  Settings,
  ArrowLeft,
  GraduationCap,
  User
} from 'lucide-react';
import LogoutButton from '@/components/admin/LogoutButton';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/cursos', label: 'Cursos', icon: BookOpen },
  { href: '/admin/usuarios', label: 'Usuarios', icon: Users },
  { href: '/admin/pagos', label: 'Pagos', icon: CreditCard },
  { href: '/admin/cupones', label: 'Cupones', icon: Ticket },
  { href: '/admin/configuracion', label: 'Configuracion', icon: Settings },
];

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

  const { data: profile } = await (supabase
    .from('profiles') as any)
    .select('role, full_name, avatar_url')
    .eq('id', user.id)
    .single();

  if ((profile as any)?.role !== 'admin') {
    redirect('/dashboard');
  }

  const avatarUrl = (profile as any)?.avatar_url;
  const fullName = (profile as any)?.full_name || user.email?.split('@')[0] || 'Admin';

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-gray-900 text-white flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-gray-800">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <GraduationCap size={20} />
            </div>
            <div>
              <span className="font-bold">Glomind360</span>
              <p className="text-xs text-gray-400">Panel Admin</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Profile & Footer */}
        <div className="p-4 border-t border-gray-800 space-y-4">
          {/* User Info */}
          <div className="flex items-center gap-3">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={fullName}
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-700"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                <User size={20} className="text-gray-400" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{fullName}</p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} />
              Volver al sitio
            </Link>
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8 min-h-screen">
        {children}
      </main>
    </div>
  );
}
