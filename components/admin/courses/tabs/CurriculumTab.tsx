'use client';

import { CourseSection } from '@/types/course';
import CurriculumBuilder from '../curriculum/CurriculumBuilder';

interface CurriculumTabProps {
  sections: CourseSection[];
  onSectionsChange: (sections: CourseSection[]) => void;
}

export default function CurriculumTab({ sections, onSectionsChange }: CurriculumTabProps) {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-700">
          Organiza el contenido de tu curso en secciones y lecciones. Puedes arrastrar para reordenar.
        </p>
      </div>

      <CurriculumBuilder
        sections={sections}
        onSectionsChange={onSectionsChange}
      />
    </div>
  );
}
