export interface LiveCourse {
  id: string;
  title: string;
  description: string;
  tag: string;
  duration: string;
  level: string;
  modality: string;
  nextStart: string;
  rating: number;
  students: number;
}

export interface LiveCoursesProps {
  t: (k: string) => string;
  lang: 'es' | 'en';
  onCourseClick: (title: string) => void;
  onCatalogClick: () => void;
  liveCourses?: LiveCourse[];
}

export interface LiveCourseCardProps {
  course: LiveCourse;
  isExpanded: boolean;
  onCourseClick: (id: string, title: string) => void;
  onTagClick: (tag: string) => void;
  t: (k: string) => string;
  lang: 'es' | 'en';
}

export interface CourseFiltersProps {
  tags: string[];
  selectedTag: string;
  onTagChange: (tag: string) => void;
  t: (k: string) => string;
}

export interface CourseStatsProps {
  rating: number;
  students: number;
  t: (k: string) => string;
}

export interface CourseMetaProps {
  duration: string;
  level: string;
  nextStart: string;
}

export interface CourseHeaderProps {
  course: LiveCourse;
  onTagClick: (tag: string) => void;
  t: (k: string) => string;
}

export interface LiveCoursesGridProps {
  courses: LiveCourse[];
  onCourseClick: (id: string, title: string) => void;
  onTagClick: (tag: string) => void;
  expandedCard: string | null;
  setExpandedCard: (id: string | null) => void;
  t: (k: string) => string;
  lang: 'es' | 'en';
}

export interface LiveCoursesCarouselProps {
  courses: LiveCourse[];
  onCourseClick: (id: string, title: string) => void;
  onTagClick: (tag: string) => void;
  t: (k: string) => string;
  lang: 'es' | 'en';
}
