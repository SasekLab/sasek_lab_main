import React, { useRef, useLayoutEffect, useState, useCallback, useEffect } from 'react';
import { useGSAP } from '@gsap/react';

const Services = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const cardsWrapperRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [isAnimating, setIsAnimating] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const carouselIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const isCarouselPaused = useRef(false);

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
        const carousel = carouselRef.current;
        const cards = cardRefs.current.filter(Boolean);

        if (!section || !title || !carousel || cards.length === 0) {
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
                    const targetScale = isEntering ? 1.05 : 1;
                    const targetY = isEntering ? -8 : 0;

                    gsap.to(card, {
                        transform: `translate3d(0, ${targetY}px, 0) scale(${targetScale})`,
                        duration: 0.4,
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

    // Simple and reliable carousel animation
    useEffect(() => {
        if (!animationComplete || !cardsWrapperRef.current) return;

        const cards = cardRefs.current.filter(Boolean);
        if (cards.length === 0) return;

        // Set initial positions
        gsap.set(cards, {
            x: (i) => i === currentCardIndex ? 0 : (i > currentCardIndex ? 300 : -300),
            opacity: (i) => i === currentCardIndex ? 1 : 0,
            scale: (i) => i === currentCardIndex ? 1 : 0.8,
            zIndex: (i) => i === currentCardIndex ? 10 : 1,
        });

        // Auto-rotation function
        const animateToNext = () => {
            const currentCard = cards[currentCardIndex];
            const nextIndex = (currentCardIndex + 1) % services.length;
            const nextCard = cards[nextIndex];

            // Animate out current card
            gsap.to(currentCard, {
                x: -300,
                opacity: 0,
                scale: 0.8,
                duration: 0.5,
                ease: "power2.in"
            });

            // Animate in next card
            gsap.fromTo(nextCard, {
                x: 300,
                opacity: 0,
                scale: 0.8
            }, {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: "back.out(1.2)",
                onComplete: () => {
                    setCurrentCardIndex(nextIndex);
                }
            });
        };

        // Navigation functions
        window.servicesCarousel = {
            next: animateToNext,
            prev: () => {
                const prevIndex = (currentCardIndex - 1 + services.length) % services.length;
                const currentCard = cards[currentCardIndex];
                const prevCard = cards[prevIndex];

                gsap.to(currentCard, {
                    x: 300,
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.5,
                    ease: "power2.in"
                });

                gsap.fromTo(prevCard, {
                    x: -300,
                    opacity: 0,
                    scale: 0.8
                }, {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    ease: "back.out(1.2)",
                    onComplete: () => {
                        setCurrentCardIndex(prevIndex);
                    }
                });
            },
            goTo: (index: number) => {
                if (index === currentCardIndex || index < 0 || index >= services.length) return;

                const currentCard = cards[currentCardIndex];
                const targetCard = cards[index];

                gsap.to(currentCard, {
                    x: index > currentCardIndex ? -300 : 300,
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.4,
                    ease: "power2.in"
                });

                gsap.fromTo(targetCard, {
                    x: index > currentCardIndex ? 300 : -300,
                    opacity: 0,
                    scale: 0.8
                }, {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    ease: "back.out(1.2)",
                    onComplete: () => {
                        setCurrentCardIndex(index);
                    }
                });
            }
        };

        // Start auto-rotation
        carouselIntervalRef.current = setInterval(animateToNext, 4000);

        // Cleanup
        return () => {
            if (carouselIntervalRef.current) {
                clearInterval(carouselIntervalRef.current);
            }
            delete window.servicesCarousel;
        };
    }, [animationComplete, services.length]);

    // Manual navigation functions
    const handleNext = () => {
        if (window.servicesCarousel) {
            window.servicesCarousel.next();
        }
    };

    const handlePrev = () => {
        if (window.servicesCarousel) {
            window.servicesCarousel.prev();
        }
    };

    const handleGoTo = (index: number) => {
        if (window.servicesCarousel) {
            window.servicesCarousel.goTo(index);
        }
    };

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

            if (carouselIntervalRef.current) {
                clearInterval(carouselIntervalRef.current);
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

                {/* Services Carousel - Professional GSAP implementation */}
                <div
                    ref={carouselRef}
                    className="mt-16 relative h-[600px] flex items-center justify-center"
                >
                    <div className="relative w-full max-w-4xl">
                        {/* Cards wrapper for GSAP animations */}
                        <div
                            ref={cardsWrapperRef}
                            className="relative h-[500px] flex items-center justify-center overflow-visible"
                            style={{ perspective: '1000px' }}
                        >
                            {services.map((service, index) => (
                                <div
                                    key={service.title}
                                    ref={(el) => { cardRefs.current[index] = el; }}
                                    className="absolute w-full max-w-2xl"
                                >
                                    {/* Enhanced Glassmorphism Card */}
                                    <div className="relative bg-white/[0.08] backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-xl transition-all duration-300 hover:scale-[1.03] hover:bg-white/[0.12] hover:border-white/20 hover:shadow-2xl mx-auto">
                                        {/* Subtle inner shadow for depth */}
                                        <div className="absolute inset-0 rounded-2xl shadow-inner bg-black/20"></div>

                                        {/* Light reflection effect */}
                                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                                        {/* Animated background gradient */}
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

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

                                        {/* Enhanced hover glow - orange only */}
                                        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-orange-500/10 via-orange-400/5 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Enhanced Navigation Controls */}
                        <div className="flex items-center justify-between absolute -bottom-16 left-0 right-0 px-8">
                            {/* Previous Button */}
                            <button
                                onClick={handlePrev}
                                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                                aria-label="Previous service"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            {/* Carousel Indicators */}
                            <div className="flex gap-3">
                                {services.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleGoTo(index)}
                                        className={`h-2 rounded-full transition-all duration-300 ${
                                            index === currentCardIndex
                                                ? 'bg-brand-orange w-12 shadow-lg shadow-orange-500/25'
                                                : 'bg-white/20 hover:bg-white/30 w-2'
                                        }`}
                                        aria-label={`Go to service ${index + 1}`}
                                    />
                                ))}
                            </div>

                            {/* Next Button */}
                            <button
                                onClick={handleNext}
                                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                                aria-label="Next service"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;