import React, { useEffect, useRef } from 'react';

const ServiceIcon = ({ iconName }: { iconName: string }) => {
    switch (iconName) {
        case 'globe':
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
            );
        case 'bot':
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                    <path d="M12 8V4H8"></path>
                    <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                    <path d="M2 14h2"></path>
                    <path d="M20 14h2"></path>
                    <path d="M15 13v2"></path>
                    <path d="M9 13v2"></path>
                </svg>
            );
        default:
            return null;
    }
};

const Services = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const serviceCardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const services = [
        {
            title: "WEBSITE DEVELOPMENT",
            description: "We create responsive, high-performance websites using cutting-edge technologies. Our sites are optimized for speed, SEO, and user experience to ensure your business stands out online.",
            icon: "globe"
        },
        {
            title: "AI AND AUTOMATION",
            description: "Leverage the power of artificial intelligence to automate repetitive tasks, analyze data, and make smarter business decisions. Our AI solutions give you a competitive edge.",
            icon: "bot"
        }
    ];

    // GSAP Text Animations for Section Headers
    useEffect(() => {
        if (!sectionRef.current || !subtitleRef.current || !titleRef.current) return;

        // Dynamic GSAP import
        import('gsap').then(gsapModule => {
            const { gsap } = gsapModule;
            import('gsap/ScrollTrigger').then(ScrollTriggerModule => {
                const { ScrollTrigger } = ScrollTriggerModule;
                gsap.registerPlugin(ScrollTrigger);

                // Clear any existing ScrollTriggers for this section
                ScrollTrigger.getAll().forEach(trigger => {
                    if (trigger.trigger === sectionRef.current) {
                        trigger.kill();
                    }
                });

                // Header text animation timeline
                const headerTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });

                // Subtitle animation
                headerTl.fromTo(subtitleRef.current, {
                    y: 30,
                    opacity: 0,
                    rotationX: -15
                }, {
                    y: 0,
                    opacity: 1,
                    rotationX: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    transformPerspective: 1000
                });

                // Simple title animation - just fade in the whole title
                headerTl.fromTo(titleRef.current, {
                    opacity: 0.2,
                    y: 20
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out"
                }, "-=0.2");

                // Service cards entrance animation
                const validCards = serviceCardRefs.current.filter(Boolean);
                if (validCards.length > 0) {
                    headerTl.fromTo(validCards, {
                        y: 60,
                        opacity: 0,
                        scale: 0.9,
                        rotationY: -15
                    }, {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        rotationY: 0,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: "power3.out",
                        transformPerspective: 1000
                    }, "-=0.3");
                }

                // Fallback: Ensure text visibility after delay
                setTimeout(() => {
                    if (titleRef.current) {
                        gsap.set(titleRef.current, {
                            opacity: 1,
                            y: 0,
                            clearProps: "transform,opacity"
                        });
                    }
                }, 1000);

                // Cleanup
                return () => {
                    ScrollTrigger.getAll().forEach(trigger => {
                        if (trigger.trigger === sectionRef.current) {
                            trigger.kill();
                        }
                    });
                    gsap.killTweensOf([subtitleRef.current, titleRef.current, ...validCards]);
                };
            });
        });
    }, []);

    return (
        <div ref={sectionRef} className="py-16 sm:py-24" id="services">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div>
                    <p ref={subtitleRef} className="text-sm font-semibold tracking-widest text-gray-400 uppercase">WHAT WE OFFER</p>
                    <h2 ref={titleRef} className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight">
                        Our <span className="text-brand-orange">Services</span>
                    </h2>
                </div>

                {/* Services Cards - Static Grid Layout */}
                <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {services.map((service, index) => (
                        <div key={service.title} ref={el => { serviceCardRefs.current[index] = el }} className="group">
                            {/* Enhanced Glassmorphism Card */}
                            <div className="relative bg-white/[0.08] backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/[0.12] hover:border-white/20 hover:shadow-2xl h-full">
                                {/* Subtle inner shadow for depth */}
                                <div className="absolute inset-0 rounded-2xl shadow-inner bg-black/20"></div>

                                {/* Light reflection effect */}
                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                                {/* Card content */}
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 bg-brand-orange/10 rounded-xl flex items-center justify-center border border-white/10 shadow-lg">
                                            <div className="text-brand-orange">
                                                <ServiceIcon iconName={service.icon} />
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-white uppercase tracking-wide">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>

                                {/* Enhanced hover glow - white only */}
                                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;