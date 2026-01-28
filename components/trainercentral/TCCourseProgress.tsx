'use client';

import { useEffect, useState } from 'react';
import { RefreshCw, CheckCircle2 } from 'lucide-react';

interface TCEnrollment {
  course_id: string;
  progress_percentage: number;
  enrollment_status: 'enrolled' | 'completed' | 'expired';
  local_course_id: string | null;
}

interface TCCourseProgressProps {
  courseId: string;
  showSyncButton?: boolean;
  className?: string;
}

export function TCCourseProgress({
  courseId,
  showSyncButton = true,
  className = '',
}: TCCourseProgressProps) {
  const [progress, setProgress] = useState<number | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const syncProgress = async () => {
    setSyncing(true);
    setError(null);

    try {
      const response = await fetch('/api/trainercentral/progress');
      const data = await response.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      const enrollment = data.enrollments?.find(
        (e: TCEnrollment) => e.local_course_id === courseId
      );

      if (enrollment) {
        setProgress(enrollment.progress_percentage);
        setStatus(enrollment.enrollment_status);
      }
    } catch (err) {
      console.error('Error syncing TC progress:', err);
      setError('Error al sincronizar');
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    syncProgress();
  }, [courseId]);

  if (error) {
    return null; // No mostrar nada si hay error
  }

  if (progress === null) {
    return null; // No mostrar si no hay datos
  }

  const isCompleted = status === 'completed' || progress === 100;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex items-center gap-2">
        {isCompleted ? (
          <CheckCircle2 className="text-green-500" size={16} />
        ) : (
          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        <span className="text-sm text-gray-600">
          {isCompleted ? 'Completado' : `${progress}%`}
        </span>
      </div>

      {showSyncButton && (
        <button
          onClick={syncProgress}
          disabled={syncing}
          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
          title="Sincronizar progreso desde TrainerCentral"
        >
          <RefreshCw size={14} className={syncing ? 'animate-spin' : ''} />
        </button>
      )}
    </div>
  );
}
