import React, { useEffect, useRef } from 'react';
import { Safari } from './ui/safari';
import { Iphone } from './ui/iphone';


const CaseStudies = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const caseRefs = useRef<(HTMLDivElement | null)[]>([]);

    const cases = [
        {
            title: "E-Commerce Platform Transformation",
            tags: ["RETAIL", "AFRICA"],
            tech: "React, Three.js, Node.js",
            timeline: "4 months",
            results: ["+250% increase in online sales", "40% reduction in cart abandonment", "3x faster page load times"],
            img: "https://picsum.photos/seed/ecommerce/1200/800",
            url: "luxeafrica.com",
            deviceType: "safari", // Desktop website
        },
        {
            title: "Restaurant Chain Automation System",
            tags: ["FOOD & BEVERAGE", "MULTI-LOCATION"],
            tech: "Python, AI/ML, Custom APIs",
            timeline: "5 months",
            results: ["20 hours saved per week per location", "95% reduction in manual data entry", "Real-time inventory management across 12 locations"],
            img: "https://picsum.photos/seed/restaurant-mobile/800/1600",
            deviceType: "iphone", // Mobile app
        },
        {
            title: "Professional Services Website Redesign",
            tags: ["CONSULTING", "GLOBAL"],
            tech: "Next.js, WebGL, TypeScript",
            timeline: "3 months",
            results: ["+180% increase in lead generation", "Premium brand positioning achieved", "Featured in design awards"],
            img: "https://picsum.photos/seed/consulting/1200/800",
            url: "modernconsulting.io",
            deviceType: "safari", // Desktop website
        },
    ];

    // Filter out the Restaurant Chain Automation System case (index 1)
    const filteredCases = cases.filter((_, index) => index !== 1);

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

                // Title animation with character-by-character reveal
                const titleText = titleRef.current.innerText;
                const titleChars = titleText.split('').map(char => {
                    if (char === ' ') {
                        return document.createTextNode(' ');
                    }
                    const span = document.createElement('span');
                    span.textContent = char === ' ' ? '\u00A0' : char;
                    span.style.display = 'inline-block';
                    span.style.transformOrigin = 'center bottom';
                    return span;
                });

                // Clear title and rebuild with spans
                titleRef.current.innerHTML = '';
                titleChars.forEach(char => titleRef.current?.appendChild(char));

                // Animate characters with bounce effect
                headerTl.fromTo(titleChars, {
                    y: 90,
                    opacity: 0,
                    rotationX: 50,
                    scale: 0.7,
                    transformPerspective: 1100
                }, {
                    y: 0,
                    opacity: 1,
                    rotationX: 0,
                    scale: 1,
                    duration: 0.7,
                    stagger: 0.035,
                    ease: "back.out(1.3)",
                    transformPerspective: 1100,
                    onComplete: () => {
                        // Ensure all characters are visible after animation
                        gsap.set(titleChars, {
                            opacity: 1,
                            y: 0,
                            rotationX: 0,
                            scale: 1,
                            clearProps: "transform,opacity"
                        });
                    }
                }, "-=0.4");

                // Animate orange span specifically
                const orangeSpan = titleRef.current.querySelector('.text-brand-orange');
                if (orangeSpan) {
                    headerTl.to(orangeSpan, {
                        color: "#F97316",
                        textShadow: "0 0 25px rgba(249, 115, 22, 0.4)",
                        duration: 0.5,
                        ease: "elastic.out(1, 0.3)"
                    }, "-=0.2");
                }

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
                            clearProps: "transform"
                        });
                        const allChars = titleRef.current.querySelectorAll('span');
                        gsap.set(allChars, {
                            opacity: 1,
                            clearProps: "transform,opacity"
                        });
                    }
                }, 2000);

                // Cleanup
                return () => {
                    ScrollTrigger.getAll().forEach(trigger => {
                        if (trigger.trigger === sectionRef.current) {
                            trigger.kill();
                        }
                    });
                    gsap.killTweensOf([subtitleRef.current, titleRef.current, ...titleChars, ...validCases]);
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
                {filteredCases.map((c, i) => (
                    <div key={i} ref={el => caseRefs.current[i] = el} className={`grid lg:grid-cols-2 gap-12 items-center ${filteredCases.length === 2 && i === 1 ? 'lg:grid-flow-col-dense' : ''}`} data-animate="fade-in">
                        <div className={`${filteredCases.length === 2 && i === 1 ? 'lg:col-start-2' : ''} flex justify-center items-center`} data-animate="slide-up">
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
                        <div className={`${i === 1 ? 'lg:col-start-1' : ''}`}>
                            <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">#3D WEBSITES #AI AUTOMATION #WEB DEVELOPMENT</p>
                            <h3 className="mt-2 text-xl sm:text-2xl md:text-3xl font-bold">{c.title}</h3>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {c.tags.map(t => <span key={t} className="bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-full">{t}</span>)}
                            </div>
                            <div className="mt-8 grid grid-cols-2 gap-8 text-sm">
                                <div>
                                    <p className="font-bold text-gray-500">TECH STACK</p>
                                    <p className="mt-1 font-semibold">{c.tech}</p>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-500">TIMELINE</p>
                                    <p className="mt-1 font-semibold">{c.timeline}</p>
                                </div>
                            </div>
                            <div className="mt-8">
                                <p className="text-sm font-bold text-gray-500">MEASURABLE RESULTS</p>
                                <ul className="mt-2 space-y-2">
                                    {c.results.map(r => (
                                        <li key={r} className="font-semibold flex items-start">
                                            <svg className="w-5 h-5 text-brand-orange mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            {r}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
              </div>
        </div>
    );
};

export default CaseStudies;
