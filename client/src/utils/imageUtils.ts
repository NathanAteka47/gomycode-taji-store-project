// Default placeholder images for different scenarios
const DEFAULT_IMAGES = {
  home: '/img1.png', // Using existing image from public folder
  fallback: '/img2.png', // Using existing image from public folder
  error: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNjBDMTE2LjU2OSA2MCAxMzAgNzMuNDMxIDMwIDkwQzEzMCAxMDYuNTY5IDExNi41NjkgMTIwIDEwMCAxMjBDODMuNDMxIDEyMCA3MCAxMDYuNTY5IDcwIDkwQzcwIDczLjQzMSA4My40MzEgNjAgMTAwIDYwWiIgZmlsbD0iI0QxRDFEMSIvPgo8cGF0aCBkPSJNMTMwIDE0MEMxMzAgMTU2LjU2OSAxMTYuNTY5IDE3MCAxMDAgMTcwQzgzLjQzMSAxNzAgNzAgMTU2LjU2OSA3MCAxNDBDNzAgMTIzLjQzMSA4My40MzEgMTEwIDEwMCAxMTBDMTE2LjU2OSAxMTAgMTMwIDEyMy40MzEgMTMwIDE0MFoiIGZpbGw9IiNEMUQxRDEiLz4KPC9zdmc+'
};

export const getImageUrl = (imageUrl: string | undefined, type: 'home' = 'home'): string => {
  if (!imageUrl) {
    return DEFAULT_IMAGES[type];
  }

  // If it's already a data URL or absolute URL, return as is
  if (imageUrl.startsWith('data:') || imageUrl.startsWith('http')) {
    return imageUrl;
  }

  // If it's a relative URL, make sure it starts with /
  if (!imageUrl.startsWith('/')) {
    imageUrl = '/' + imageUrl;
  }

  return imageUrl;
};

export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>, fallbackType: 'home' = 'home') => {
  const img = event.currentTarget;
  img.src = DEFAULT_IMAGES[fallbackType];
  img.alt = 'Image not available';
};

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}; 