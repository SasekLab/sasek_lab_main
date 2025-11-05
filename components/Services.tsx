import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BarChart3,
  TrendingUp,
  Target,
  ArrowRight,
  Sparkles,
  Lightbulb
} from 'lucide-react';
import { ShimmerButton } from './ui/shimmer-button';

gsap.registerPlugin(ScrollTrigger);

// Professional service icons
const DigitalTransformationIcon = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-2xl opacity-80"></div>
    <BarChart3 className="relative w-8 h-8 text-blue-600" />
    <div className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
  </div>
);

const BusinessIntelligenceIcon = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100 rounded-2xl opacity-80"></div>
    <TrendingUp className="relative w-8 h-8 text-emerald-600" />
    <div className="absolute bottom-0 left-0 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
  </div>
);

// Background components for each service
const DigitalTransformationBackground = () => (
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

const BusinessIntelligenceBackground = () => (
  <div className="absolute inset-0 overflow-hidden rounded-xl">
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50" />
    <div className="absolute top-3 right-3 w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full opacity-15 animate-pulse" />
    <div className="absolute bottom-3 left-3 w-14 h-14 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl opacity-15 animate-pulse" style={{ animationDelay: '0.5s' }} />
    <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-6 h-6 bg-emerald-400 rounded-full opacity-25 animate-spin" style={{ animationDuration: '4s' }} />
    </div>
    <div className="absolute top-1/3 right-1/3 transform translate-x-1/2 -translate-y-1/2">
      <div className="w-4 h-4 bg-teal-400 rounded-sm opacity-25 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
    </div>
  </div>
);

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      name: "Digital Transformation",
      title: "Strategic Digital Evolution",
      description: "Comprehensive digital transformation services that modernize your business infrastructure, streamline operations, and position your organization for sustainable growth in the digital economy. We integrate cutting-edge technologies with proven methodologies to deliver measurable business outcomes.",
      features: [
        "Cloud Architecture & Migration",
        "Process Automation & Optimization",
        "Data-Driven Decision Systems",
        "Enterprise Integration Solutions"
      ],
      icon: <DigitalTransformationIcon />,
      background: <DigitalTransformationBackground />,
      gradient: "from-blue-600 via-indigo-600 to-purple-600",
      cta: "Explore Digital Transformation"
    },
    {
      name: "Business Intelligence",
      title: "Advanced Analytics & Insights",
      description: "Transform your raw data into actionable business intelligence with our advanced analytics solutions. We implement powerful data visualization, predictive modeling, and real-time reporting systems that empower informed decision-making across all organizational levels.",
      features: [
        "Predictive Analytics & Modeling",
        "Real-Time Dashboard Development",
        "Data Warehouse Architecture",
        "Business Performance Metrics"
      ],
      icon: <BusinessIntelligenceIcon />,
      background: <BusinessIntelligenceBackground />,
      gradient: "from-emerald-600 via-teal-600 to-cyan-600",
      cta: "Discover Business Intelligence"
    }
  ];

  useLayoutEffect(() => {
    if (!sectionRef.current || !titleRef.current || !cardsRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
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

      // Service cards with advanced staggered animation
      const serviceCards = cardsRef.current.querySelectorAll('.service-card');

      const cardsAnim = gsap.fromTo(serviceCards,
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
            trigger: cardsRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
            once: true
          },
          force3D: true,
          clearProps: "transform,opacity"
        }
      );

      // Parallax effect for section background
      const parallaxAnim = gsap.to(sectionRef.current, {
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

      // Floating animation for decorative elements
      const floatingElements = sectionRef.current.querySelectorAll('.floating-element');
      floatingElements.forEach((element, index) => {
        gsap.to(element, {
          y: -20,
          duration: 3 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.2
        });
      });

    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={sectionRef} className="py-16 sm:py-24 lg:py-32 bg-gray-50 text-black relative overflow-hidden" id="services">
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border-2 border-blue-200/30 rotate-45 floating-element" style={{ animationDuration: '20s' }}></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 border-2 border-purple-200/30 rotate-12 floating-element" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
      <div className="absolute top-1/3 right-20 w-12 h-12 bg-gradient-to-br from-green-200/20 to-teal-200/20 rounded-lg floating-element" style={{ animationDuration: '4s' }}></div>

      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-teal-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-orange-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div ref={titleRef} className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase mb-4">Our Expertise</p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight">
            Professional Services That Drive
            <span className="text-brand-orange"> Business Excellence</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            From strategic digital transformation to advanced business intelligence,
            we deliver comprehensive solutions that empower your organization to thrive
            in today's competitive landscape.
          </p>
        </div>

        <div ref={cardsRef} className="relative">
          <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-2 lg:gap-12 xl:gap-16">
            {services.map((service, index) => (
              <div
                key={service.name}
                className={`service-card group/card relative flex flex-col overflow-hidden transform-gpu transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                  index === 0 ? 'md:mt-8' : 'md:mb-8'
                }`}
              >
                {/* Multiple shadow layers for 3D effect */}
                <div className="absolute inset-0 rounded-3xl shadow-2xl group-hover/card:shadow-3xl transition-shadow duration-500">
                  <div className={`absolute inset-0 rounded-3xl shadow-blue-500/20 group-hover/card:shadow-blue-500/40`}></div>
                  <div className={`absolute inset-0 rounded-3xl shadow-purple-500/20 group-hover/card:shadow-purple-500/40`}></div>
                </div>

                {/* Enhanced glass morphism background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/50 to-white/30 backdrop-blur-2xl border border-white/50 rounded-3xl group-hover/card:border-white/70 transition-all duration-500">
                  <div className="absolute inset-0 rounded-3xl shadow-inner"></div>
                </div>

                {/* Animated gradient border */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.gradient}/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 animate-gradient-rotate`}></div>

                {/* Corner accent brackets */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-blue-400/50 group-hover/card:border-blue-400/70 transition-colors duration-300"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-purple-400/50 group-hover/card:border-purple-400/70 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-pink-400/50 group-hover/card:border-pink-400/70 transition-colors duration-300"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-blue-400/50 group-hover/card:border-blue-400/70 transition-colors duration-300"></div>

                {/* Enhanced floating particles */}
                <div className="absolute top-6 left-6 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse shadow-lg group-hover/card:scale-150 transition-transform duration-300"></div>
                <div className="absolute top-12 right-8 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-8 left-10 w-3 h-3 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 right-12 w-2 h-2 bg-white/60 rounded-full animate-ping"></div>

                {/* Ambient glow effect */}
                <div className={`absolute -inset-2 bg-gradient-to-r ${service.gradient}/20 rounded-3xl blur-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700`}></div>

                <div className="relative flex flex-col justify-between flex-1 p-10 lg:py-12 lg:px-12">
                  <div className="flex-1">
                    <div className="flex items-center mb-8 group/icon">
                      <div className="mr-6 transform transition-all duration-300 group-hover/icon:rotate-12 group-hover/icon:scale-110">
                        <div className="relative">
                          <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-lg group-hover/icon:shadow-xl transition-shadow duration-300">
                            <div className="transform transition-transform duration-300 group-hover/icon:scale-110">
                              {service.icon}
                            </div>
                          </div>
                          {/* Icon glow */}
                          <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient}/20 rounded-2xl blur-lg opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300`}></div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-2xl font-bold text-gray-900 font-pj mb-2 bg-gradient-to-r from-gray-900 ${index === 0 ? 'to-blue-600' : 'to-emerald-600'} bg-clip-text text-transparent group-hover/card:${index === 0 ? 'from-blue-600' : 'from-emerald-600'} group-hover/card:to-purple-600 transition-all duration-500`}>
                          {service.title}
                        </h3>
                        <h4 className="text-lg font-semibold text-gray-700 font-pj">
                          {service.name}
                        </h4>
                      </div>
                    </div>

                    <div className="mt-6">
                      <p className="text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="mt-8 space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${index === 0 ? 'from-blue-500 to-purple-500' : 'from-emerald-500 to-teal-500'} flex items-center justify-center mr-3 flex-shrink-0`}>
                            <Lightbulb className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm text-gray-600 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-8">
                    <ShimmerButton
                      className="shadow-2xl w-full"
                      background={index === 0 ? "bg-blue-600" : "bg-emerald-600"}
                    >
                      <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white flex items-center justify-center gap-2">
                        {service.cta}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </ShimmerButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-orange" />
            <div className="w-32 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full opacity-60"></div>
            <Sparkles className="w-5 h-5 text-brand-orange" />
          </div>
        </div>
      </div>

      </div>
  );
};

export default Services;