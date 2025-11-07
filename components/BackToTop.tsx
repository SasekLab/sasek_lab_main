import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const BackToTop = () => {
    const [showBackToTop, setShowBackToTop] = useState(false);

    // Simple scroll listener
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            const scrollProgress = (scrollY / (documentHeight - windowHeight)) * 100;

            // Show button when scrolled more than 10%
            if (scrollProgress > 10) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };

        // Add scroll listener
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Check initial scroll position
        handleScroll();

        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Scroll to top function
    const scrollToTop = () => {
        if ((window as any).smoother) {
            (window as any).smoother.scrollTo(0, true);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="back-to-top-container">
            {showBackToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-12 right-12 z-50 bg-brand-orange text-white p-3 rounded-full shadow-lg hover:bg-white hover:text-brand-orange border-2 border-brand-orange hover:scale-110 transition-all duration-300 group"
                    aria-label="Back to top"
                >
                    <ChevronUp className="w-5 h-5" />
                </button>
            )}
        </div>
    );
};

export default BackToTop;