import React from 'react';
import { useImageLoader } from '../hooks/useImageLoader';

interface OptimizedImageProps {
  src: string | undefined;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  loading?: 'lazy' | 'eager';
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc = '/img1.png',
  loading = 'lazy'
}) => {
  const { imageSrc, isLoading, hasError } = useImageLoader({ src, fallbackSrc });

  if (isLoading) {
    return (
      <div className={`${className} bg-gray-200 animate-pulse flex items-center justify-center`}>
        <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`${className} ${hasError ? 'opacity-75' : ''}`}
      loading={loading}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        if (target.src !== fallbackSrc) {
          target.src = fallbackSrc;
        }
      }}
    />
  );
}; 