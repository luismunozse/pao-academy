'use client';
import { Clock, UserCheck, Calendar } from 'lucide-react';
import type { CourseMetaProps } from './types';

export default function CourseMeta({ duration, level, nextStart }: CourseMetaProps) {
  const metaItems = [
    { icon: Clock, label: duration, color: 'text-[color:var(--academic-accent)]' },
    { icon: UserCheck, label: level, color: 'text-[color:var(--academic-accent)]' },
    { icon: Calendar, label: nextStart, color: 'text-[color:var(--academic-accent)]' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-1">
      {metaItems.map(({ icon: Icon, label, color }, index) => (
        <div
          key={index}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/8 text-white/80 text-sm border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all"
        >
          <Icon className={`size-4 ${color}`} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
