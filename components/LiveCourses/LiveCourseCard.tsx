'use client';
import { m, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ANIMATION_VARIANTS } from './constants';
import CourseHeader from './CourseHeader';
import CourseMeta from './CourseMeta';
import CategoryRecommendations from '../CategoryRecommendations';
import type { LiveCourseCardProps } from './types';

export default function LiveCourseCard({
  course,
  isExpanded,
  onCourseClick,
  onTagClick,
  t,
  lang,
}: LiveCourseCardProps) {
  const handleRecommendedCourseClick = (title: string) => {
    onCourseClick(course.id, title);
  };

  return (
    <m.div
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 via-white/[0.02] to-white/5 backdrop-blur-xl border border-white/10 p-6 shadow-2xl hover:shadow-[0_20px_80px_rgba(59,130,246,0.3)] transition-all duration-500"
      whileHover="cardHover"
      whileTap="cardTap"
      variants={ANIMATION_VARIANTS}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/5 group-hover:to-cyan-500/10 transition-all duration-700" />

      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-4">
        <CourseHeader course={course} onTagClick={onTagClick} t={t} />

        <div className="flex flex-col gap-3 flex-1">
          <h3 className="text-xl font-academic-heading group-hover:text-[color:var(--academic-secondary)] transition-colors text-white">
            {course.title}
          </h3>

          <p className="text-white/80 text-sm leading-relaxed line-clamp-2">
            {course.description}
          </p>

          <CourseMeta
            duration={course.duration}
            level={course.level}
            nextStart={course.nextStart}
          />
        </div>

        {/* CTA Button mejorado */}
        <button
          className="group/btn relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98]"
          onClick={(e) => {
            e.stopPropagation();
            onCourseClick(course.id, course.title);
          }}
          aria-label={`${t('wantToKnowMore')} ${course.title}`}
        >
          {/* Shimmer effect en botón */}
          <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Content */}
          <span className="relative flex items-center justify-center gap-2">
            <span>{t('wantToKnowMore')}</span>
            <ArrowRight className="size-4 group-hover/btn:translate-x-1 transition-transform" />
          </span>
        </button>

        {/* Expanded content con recomendaciones */}
        <AnimatePresence>
          {isExpanded && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-white/10"
            >
              <h4 className="text-base font-academic-heading text-white mb-3">
                {t('recommendedCourses')}
              </h4>
              <CategoryRecommendations
                selectedCategory={course.tag}
                onCourseClick={handleRecommendedCourseClick}
                t={t}
                lang={lang}
              />
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </m.div>
  );
}
