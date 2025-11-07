import React, { useEffect, useRef } from 'react';

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
);

const Team = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const parallaxRef = useRef<HTMLDivElement>(null);

    // Parallax effect
    useEffect(() => {
        if (!sectionRef.current || !parallaxRef.current) return;

        // Dynamic GSAP import
        import('gsap').then(gsapModule => {
            const { gsap } = gsapModule;

            let handleScroll: (() => void) | null = null;

            // Parallax scroll effect
            handleScroll = () => {
                if (!sectionRef.current || !parallaxRef.current) return;

                const rect = sectionRef.current.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const scrollY = window.scrollY;
                const sectionTop = sectionRef.current.offsetTop;
                const speed = 0.3; // Reduced parallax speed

                // Only apply parallax when section is in view
                if (rect.top < viewportHeight && rect.bottom > 0) {
                    // Calculate parallax relative to section position
                    const scrollProgress = Math.max(0, Math.min(1, (scrollY - sectionTop + viewportHeight) / (viewportHeight + rect.height)));
                    const yPos = scrollProgress * 100 * speed; // Max 100px * speed movement

                    gsap.set(parallaxRef.current, {
                        y: yPos,
                        force3D: true
                    });
                }
            };

            // Add scroll listener
            window.addEventListener('scroll', handleScroll, { passive: true });

            // Initial calculation
            handleScroll();

            // Cleanup
            return () => {
                if (handleScroll) {
                    window.removeEventListener('scroll', handleScroll);
                }
            };
        });
    }, []);

    return (
        <div ref={sectionRef} className="py-16 sm:py-24 bg-white text-black relative overflow-hidden" id="about">
            {/* Parallax Background Image */}
            <div
                ref={parallaxRef}
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'url(https://s76r76lcog.ufs.sh/f/7TPlciUQ16AewuoEEirfhVugKzdtOeiBN56LvTQwlsGDXJUf)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    willChange: 'transform'
                }}
            />
            {/* Semi-transparent overlay for text readability */}
            <div className="absolute inset-0 bg-white/90 z-10"></div>

            <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8">
                <p
                    className="text-sm font-semibold tracking-widest text-gray-500 uppercase"
                    data-animate="fade-in"
                >
                    ABOUT SASEK LABS
                </p>
                <h2
                    className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight"
                    data-animate="fade-in"
                    data-animate-delay="100"
                >
                    Your <span className="text-brand-orange">Digital Transformation</span> Partner
                </h2>
                <p
                    className="mt-6 max-w-3xl text-lg text-gray-600"
                    data-animate="fade-in"
                    data-animate-delay="200"
                >
                    SASEK Labs specializes in creating stunning websites and intelligent automation solutions for businesses worldwide. We combine deep understanding of local markets with cutting-edge global technology standards to deliver transformative results.
                </p>
                {/* Cards removed - content ready for future updates */}
            </div>
        </div>
    );
};

export default Team;