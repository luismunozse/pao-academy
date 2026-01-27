'use client';

import { Course, CURRENCIES } from '@/types/course';

interface PricingTabProps {
  data: Partial<Course>;
  onChange: (data: Partial<Course>) => void;
}

export default function PricingTab({ data, onChange }: PricingTabProps) {
  const selectedCurrency = CURRENCIES.find(c => c.value === data.currency) || CURRENCIES[0];
  const isFree = !data.price || data.price === 0;

  const handlePriceChange = (value: string) => {
    const price = parseFloat(value) || 0;
    onChange({ ...data, price });
  };

  const handleOriginalPriceChange = (value: string) => {
    const original_price = parseFloat(value) || undefined;
    onChange({ ...data, original_price });
  };

  const toggleFree = () => {
    if (isFree) {
      onChange({ ...data, price: 99 });
    } else {
      onChange({ ...data, price: 0, original_price: undefined });
    }
  };

  const discount = data.original_price && data.price
    ? Math.round((1 - data.price / data.original_price) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Toggle Gratuito */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <h3 className="font-medium text-gray-900">Curso gratuito</h3>
          <p className="text-sm text-gray-500">Los estudiantes podran acceder sin pagar</p>
        </div>
        <button
          type="button"
          onClick={toggleFree}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            isFree ? 'bg-green-500' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isFree ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {!isFree && (
        <>
          {/* Moneda y Precio */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Moneda
              </label>
              <select
                value={data.currency || 'USD'}
                onChange={(e) => onChange({ ...data, currency: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                {CURRENCIES.map((curr) => (
                  <option key={curr.value} value={curr.value}>{curr.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Precio <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  {selectedCurrency.symbol}
                </span>
                <input
                  type="number"
                  value={data.price || ''}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  placeholder="99.00"
                  min="0"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Precio original (descuento) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Precio original (opcional)
            </label>
            <div className="relative max-w-xs">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                {selectedCurrency.symbol}
              </span>
              <input
                type="number"
                value={data.original_price || ''}
                onChange={(e) => handleOriginalPriceChange(e.target.value)}
                placeholder="199.00"
                min="0"
                step="0.01"
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Si agregas un precio original, se mostrara tachado junto al precio actual como descuento
            </p>
          </div>

          {/* Preview del precio */}
          <div className="border-t pt-6">
            <p className="text-sm font-medium text-gray-700 mb-3">Vista previa:</p>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">
                  {selectedCurrency.symbol}{(data.price || 0).toFixed(2)}
                </span>
                {data.original_price && data.original_price > (data.price || 0) && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      {selectedCurrency.symbol}{data.original_price.toFixed(2)}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-sm font-medium rounded">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {isFree && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-green-600">GRATIS</span>
          </div>
          <p className="text-sm text-green-700 mt-1">
            Este curso estara disponible sin costo para todos los estudiantes
          </p>
        </div>
      )}
    </div>
  );
}
