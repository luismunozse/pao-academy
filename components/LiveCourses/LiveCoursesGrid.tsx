'use client';
import LiveCourseCard from './LiveCourseCard';
import type { LiveCoursesGridProps } from './types';

export default function LiveCoursesGrid({
  courses,
  onCourseClick,
  onTagClick,
  expandedCard,
  setExpandedCard,
  t,
  lang,
}: LiveCoursesGridProps) {
  const handleCourseClick = (id: string, title: string) => {
    setExpandedCard(expandedCard === id ? null : id);
    onCourseClick(id, title);
  };

  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/60 text-lg">{t('noCoursesFound')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <LiveCourseCard
          key={course.id}
          course={course}
          isExpanded={expandedCard === course.id}
          onCourseClick={handleCourseClick}
          onTagClick={onTagClick}
          t={t}
          lang={lang}
        />
      ))}
    </div>
  );
}
