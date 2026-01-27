'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Course, CourseSection, getEmptyCourse } from '@/types/course';
import * as Tabs from '@radix-ui/react-tabs';
import {
  FileText,
  User,
  DollarSign,
  BookOpen,
  List,
  Settings,
  Save,
  Loader2,
  ArrowLeft,
  Check
} from 'lucide-react';

import BasicInfoTab from './tabs/BasicInfoTab';
import InstructorTab from './tabs/InstructorTab';
import PricingTab from './tabs/PricingTab';
import ContentTab from './tabs/ContentTab';
import CurriculumTab from './tabs/CurriculumTab';
import SettingsTab from './tabs/SettingsTab';

interface CourseFormProps {
  initialCourse?: Course;
  initialSections?: CourseSection[];
}

const tabs = [
  { id: 'basic', label: 'Informacion', icon: FileText },
  { id: 'instructor', label: 'Instructor', icon: User },
  { id: 'pricing', label: 'Precio', icon: DollarSign },
  { id: 'content', label: 'Contenido', icon: BookOpen },
  { id: 'curriculum', label: 'Curriculum', icon: List },
  { id: 'settings', label: 'Configuracion', icon: Settings }
];

export default function CourseForm({ initialCourse, initialSections }: CourseFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const isEditing = !!initialCourse?.id;

  const [course, setCourse] = useState<Partial<Course>>(initialCourse || getEmptyCourse());
  const [sections, setSections] = useState<CourseSection[]>(initialSections || []);
  const [activeTab, setActiveTab] = useState('basic');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (publish = false) => {
    setSaving(true);
    setError(null);

    try {
      // Preparar datos del curso
      const courseData = {
        title: course.title,
        slug: course.slug,
        description: course.description || '',
        short_description: course.short_description || '',
        thumbnail_url: course.thumbnail_url || '',
        promo_video_url: course.promo_video_url || null,
        price: course.price || 0,
        currency: course.currency || 'USD',
        original_price: course.original_price || null,
        duration_hours: course.duration_hours || null,
        level: course.level || 'beginner',
        instructor_name: course.instructor_name || '',
        instructor_avatar: course.instructor_avatar || null,
        instructor_bio: course.instructor_bio || null,
        is_published: publish ? true : (course.is_published || false),
        is_featured: course.is_featured || false,
        category: course.category || '',
        tags: course.tags || [],
        what_you_learn: course.what_you_learn || [],
        requirements: course.requirements || [],
        target_audience: course.target_audience || [],
        faq: course.faq || [],
        certificate_enabled: course.certificate_enabled || false
      };

      let courseId = initialCourse?.id;

      if (isEditing && courseId) {
        // Actualizar curso existente
        const { error: updateError } = await (supabase
          .from('courses') as any)
          .update(courseData)
          .eq('id', courseId);

        if (updateError) throw updateError;
      } else {
        // Crear nuevo curso
        const { data: newCourse, error: insertError } = await (supabase
          .from('courses') as any)
          .insert(courseData)
          .select()
          .single();

        if (insertError) throw insertError;
        courseId = newCourse.id;
      }

      // Guardar secciones y lecciones
      if (courseId) {
        // Eliminar secciones existentes (cascade eliminara lecciones)
        if (isEditing) {
          await (supabase
            .from('course_sections') as any)
            .delete()
            .eq('course_id', courseId);
        }

        // Crear nuevas secciones
        for (let i = 0; i < sections.length; i++) {
          const section = sections[i];
          const { data: newSection, error: sectionError } = await (supabase
            .from('course_sections') as any)
            .insert({
              course_id: courseId,
              title: section.title,
              description: section.description || null,
              order_index: i
            })
            .select()
            .single();

          if (sectionError) throw sectionError;

          // Crear lecciones de la seccion
          const lessons = section.lessons || [];
          for (let j = 0; j < lessons.length; j++) {
            const lesson = lessons[j];
            const { error: lessonError } = await (supabase
              .from('lessons') as any)
              .insert({
                course_id: courseId,
                section_id: newSection.id,
                title: lesson.title,
                description: lesson.description || null,
                content: lesson.content || null,
                video_url: lesson.video_url || null,
                duration_minutes: lesson.duration_minutes || null,
                order_index: j,
                is_free: lesson.is_free || false,
                content_type: lesson.content_type || 'video',
                resources: lesson.resources || []
              });

            if (lessonError) throw lessonError;
          }
        }
      }

      // Redirigir a la lista de cursos
      router.push('/admin/cursos');
      router.refresh();
    } catch (err: any) {
      console.error('Error saving course:', err);
      setError(err.message || 'Error al guardar el curso');
    } finally {
      setSaving(false);
    }
  };

  const getTabStatus = (tabId: string): 'complete' | 'incomplete' | 'empty' => {
    switch (tabId) {
      case 'basic':
        if (course.title && course.slug && course.category) return 'complete';
        if (course.title || course.slug) return 'incomplete';
        return 'empty';
      case 'instructor':
        if (course.instructor_name) return 'complete';
        return 'empty';
      case 'pricing':
        return 'complete'; // Siempre tiene valor default
      case 'content':
        if (course.what_you_learn?.length || course.requirements?.length) return 'complete';
        return 'empty';
      case 'curriculum':
        if (sections.length > 0) return 'complete';
        return 'empty';
      case 'settings':
        return 'complete';
      default:
        return 'empty';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.push('/admin/cursos')}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? 'Editar Curso' : 'Nuevo Curso'}
            </h1>
            {course.title && (
              <p className="text-sm text-gray-500">{course.title}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleSave(false)}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            Guardar borrador
          </button>
          <button
            type="button"
            onClick={() => handleSave(true)}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Check size={18} />}
            Publicar
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Tabs */}
      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <Tabs.List className="flex border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const status = getTabStatus(tab.id);
            return (
              <Tabs.Trigger
                key={tab.id}
                value={tab.id}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon size={18} />
                {tab.label}
                {status === 'complete' && (
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                )}
                {status === 'incomplete' && (
                  <span className="w-2 h-2 bg-amber-500 rounded-full" />
                )}
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>

        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <Tabs.Content value="basic">
            <BasicInfoTab data={course} onChange={setCourse} />
          </Tabs.Content>

          <Tabs.Content value="instructor">
            <InstructorTab data={course} onChange={setCourse} />
          </Tabs.Content>

          <Tabs.Content value="pricing">
            <PricingTab data={course} onChange={setCourse} />
          </Tabs.Content>

          <Tabs.Content value="content">
            <ContentTab data={course} onChange={setCourse} />
          </Tabs.Content>

          <Tabs.Content value="curriculum">
            <CurriculumTab sections={sections} onSectionsChange={setSections} />
          </Tabs.Content>

          <Tabs.Content value="settings">
            <SettingsTab data={course} onChange={setCourse} />
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </div>
  );
}
