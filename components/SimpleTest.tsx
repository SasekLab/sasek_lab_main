import React, { useEffect } from 'react';

const SimpleTest: React.FC = () => {
  useEffect(() => {
    // Try to import GSAP dynamically
    import('gsap').then(gsapModule => {
      console.log('GSAP loaded:', !!gsapModule.gsap);
      console.log('GSAP version:', gsapModule.gsap.version);

      // Test a simple animation
      const test = document.createElement('div');
      test.textContent = 'GSAP Test - Animation Working!';
      test.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #F97316;
        color: white;
        padding: 20px;
        border-radius: 10px;
        font-size: 18px;
        font-weight: bold;
        z-index: 10000;
      `;
      document.body.appendChild(test);

      // Animate the test element
      gsapModule.gsap.fromTo(test,
        { scale: 0, rotation: -180, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 2,
          ease: "elastic.out(1, 0.5)",
          onComplete: () => {
            setTimeout(() => {
              gsapModule.gsap.to(test, {
                scale: 0,
                opacity: 0,
                duration: 1,
                onComplete: () => {
                  document.body.removeChild(test);
                }
              });
            }, 3000);
          }
        }
      );
    }).catch(error => {
      console.error('Failed to load GSAP:', error);
      const errorDiv = document.createElement('div');
      errorDiv.textContent = 'GSAP Import Failed: ' + error.message;
      errorDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #dc2626;
        color: white;
        padding: 20px;
        border-radius: 10px;
        font-size: 18px;
        font-weight: bold;
        z-index: 10000;
      `;
      document.body.appendChild(errorDiv);
    });
  }, []);

  return null;
};

export default SimpleTest;