import React, { useState, useEffect } from 'react';
import { imageLoader } from '../utils/imageLoader';

interface ImageComponentProps {
  category: string;
  imageId: string;
  className?: string;
  alt?: string;
  width?: number;
  height?: number;
  format?: string;
  loading?: 'lazy' | 'eager';
  fallback?: React.ReactNode;
  onLoad?: () => void;
  onError?: () => void;
  showPlaceholder?: boolean;
}

const ImageComponent: React.FC<ImageComponentProps> = ({
  category,
  imageId,
  className = '',
  alt,
  width,
  height,
  format,
  loading = 'lazy',
  fallback,
  onLoad,
  onError,
  showPlaceholder = true
}) => {
  const [imageData, setImageData] = useState<{
    url: string;
    alt: string;
    exists: boolean;
    loading: boolean;
  }>({
    url: '',
    alt: '',
    exists: false,
    loading: true
  });

  useEffect(() => {
    const loadImage = async () => {
      try {
        const data = await imageLoader.getImageWithFallback(category, imageId, format);
        setImageData({ ...data, loading: false });
      } catch (error) {
        console.error('Error loading image:', error);
        setImageData({
          url: '',
          alt: alt || 'Image not found',
          exists: false,
          loading: false
        });
      }
    };

    loadImage();
  }, [category, imageId, format, alt]);

  const imageInfo = imageLoader.getImage(category, imageId);
  const finalAlt = alt || imageData.alt || imageInfo?.alt || 'Image';
  const finalWidth = width || imageInfo?.dimensions.width;
  const finalHeight = height || imageInfo?.dimensions.height;

  // Show loading state
  if (imageData.loading) {
    return (
      <div
        className={`animate-pulse bg-gray-200 ${className}`}
        style={{ width: finalWidth, height: finalHeight }}
        role="img"
        aria-label="Loading image..."
      />
    );
  }

  // Show fallback if image doesn't exist
  if (!imageData.exists && showPlaceholder) {
    if (fallback) {
      return <div className={className}>{fallback}</div>;
    }

    const placeholderText = imageInfo?.placeholder || 'Image placeholder';
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 border border-gray-300 ${className}`}
        style={{ width: finalWidth, height: finalHeight }}
        role="img"
        aria-label={placeholderText}
      >
        <span className="text-xs text-gray-400 text-center px-2">
          {placeholderText}
        </span>
      </div>
    );
  }

  // Show actual image
  if (imageData.exists) {
    return (
      <img
        src={imageData.url}
        alt={finalAlt}
        className={className}
        width={finalWidth}
        height={finalHeight}
        loading={loading}
        onLoad={onLoad}
        onError={onError}
      />
    );
  }

  // Default fallback
  return null;
};

export default ImageComponent;