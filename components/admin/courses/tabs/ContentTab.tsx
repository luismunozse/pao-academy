'use client';

import { Course, FAQ } from '@/types/course';
import RepeaterField, { FAQRepeater } from '../shared/RepeaterField';
import { BookOpen, CheckCircle, Users, HelpCircle } from 'lucide-react';

interface ContentTabProps {
  data: Partial<Course>;
  onChange: (data: Partial<Course>) => void;
}

export default function ContentTab({ data, onChange }: ContentTabProps) {
  return (
    <div className="space-y-8">
      {/* Lo que aprenderas */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle className="text-green-500" size={20} />
          <h3 className="font-medium text-gray-900">Lo que aprenderas</h3>
        </div>
        <p className="text-sm text-gray-500 mb-3">
          Lista los objetivos de aprendizaje del curso. Estos apareceran en la pagina del curso.
        </p>
        <RepeaterField
          items={data.what_you_learn || []}
          onChange={(items) => onChange({ ...data, what_you_learn: items })}
          placeholder="Ej: Dominar tecnicas de negociacion avanzadas"
          addLabel="Agregar objetivo"
        />
      </div>

      {/* Requisitos previos */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="text-blue-500" size={20} />
          <h3 className="font-medium text-gray-900">Requisitos previos</h3>
        </div>
        <p className="text-sm text-gray-500 mb-3">
          Que conocimientos o herramientas necesita el estudiante antes de tomar el curso?
        </p>
        <RepeaterField
          items={data.requirements || []}
          onChange={(items) => onChange({ ...data, requirements: items })}
          placeholder="Ej: Conocimientos basicos de Excel"
          addLabel="Agregar requisito"
        />
      </div>

      {/* Para quien es este curso */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Users className="text-purple-500" size={20} />
          <h3 className="font-medium text-gray-900">Para quien es este curso</h3>
        </div>
        <p className="text-sm text-gray-500 mb-3">
          Describe el perfil del estudiante ideal para este curso.
        </p>
        <RepeaterField
          items={data.target_audience || []}
          onChange={(items) => onChange({ ...data, target_audience: items })}
          placeholder="Ej: Profesionales de ventas con 2+ anos de experiencia"
          addLabel="Agregar audiencia"
        />
      </div>

      {/* Preguntas frecuentes */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle className="text-amber-500" size={20} />
          <h3 className="font-medium text-gray-900">Preguntas frecuentes (FAQ)</h3>
        </div>
        <p className="text-sm text-gray-500 mb-3">
          Agrega preguntas y respuestas comunes sobre el curso.
        </p>
        <FAQRepeater
          items={data.faq || []}
          onChange={(items) => onChange({ ...data, faq: items as FAQ[] })}
        />
      </div>

      {/* Vista previa */}
      {(data.what_you_learn?.length || data.requirements?.length || data.target_audience?.length) && (
        <div className="border-t pt-6">
          <p className="text-sm font-medium text-gray-700 mb-3">Vista previa del contenido:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.what_you_learn && data.what_you_learn.length > 0 && (
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Lo que aprenderas</h4>
                <ul className="space-y-1">
                  {data.what_you_learn.filter(Boolean).map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-green-700">
                      <CheckCircle size={14} className="mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {data.requirements && data.requirements.length > 0 && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Requisitos</h4>
                <ul className="space-y-1">
                  {data.requirements.filter(Boolean).map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-blue-700">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
