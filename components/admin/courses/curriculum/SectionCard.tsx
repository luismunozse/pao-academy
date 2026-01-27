'use client';

import { useState } from 'react';
import { CourseSection, Lesson } from '@/types/course';
import { GripVertical, ChevronDown, ChevronUp, Plus, Pencil, Trash2 } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import LessonCard from './LessonCard';

interface SectionCardProps {
  section: CourseSection;
  lessons: Lesson[];
  onEditSection: () => void;
  onDeleteSection: () => void;
  onAddLesson: () => void;
  onEditLesson: (lesson: Lesson) => void;
  onDeleteLesson: (lessonId: string) => void;
}

export default function SectionCard({
  section,
  lessons,
  onEditSection,
  onDeleteSection,
  onAddLesson,
  onEditLesson,
  onDeleteLesson
}: SectionCardProps) {
  const [expanded, setExpanded] = useState(true);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: section.id || '' });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  const totalDuration = lessons.reduce((acc, l) => acc + (l.duration_minutes || 0), 0);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-gray-50 border border-gray-200 rounded-xl overflow-hidden ${
        isDragging ? 'shadow-xl' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-white border-b border-gray-200">
        <button
          type="button"
          className="cursor-grab text-gray-400 hover:text-gray-600"
          {...attributes}
          {...listeners}
        >
          <GripVertical size={18} />
        </button>

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="p-1 text-gray-400 hover:text-gray-600"
        >
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{section.title}</h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-gray-500">
              {lessons.length} {lessons.length === 1 ? 'leccion' : 'lecciones'}
            </span>
            {totalDuration > 0 && (
              <>
                <span className="text-gray-300">•</span>
                <span className="text-xs text-gray-500">{totalDuration} min</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onEditSection}
            className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
            title="Editar seccion"
          >
            <Pencil size={16} />
          </button>
          <button
            type="button"
            onClick={onDeleteSection}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            title="Eliminar seccion"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Lecciones */}
      {expanded && (
        <div className="p-4 space-y-2">
          {lessons.length > 0 ? (
            <SortableContext
              items={lessons.map(l => l.id || '')}
              strategy={verticalListSortingStrategy}
            >
              {lessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  onEdit={() => onEditLesson(lesson)}
                  onDelete={() => lesson.id && onDeleteLesson(lesson.id)}
                />
              ))}
            </SortableContext>
          ) : (
            <p className="text-sm text-gray-400 text-center py-4">
              No hay lecciones en esta seccion
            </p>
          )}

          <button
            type="button"
            onClick={onAddLesson}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Plus size={16} />
            Agregar leccion
          </button>
        </div>
      )}
    </div>
  );
}
