import { createClient } from '@/lib/supabase/server';
import { User, Mail, Calendar, Shield } from 'lucide-react';

export default async function AdminUsersPage() {
  const supabase = await createClient();

  const { data: profiles } = await (supabase
    .from('profiles') as any)
    .select('*')
    .order('created_at', { ascending: false });

  const profileList = profiles as any[];

  // Contar inscripciones por usuario
  const { data: enrollmentCounts } = await (supabase
    .from('enrollments') as any)
    .select('user_id');

  const enrollmentCountMap = (enrollmentCounts as any[])?.reduce((acc: any, e: any) => {
    acc[e.user_id] = (acc[e.user_id] || 0) + 1;
    return acc;
  }, {}) || {};

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Usuarios</h1>
        <p className="text-gray-600">Lista de usuarios registrados</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Usuario</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Rol</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Inscripciones</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Registro</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {profileList?.map((profile: any) => (
              <tr key={profile.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      {profile.avatar_url ? (
                        <img
                          src={profile.avatar_url}
                          alt={profile.full_name || ''}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <User className="text-gray-400" size={20} />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {profile.full_name || 'Sin nombre'}
                      </p>
                      <p className="text-sm text-gray-500">{profile.phone || '-'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    profile.role === 'admin'
                      ? 'bg-purple-100 text-purple-700'
                      : profile.role === 'instructor'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {profile.role === 'admin' && <Shield size={12} />}
                    {profile.role === 'admin' ? 'Admin' :
                     profile.role === 'instructor' ? 'Instructor' : 'Estudiante'}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-gray-600">
                    {enrollmentCountMap[profile.id] || 0} cursos
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-500">
                  {new Date(profile.created_at).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {(!profileList || profileList.length === 0) && (
          <div className="p-8 text-center text-gray-500">
            No hay usuarios registrados aun
          </div>
        )}
      </div>
    </div>
  );
}
