import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShimmerButton } from './ui/shimmer-button';

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const headerRef = useRef<HTMLElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const logoRef = useRef<HTMLImageElement>(null);
    const ctaButtonRef = useRef<HTMLButtonElement>(null);
    const navLinks = [
        { label: "SERVICES", href: "#services" },
        { label: "OUR PORTFOLIO", href: "#portfolio" },
        { label: "ABOUT SASEK", href: "#about" },
        { label: "CONTACT US", href: "#contact" }
    ];

    // GSAP Header Animations & Scroll Progress
    useEffect(() => {
        if (!headerRef.current) return;

        // Dynamic GSAP import to avoid SSR issues
        import('gsap').then(gsapModule => {
            const { gsap } = gsapModule;
            import('gsap/ScrollTrigger').then(ScrollTriggerModule => {
                const { ScrollTrigger } = ScrollTriggerModule;
                gsap.registerPlugin(ScrollTrigger);

                // Header entrance animation
                const headerTl = gsap.timeline();
                headerTl
                    .fromTo(headerRef.current, {
                        y: -100,
                        opacity: 0,
                    }, {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        delay: 0.5,
                    })
                    .fromTo(logoRef.current, {
                        scale: 0,
                        opacity: 0,
                    }, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.8,
                        ease: "back.out(1.7)",
                    }, "-=0.5")
                    .fromTo(navItemsRef.current, {
                        y: -30,
                        opacity: 0,
                    }, {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: "power2.out",
                    }, "-=0.3")
                    .fromTo(ctaButtonRef.current, {
                        scale: 0,
                        opacity: 0,
                    }, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.8,
                        ease: "back.out(1.7)",
                    }, "-=0.2");

                // Scroll-triggered header animations
                const scrollTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: "body",
                        start: "top -80px",
                        end: "top -200px",
                        scrub: true,
                    }
                });

                scrollTl
                    .to(headerRef.current, {
                        backdropFilter: "blur(20px)",
                        duration: 1,
                        ease: "none",
                    })
                    .to(progressBarRef.current, {
                        opacity: 1,
                        duration: 0.3,
                        ease: "none",
                    }, "-=1");

                // Smooth scroll progress animation using GSAP
                gsap.to({}, {
                    scrollTrigger: {
                        trigger: "body",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: true,
                        onUpdate: (self) => {
                            const progress = self.progress * 100;
                            gsap.to(progressBarRef.current, {
                                width: `${progress}%`,
                                duration: 0.3,
                                ease: "power2.out"
                            });

                            // Add glow effect when scrolling
                            if (progress > 5) {
                                gsap.to(progressBarRef.current, {
                                    boxShadow: "0 0 8px rgba(249, 115, 22, 0.6)",
                                    duration: 0.2,
                                    ease: "power2.out"
                                });
                            } else {
                                gsap.to(progressBarRef.current, {
                                    boxShadow: "none",
                                    duration: 0.2,
                                    ease: "power2.out"
                                });
                            }
                        }
                    }
                });

                // Hover animations for nav items
                navItemsRef.current.forEach((item) => {
                    if (item) {
                        item.addEventListener('mouseenter', () => {
                            gsap.to(item, {
                                y: -2,
                                duration: 0.3,
                                ease: "power2.out"
                            });
                        });

                        item.addEventListener('mouseleave', () => {
                            gsap.to(item, {
                                y: 0,
                                duration: 0.3,
                                ease: "power2.out"
                            });
                        });
                    }
                });

                // Cleanup
                return () => {
                    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
                    gsap.killTweensOf(progressBarRef.current);
                    gsap.killTweensOf(headerRef.current);
                };
            });
        });
    }, []);

    return (
        <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/80 backdrop-blur-md border-b border-gray-800/50">
            {/* Scroll Progress Indicator */}
            <div
                ref={progressBarRef}
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-brand-orange via-brand-orange to-orange-400 transition-none z-50 shadow-lg opacity-0"
            />
            <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex justify-between items-center">
                <a href="/" className="flex items-center">
                    <img
                        ref={logoRef}
                        src="https://s76r76lcog.ufs.sh/f/7TPlciUQ16Ae7SQzbPqUQ16AebCoRl0y5Tp3JtaPcrIjgBEw"
                        alt="SASEK Labs Logo"
                        className="h-8 w-auto mr-2"
                    />
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-10">
                    {navLinks.map((link, i) => (
                        <a
                            key={i}
                            ref={(el) => {
                                if (el) {
                                    navItemsRef.current[i] = el;
                                }
                            }}
                            href={link.href}
                            className="text-xs font-bold tracking-widest text-white hover:text-brand-orange transition-colors uppercase"
                            onClick={(e) => {
                                e.preventDefault();
                                // Use GSAP smooth scroll if available
                                if ((window as any).smoother) {
                                    (window as any).smoother.scrollTo(link.href, true);
                                } else {
                                    const target = document.querySelector(link.href);
                                    if (target) {
                                        target.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start'
                                        });
                                    }
                                }
                            }}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden p-2 text-white"
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </button>

                {/* CTA Button */}
                <ShimmerButton
                    ref={ctaButtonRef}
                    className="hidden lg:inline-flex items-center uppercase text-black px-6 py-3"
                    shimmerColor="#FF6B35"
                    background="white"
                    borderRadius="12px"
                    onClick={() => {
                        // Use GSAP smooth scroll if available
                        if ((window as any).smoother) {
                            (window as any).smoother.scrollTo("#contact", true);
                        } else {
                            const contactSection = document.getElementById('contact');
                            if (contactSection) {
                                contactSection.scrollIntoView({ behavior: 'smooth' });
                            }
                        }
                    }}
                >
                    GET IN TOUCH
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </ShimmerButton>
            </div>
            
            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-brand-dark/95 backdrop-blur-md border-t border-gray-800/50">
                    <nav className="max-w-7xl mx-auto px-6 py-6 space-y-4">
                        {navLinks.map((link, i) => (
                            <a
                                key={i}
                                href={link.href}
                                className="block text-xs font-bold tracking-widest text-white hover:text-brand-orange transition-colors py-2 uppercase"
                                onClick={(e) => {
                                    e.preventDefault();
                                    // Use GSAP smooth scroll if available
                                    if ((window as any).smoother) {
                                        (window as any).smoother.scrollTo(link.href, true);
                                    } else {
                                        const target = document.querySelector(link.href);
                                        if (target) {
                                            target.scrollIntoView({
                                                behavior: 'smooth',
                                                block: 'start'
                                            });
                                        }
                                    }
                                    setMobileMenuOpen(false);
                                }}
                            >
                                {link.label}
                            </a>
                        ))}
                        <ShimmerButton
                            className="flex items-center justify-center w-full text-center mt-4 uppercase text-black px-6 py-3"
                            shimmerColor="#FF6B35"
                            background="white"
                            borderRadius="12px"
                            onClick={() => {
                                // Use GSAP smooth scroll if available
                                if ((window as any).smoother) {
                                    (window as any).smoother.scrollTo("#contact", true);
                                } else {
                                    const contactSection = document.getElementById('contact');
                                    if (contactSection) {
                                        contactSection.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }
                                setMobileMenuOpen(false);
                            }}
                        >
                            GET IN TOUCH
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </ShimmerButton>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
