'use client';

import { UserPlus, BookOpen, CreditCard, Award } from 'lucide-react';

interface Activity {
  id: string;
  type: 'enrollment' | 'payment' | 'registration' | 'completion';
  user_name: string;
  course_title?: string;
  amount?: number;
  created_at: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const activityConfig = {
  enrollment: {
    icon: BookOpen,
    color: 'bg-blue-100 text-blue-600',
    getMessage: (a: Activity) => `se inscribio en ${a.course_title}`
  },
  payment: {
    icon: CreditCard,
    color: 'bg-green-100 text-green-600',
    getMessage: (a: Activity) => `realizo un pago de $${a.amount}`
  },
  registration: {
    icon: UserPlus,
    color: 'bg-purple-100 text-purple-600',
    getMessage: () => `se registro en la plataforma`
  },
  completion: {
    icon: Award,
    color: 'bg-orange-100 text-orange-600',
    getMessage: (a: Activity) => `completo el curso ${a.course_title}`
  }
};

export default function RecentActivity({ activities }: RecentActivityProps) {
  const formatTime = (date: string) => {
    const now = new Date();
    const activityDate = new Date(date);
    const diffMs = now.getTime() - activityDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Ahora';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    if (diffDays < 7) return `Hace ${diffDays}d`;

    return activityDate.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Actividad Reciente
      </h3>

      {activities.length > 0 ? (
        <div className="space-y-4">
          {activities.map((activity) => {
            const config = activityConfig[activity.type];
            const Icon = config.icon;

            return (
              <div
                key={activity.id}
                className="flex items-start gap-3"
              >
                <div className={`p-2 rounded-lg ${config.color}`}>
                  <Icon size={16} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user_name}</span>{' '}
                    {config.getMessage(activity)}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {formatTime(activity.created_at)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-400 text-center py-8">
          No hay actividad reciente
        </p>
      )}
    </div>
  );
}
