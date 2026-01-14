'use client';
import { Star } from 'lucide-react';

interface HeroBadgeProps {
  text: string;
  icon?: React.ReactNode;
  variant?: 'trust' | 'certification' | 'highlight';
}

export default function HeroBadge({
  text,
  icon = <Star className="h-4 w-4 text-yellow-400" />,
  variant = 'trust'
}: HeroBadgeProps) {

  const variants = {
    trust: "bg-white/10 backdrop-blur-sm border-white/20",
    certification: "hero-certification-badge",
    highlight: "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-400/30"
  };

  return (
    <div
      className={`inline-flex items-center gap-2 border rounded-full px-6 py-3 ${variants[variant]}`}
      role="status"
      aria-live="polite"
    >
      {icon}
      <span className="text-white/90 text-sm font-medium">
        {text}
      </span>
    </div>
  );
}
