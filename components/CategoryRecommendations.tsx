'use client';
import React from 'react';
import { m } from 'framer-motion';
import { TrendingUp, Users, Sparkles, Megaphone, BarChart4, Database } from 'lucide-react';
import type { Lang } from '../lib/i18n';

const categoryIcons = {
  Comercial: <TrendingUp className="size-5" />,
  Liderazgo: <Users className="size-5" />,
  Mindset: <Sparkles className="size-5" />,
  Branding: <Megaphone className="size-5" />,
  Datos: <BarChart4 className="size-5" />,
  Productividad: <Database className="size-5" />,
};

const topRecommendations = {
  es: {
    Comercial: [
      { id: 'branding', title: 'Marca Personal', reason: 'Complementa tu perfil comercial' },
      { id: 'mindset', title: 'Motivación y Hábitos', reason: 'Fortalece tu mentalidad de ventas' },
    ],
    Liderazgo: [
      { id: 'ventas', title: 'Ventas Consultivas', reason: 'Mejora tu comunicación con equipos' },
      { id: 'mindset', title: 'Motivación y Hábitos', reason: 'Desarrolla tu inteligencia emocional' },
    ],
    Datos: [
      { id: 'analytics', title: 'Data Analytics Bootcamp', reason: 'Evoluciona tus habilidades analíticas' },
      { id: 'liderazgo', title: 'Liderazgo Ágil', reason: 'Aplica datos en la toma de decisiones' },
    ],
    Mindset: [
      { id: 'ventas', title: 'Ventas Consultivas', reason: 'Aplica tu mentalidad en ventas' },
      { id: 'liderazgo', title: 'Liderazgo Ágil', reason: 'Lidera con propósito y enfoque' },
    ],
    Branding: [
      { id: 'ventas', title: 'Ventas Consultivas', reason: 'Convierte tu marca en ventas' },
      { id: 'powerbi', title: 'Power BI desde Cero', reason: 'Visualiza el impacto de tu marca' },
    ],
  },
  en: {
    Commercial: [
      { id: 'branding', title: 'Personal Branding', reason: 'Complements your commercial profile' },
      { id: 'mindset', title: 'Motivation & Habits', reason: 'Strengthens your sales mindset' },
    ],
    Leadership: [
      { id: 'ventas', title: 'Consultative Sales', reason: 'Improves your team communication' },
      { id: 'mindset', title: 'Motivation & Habits', reason: 'Develops your emotional intelligence' },
    ],
    Data: [
      { id: 'analytics', title: 'Data Analytics Bootcamp', reason: 'Evolves your analytical skills' },
      { id: 'liderazgo', title: 'Agile Leadership', reason: 'Apply data in decision making' },
    ],
    Mindset: [
      { id: 'ventas', title: 'Consultative Sales', reason: 'Apply your mindset in sales' },
      { id: 'liderazgo', title: 'Agile Leadership', reason: 'Lead with purpose and focus' },
    ],
    Branding: [
      { id: 'ventas', title: 'Consultative Sales', reason: 'Convert your brand into sales' },
      { id: 'powerbi', title: 'Power BI from Zero', reason: 'Visualize your brand impact' },
    ],
  },
};

export type CategoryRecommendationsProps = {
  t: (k: string) => string;
  lang: Lang;
  selectedCategory: string;
  onCourseClick: (title: string) => void;
};

export default function CategoryRecommendations({ 
  t, 
  lang, 
  selectedCategory, 
  onCourseClick 
}: CategoryRecommendationsProps) {
  const recommendations = topRecommendations[lang][selectedCategory as keyof typeof topRecommendations[typeof lang]];
  
  if (!recommendations || recommendations.length === 0) return null;

  const getCourseUrl = (courseId: string) => {
    const courseUrls: Record<string, string> = {
      'ventas': '/cursos/ventas-consultivas',
      'liderazgo': '/cursos/liderazgo-agil',
      'mindset': '/cursos/motivacion-habitos',
      'branding': '/cursos/marca-personal',
      'powerbi': '/cursos/power-bi-desde-cero',
      'analytics': '/cursos/data-analytics-bootcamp',
    };
    return courseUrls[courseId] || '#';
  };

  const handleCourseClick = (courseId: string, courseTitle: string) => {
    const url = getCourseUrl(courseId);
    if (url !== '#') {
      window.location.href = url;
    } else {
      onCourseClick(courseTitle);
    }
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 p-6 rounded-xl bg-gradient-to-r from-[color:var(--neon-cyan)]/10 to-[color:var(--neon-blue)]/10 border border-[color:var(--neon-cyan)]/20"
    >
      <div className="flex items-center gap-2 mb-4">
        {categoryIcons[selectedCategory as keyof typeof categoryIcons]}
        <h3 className="text-lg font-semibold text-white">
          {t('topRecommended')} {selectedCategory}
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec, index) => (
          <m.button
            key={rec.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-left p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 border border-white/10 hover:border-[color:var(--neon-cyan)]/30"
            onClick={() => handleCourseClick(rec.id, rec.title)}
          >
            <h4 className="font-medium text-white mb-1">{rec.title}</h4>
            <p className="text-sm text-white/70">{rec.reason}</p>
          </m.button>
        ))}
      </div>
    </m.div>
  );
}
