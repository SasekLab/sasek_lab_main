import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { InnovationIcon, GlobalIcon, ResultsIcon, PartnershipIcon } from './ui/icons';

gsap.registerPlugin(ScrollTrigger);

const Priority = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const mainTitleRef = useRef<HTMLHeadingElement>(null);
    const items = [
        {
            title: "INNOVATION-FIRST APPROACH",
            heading: "We don't follow trends – we set them.",
            text: "Our 3D websites and AI automation solutions position your business as an industry leader. We push boundaries with cutting-edge technology that keeps you ahead of the competition.",
            dark: true,
            icon: <InnovationIcon />
        },
        {
            title: "LOCAL EXPERTISE, GLOBAL STANDARDS",
            heading: "Understanding local markets with international quality.",
            text: "We deliver solutions that compete internationally while understanding local business challenges. Our team combines regional insights with global best practices.",
            dark: false,
            icon: <GlobalIcon />
        },
        {
            title: "RESULTS-DRIVEN SOLUTIONS",
            heading: "Every website we build and every automation we implement is designed with one goal.",
            text: "Measurable business growth. We focus on metrics that matter: increased conversions, time saved, and revenue generated. Your success is our success.",
            dark: false,
            icon: <ResultsIcon />
        },
        {
            title: "END-TO-END PARTNERSHIP",
            heading: "From initial concept to ongoing optimization.",
            text: "We're your dedicated technology partners throughout your digital journey. We don't just deliver projects – we build lasting relationships that evolve with your business.",
            dark: true,
            icon: <PartnershipIcon />
        },
    ];

    // CARD TURN ANIMATION - GSAP Master MCP Implementation
    useLayoutEffect(() => {
        // Define handleScroll function in the outer scope
        let handleScroll: (() => void) | null = null;

        // Only run if refs exist
        if (!sectionRef.current || !gridRef.current) {
            return;
        }

        // Dynamic GSAP import to avoid conflicts
        import('gsap').then(gsapModule => {
            const { gsap } = gsapModule;
            import('gsap/ScrollTrigger').then(ScrollTriggerModule => {
                const { ScrollTrigger } = ScrollTriggerModule;
                gsap.registerPlugin(ScrollTrigger);

                // Header Text Animations
                if (subtitleRef.current && mainTitleRef.current) {
                    const headerTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    });

                    // Subtitle animation
                    headerTl.fromTo(subtitleRef.current, {
                        y: 40,
                        opacity: 0,
                        rotationX: -20
                    }, {
                        y: 0,
                        opacity: 1,
                        rotationX: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        transformPerspective: 1000
                    });

                    // Simple title animation - just fade in the whole title
                headerTl.fromTo(mainTitleRef.current, {
                    opacity: 0.2,
                    y: 20
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out"
                }, "-=0.2");

                    // Container animation
                    headerTl.fromTo(titleRef.current, {
                        scale: 0.95,
                        opacity: 0.8
                    }, {
                        scale: 1,
                        opacity: 1,
                        duration: 1,
                        ease: "power2.out"
                    }, "-=0.8");

                    // Fallback: Ensure text visibility after delay
                    setTimeout(() => {
                        if (mainTitleRef.current) {
                            gsap.set(mainTitleRef.current, {
                                opacity: 1,
                                y: 0,
                                clearProps: "transform,opacity"
                            });
                        }
                    }, 1000);
                }

                // Make GSAP globally available for debugging
                window.gsap = gsap;
                window.ScrollTrigger = ScrollTrigger;

                // Refresh ScrollTrigger to ensure accurate positioning
                ScrollTrigger.refresh();

                // Card Turn Animation - Start with cards rotated outward, then turn to face user
                const featureCards = gridRef.current?.querySelectorAll('.feature-card');

                if (featureCards && featureCards.length > 0) {
                    // Set initial state - cards visible but rotated slightly away
                    gsap.set(featureCards, {
                        rotationY: -15,
                        transformPerspective: 1000,
                        transformStyle: "preserve-3d",
                        opacity: 1,  // Ensure cards are visible initially
                        y: 0,        // No initial y offset
                        scale: 1     // No initial scale
                    });

                    // Manual Scroll-Based Card Turn Animation
                    handleScroll = () => {
                        if (!sectionRef.current || !featureCards) return;

                        const rect = sectionRef.current.getBoundingClientRect();
                        const viewportHeight = window.innerHeight;
                        const scrollTop = window.scrollY;

  
                        // Calculate scroll progress (0 to 1)
                        let scrollProgress = 0;

                        // When section top is within 2x viewport height, start animation
                        const triggerDistance = viewportHeight * 2;

                        if (rect.top <= triggerDistance) {
                            // Section is approaching viewport
                            const sectionTop = Math.max(0, triggerDistance - rect.top);
                            const sectionHeight = triggerDistance + rect.height;
                            scrollProgress = Math.min(1, Math.max(0, sectionTop / sectionHeight));
                        }

                        // Apply rotation based on scroll progress
                        const rotationY = -15 + (15 * scrollProgress); // From -15deg to 0deg

                        gsap.set(featureCards, {
                            rotationY: rotationY,
                            force3D: true
                        });
                    };

                    // Add scroll listener
                    window.addEventListener('scroll', handleScroll, { passive: true });

                    // Initial calculation
                    handleScroll();

                    console.log('✅ Card turn animation initialized for Priority section!');
                }
            });
        }).catch(error => {
            console.error('Failed to load GSAP for card animation:', error);
        });

        // Cleanup function
        return () => {
            // Remove scroll listener if it exists
            if (handleScroll) {
                window.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <div ref={sectionRef} className="py-16 sm:py-24 bg-white text-black relative overflow-hidden" id="priority">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div ref={titleRef}>
                    <p ref={subtitleRef} className="text-sm font-semibold tracking-widest text-gray-500 uppercase">WHY CHOOSE SASEK LABS</p>
                    <h2 ref={mainTitleRef} className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight">What Makes Us <span className="text-brand-orange">Different</span></h2>
                </div>
                <div ref={gridRef} className="mt-16 grid md:grid-cols-2 gap-6">
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className={`feature-card p-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl ${item.dark ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}
                            style={{
                                transformStyle: 'preserve-3d',
                                willChange: 'transform'
                            }}
                        >
                            <div className="w-16 h-16 bg-brand-orange/10 rounded-xl flex items-center justify-center mb-6">
                                <div className="text-brand-orange">
                                    {item.icon}
                                </div>
                            </div>
                            <p className="text-xs font-bold tracking-wider uppercase">{item.title}</p>
                            <h3 className="mt-4 text-2xl font-bold">{item.heading}</h3>
                            <p className={`mt-4 ${item.dark ? 'text-gray-400' : 'text-gray-600'}`}>{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Priority;
