import { useEffect } from 'react';

export const useSmoothScroll = () => {
  useEffect(() => {
    // Enhanced smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Add scroll margin for fixed header
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
        scroll-padding-top: 80px;
      }

      /* Add margin-top to sections to account for fixed header */
      #services, #portfolio, #about, #contact, #priority, #team {
        scroll-margin-top: 80px;
      }

      /* Ensure smooth scrolling works on all browsers */
      @supports (scroll-behavior: smooth) {
        html {
          scroll-behavior: smooth;
        }
      }

      /* Enhanced smooth scrolling for better animation */
      * {
        scroll-behavior: smooth;
      }

      /* Smooth scroll transitions */
      html {
        scroll-behavior: smooth;
        scroll-padding-top: 80px;
      }

      body {
        scroll-behavior: smooth;
      }
    `;
    document.head.appendChild(style);

    // Handle anchor links with enhanced smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');

      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href !== '#') {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            e.preventDefault();

            // Enhanced smooth scroll with custom easing
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest'
            });
          }
        }
      }
    };

    // Add click listeners for enhanced smooth scrolling
    document.addEventListener('click', handleAnchorClick);

    // Cleanup
    return () => {
      document.head.removeChild(style);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);
};