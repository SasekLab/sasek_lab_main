import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BentoCard, BentoGrid } from './ui/bento-grid';

gsap.registerPlugin(ScrollTrigger);

// Placeholder icons for services (to be replaced with custom illustrations)
const WebsiteIcon = () => (
    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded mx-auto mb-2 opacity-60"></div>
            <div className="text-xs text-gray-500 font-medium">3D Website<br/>Icon Here</div>
        </div>
    </div>
);

const AutomationIcon = () => (
    <div className="w-full h-full bg-gradient-to-br from-green-100 to-teal-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded mx-auto mb-2 opacity-60"></div>
            <div className="text-xs text-gray-500 font-medium">AI Automation<br/>Icon Here</div>
        </div>
    </div>
);



// Background components for each service
const WebsiteBackground = () => (
    <div className="absolute inset-0 overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
        <div className="absolute top-4 left-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg opacity-20 animate-pulse" />
        <div className="absolute bottom-4 right-4 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg opacity-20 animate-pulse" style={{ animationDelay: '0.3s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full opacity-30 animate-bounce" />
        </div>
        <div className="absolute top-8 right-8 w-6 h-6 border-2 border-blue-300 opacity-20 animate-spin" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-8 left-8 w-4 h-4 bg-indigo-300 rounded-full opacity-20 animate-ping" />
    </div>
);

const AutomationBackground = () => (
    <div className="absolute inset-0 overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50" />
        <div className="absolute top-3 right-3 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-15 animate-pulse" />
        <div className="absolute bottom-3 left-3 w-14 h-14 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl opacity-15 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 bg-emerald-400 rounded-full opacity-25 animate-spin" style={{ animationDuration: '4s' }} />
        </div>
        <div className="absolute top-1/3 right-1/3 transform translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-teal-400 rounded-sm opacity-25 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
        </div>
    </div>
);



const StartupPartner = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const services = [
        {
            name: "3D & Animated Websites",
            description: "Immersive visual experiences with advanced animations, mobile-responsive designs, and conversion-optimized layouts that captivate visitors and drive results.",
            href: "#contact",
            cta: "Explore 3D Websites",
            background: <WebsiteBackground />,
            Icon: WebsiteIcon,
            className: "lg:col-span-1",
        },
        {
            name: "AI Business Automation",
            description: "Intelligent workflows that eliminate repetitive tasks with custom automation solutions, system integrations, and chatbots tailored for your business.",
            href: "#contact",
            cta: "Discover Automation",
            background: <AutomationBackground />,
            Icon: AutomationIcon,
            className: "lg:col-span-1 lg:row-span-1",
        },
    ];

    useLayoutEffect(() => {
        if (!sectionRef.current || !titleRef.current || !gridRef.current) {
            return;
        }

        const animations: gsap.core.Tween[] = [];

        // Title and description animation
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
                }
            }
        );
        animations.push(titleAnim);

        // Bento cards with advanced staggered animation
        const bentoCards = gridRef.current.querySelectorAll('[data-bento-card]');

        const gridAnim = gsap.fromTo(bentoCards,
            {
                y: 100,
                opacity: 0,
                scale: 0.8,
                rotation: 5,
                transformPerspective: 1000
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 1.2,
                stagger: {
                    amount: 0.6,
                    from: "center"
                },
                ease: "power3.out",
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                    refreshPriority: 1
                },
                force3D: true,
                clearProps: "transform,opacity"
            }
        );
        animations.push(gridAnim);

        // Parallax effect for section background
        gsap.to(sectionRef.current, {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
                refreshPriority: -1
            }
        });

        // Cleanup function
        return () => {
            animations.forEach(anim => anim.kill());
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div ref={sectionRef} className="py-16 sm:py-24 bg-white text-black relative overflow-hidden" id="services">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div ref={titleRef} className="text-center mb-16">
                    <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase">Our Services</p>
                    <h2 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight">
                        Services That Drive <span className="text-brand-orange">Real Results</span>
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        From stunning 3D websites to intelligent automation, we deliver cutting-edge solutions that transform your business and accelerate growth.
                    </p>
                </div>

                <div ref={gridRef} className="relative">
                    <BentoGrid className="lg:grid-cols-2">
                        {services.map((service, index) => (
                            <div key={service.name} data-bento-card className="service-card">
                                <BentoCard {...service} />
                            </div>
                        ))}
                    </BentoGrid>
                </div>
            </div>
        </div>
    );
};

export default StartupPartner;
