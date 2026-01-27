'use client';

import { DollarSign, Users, BookOpen, GraduationCap, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardsProps {
  stats: {
    totalRevenue: number;
    totalUsers: number;
    totalCourses: number;
    totalEnrollments: number;
    revenueChange?: number;
    usersChange?: number;
  };
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Ingresos Totales',
      value: `$${stats.totalRevenue.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: 'bg-green-500',
      change: stats.revenueChange
    },
    {
      title: 'Usuarios',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'bg-blue-500',
      change: stats.usersChange
    },
    {
      title: 'Cursos',
      value: stats.totalCourses.toLocaleString(),
      icon: BookOpen,
      color: 'bg-purple-500'
    },
    {
      title: 'Inscripciones',
      value: stats.totalEnrollments.toLocaleString(),
      icon: GraduationCap,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                {card.change !== undefined && (
                  <div className={`flex items-center gap-1 mt-2 text-sm ${
                    card.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {card.change >= 0 ? (
                      <TrendingUp size={14} />
                    ) : (
                      <TrendingDown size={14} />
                    )}
                    <span>{Math.abs(card.change)}% vs mes anterior</span>
                  </div>
                )}
              </div>
              <div className={`p-3 rounded-xl ${card.color}`}>
                <Icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
