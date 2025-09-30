'use client';
import React, { useEffect, useState } from 'react';

type CourseProgress = { id: string; title: string; progress: number };

export default function DashboardPage(){
  const [courses, setCourses] = useState<CourseProgress[]>([]);

  useEffect(() => {
    // Simulación: cargar progreso desde localStorage o mock
    const saved = typeof window !== 'undefined' ? localStorage.getItem('progress_demo') : null;
    if (saved) {
      setCourses(JSON.parse(saved));
    } else {
      const mock: CourseProgress[] = [
        { id: 'power-bi', title: 'Power BI desde cero', progress: 45 },
        { id: 'ventas', title: 'Ventas Consultivas', progress: 70 },
        { id: 'marca', title: 'Marca Personal', progress: 20 },
      ];
      setCourses(mock);
    }
  }, []);

  return (
    <main className="min-h-screen bg-[color:var(--academic-gray-900)] text-white py-10">
      <div className="full-width-content">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6">Mi progreso</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map(c => (
            <div key={c.id} className="card-academic p-4">
              <h3 className="text-lg font-semibold mb-2">{c.title}</h3>
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="h-3 bg-[color:var(--academic-secondary)]" style={{ width: `${c.progress}%` }} />
              </div>
              <div className="text-sm opacity-80 mt-1">{c.progress}% completado</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}



