'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import {
  Plus,
  Search,
  Ticket,
  Percent,
  DollarSign,
  Calendar,
  Copy,
  Edit,
  Trash2,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Coupon } from '@/types/coupon';

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [copied, setCopied] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = async () => {
    setLoading(true);

    const { data } = await (supabase
      .from('coupons') as any)
      .select(`
        *,
        course:courses(title, slug)
      `)
      .order('created_at', { ascending: false });

    setCoupons(data || []);
    setLoading(false);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleToggleActive = async (coupon: Coupon) => {
    await (supabase
      .from('coupons') as any)
      .update({ is_active: !coupon.is_active })
      .eq('id', coupon.id);

    loadCoupons();
  };

  const handleDelete = async (couponId: string) => {
    if (!confirm('Eliminar este cupon?')) return;

    await (supabase
      .from('coupons') as any)
      .delete()
      .eq('id', couponId);

    loadCoupons();
  };

  const isExpired = (expiresAt?: string) => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  };

  const getCouponStatus = (coupon: Coupon) => {
    if (!coupon.is_active) return { label: 'Inactivo', color: 'bg-gray-100 text-gray-700' };
    if (isExpired(coupon.expires_at)) return { label: 'Expirado', color: 'bg-red-100 text-red-700' };
    if (coupon.max_uses && coupon.used_count >= coupon.max_uses) return { label: 'Agotado', color: 'bg-amber-100 text-amber-700' };
    return { label: 'Activo', color: 'bg-green-100 text-green-700' };
  };

  const filteredCoupons = coupons.filter(c => {
    const matchesSearch = !search ||
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.description?.toLowerCase().includes(search.toLowerCase());

    if (statusFilter === 'all') return matchesSearch;
    if (statusFilter === 'active') return matchesSearch && c.is_active && !isExpired(c.expires_at);
    if (statusFilter === 'inactive') return matchesSearch && !c.is_active;
    if (statusFilter === 'expired') return matchesSearch && isExpired(c.expires_at);
    return matchesSearch;
  });

  // Stats
  const activeCoupons = coupons.filter(c => c.is_active && !isExpired(c.expires_at)).length;
  const totalUsed = coupons.reduce((sum, c) => sum + c.used_count, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cupones</h1>
          <p className="text-gray-600">Gestiona los codigos de descuento</p>
        </div>
        <Link
          href="/admin/cupones/nuevo"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Nuevo Cupon
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Ticket className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Cupones</p>
              <p className="text-xl font-bold text-gray-900">{coupons.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Cupones Activos</p>
              <p className="text-xl font-bold text-gray-900">{activeCoupons}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Percent className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Veces Usado</p>
              <p className="text-xl font-bold text-gray-900">{totalUsed}</p>
            </div>
          </div>
        </div>
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
                placeholder="Buscar por codigo..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="all">Todos</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
            <option value="expired">Expirados</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Codigo</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Descuento</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Aplicable a</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Uso</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Expira</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Estado</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">Cargando...</td>
              </tr>
            ) : filteredCoupons.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                  No hay cupones
                </td>
              </tr>
            ) : (
              filteredCoupons.map((coupon) => {
                const status = getCouponStatus(coupon);
                return (
                  <tr key={coupon.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono font-bold">
                          {coupon.code}
                        </code>
                        <button
                          onClick={() => handleCopyCode(coupon.code)}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Copiar codigo"
                        >
                          {copied === coupon.code ? (
                            <CheckCircle size={16} className="text-green-500" />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                      </div>
                      {coupon.description && (
                        <p className="text-xs text-gray-500 mt-1">{coupon.description}</p>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 font-semibold text-gray-900">
                        {coupon.discount_type === 'percentage' ? (
                          <>
                            <Percent size={16} className="text-purple-500" />
                            {coupon.discount_value}%
                          </>
                        ) : (
                          <>
                            <DollarSign size={16} className="text-green-500" />
                            ${coupon.discount_value}
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {coupon.course?.title || 'Todos los cursos'}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span className="font-medium text-gray-900">{coupon.used_count}</span>
                      {coupon.max_uses && (
                        <span className="text-gray-500"> / {coupon.max_uses}</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {coupon.expires_at ? (
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(coupon.expires_at).toLocaleDateString('es-ES')}
                        </div>
                      ) : (
                        'Sin fecha'
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleActive(coupon)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            coupon.is_active
                              ? 'text-amber-600 hover:bg-amber-50'
                              : 'text-green-600 hover:bg-green-50'
                          }`}
                          title={coupon.is_active ? 'Desactivar' : 'Activar'}
                        >
                          {coupon.is_active ? <XCircle size={18} /> : <CheckCircle size={18} />}
                        </button>
                        <Link
                          href={`/admin/cupones/${coupon.id}`}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(coupon.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
