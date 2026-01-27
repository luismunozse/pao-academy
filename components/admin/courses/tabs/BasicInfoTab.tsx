'use client';

import { Course, COURSE_CATEGORIES, COURSE_LEVELS } from '@/types/course';
import ImageUploader from '../shared/ImageUploader';

interface BasicInfoTabProps {
  data: Partial<Course>;
  onChange: (data: Partial<Course>) => void;
}

export default function BasicInfoTab({ data, onChange }: BasicInfoTabProps) {
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    onChange({
      ...data,
      title,
      slug: generateSlug(title)
    });
  };

  const handleTagsChange = (tagsString: string) => {
    const tags = tagsString.split(',').map(t => t.trim()).filter(Boolean);
    onChange({ ...data, tags });
  };

  return (
    <div className="space-y-6">
      {/* Titulo y Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Titulo del curso <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.title || ''}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Ej: Ventas Consultivas"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slug (URL) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.slug || ''}
            onChange={(e) => onChange({ ...data, slug: e.target.value })}
            placeholder="ventas-consultivas"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          <p className="mt-1 text-xs text-gray-500">URL: /cursos/{data.slug || 'mi-curso'}</p>
        </div>
      </div>

      {/* Imagen de portada */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Imagen de portada <span className="text-red-500">*</span>
        </label>
        <ImageUploader
          value={data.thumbnail_url || ''}
          onChange={(url) => onChange({ ...data, thumbnail_url: url })}
          folder="courses/thumbnails"
          aspectRatio="16/9"
          placeholder="Sube la imagen de portada del curso (16:9)"
        />
      </div>

      {/* Descripcion corta */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripcion corta <span className="text-red-500">*</span>
        </label>
        <textarea
          value={data.short_description || ''}
          onChange={(e) => onChange({ ...data, short_description: e.target.value })}
          placeholder="Una linea describiendo el curso (max 200 caracteres)"
          maxLength={200}
          rows={2}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
        />
        <p className="mt-1 text-xs text-gray-500 text-right">
          {(data.short_description || '').length}/200
        </p>
      </div>

      {/* Descripcion completa */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripcion completa
        </label>
        <textarea
          value={data.description || ''}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          placeholder="Descripcion detallada del curso..."
          rows={5}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
        />
      </div>

      {/* Video promocional */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Video promocional (URL)
        </label>
        <input
          type="url"
          value={data.promo_video_url || ''}
          onChange={(e) => onChange({ ...data, promo_video_url: e.target.value })}
          placeholder="https://youtube.com/watch?v=..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        <p className="mt-1 text-xs text-gray-500">URL de YouTube o Vimeo</p>
      </div>

      {/* Categoria, Nivel, Duracion */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoria <span className="text-red-500">*</span>
          </label>
          <select
            value={data.category || ''}
            onChange={(e) => onChange({ ...data, category: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="">Seleccionar...</option>
            {COURSE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nivel <span className="text-red-500">*</span>
          </label>
          <select
            value={data.level || 'beginner'}
            onChange={(e) => onChange({ ...data, level: e.target.value as Course['level'] })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            {COURSE_LEVELS.map((level) => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duracion (horas)
          </label>
          <input
            type="number"
            value={data.duration_hours || ''}
            onChange={(e) => onChange({ ...data, duration_hours: parseInt(e.target.value) || undefined })}
            placeholder="20"
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Etiquetas
        </label>
        <input
          type="text"
          value={(data.tags || []).join(', ')}
          onChange={(e) => handleTagsChange(e.target.value)}
          placeholder="ventas, negociacion, clientes"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        <p className="mt-1 text-xs text-gray-500">Separadas por comas</p>
      </div>
    </div>
  );
}
