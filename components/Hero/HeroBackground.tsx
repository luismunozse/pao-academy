'use client';
import Image from 'next/image';

interface HeroBackgroundProps {
  variant?: 'image' | 'gradient' | 'minimal';
  imageSrc?: string;
  imageAlt?: string;
}

export default function HeroBackground({
  variant = 'image',
  imageSrc = '/hero.jpg',
  imageAlt = 'Hero background'
}: HeroBackgroundProps) {

  if (variant === 'gradient') {
    return (
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-gray-900/60 to-slate-800/70" />
      </>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />
    );
  }

  return (
    <>
      {/* Imagen de fondo optimizada con WebP */}
      <div className="hero-bg-desktop absolute inset-0">
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet="/hero-mobile.webp"
            type="image/webp"
          />
          <source
            srcSet="/hero.webp"
            type="image/webp"
          />
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            quality={85}
            className="object-cover brightness-[0.3] saturate-[0.8]"
            sizes="100vw"
          />
        </picture>
      </div>

      {/* Overlay sutil - Colores neutros */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-gray-900/60 to-slate-800/70" />
    </>
  );
}
