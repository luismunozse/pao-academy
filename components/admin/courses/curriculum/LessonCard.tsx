'use client';

import { Lesson } from '@/types/course';
import { GripVertical, Video, FileText, HelpCircle, ClipboardList, Pencil, Trash2, Eye } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface LessonCardProps {
  lesson: Lesson;
  onEdit: () => void;
  onDelete: () => void;
}

const contentTypeConfig = {
  video: { icon: Video, label: 'Video', color: 'text-blue-500' },
  text: { icon: FileText, label: 'Texto', color: 'text-green-500' },
  quiz: { icon: HelpCircle, label: 'Quiz', color: 'text-purple-500' },
  assignment: { icon: ClipboardList, label: 'Tarea', color: 'text-orange-500' }
};

export default function LessonCard({ lesson, onEdit, onDelete }: LessonCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: lesson.id || '' });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  const config = contentTypeConfig[lesson.content_type] || contentTypeConfig.video;
  const Icon = config.icon;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors ${
        isDragging ? 'shadow-lg' : ''
      }`}
    >
      <button
        type="button"
        className="cursor-grab text-gray-400 hover:text-gray-600"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={16} />
      </button>

      <div className={`p-1.5 rounded ${config.color} bg-gray-50`}>
        <Icon size={16} />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-900 truncate">{lesson.title}</h4>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-gray-500">{config.label}</span>
          {lesson.duration_minutes && (
            <>
              <span className="text-gray-300">•</span>
              <span className="text-xs text-gray-500">{lesson.duration_minutes} min</span>
            </>
          )}
          {lesson.is_free && (
            <span className="px-1.5 py-0.5 text-xs bg-green-100 text-green-700 rounded">
              Gratis
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onEdit}
          className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors"
          title="Editar"
        >
          <Pencil size={14} />
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
          title="Eliminar"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
