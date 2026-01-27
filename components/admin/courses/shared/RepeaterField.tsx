'use client';

import { Plus, X, GripVertical } from 'lucide-react';

interface RepeaterFieldProps {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  addLabel?: string;
  maxItems?: number;
}

export default function RepeaterField({
  items,
  onChange,
  placeholder = 'Escribe aqui...',
  addLabel = 'Agregar',
  maxItems = 10
}: RepeaterFieldProps) {
  const addItem = () => {
    if (items.length < maxItems) {
      onChange([...items, '']);
    }
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className="text-gray-400 cursor-grab">
            <GripVertical size={16} />
          </div>
          <input
            type="text"
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
          />
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ))}

      {items.length < maxItems && (
        <button
          type="button"
          onClick={addItem}
          className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Plus size={16} />
          {addLabel}
        </button>
      )}
    </div>
  );
}

interface FAQRepeaterProps {
  items: { question: string; answer: string }[];
  onChange: (items: { question: string; answer: string }[]) => void;
  maxItems?: number;
}

export function FAQRepeater({
  items,
  onChange,
  maxItems = 10
}: FAQRepeaterProps) {
  const addItem = () => {
    if (items.length < maxItems) {
      onChange([...items, { question: '', answer: '' }]);
    }
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: 'question' | 'answer', value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange(newItems);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 space-y-3">
              <input
                type="text"
                value={item.question}
                onChange={(e) => updateItem(index, 'question', e.target.value)}
                placeholder="Pregunta"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm font-medium"
              />
              <textarea
                value={item.answer}
                onChange={(e) => updateItem(index, 'answer', e.target.value)}
                placeholder="Respuesta"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm resize-none"
              />
            </div>
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ))}

      {items.length < maxItems && (
        <button
          type="button"
          onClick={addItem}
          className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Plus size={16} />
          Agregar pregunta
        </button>
      )}
    </div>
  );
}
