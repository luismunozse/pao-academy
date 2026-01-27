'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import {
  Search,
  Download,
  User,
  Shield,
  BookOpen,
  Ban,
  CheckCircle,
  Eye
} from 'lucide-react';

interface Profile {
  id: string;
  full_name: string;
  avatar_url?: string;
  role: string;
  phone?: string;
  is_suspended: boolean;
  created_at: string;
  enrollments_count?: number;
}

export default function UsersPage() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const supabase = createClient();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);

    const { data: profiles } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    const { data: enrollments } = await supabase
      .from('enrollments')
      .select('user_id');

    const enrollmentCountMap = (enrollments || []).reduce((acc: any, e: any) => {
      acc[e.user_id] = (acc[e.user_id] || 0) + 1;
      return acc;
    }, {});

    const usersWithCounts = (profiles || []).map((p: any) => ({
      ...p,
      is_suspended: p.is_suspended || false,
      enrollments_count: enrollmentCountMap[p.id] || 0
    }));

    setUsers(usersWithCounts);
    setLoading(false);
  };

  const handleSuspend = async (userId: string, suspend: boolean) => {
    const action = suspend ? 'suspender' : 'activar';
    if (!confirm(`Seguro que deseas ${action} este usuario?`)) return;

    await (supabase
      .from('profiles') as any)
      .update({
        is_suspended: suspend,
        suspended_at: suspend ? new Date().toISOString() : null
      })
      .eq('id', userId);

    loadUsers();
  };

  const handleExport = () => {
    const csv = [
      ['Nombre', 'Rol', 'Telefono', 'Inscripciones', 'Estado', 'Fecha Registro'].join(','),
      ...filteredUsers.map(u => [
        u.full_name || 'Sin nombre',
        u.role,
        u.phone || '',
        u.enrollments_count,
        u.is_suspended ? 'Suspendido' : 'Activo',
        new Date(u.created_at).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `usuarios-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = !search ||
      (u.full_name?.toLowerCase().includes(search.toLowerCase())) ||
      (u.phone?.includes(search));
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'all' ||
      (statusFilter === 'active' && !u.is_suspended) ||
      (statusFilter === 'suspended' && u.is_suspended);

    return matchesSearch && matchesRole && matchesStatus;
  });

  const roleLabels: Record<string, string> = {
    student: 'Estudiante',
    instructor: 'Instructor',
    admin: 'Admin'
  };

  const roleColors: Record<string, string> = {
    student: 'bg-gray-100 text-gray-700',
    instructor: 'bg-blue-100 text-blue-700',
    admin: 'bg-purple-100 text-purple-700'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Usuarios</h1>
          <p className="text-gray-600">{users.length} usuarios registrados</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Download size={18} />
          Exportar CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nombre o telefono..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="all">Todos los roles</option>
            <option value="student">Estudiantes</option>
            <option value="instructor">Instructores</option>
            <option value="admin">Admins</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="suspended">Suspendidos</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Usuario</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Rol</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Cursos</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Estado</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Registro</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  Cargando...
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No se encontraron usuarios
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                        {user.avatar_url ? (
                          <img
                            src={user.avatar_url}
                            alt={user.full_name || ''}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="text-gray-400" size={20} />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {user.full_name || 'Sin nombre'}
                        </p>
                        <p className="text-sm text-gray-500">{user.phone || 'Sin telefono'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${roleColors[user.role] || roleColors.student}`}>
                      {user.role === 'admin' && <Shield size={12} />}
                      {roleLabels[user.role] || 'Estudiante'}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="flex items-center gap-1 text-gray-600">
                      <BookOpen size={16} />
                      {user.enrollments_count}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {user.is_suspended ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        <Ban size={12} />
                        Suspendido
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        <CheckCircle size={12} />
                        Activo
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {new Date(user.created_at).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/usuarios/${user.id}`}
                        className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                        title="Ver detalle"
                      >
                        <Eye size={18} />
                      </Link>
                      {user.role !== 'admin' && (
                        <button
                          onClick={() => handleSuspend(user.id, !user.is_suspended)}
                          className={`p-2 transition-colors ${
                            user.is_suspended
                              ? 'text-gray-400 hover:text-green-500'
                              : 'text-gray-400 hover:text-red-500'
                          }`}
                          title={user.is_suspended ? 'Activar' : 'Suspender'}
                        >
                          {user.is_suspended ? <CheckCircle size={18} /> : <Ban size={18} />}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
