'use client';

import { useState } from 'react';
import { CourseSection, Lesson, getEmptySection, getEmptyLesson } from '@/types/course';
import { Plus, BookOpen } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import SectionCard from './SectionCard';
import SectionModal from './SectionModal';
import LessonModal from './LessonModal';

interface CurriculumBuilderProps {
  sections: CourseSection[];
  onSectionsChange: (sections: CourseSection[]) => void;
}

export default function CurriculumBuilder({ sections, onSectionsChange }: CurriculumBuilderProps) {
  const [sectionModalOpen, setSectionModalOpen] = useState(false);
  const [lessonModalOpen, setLessonModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<CourseSection | undefined>();
  const [editingLesson, setEditingLesson] = useState<Lesson | undefined>();
  const [currentSectionId, setCurrentSectionId] = useState<string | undefined>();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  // Generar IDs temporales para nuevos elementos
  const generateTempId = () => `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Handlers de secciones
  const handleAddSection = () => {
    setEditingSection(undefined);
    setSectionModalOpen(true);
  };

  const handleEditSection = (section: CourseSection) => {
    setEditingSection(section);
    setSectionModalOpen(true);
  };

  const handleSaveSection = (sectionData: Partial<CourseSection>) => {
    if (editingSection?.id) {
      // Editar existente
      onSectionsChange(
        sections.map(s =>
          s.id === editingSection.id ? { ...s, ...sectionData } : s
        )
      );
    } else {
      // Crear nueva
      const newSection: CourseSection = {
        ...getEmptySection(),
        ...sectionData,
        id: generateTempId(),
        order_index: sections.length,
        lessons: []
      };
      onSectionsChange([...sections, newSection]);
    }
  };

  const handleDeleteSection = (sectionId: string) => {
    if (confirm('Eliminar esta seccion y todas sus lecciones?')) {
      onSectionsChange(sections.filter(s => s.id !== sectionId));
    }
  };

  // Handlers de lecciones
  const handleAddLesson = (sectionId: string) => {
    setCurrentSectionId(sectionId);
    setEditingLesson(undefined);
    setLessonModalOpen(true);
  };

  const handleEditLesson = (lesson: Lesson, sectionId: string) => {
    setCurrentSectionId(sectionId);
    setEditingLesson(lesson);
    setLessonModalOpen(true);
  };

  const handleSaveLesson = (lessonData: Partial<Lesson>) => {
    if (!currentSectionId) return;

    onSectionsChange(
      sections.map(section => {
        if (section.id !== currentSectionId) return section;

        const lessons = section.lessons || [];

        if (editingLesson?.id) {
          // Editar existente
          return {
            ...section,
            lessons: lessons.map(l =>
              l.id === editingLesson.id ? { ...l, ...lessonData } : l
            )
          };
        } else {
          // Crear nueva
          const newLesson: Lesson = {
            ...getEmptyLesson(),
            ...lessonData,
            id: generateTempId(),
            section_id: currentSectionId,
            order_index: lessons.length
          };
          return {
            ...section,
            lessons: [...lessons, newLesson]
          };
        }
      })
    );
  };

  const handleDeleteLesson = (sectionId: string, lessonId: string) => {
    if (confirm('Eliminar esta leccion?')) {
      onSectionsChange(
        sections.map(section => {
          if (section.id !== sectionId) return section;
          return {
            ...section,
            lessons: (section.lessons || []).filter(l => l.id !== lessonId)
          };
        })
      );
    }
  };

  // Drag and drop para secciones
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex(s => s.id === active.id);
      const newIndex = sections.findIndex(s => s.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newSections = arrayMove(sections, oldIndex, newIndex).map((s, i) => ({
          ...s,
          order_index: i
        }));
        onSectionsChange(newSections);
      }
    }
  };

  // Calcular totales
  const totalLessons = sections.reduce((acc, s) => acc + (s.lessons?.length || 0), 0);
  const totalDuration = sections.reduce(
    (acc, s) => acc + (s.lessons?.reduce((a, l) => a + (l.duration_minutes || 0), 0) || 0),
    0
  );

  return (
    <div className="space-y-4">
      {/* Resumen */}
      {sections.length > 0 && (
        <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
          <BookOpen className="text-blue-500" size={24} />
          <div>
            <p className="font-medium text-blue-900">
              {sections.length} {sections.length === 1 ? 'seccion' : 'secciones'} • {totalLessons} {totalLessons === 1 ? 'leccion' : 'lecciones'}
            </p>
            {totalDuration > 0 && (
              <p className="text-sm text-blue-700">
                Duracion total: {Math.floor(totalDuration / 60)}h {totalDuration % 60}min
              </p>
            )}
          </div>
        </div>
      )}

      {/* Lista de secciones */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sections.map(s => s.id || '')}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {sections.map((section) => (
              <SectionCard
                key={section.id}
                section={section}
                lessons={section.lessons || []}
                onEditSection={() => handleEditSection(section)}
                onDeleteSection={() => section.id && handleDeleteSection(section.id)}
                onAddLesson={() => section.id && handleAddLesson(section.id)}
                onEditLesson={(lesson) => section.id && handleEditLesson(lesson, section.id)}
                onDeleteLesson={(lessonId) => section.id && handleDeleteLesson(section.id, lessonId)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Estado vacio */}
      {sections.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <BookOpen className="mx-auto text-gray-300" size={48} />
          <h3 className="mt-4 text-lg font-medium text-gray-900">Sin contenido</h3>
          <p className="mt-1 text-sm text-gray-500">
            Comienza agregando secciones y lecciones a tu curso
          </p>
        </div>
      )}

      {/* Boton agregar seccion */}
      <button
        type="button"
        onClick={handleAddSection}
        className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-xl hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
      >
        <Plus size={20} />
        Agregar seccion
      </button>

      {/* Modales */}
      <SectionModal
        isOpen={sectionModalOpen}
        onClose={() => setSectionModalOpen(false)}
        onSave={handleSaveSection}
        section={editingSection}
      />

      <LessonModal
        isOpen={lessonModalOpen}
        onClose={() => setLessonModalOpen(false)}
        onSave={handleSaveLesson}
        lesson={editingLesson}
      />
    </div>
  );
}
