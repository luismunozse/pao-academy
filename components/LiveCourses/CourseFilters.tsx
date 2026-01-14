'use client';
import { m } from 'framer-motion';
import type { CourseFiltersProps } from './types';

export default function CourseFilters({
  tags,
  selectedTag,
  onTagChange,
  t,
}: CourseFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center p-1 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 mb-8">
      {tags.map((tag, index) => (
        <m.button
          key={tag}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onTagChange(tag)}
          className={`
            relative px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300
            ${
              selectedTag === tag
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30 scale-105'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }
          `}
          aria-label={`${t('filterBy')} ${tag}`}
          aria-pressed={selectedTag === tag}
        >
          {selectedTag === tag && (
            <m.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{tag === 'All' ? t('all') : tag}</span>
        </m.button>
      ))}
    </div>
  );
}
