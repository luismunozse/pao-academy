'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, Play, FileText, Download } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  content: string | null;
  video_url: string | null;
  duration_minutes: number | null;
  order_index: number;
  resources: any[];
  course_id: string;
}

function getEmbedUrl(url: string): string {
  // YouTube: watch?v=ID, youtu.be/ID, embed/ID
  const youtubePatterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of youtubePatterns) {
    const match = url.match(pattern);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }

  // Vimeo: vimeo.com/ID
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  // Si ya es una URL embed o de otra plataforma, devolverla tal cual
  return url;
}

interface Course {
  slug: string;
  title: string;
}

export default function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const loadData = async () => {
      const { slug, id } = await params;

      // Get current lesson
      const { data: lessonData } = await (supabase
        .from('lessons') as any)
        .select('*')
        .eq('id', id)
        .single();

      if (!lessonData) {
        router.push('/dashboard');
        return;
      }

      setLesson(lessonData as Lesson);

      // Get course
      const { data: courseData } = await (supabase
        .from('courses') as any)
        .select('slug, title')
        .eq('id', (lessonData as any).course_id)
        .single();

      setCourse(courseData as Course);

      // Get all lessons for navigation
      const { data: lessonsData } = await (supabase
        .from('lessons') as any)
        .select('*')
        .eq('course_id', (lessonData as any).course_id)
        .order('order_index', { ascending: true });

      setAllLessons((lessonsData as Lesson[]) || []);

      // Check if completed
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: progress } = await (supabase
          .from('lesson_progress') as any)
          .select('completed')
          .eq('user_id', user.id)
          .eq('lesson_id', id)
          .single();

        setIsCompleted((progress as any)?.completed || false);
      }

      setLoading(false);
    };

    loadData();
  }, [params, supabase, router]);

  const markAsComplete = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !lesson) return;

    await (supabase.from('lesson_progress') as any).upsert({
      user_id: user.id,
      lesson_id: lesson.id,
      completed: true,
      completed_at: new Date().toISOString(),
    });

    setIsCompleted(true);

    // Go to next lesson if available
    const currentIndex = allLessons.findIndex(l => l.id === lesson.id);
    if (currentIndex < allLessons.length - 1) {
      const nextLesson = allLessons[currentIndex + 1];
      router.push(`/dashboard/curso/${course?.slug}/leccion/${nextLesson.id}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!lesson || !course) return null;

  const currentIndex = allLessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Link */}
      <Link
        href={`/dashboard/curso/${course.slug}`}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={18} />
        Volver a {course.title}
      </Link>

      {/* Lesson Content */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Video Player */}
        {lesson.video_url && (
          <div className="aspect-video bg-black">
            <iframe
              src={getEmbedUrl(lesson.video_url)}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        <div className="p-6">
          {/* Lesson Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <span className="text-sm text-gray-500">
                Lección {currentIndex + 1} de {allLessons.length}
              </span>
              <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
            </div>

            {isCompleted ? (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
                <CheckCircle size={18} />
                <span className="text-sm font-medium">Completada</span>
              </div>
            ) : (
              <button
                onClick={markAsComplete}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <CheckCircle size={18} />
                Marcar completada
              </button>
            )}
          </div>

          {/* Lesson Content */}
          {lesson.content && (
            <div
              className="prose prose-gray max-w-none mb-6"
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />
          )}

          {/* Resources */}
          {lesson.resources && lesson.resources.length > 0 && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Recursos</h3>
              <div className="space-y-2">
                {lesson.resources.map((resource: any, index: number) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {resource.type === 'pdf' ? (
                      <FileText size={20} className="text-red-500" />
                    ) : (
                      <Download size={20} className="text-blue-500" />
                    )}
                    <span className="text-gray-700">{resource.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        {prevLesson ? (
          <Link
            href={`/dashboard/curso/${course.slug}/leccion/${prevLesson.id}`}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={18} />
            Anterior
          </Link>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <Link
            href={`/dashboard/curso/${course.slug}/leccion/${nextLesson.id}`}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Siguiente
            <ArrowRight size={18} />
          </Link>
        ) : (
          <Link
            href={`/dashboard/curso/${course.slug}`}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Finalizar curso
            <CheckCircle size={18} />
          </Link>
        )}
      </div>
    </div>
  );
}
