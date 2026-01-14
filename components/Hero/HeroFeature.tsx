'use client';
import { m } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';

interface HeroFeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  delay?: number;
}

export default function HeroFeature({
  icon: Icon,
  title,
  description,
  index,
  delay = 0.9
}: HeroFeatureProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay + index * 0.1 }}
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center hover:bg-white/15 transition-all duration-300 group"
      role="article"
      aria-labelledby={`feature-${index}-title`}
    >
      <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
        <Icon className="h-6 w-6 text-white" aria-hidden="true" />
      </div>
      <h3 id={`feature-${index}-title`} className="text-white font-semibold text-lg mb-2">
        {title}
      </h3>
      <p className="text-white/70 text-sm">
        {description}
      </p>
    </m.div>
  );
}
