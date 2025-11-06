import { useEffect } from 'react';

export const useSmoothScroll = () => {
  useEffect(() => {
    // Add smooth scrolling behavior to the document
    document.documentElement.style.scrollBehavior = 'smooth';

    // Add scroll margin for fixed header
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }

      /* Add margin-top to sections to account for fixed header */
      #services, #portfolio, #about, #contact, #priority, #about {
        scroll-margin-top: 80px;
      }

      /* Ensure smooth scrolling works on all browsers */
      @supports (scroll-behavior: smooth) {
        html {
          scroll-behavior: smooth;
        }
      }
    `;
    document.head.appendChild(style);

    // Cleanup
    return () => {
      document.head.removeChild(style);
    };
  }, []);
};