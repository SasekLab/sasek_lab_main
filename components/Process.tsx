import React, { useRef, useLayoutEffect } from 'react';

const Process = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const processDiagramRef = useRef<HTMLDivElement>(null);
    const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
    const connectingLinesRef = useRef<(HTMLDivElement | null)[]>([]);
    const stepNumbersRef = useRef<(HTMLDivElement | null)[]>([]);
    const ctaRef = useRef<HTMLDivElement>(null);

    const steps = [
        {
            number: "01",
            title: "Discovery & Strategy",
            description: "We dive deep into your business goals, target audience, and current challenges to create a tailored digital strategy."
        },
        {
            number: "02",
            title: "Design & Development",
            description: "Our team crafts stunning 3D websites and builds intelligent automation systems that align with your brand and objectives."
        },
        {
            number: "03",
            title: "Launch & Optimize",
            description: "We ensure flawless deployment and provide ongoing optimization to maximize your return on investment."
        },
        {
            number: "04",
            title: "Growth & Scale",
            description: "As your business grows, we evolve your digital solutions to support new opportunities and markets."
        },
    ];

    // COMPREHENSIVE PROCESS SECTION ANIMATIONS
    useLayoutEffect(() => {
        // Only run animations if refs exist
        if (!sectionRef.current || !titleRef.current || !processDiagramRef.current || !ctaRef.current) {
            return;
        }

        // Dynamic GSAP import to avoid conflicts
        import('gsap').then(gsapModule => {
            const { gsap } = gsapModule;
            import('gsap/ScrollTrigger').then(ScrollTriggerModule => {
                const { ScrollTrigger } = ScrollTriggerModule;
                gsap.registerPlugin(ScrollTrigger);

                // Clear any existing ScrollTriggers for this section
                ScrollTrigger.getAll().forEach(trigger => {
                    if (trigger.trigger === sectionRef.current ||
                        trigger.trigger === titleRef.current ||
                        trigger.trigger === processDiagramRef.current ||
                        trigger.trigger === ctaRef.current) {
                        trigger.kill();
                    }
                });

                const animations: gsap.core.Tween[] = [];

                // Title and subtitle animation
                const titleAnim = gsap.fromTo(titleRef.current.children,
                    {
                        y: 60,
                        opacity: 0,
                        scale: 0.9
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1,
                        stagger: 0.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: titleRef.current,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        },
                        force3D: true
                    }
                );
                animations.push(titleAnim);

                // Process diagram scale-in animation
                const diagramAnim = gsap.fromTo(processDiagramRef.current,
                    {
                        scale: 0.8,
                        opacity: 0,
                        rotation: -2
                    },
                    {
                        scale: 1,
                        opacity: 1,
                        rotation: 0,
                        duration: 1.2,
                        delay: 0.3,
                        ease: "back.out(1.2)",
                        scrollTrigger: {
                            trigger: processDiagramRef.current,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        },
                        force3D: true
                    }
                );
                animations.push(diagramAnim);

                // Steps staggered animation with diagonal pattern
                const validSteps = stepsRef.current.filter(Boolean);
                if (validSteps.length > 0) {
                    const stepsAnim = gsap.fromTo(validSteps,
                        {
                            y: 80,
                            opacity: 0,
                            scale: 0.85,
                            rotationX: -15,
                            transformPerspective: 800
                        },
                        {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            rotationX: 0,
                            duration: 0.8,
                            stagger: {
                                amount: 0.8,
                                from: "start"
                            },
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: stepsRef.current[0],
                                start: "top 80%",
                                toggleActions: "play none none reverse"
                            },
                            force3D: true,
                            clearProps: "transform,opacity"
                        }
                    );
                    animations.push(stepsAnim);
                }

                // Connecting lines draw-on animation
                const validLines = connectingLinesRef.current.filter(Boolean);
                if (validLines.length > 0) {
                    const linesAnim = gsap.fromTo(validLines,
                        {
                            scaleX: 0,
                            transformOrigin: "left center"
                        },
                        {
                            scaleX: 1,
                            duration: 0.6,
                            stagger: 0.2,
                            delay: 0.8,
                            ease: "power2.inOut",
                            scrollTrigger: {
                                trigger: connectingLinesRef.current[0],
                                start: "top 80%",
                                toggleActions: "play none none reverse"
                            },
                            force3D: true
                        }
                    );
                    animations.push(linesAnim);
                }

                // Step numbers count-up animation
                const validNumbers = stepNumbersRef.current.filter(Boolean);
                if (validNumbers.length > 0) {
                    const numbersAnim = gsap.fromTo(validNumbers,
                        {
                            scale: 0,
                            rotation: -180,
                            opacity: 0
                        },
                        {
                            scale: 1,
                            rotation: 0,
                            opacity: 1,
                            duration: 0.6,
                            stagger: 0.15,
                            delay: 1,
                            ease: "back.out(1.5)",
                            scrollTrigger: {
                                trigger: stepNumbersRef.current[0],
                                start: "top 85%",
                                toggleActions: "play none none reverse"
                            },
                            force3D: true
                        }
                    );
                    animations.push(numbersAnim);
                }

                // CTA button animation
                const ctaAnim = gsap.fromTo(ctaRef.current,
                    {
                        y: 30,
                        opacity: 0,
                        scale: 0.9
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        delay: 1.5,
                        ease: "elastic.out(1, 0.5)",
                        scrollTrigger: {
                            trigger: ctaRef.current,
                            start: "top 90%",
                            toggleActions: "play none none reverse"
                        },
                        force3D: true
                    }
                );
                animations.push(ctaAnim);

                // Cleanup function
                return () => {
                    // Kill all animations
                    animations.forEach(anim => anim.kill());

                    // Clean up ScrollTriggers for this section only
                    ScrollTrigger.getAll().forEach(trigger => {
                        if (trigger.trigger === sectionRef.current ||
                            trigger.trigger === titleRef.current ||
                            trigger.trigger === processDiagramRef.current ||
                            trigger.trigger === ctaRef.current) {
                            trigger.kill();
                        }
                    });
                };

                console.log('✅ Process section animations initialized successfully!');
            });
        }).catch(error => {
            console.error('Failed to load GSAP for Process animations:', error);
        });
    }, []);

    return (
        <div className="py-16 sm:py-24">
            <div className="section-content max-w-7xl mx-auto px-6 lg:px-8">
                <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Our Process</p>
                <h2 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight">
                    How We Transform <span className="text-brand-orange">Your Business</span>
                </h2>
                
                {/* [PROCESS-ILLUSTRATION] - Full process diagram/infographic */}
                <div className="mt-12 mb-16 bg-gray-800/30 rounded-2xl p-8 flex items-center justify-center min-h-[200px] overflow-hidden">
                    {/* Mobile Image */}
                    <img
                        src="https://s76r76lcog.ufs.sh/f/7TPlciUQ16AeLor9SB8ZGuLJfV5UhljntYCSiMc9eKQXNIdo"
                        alt="Process Diagram - Mobile"
                        className="block lg:hidden w-full h-auto object-contain"
                    />
                    {/* Desktop & Tablet Image */}
                    <img
                        src="https://s76r76lcog.ufs.sh/f/7TPlciUQ16AeNs0ikubuRDhk8p5rHCjoXEYfB2QxL7wPGesK"
                        alt="Process Diagram - Desktop & Tablet"
                        className="hidden lg:block w-full h-auto object-contain"
                    />
                </div>

                <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, i) => (
                        <div key={i} className="relative hover-lift" data-animate="fade-in" data-animate-delay={i * 100}>
                            {/* Connecting line (hidden on mobile, shown on desktop between items) */}
                            {i < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-12 left-full w-48 h-0.5 bg-gradient-to-r from-brand-orange via-brand-orange/50 to-transparent -translate-x-4" data-animate="draw-line"></div>
                            )}
                            
                            <div className="relative">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="text-6xl font-bold text-white">{step.number}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <a href="#contact" className="inline-block px-8 py-4 bg-brand-orange text-white text-sm font-bold rounded-md hover:bg-orange-600 transition-colors">
                        START YOUR TRANSFORMATION
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Process;
