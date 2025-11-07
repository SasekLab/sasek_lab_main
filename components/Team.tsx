import React, { useEffect, useRef } from 'react';

const Team = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const parallaxRef = useRef<HTMLDivElement>(null);

    // Parallax effect only (removed sticky behavior)
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

                // Normal parallax behavior
                const speed = 0.3;

                if (rect.top < viewportHeight && rect.bottom > 0) {
                    const scrollProgress = Math.max(0, Math.min(1, (scrollY - sectionTop + viewportHeight) / (viewportHeight + rect.height)));
                    const yPos = scrollProgress * 100 * speed;

                    gsap.set(parallaxRef.current, {
                        y: yPos,
                        force3D: true
                    });
                }
            };

            // Add scroll listener
            window.addEventListener('scroll', handleScroll, { passive: true });
            // Add resize listener for responsive behavior
            window.addEventListener('resize', handleScroll, { passive: true });

            // Initial calculation
            handleScroll();

            // Cleanup
            return () => {
                if (handleScroll) {
                    window.removeEventListener('scroll', handleScroll);
                    window.removeEventListener('resize', handleScroll);
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