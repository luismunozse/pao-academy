'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Search, Download, CreditCard, DollarSign, RefreshCw } from 'lucide-react';
import { PAYMENT_STATUS_LABELS, PAYMENT_STATUS_COLORS } from '@/types/payment';

export default function PaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [stats, setStats] = useState({ total: 0, completed: 0, refunded: 0 });
  const supabase = createClient();

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    setLoading(true);

    const { data } = await (supabase
      .from('payments') as any)
      .select(`
        *,
        profile:profiles(full_name),
        course:courses(title)
      `)
      .order('created_at', { ascending: false });

    const paymentsList = data || [];
    setPayments(paymentsList);

    // Calcular stats
    const completed = paymentsList.filter((p: any) => p.status === 'completed');
    const refunded = paymentsList.filter((p: any) => p.status === 'refunded');

    setStats({
      total: completed.reduce((sum: number, p: any) => sum + (p.amount || 0), 0),
      completed: completed.length,
      refunded: refunded.length
    });

    setLoading(false);
  };

  const handleRefund = async (paymentId: string) => {
    const reason = prompt('Razon del reembolso:');
    if (!reason) return;

    await (supabase
      .from('payments') as any)
      .update({
        status: 'refunded',
        refund_reason: reason,
        refunded_at: new Date().toISOString()
      })
      .eq('id', paymentId);

    loadPayments();
  };

  const filteredPayments = payments.filter(p => {
    const matchesSearch = !search ||
      p.profile?.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      p.course?.title?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pagos</h1>
        <p className="text-gray-600">Historial de transacciones</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Ingresos Totales</p>
              <p className="text-xl font-bold text-gray-900">${stats.total.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CreditCard className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pagos Completados</p>
              <p className="text-xl font-bold text-gray-900">{stats.completed}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <RefreshCw className="text-gray-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Reembolsos</p>
              <p className="text-xl font-bold text-gray-900">{stats.refunded}</p>
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
                placeholder="Buscar por usuario o curso..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="all">Todos los estados</option>
            <option value="completed">Completados</option>
            <option value="pending">Pendientes</option>
            <option value="refunded">Reembolsados</option>
            <option value="failed">Fallidos</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Usuario</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Curso</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Monto</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Estado</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Fecha</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">Cargando...</td>
              </tr>
            ) : filteredPayments.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">No hay pagos</td>
              </tr>
            ) : (
              filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 font-medium text-gray-900">
                    {payment.profile?.full_name || 'Usuario'}
                  </td>
                  <td className="px-4 py-4 text-gray-600">
                    {payment.course?.title || 'Curso'}
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-semibold text-gray-900">
                      ${payment.amount?.toFixed(2)} {payment.currency}
                    </span>
                    {payment.discount_amount > 0 && (
                      <span className="text-xs text-green-600 ml-1">
                        (-${payment.discount_amount})
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${PAYMENT_STATUS_COLORS[payment.status as keyof typeof PAYMENT_STATUS_COLORS]}`}>
                      {PAYMENT_STATUS_LABELS[payment.status as keyof typeof PAYMENT_STATUS_LABELS]}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {new Date(payment.created_at).toLocaleDateString('es-ES')}
                  </td>
                  <td className="px-4 py-4 text-right">
                    {payment.status === 'completed' && (
                      <button
                        onClick={() => handleRefund(payment.id)}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Reembolsar
                      </button>
                    )}
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
