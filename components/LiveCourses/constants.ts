import { Star, UserCheck, Clock, Play } from 'lucide-react';

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export const COURSE_ICONS: Record<string, any> = {
  Comercial: Star,
  Liderazgo: UserCheck,
  Datos: Clock,
  default: Play,
};

export const ANIMATION_VARIANTS = {
  cardHover: {
    y: -8,
    scale: 1.02,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
  cardTap: {
    scale: 0.98,
  },
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },
} as const;
