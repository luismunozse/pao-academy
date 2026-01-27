'use client';

import { useState, useEffect } from 'react';
import { Lesson, CONTENT_TYPES } from '@/types/course';
import { X, Video, FileText, HelpCircle, ClipboardList } from 'lucide-react';

interface LessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (lesson: Partial<Lesson>) => void;
  lesson?: Lesson;
}

const contentTypeIcons = {
  video: Video,
  text: FileText,
  quiz: HelpCircle,
  assignment: ClipboardList
};

export default function LessonModal({ isOpen, onClose, onSave, lesson }: LessonModalProps) {
  const [formData, setFormData] = useState<Partial<Lesson>>({
    title: '',
    description: '',
    content_type: 'video',
    video_url: '',
    content: '',
    duration_minutes: undefined,
    is_free: false,
    resources: []
  });

  useEffect(() => {
    if (lesson) {
      setFormData({
        title: lesson.title,
        description: lesson.description || '',
        content_type: lesson.content_type,
        video_url: lesson.video_url || '',
        content: lesson.content || '',
        duration_minutes: lesson.duration_minutes,
        is_free: lesson.is_free,
        resources: lesson.resources || []
      });
    } else {
      setFormData({
        title: '',
        description: '',
        content_type: 'video',
        video_url: '',
        content: '',
        duration_minutes: undefined,
        is_free: false,
        resources: []
      });
    }
  }, [lesson, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) return;

    onSave({
      ...lesson,
      ...formData,
      title: formData.title?.trim()
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {lesson ? 'Editar leccion' : 'Nueva leccion'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Titulo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titulo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ej: Introduccion al curso"
              autoFocus
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Tipo de contenido */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de contenido
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CONTENT_TYPES.map((type) => {
                const Icon = contentTypeIcons[type.value as keyof typeof contentTypeIcons];
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, content_type: type.value as Lesson['content_type'] })}
                    className={`flex items-center gap-2 px-3 py-2 border rounded-lg transition-colors ${
                      formData.content_type === type.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* URL del video (solo si es video) */}
          {formData.content_type === 'video' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL del video
              </label>
              <input
                type="url"
                value={formData.video_url}
                onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <p className="mt-1 text-xs text-gray-500">YouTube, Vimeo u otra plataforma</p>
            </div>
          )}

          {/* Contenido (solo si es texto) */}
          {formData.content_type === 'text' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contenido de la leccion
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Escribe el contenido de la leccion..."
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              />
            </div>
          )}

          {/* Descripcion */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripcion (opcional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Breve descripcion de la leccion..."
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            />
          </div>

          {/* Duracion y Gratis */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duracion (min)
              </label>
              <input
                type="number"
                value={formData.duration_minutes || ''}
                onChange={(e) => setFormData({ ...formData, duration_minutes: parseInt(e.target.value) || undefined })}
                placeholder="10"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_free}
                  onChange={(e) => setFormData({ ...formData, is_free: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Leccion gratuita</span>
              </label>
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!formData.title?.trim()}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {lesson ? 'Guardar' : 'Crear leccion'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
