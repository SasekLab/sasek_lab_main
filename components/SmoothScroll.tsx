import React, { useEffect, useRef, useState } from 'react';


const SmoothScroll: React.FC = () => {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load GSAP dynamically
    import('gsap').then(gsapModule => {
      const { gsap } = gsapModule;

      // Load ScrollTrigger
      import('gsap/ScrollTrigger').then(ScrollTriggerModule => {
        const { ScrollTrigger } = ScrollTriggerModule;
        gsap.registerPlugin(ScrollTrigger);

        // Clear any existing ScrollTriggers
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());

        // 1. Progress Indicator
        if (progressBarRef.current) {
          gsap.to(progressBarRef.current, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: document.body,
              start: "top top",
              end: "bottom bottom",
              scrub: 1
            }
          });
        }

        // 2. Global Parallax System for all sections (reduced intensity)
        gsap.utils.toArray('section').forEach((section: Element, index: number) => {
          const speed = index % 2 === 0 ? 0.1 : 0.2;

          gsap.to(section, {
            yPercent: -10 * speed,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              refreshPriority: -1
            }
          });
        });

        // 3. Smooth Scroll Reveal for Headings
        gsap.utils.toArray('h1, h2, h3').forEach(heading => {
          gsap.fromTo(heading as Element,
            {
              y: 80,
              opacity: 0,
              rotationX: -15,
              transformPerspective: 1000
            },
            {
              y: 0,
              opacity: 1,
              rotationX: 0,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: heading as Element,
                start: "top 85%",
                toggleActions: "play none none reverse"
              },
              force3D: true,
              clearProps: "transform,opacity"
            }
          );
        });

        // 4. Staggered Animation for Links and Buttons
        const interactiveElements = document.querySelectorAll('a, button');
        gsap.fromTo(interactiveElements,
          {
            y: 40,
            opacity: 0,
            scale: 0.9
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: document.body,
              start: "top 80%",
              toggleActions: "play none none reverse"
            },
            force3D: true,
            clearProps: "transform,opacity"
          }
        );

        // 5. Special Animation for Client Cards
        const clientIcons = document.querySelectorAll('.client-icon');
        clientIcons.forEach(icon => {
          const card = icon.closest('div') as Element;
          if (card) {
            gsap.fromTo(card,
              {
                y: 60,
                opacity: 0,
                rotationY: 25,
                transformPerspective: 800
              },
              {
                y: 0,
                opacity: 1,
                rotationY: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 80%",
                  toggleActions: "play none none reverse"
                },
                force3D: true,
                clearProps: "transform,opacity"
              }
            );
          }
        });

        // 6. Parallax for Text Content (reduced intensity)
        gsap.utils.toArray('p').forEach((paragraph: Element, index: number) => {
          const speed = 0.05 + (index * 0.02);
          gsap.to(paragraph, {
            yPercent: -5 * speed,
            ease: "none",
            scrollTrigger: {
              trigger: paragraph,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          });
        });

        // 7. Service Cards Special Animation
        const serviceCards = document.querySelectorAll('[data-bento-card]');
        if (serviceCards.length > 0) {
          gsap.fromTo(serviceCards,
            {
              y: 120,
              opacity: 0,
              scale: 0.8,
              rotation: 5,
              transformPerspective: 1000
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 1.4,
              stagger: {
                amount: 0.6,
                from: "center"
              },
              ease: "power4.out",
              scrollTrigger: {
                trigger: '#services',
                start: "top 70%",
                toggleActions: "play none none reverse"
              },
              force3D: true,
              clearProps: "transform,opacity"
            }
          );
        }

        // 8. Smooth Scroll to Section functionality
        const handleSmoothScroll = (e: MouseEvent) => {
          const target = e.target as HTMLElement;
          const link = target.closest('a[href^="#"]');
          if (link) {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
              gsap.to(window, {
                duration: 2,
                scrollTo: {
                  y: targetSection,
                  offsetY: 80
                },
                ease: "power3.inOut"
              });
            }
          }
        };

        document.addEventListener('click', handleSmoothScroll);

        // 9. Refresh ScrollTrigger on resize
        ScrollTrigger.addEventListener('refresh', () => {
          console.log('Scroll animations refreshed');
        });

        console.log('✅ Smooth scroll system initialized successfully!');
      });
    }).catch(error => {
      console.error('Failed to load GSAP:', error);
    });

    // Cleanup function
    return () => {
      // Cleanup handled within the dynamic import scope
    };
  }, []);

  return (
    <div
      ref={progressBarRef}
      data-progress-bar
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        background: 'linear-gradient(90deg, #F97316, #dc2626)',
        transform: 'scaleX(0)',
        transformOrigin: 'left',
        zIndex: 9999,
        pointerEvents: 'none'
      }}
    />
  );
};

export default SmoothScroll;