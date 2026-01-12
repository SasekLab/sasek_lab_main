import React, { useEffect, useRef } from 'react';
import { Safari } from './ui/safari';
import { Iphone } from './ui/iphone';
import KonceptImg from '@/Koncept.jpg';


const CaseStudies = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const caseRefs = useRef<(HTMLDivElement | null)[]>([]);

    const cases = [
        {
            title: "Koncept (Company Learning Management System)",
            tags: ["B2B", "SAAS", "EDTECH"],
            tech: "React, Three.js, Node.js",
            timeline: "4 months",
            results: ["+250% increase in online sales", "40% reduction in cart abandonment", "3x faster page load times"],
            img: KonceptImg,
            url: "koncept.video",
            deviceType: "safari", // Desktop website
        },
        {
            title: "E-Commerce Platform Transformation",
            tags: ["B2B", "GLOBAL"],
            tech: "React, Three.js, Node.js",
            timeline: "4 months",
            results: ["+250% increase in online sales", "40% reduction in cart abandonment", "3x faster page load times"],
            img: "https://s76r76lcog.ufs.sh/f/7TPlciUQ16AehgiO1aRR1wGZbg2CtyNziJUSerKkBcn6IYQj",
            url: "luxeafrica.com",
            deviceType: "safari", // Desktop website
        },
        {
            title: "Professional Cleaning Service Platform",
            tags: ["CLEANING", "AFRICA"],
            tech: "Next.js, WebGL, TypeScript",
            timeline: "3 months",
            results: ["+180% increase in lead generation", "Premium brand positioning achieved", "Featured in design awards"],
            img: "https://s76r76lcog.ufs.sh/f/7TPlciUQ16Ae7oYgQsUQ16AebCoRl0y5Tp3JtaPcrIjgBEwq",
            url: "cleaning-service.io",
            deviceType: "safari", // Desktop website
        },
    ];

    // Use all cases since we already have the 2 we want
    const filteredCases = cases;

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
                    y: 35,
                    opacity: 0,
                    rotationX: -18
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

                // Case studies entrance animation
                const validCases = caseRefs.current.filter(Boolean);
                if (validCases.length > 0) {
                    headerTl.fromTo(validCases, {
                        y: 80,
                        opacity: 0,
                        scale: 0.85,
                        rotationY: -20
                    }, {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        rotationY: 0,
                        duration: 0.9,
                        stagger: 0.3,
                        ease: "power3.out",
                        transformPerspective: 1000
                    }, "-=0.2");
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
                    gsap.killTweensOf([subtitleRef.current, titleRef.current, ...validCases]);
                };
            });
        });
    }, []);

    return (
        <div ref={sectionRef} className="py-16 sm:py-24 bg-white text-black space-y-24" id="portfolio">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <p ref={subtitleRef} className="text-sm font-semibold tracking-widest text-gray-500 uppercase">Our Portfolio</p>
                <h2 ref={titleRef} className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight">
                    Success Stories That <span className="text-brand-orange">Speak Volumes</span>
                </h2>
            </div>
            <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-24">
                {filteredCases.map((c, i) => {
                    const isAlternating = i % 2 !== 0;
                    return (
                        <div key={i} ref={el => { caseRefs.current[i] = el }} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isAlternating ? 'lg:grid-flow-col-dense' : ''}`} data-animate="fade-in">
                            <div className={`${isAlternating ? 'lg:col-start-2' : ''} flex justify-center items-center`} data-animate="slide-up">
                                <div className={`w-full mx-auto transform hover:scale-105 transition-transform duration-300 ${c.deviceType === 'safari' ? 'max-w-2xl' : 'max-w-xs'}`}>
                                    {c.deviceType === 'safari' ? (
                                        <Safari
                                            imageSrc={c.img}
                                            url={c.url}
                                            className="drop-shadow-2xl"
                                        />
                                    ) : (
                                        <Iphone
                                            src={c.img}
                                            className="drop-shadow-2xl"
                                        />
                                    )}
                                </div>
                            </div>
                            <div className={`${isAlternating ? 'lg:col-start-1' : ''}`}>
                                <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">#WEB DEVELOPMENT</p>
                                <h3 className="mt-2 text-xl sm:text-2xl md:text-3xl font-bold">{c.title}</h3>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {c.tags.map(t => <span key={t} className="bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-full">{t}</span>)}
                                </div>
                            </div>
                        </div>
                    );
                })}
              </div>
        </div>
    );
};

export default CaseStudies;
