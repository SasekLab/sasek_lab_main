import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const smootherRef = useRef<HTMLDivElement>(null);
  const smootherInstanceRef = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    // Initialize GSAP ScrollSmoother
    if (typeof window !== 'undefined' && smootherRef.current) {
      // Kill any existing instances
      if (smootherInstanceRef.current) {
        smootherInstanceRef.current.kill();
      }

      // Create new smoother instance
      smootherInstanceRef.current = ScrollSmoother.create({
        wrapper: smootherRef.current,
        content: smootherRef.current.children[0] as HTMLElement,
        smooth: 1, // seconds it takes to "catch up" to native scroll position
        effects: true, // enable data-speed & data-lag attributes
        smoothTouch: 0.1, // much smoother for touch devices
        normalizeScroll: true, // addresses address bar hide/show on most browsers
        ignoreMobileResize: true, // skips updates when viewport doesn't change
        onUpdate: (self) => {
          // Custom update logic if needed
          const progress = self.progress;
          const scrollProgress = progress * 100;

          // Dispatch custom event for header progress bar
          window.dispatchEvent(new CustomEvent('scrollUpdate', {
            detail: { progress: scrollProgress }
          }));
        }
      });

      // Make ScrollSmoother globally available
      (window as any).gsap = gsap;
      (window as any).ScrollTrigger = ScrollTrigger;
      (window as any).ScrollSmoother = ScrollSmoother;
      (window as any).smoother = smootherInstanceRef.current;

      console.log('✅ GSAP ScrollSmoother initialized!');

      // Refresh ScrollTrigger after a short delay
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }

    // Cleanup
    return () => {
      if (smootherInstanceRef.current) {
        smootherInstanceRef.current.kill();
        smootherInstanceRef.current = null;
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={smootherRef} id="smooth-wrapper">
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
};

export default SmoothScroll;