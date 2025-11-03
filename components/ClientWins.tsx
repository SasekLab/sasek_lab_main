import React, { useRef, useLayoutEffect, useState, useCallback } from 'react';

const ClientWins = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLParagraphElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    // State to track animation completion
    const [isAnimating, setIsAnimating] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);
    const animationFrameRef = useRef<number | null>(null);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const clients = [
        { name: "Tech Startup", placeholder: "[CLIENT-LOGO-1]" },
        { name: "E-commerce Platform", placeholder: "[CLIENT-LOGO-2]" },
        { name: "Financial Services", placeholder: "[CLIENT-LOGO-3]" },
        { name: "Healthcare Provider", placeholder: "[CLIENT-LOGO-4]" },
        { name: "Manufacturing Company", placeholder: "[CLIENT-LOGO-5]" },
        { name: "Retail Chain", placeholder: "[CLIENT-LOGO-6]" },
        { name: "Professional Services", placeholder: "[CLIENT-LOGO-7]" },
        { name: "Education Platform", placeholder: "[CLIENT-LOGO-8]" }
    ];

    // Robust scroll-triggered animation with proper state management
    const completeAnimations = useCallback(async () => {
        if (animationComplete || isAnimating) return;

        const section = sectionRef.current;
        const headline = headlineRef.current;
        const description = descriptionRef.current;
        const grid = gridRef.current;
        const cta = ctaRef.current;

        if (!section || !headline || !description || !grid || !cta) {
            return;
        }

        setIsAnimating(true);

        try {
            // Dynamic import with fallback error handling
            let gsap;
            try {
                const gsapModule = await import('gsap');
                gsap = gsapModule.gsap;
                // Make GSAP globally available for this component
                (window as any).gsap = gsap;
            } catch (gsapError) {
                console.error('GSAP import failed:', gsapError);
                throw gsapError;
            }

            // Set initial states
            const cards = cardRefs.current.filter(Boolean);
            const headlineText = headline.innerText;
            const orangeTextEndIndex = headlineText.indexOf(' ') + 1;

            // Prepare headline characters
            const chars = headlineText.split('');
            const charElements = chars.map((char, index) => {
                if (char === ' ') return ' ';

                const isInOrangeText = index < orangeTextEndIndex;
                const extraClass = isInOrangeText ? ' text-orange-glow' : '';
                return `<span class="headline-char" style="display: inline-block; will-change: transform;${extraClass}">${char}</span>`;
            }).join('');

            headline.innerHTML = charElements;

            // Set initial hidden states
            gsap.set(".headline-char", {
                transform: "translate3d(0, 80px, 0) rotateX(-45deg) rotateY(15deg) scale(0.3)",
                opacity: 0
            });

            gsap.set(description, {
                transform: "translate3d(0, 20px, 0)",
                opacity: 0
            });

            gsap.set(cards, {
                transform: "translate3d(0, 60px, 0) rotateY(15deg) scale(0.85)",
                opacity: 0
            });

            gsap.set(cta, {
                transform: "translate3d(0, 20px, 0) scale(0.95)",
                opacity: 0
            });

            // Create a timeline to ensure proper sequence
            const timeline = gsap.timeline({
                onComplete: () => {
                    setIsAnimating(false);
                    setAnimationComplete(true);
                    console.log('✅ ClientWins animations completed successfully!');
                },
                onStart: () => {
                    console.log('🎬 ClientWins animations started');
                }
            });

            // Add animations to timeline with proper sequencing
            timeline
                .to(".headline-char", {
                    transform: "translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) scale(1)",
                    opacity: 1,
                    duration: 1.2,
                    stagger: { amount: 0.8, from: "random" },
                    ease: "power3.out",
                    force3D: true,
                    clearProps: "transform"
                })
                .to(description, {
                    transform: "translate3d(0, 0, 0)",
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    clearProps: "transform"
                }, "-=0.6") // Start 0.6s before previous animation ends
                .to(cards, {
                    transform: "translate3d(0, 0, 0) rotateY(0deg) scale(1)",
                    opacity: 1,
                    duration: 0.8,
                    stagger: { amount: 0.6, from: "start" },
                    ease: "power3.out",
                    force3D: true,
                    clearProps: "transform"
                }, "-=0.4") // Start 0.4s before previous animation ends
                .to(cta, {
                    transform: "translate3d(0, 0, 0) scale(1)",
                    opacity: 1,
                    duration: 0.6,
                    ease: "back.out(1.2)",
                    clearProps: "transform"
                }, "-=0.2"); // Start 0.2s before previous animation ends

            // Setup hover effects after main animations
            timeline.eventCallback("onComplete", () => {
                const handleCardHover = (e: MouseEvent) => {
                    const card = (e.target as HTMLElement).closest('[data-client-card]');
                    if (!card) return;

                    const isEntering = e.type === 'mouseenter';
                    const targetScale = isEntering ? 1.05 : 1;
                    const targetY = isEntering ? -8 : 0;

                    gsap.to(card, {
                        transform: `translate3d(0, ${targetY}px, 0) scale(${targetScale})`,
                        duration: 0.3,
                        ease: "power2.out",
                        force3D: true
                    });
                };

                // Add event delegation to grid container
                grid.setAttribute('data-client-grid', 'true');
                cards.forEach((card, index) => {
                    card.setAttribute('data-client-card', `${index}`);
                    card.addEventListener('mouseenter', handleCardHover);
                    card.addEventListener('mouseleave', handleCardHover);
                });
            });

        } catch (error) {
            console.error('Failed to load GSAP for ClientWins animations:', error);
            setIsAnimating(false);
        }
    }, [animationComplete, isAnimating]);

    // Optimized scroll detection with debouncing
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

                // Clear any existing timeout
                if (scrollTimeoutRef.current) {
                    clearTimeout(scrollTimeoutRef.current);
                }

                // Debounce scroll events to prevent excessive calls
                scrollTimeoutRef.current = setTimeout(() => {
                    const rect = section.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;

                    // Trigger when section top is 80% into viewport
                    const triggerPoint = viewportHeight * 0.8;

                    if (rect.top <= triggerPoint && rect.bottom > 0) {
                        completeAnimations();
                    }
                }, 50); // 50ms debounce
            };

            // Initial check
            handleScroll();

            // Add scroll listener with passive option for performance
            window.addEventListener('scroll', handleScroll, { passive: true });
        };

        setupScrollListener();

        // Cleanup function
        return () => {
            if (handleScroll) {
                window.removeEventListener('scroll', handleScroll);
            }

            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }

            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }

            // Clean up hover listeners
            const grid = gridRef.current;
            const cards = cardRefs.current.filter(Boolean);
            if (grid) {
                cards.forEach(card => {
                    card.removeEventListener('mouseenter', () => {});
                    card.removeEventListener('mouseleave', () => {});
                });
            }
        };
    }, [completeAnimations, animationComplete]);

    return (
        <div ref={sectionRef} className="py-16 sm:py-24 overflow-hidden contain-layout" id="clients" style={{ contain: 'layout style paint' }}>
            <div className="section-content max-w-7xl mx-auto px-6 lg:px-8">
                <h2
                    ref={headlineRef}
                    className="text-4xl sm:text-5xl font-extrabold tracking-tight"
                >
                    <span className="text-brand-orange">TRUSTED BY</span> FORWARD-THINKING BUSINESSES
                </h2>
                <p
                    ref={descriptionRef}
                    className="mt-6 text-lg text-gray-600 max-w-3xl"
                >
                    Join businesses across Africa and beyond that have transformed their digital presence and automated their operations with SASEK Labs.
                </p>
                <div
                    ref={gridRef}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 border border-gray-200"
                >
                    {clients.map((client, index) => (
                        <div
                            key={client.name}
                            ref={(el) => { cardRefs.current[index] = el; }}
                            className="h-40 bg-white flex items-center justify-center p-8 hover:bg-gray-50 transition-colors duration-300 cursor-pointer will-change-transform"
                        >
                            <div className="text-center client-text">
                                <div className="client-icon w-16 h-16 mb-2 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                                    <span className="text-xs text-gray-400">[ICON]</span>
                                </div>
                                <span className="text-sm font-semibold text-gray-500">{client.placeholder}</span>
                                <p className="text-xs text-gray-400 mt-1">{client.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div
                    ref={ctaRef}
                    className="mt-12 text-center"
                >
                    <p className="text-sm text-gray-500">
                        <span className="font-semibold">Want to join them?</span> Schedule a free consultation to see how we can transform your business.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ClientWins;