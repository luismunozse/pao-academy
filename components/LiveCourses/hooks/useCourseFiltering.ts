import { useState, useMemo } from 'react';
import type { LiveCourse } from '../types';

export function useCourseFiltering(courses: LiveCourse[]) {
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const tags = useMemo(
    () => ['All', ...Array.from(new Set(courses.map((c) => c.tag)))],
    [courses]
  );

  const filteredCourses = useMemo(() => {
    if (selectedTag === 'All') return courses;
    return courses.filter((c) => c.tag === selectedTag);
  }, [courses, selectedTag]);

  return { selectedTag, setSelectedTag, tags, filteredCourses };
}
