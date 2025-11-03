import React, { useState, useEffect } from 'react';

interface LazySectionProps {
  children: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
  placeholder?: React.ReactNode;
  className?: string;
}

const LazySection: React.FC<LazySectionProps> = ({
  children,
  rootMargin = '200px',
  threshold = 0.1,
  placeholder = null,
  className = ''
}) => {
  // Progressive loading with timeout-based fallback
  const [isVisible, setIsVisible] = useState(true); // Show content immediately
  const [hasLoaded, setHasLoaded] = useState(true); // Already loaded

  useEffect(() => {
    // Convert rootMargin to delay (200px = 200ms delay)
    const delay = Math.max(100, parseInt(rootMargin.replace('px', ''), 10));

    const showContent = () => {
      setIsVisible(true);
    };

    // Progressive loading: show content after delay
    const timer = setTimeout(showContent, delay);

    // Also trigger on scroll as backup
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // If user has scrolled significantly, show content immediately
      if (scrollY > 300) {
        showContent();
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [rootMargin]);

  // Default placeholder
  const defaultPlaceholder = (
    <div className="animate-pulse bg-gray-100 rounded-lg h-64 w-full" />
  );

  return (
    <div className={className}>
      {!isVisible ? (
        <div>
          {placeholder || defaultPlaceholder}
        </div>
      ) : (
        <div className="lazy-content">
          {children}
        </div>
      )}
    </div>
  );
};

export default LazySection;