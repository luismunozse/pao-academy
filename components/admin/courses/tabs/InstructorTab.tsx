'use client';

import { Course } from '@/types/course';
import ImageUploader from '../shared/ImageUploader';

interface InstructorTabProps {
  data: Partial<Course>;
  onChange: (data: Partial<Course>) => void;
}

export default function InstructorTab({ data, onChange }: InstructorTabProps) {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-700">
          La informacion del instructor aparecera en la pagina del curso para generar confianza con los estudiantes.
        </p>
      </div>

      {/* Avatar del instructor */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Foto del instructor
        </label>
        <div className="max-w-[200px]">
          <ImageUploader
            value={data.instructor_avatar || ''}
            onChange={(url) => onChange({ ...data, instructor_avatar: url })}
            folder="instructors/avatars"
            aspectRatio="1/1"
            placeholder="Foto del instructor"
          />
        </div>
      </div>

      {/* Nombre del instructor */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre del instructor <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={data.instructor_name || ''}
          onChange={(e) => onChange({ ...data, instructor_name: e.target.value })}
          placeholder="Ej: Maria Garcia"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>

      {/* Bio del instructor */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Biografia del instructor
        </label>
        <textarea
          value={data.instructor_bio || ''}
          onChange={(e) => onChange({ ...data, instructor_bio: e.target.value })}
          placeholder="Breve descripcion de la experiencia y credenciales del instructor..."
          rows={4}
          maxLength={500}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
        />
        <p className="mt-1 text-xs text-gray-500 text-right">
          {(data.instructor_bio || '').length}/500
        </p>
      </div>

      {/* Preview */}
      {data.instructor_name && (
        <div className="border-t pt-6">
          <p className="text-sm font-medium text-gray-700 mb-3">Vista previa:</p>
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            {data.instructor_avatar ? (
              <img
                src={data.instructor_avatar}
                alt={data.instructor_name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 text-xl font-bold">
                {data.instructor_name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h4 className="font-semibold text-gray-900">{data.instructor_name}</h4>
              {data.instructor_bio && (
                <p className="text-sm text-gray-600 mt-1">{data.instructor_bio}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
