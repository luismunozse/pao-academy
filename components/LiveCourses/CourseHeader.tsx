'use client';
import { COURSE_ICONS } from './constants';
import CourseStats from './CourseStats';
import type { CourseHeaderProps } from './types';

export default function CourseHeader({ course, onTagClick, t }: CourseHeaderProps) {
  const IconComponent = COURSE_ICONS[course.tag] || COURSE_ICONS.default;

  return (
    <div className="relative z-10 flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        {/* Icon con gradiente */}
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[color:var(--academic-secondary)]/20 to-[color:var(--academic-accent)]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
          <IconComponent className="size-6 text-[color:var(--academic-secondary)]" />
        </div>

        <div className="flex flex-col gap-2">
          {/* Badge EN VIVO mejorado */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 w-fit">
            {/* Pulsing dot */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 shadow-lg shadow-red-500/50"></span>
            </span>
            <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
              {t('live')}
            </span>

            {/* Tag button */}
            <button
              className="ml-2 px-2 py-0.5 rounded-full bg-white/10 text-[color:var(--academic-secondary)] text-xs font-semibold border border-white/20 hover:bg-white/20 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                onTagClick(course.tag);
              }}
              aria-label={`Filtrar por ${course.tag}`}
            >
              {course.tag}
            </button>
          </div>

          {/* Stats */}
          <CourseStats rating={course.rating} students={course.students} t={t} />
        </div>
      </div>
    </div>
  );
}
