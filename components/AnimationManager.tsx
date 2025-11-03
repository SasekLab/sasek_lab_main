import React, { useEffect, useRef } from 'react';

// Extend Window interface to include GSAP
declare global {
  interface Window {
    gsap?: any;
    ScrollTrigger?: any;
  }
}

interface AnimationManagerProps {
  children: React.ReactNode;
}

const AnimationManager: React.FC<AnimationManagerProps> = ({ children }) => {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;

    const initializeAnimations = async () => {
      try {
        console.log('🎬 Animation Manager: Starting initialization...');

        // Wait for DOM to be ready
        if (document.readyState !== 'complete') {
          await new Promise(resolve => {
            window.addEventListener('load', resolve, { once: true });
          });
        }

        // Small delay for React to fully render
        await new Promise(resolve => setTimeout(resolve, 100));

        // Load GSAP
        const gsapModule = await import('gsap');
        const { gsap } = gsapModule;

        // Load ScrollTrigger
        const ScrollTriggerModule = await import('gsap/ScrollTrigger');
        const { ScrollTrigger } = ScrollTriggerModule;
        gsap.registerPlugin(ScrollTrigger);

        // Make GSAP globally available
        window.gsap = gsap;
        window.ScrollTrigger = ScrollTrigger;

        console.log('✅ Animation Manager: GSAP loaded successfully');

        // Clear any existing animations
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        gsap.killTweensOf("*");

        // Simple entrance animations for critical elements
        setTimeout(() => {
          try {
            // Header elements
            const headerElements = document.querySelectorAll('header a, header button');
            if (headerElements.length > 0) {
              gsap.fromTo(headerElements,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
              );
              console.log(`✅ Animation Manager: Initialized ${headerElements.length} header elements`);
            }

            // Hero elements (first section)
            const heroSection = document.querySelector('section');
            if (heroSection) {
              const heroElements = heroSection.querySelectorAll('h1, p, a, button');
              if (heroElements.length > 0) {
                gsap.fromTo(heroElements,
                  { y: 50, opacity: 0 },
                  { y: 0, opacity: 1, duration: 1, stagger: 0.15, delay: 0.2, ease: "power3.out" }
                );
                console.log(`✅ Animation Manager: Initialized ${heroElements.length} hero elements`);
              }
            }

            // Headings throughout the page
            const headings = document.querySelectorAll('h1, h2, h3');
            if (headings.length > 0) {
              gsap.fromTo(headings,
                { y: 60, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 1,
                  stagger: 0.2,
                  scrollTrigger: {
                    trigger: headings[0],
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                  },
                  ease: "power3.out"
                }
              );
              console.log(`✅ Animation Manager: Initialized ${headings.length} headings`);
            }

            console.log('🎉 Animation Manager: All animations initialized successfully!');

          } catch (error) {
            console.error('❌ Animation Manager: Error initializing animations:', error);
          }
        }, 300);

        initializedRef.current = true;

      } catch (error) {
        console.error('❌ Animation Manager: Critical error:', error);
      }
    };

    initializeAnimations();

    // Cleanup
    return () => {
      if (window.ScrollTrigger) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);

  return <>{children}</>;
};

export default AnimationManager;