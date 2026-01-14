'use client';
import { Star, Users } from 'lucide-react';
import type { CourseStatsProps } from './types';

export default function CourseStats({ rating, students, t }: CourseStatsProps) {
  return (
    <div className="flex items-center gap-4">
      {/* Rating con hover effect */}
      <div className="group/rating flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 hover:border-yellow-500/40 transition-all">
        <Star className="size-4 text-yellow-400 fill-current group-hover/rating:scale-110 transition-transform" />
        <span className="font-bold text-white">{rating}</span>
        <span className="text-xs text-white/60">/ 5.0</span>
      </div>

      {/* Students count */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
        <Users className="size-4 text-blue-400" />
        <span className="font-semibold text-white">{students.toLocaleString()}+</span>
        <span className="text-xs text-white/60">{t('students')}</span>
      </div>
    </div>
  );
}
