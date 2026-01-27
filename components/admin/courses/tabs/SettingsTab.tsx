'use client';

import { Course } from '@/types/course';
import { Eye, Star, Award } from 'lucide-react';

interface SettingsTabProps {
  data: Partial<Course>;
  onChange: (data: Partial<Course>) => void;
}

export default function SettingsTab({ data, onChange }: SettingsTabProps) {
  return (
    <div className="space-y-6">
      {/* Publicar */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Eye className="text-blue-600" size={20} />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Publicar curso</h3>
            <p className="text-sm text-gray-500">El curso sera visible para los estudiantes</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onChange({ ...data, is_published: !data.is_published })}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            data.is_published ? 'bg-blue-500' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              data.is_published ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Destacado */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Star className="text-yellow-600" size={20} />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Curso destacado</h3>
            <p className="text-sm text-gray-500">Aparecera en la seccion de cursos destacados</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onChange({ ...data, is_featured: !data.is_featured })}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            data.is_featured ? 'bg-yellow-500' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              data.is_featured ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Certificado */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Award className="text-green-600" size={20} />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Certificado de finalizacion</h3>
            <p className="text-sm text-gray-500">Los estudiantes recibiran un certificado al completar el curso</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onChange({ ...data, certificate_enabled: !data.certificate_enabled })}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            data.certificate_enabled ? 'bg-green-500' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              data.certificate_enabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Estado actual */}
      <div className="border-t pt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Estado actual del curso</h3>
        <div className="flex flex-wrap gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            data.is_published
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-700'
          }`}>
            {data.is_published ? 'Publicado' : 'Borrador'}
          </span>
          {data.is_featured && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700">
              Destacado
            </span>
          )}
          {data.certificate_enabled && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
              Con certificado
            </span>
          )}
        </div>
      </div>

      {/* Advertencia si no esta publicado */}
      {!data.is_published && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-700">
            <strong>Nota:</strong> El curso esta en modo borrador. Los estudiantes no podran verlo hasta que lo publiques.
          </p>
        </div>
      )}
    </div>
  );
}
