'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Coupon, CouponFormData, getEmptyCoupon, generateCouponCode } from '@/types/coupon';
import {
  ArrowLeft,
  Save,
  Loader2,
  Percent,
  DollarSign,
  RefreshCw,
  Info
} from 'lucide-react';

interface CouponFormProps {
  initialCoupon?: Coupon;
}

interface Course {
  id: string;
  title: string;
}

export default function CouponForm({ initialCoupon }: CouponFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const isEditing = !!initialCoupon?.id;

  const [coupon, setCoupon] = useState<CouponFormData>(
    initialCoupon
      ? {
          code: initialCoupon.code,
          description: initialCoupon.description || '',
          discount_type: initialCoupon.discount_type,
          discount_value: initialCoupon.discount_value,
          min_purchase: initialCoupon.min_purchase || 0,
          max_uses: initialCoupon.max_uses,
          course_id: initialCoupon.course_id,
          starts_at: initialCoupon.starts_at?.split('T')[0],
          expires_at: initialCoupon.expires_at?.split('T')[0],
          is_active: initialCoupon.is_active
        }
      : getEmptyCoupon()
  );

  const [courses, setCourses] = useState<Course[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const { data } = await (supabase
      .from('courses') as any)
      .select('id, title')
      .eq('is_published', true)
      .order('title');

    setCourses(data || []);
  };

  const handleGenerateCode = () => {
    setCoupon(prev => ({ ...prev, code: generateCouponCode() }));
  };

  const handleChange = (field: keyof CouponFormData, value: any) => {
    setCoupon(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      // Validaciones
      if (!coupon.code.trim()) {
        throw new Error('El codigo es requerido');
      }

      if (coupon.discount_value <= 0) {
        throw new Error('El valor del descuento debe ser mayor a 0');
      }

      if (coupon.discount_type === 'percentage' && coupon.discount_value > 100) {
        throw new Error('El porcentaje no puede ser mayor a 100%');
      }

      const couponData = {
        code: coupon.code.toUpperCase().trim(),
        description: coupon.description || null,
        discount_type: coupon.discount_type,
        discount_value: coupon.discount_value,
        min_purchase: coupon.min_purchase || 0,
        max_uses: coupon.max_uses || null,
        course_id: coupon.course_id || null,
        starts_at: coupon.starts_at ? new Date(coupon.starts_at).toISOString() : null,
        expires_at: coupon.expires_at ? new Date(coupon.expires_at).toISOString() : null,
        is_active: coupon.is_active
      };

      if (isEditing) {
        const { error: updateError } = await (supabase
          .from('coupons') as any)
          .update(couponData)
          .eq('id', initialCoupon.id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await (supabase
          .from('coupons') as any)
          .insert(couponData);

        if (insertError) {
          if (insertError.code === '23505') {
            throw new Error('Ya existe un cupon con este codigo');
          }
          throw insertError;
        }
      }

      router.push('/admin/cupones');
      router.refresh();
    } catch (err: any) {
      console.error('Error saving coupon:', err);
      setError(err.message || 'Error al guardar el cupon');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => router.push('/admin/cupones')}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Editar Cupon' : 'Nuevo Cupon'}
          </h1>
          <p className="text-sm text-gray-500">
            {isEditing ? `Editando: ${initialCoupon?.code}` : 'Crea un codigo de descuento'}
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          {/* Codigo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Codigo del cupon *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={coupon.code}
                onChange={(e) => handleChange('code', e.target.value.toUpperCase())}
                placeholder="DESCUENTO20"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono uppercase"
              />
              <button
                type="button"
                onClick={handleGenerateCode}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <RefreshCw size={16} />
                Generar
              </button>
            </div>
          </div>

          {/* Descripcion */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripcion (opcional)
            </label>
            <input
              type="text"
              value={coupon.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Descuento de bienvenida"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Tipo y valor de descuento */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de descuento
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleChange('discount_type', 'percentage')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border rounded-lg transition-colors ${
                    coupon.discount_type === 'percentage'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Percent size={18} />
                  Porcentaje
                </button>
                <button
                  type="button"
                  onClick={() => handleChange('discount_type', 'fixed')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border rounded-lg transition-colors ${
                    coupon.discount_type === 'fixed'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <DollarSign size={18} />
                  Monto Fijo
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valor del descuento *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  {coupon.discount_type === 'percentage' ? '%' : '$'}
                </span>
                <input
                  type="number"
                  min="0"
                  max={coupon.discount_type === 'percentage' ? 100 : undefined}
                  step="0.01"
                  value={coupon.discount_value}
                  onChange={(e) => handleChange('discount_value', parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Curso aplicable */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Aplicable a
            </label>
            <select
              value={coupon.course_id || ''}
              onChange={(e) => handleChange('course_id', e.target.value || undefined)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Todos los cursos</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.title}</option>
              ))}
            </select>
          </div>

          {/* Compra minima */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Compra minima (opcional)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={coupon.min_purchase || ''}
                onChange={(e) => handleChange('min_purchase', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Limite de usos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Limite de usos (opcional)
            </label>
            <input
              type="number"
              min="1"
              value={coupon.max_uses || ''}
              onChange={(e) => handleChange('max_uses', parseInt(e.target.value) || undefined)}
              placeholder="Sin limite"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <Info size={12} />
              Deja vacio para usos ilimitados
            </p>
          </div>

          {/* Fechas */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de inicio
              </label>
              <input
                type="date"
                value={coupon.starts_at || ''}
                onChange={(e) => handleChange('starts_at', e.target.value || undefined)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de expiracion
              </label>
              <input
                type="date"
                value={coupon.expires_at || ''}
                onChange={(e) => handleChange('expires_at', e.target.value || undefined)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Activo */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Cupon activo</p>
              <p className="text-sm text-gray-500">Los usuarios podran usar este cupon</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={coupon.is_active}
                onChange={(e) => handleChange('is_active', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push('/admin/cupones')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            {isEditing ? 'Guardar Cambios' : 'Crear Cupon'}
          </button>
        </div>
      </form>
    </div>
  );
}
