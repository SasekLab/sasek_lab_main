import React, { useRef, useLayoutEffect, useState, useCallback } from 'react';

const Services = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [isAnimating, setIsAnimating] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const services = [
        {
            title: "WEBSITE DEVELOPMENT",
            description: "We create responsive, high-performance websites using cutting-edge technologies. Our sites are optimized for speed, SEO, and user experience to ensure your business stands out online.",
            icon: "[ICON-WEBSITE]"
        },
        {
            title: "AI AND AUTOMATION",
            description: "Leverage the power of artificial intelligence to automate repetitive tasks, analyze data, and make smarter business decisions. Our AI solutions give you a competitive edge.",
            icon: "[ICON-AUTOMATION]"
        }
    ];

    const completeAnimations = useCallback(async () => {
        if (animationComplete || isAnimating) return;

        const section = sectionRef.current;
        const title = titleRef.current;
        const grid = gridRef.current;
        const cards = cardRefs.current.filter(Boolean);

        if (!section || !title || !grid || cards.length === 0) {
            return;
        }

        setIsAnimating(true);

        try {
            let gsap;
            try {
                const gsapModule = await import('gsap');
                gsap = gsapModule.gsap;
                (window as any).gsap = gsap;
            } catch (gsapError) {
                console.error('GSAP import failed:', gsapError);
                throw gsapError;
            }

            // Set initial states
            gsap.set(title, {
                transform: "translate3d(0, 60px, 0) rotateX(-15deg) scale(0.8)",
                opacity: 0
            });

            gsap.set(cards, {
                transform: "translate3d(0, 80px, 0) rotateY(15deg) scale(0.7)",
                opacity: 0
            });

            // Create animation timeline
            const timeline = gsap.timeline({
                onComplete: () => {
                    setIsAnimating(false);
                    setAnimationComplete(true);
                    console.log('✅ Services animations completed successfully!');
                },
                onStart: () => {
                    console.log('🎬 Services animations started');
                }
            });

            // Animate elements
            timeline
                .to(title, {
                    transform: "translate3d(0, 0, 0) rotateX(0deg) scale(1)",
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    force3D: true,
                    clearProps: "transform"
                })
                .to(cards, {
                    transform: "translate3d(0, 0, 0) rotateY(0deg) scale(1)",
                    opacity: 1,
                    duration: 0.9,
                    stagger: { amount: 0.4, from: "start" },
                    ease: "power3.out",
                    force3D: true,
                    clearProps: "transform"
                }, "-=0.4");

            // Add hover effects after main animations
            timeline.eventCallback("onComplete", () => {
                const handleCardHover = (e: MouseEvent) => {
                    const card = (e.target as HTMLElement).closest('[data-service-card]');
                    if (!card) return;

                    const isEntering = e.type === 'mouseenter';
                    const targetScale = isEntering ? 1.03 : 1;
                    const targetY = isEntering ? -5 : 0;

                    gsap.to(card, {
                        transform: `translate3d(0, ${targetY}px, 0) scale(${targetScale})`,
                        duration: 0.3,
                        ease: "power2.out",
                        force3D: true
                    });
                };

                cards.forEach((card, index) => {
                    card.setAttribute('data-service-card', `${index}`);
                    card.addEventListener('mouseenter', handleCardHover);
                    card.addEventListener('mouseleave', handleCardHover);
                });
            });

        } catch (error) {
            console.error('Failed to load GSAP for Services animations:', error);
            setIsAnimating(false);
        }
    }, [animationComplete, isAnimating]);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        let handleScroll: (() => void) | null = null;

        const setupScrollListener = async () => {
            try {
                const gsapModule = await import('gsap');
                (window as any).gsap = gsapModule.gsap;
            } catch (error) {
                console.error('GSAP import failed in scroll listener:', error);
                return;
            }

            handleScroll = () => {
                if (animationComplete) return;

                if (scrollTimeoutRef.current) {
                    clearTimeout(scrollTimeoutRef.current);
                }

                scrollTimeoutRef.current = setTimeout(() => {
                    const rect = section.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;
                    const triggerPoint = viewportHeight * 0.8;

                    if (rect.top <= triggerPoint && rect.bottom > 0) {
                        completeAnimations();
                    }
                }, 50);
            };

            handleScroll();
            window.addEventListener('scroll', handleScroll, { passive: true });
        };

        setupScrollListener();

        return () => {
            if (handleScroll) {
                window.removeEventListener('scroll', handleScroll);
            }

            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }

            // Clean up hover listeners
            const cards = cardRefs.current.filter(Boolean);
            cards.forEach(card => {
                card.removeEventListener('mouseenter', () => {});
                card.removeEventListener('mouseleave', () => {});
            });
        };
    }, [completeAnimations, animationComplete]);

    return (
        <div ref={sectionRef} className="py-16 sm:py-24" id="services">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header - Using Process component style */}
                <div ref={titleRef}>
                    <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">WHAT WE OFFER</p>
                    <h2 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight">
                        Our <span className="text-brand-orange">Services</span>
                    </h2>
                </div>

                {/* Services Grid - 2 glassmorphism cards */}
                <div ref={gridRef} className="mt-16 grid md:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={service.title}
                            ref={(el) => { cardRefs.current[index] = el; }}
                            className="relative group hover-lift"
                        >
                            {/* Proper Glassmorphism Card */}
                            <div className="relative bg-white/[0.08] backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/[0.12] hover:border-white/20 hover:shadow-2xl">
                                {/* Subtle inner shadow for depth */}
                                <div className="absolute inset-0 rounded-2xl shadow-inner bg-black/20"></div>

                                {/* Light reflection effect */}
                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                                {/* Card content */}
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 bg-white/[0.1] backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/10 shadow-lg">
                                            <span className="text-xs text-white/60 font-semibold text-center">{service.icon}</span>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-white uppercase tracking-wide">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>

                                {/* Subtle hover glow - orange only */}
                                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-orange-500/10 via-orange-400/5 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;