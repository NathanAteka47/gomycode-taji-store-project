import { useState, useEffect } from 'react';
import { preloadImage } from '../utils/imageUtils';

interface UseImageLoaderProps {
  src: string | undefined;
  fallbackSrc?: string;
}

export const useImageLoader = ({ src, fallbackSrc }: UseImageLoaderProps) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src) {
      setImageSrc(fallbackSrc || '/img1.png');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setHasError(false);

    preloadImage(src)
      .then(() => {
        setImageSrc(src);
        setIsLoading(false);
      })
      .catch(() => {
        setImageSrc(fallbackSrc || '/img1.png');
        setIsLoading(false);
        setHasError(true);
      });
  }, [src, fallbackSrc]);

  return {
    imageSrc,
    isLoading,
    hasError
  };
}; 