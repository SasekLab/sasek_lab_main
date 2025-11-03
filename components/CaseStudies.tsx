import React from 'react';
import { Safari } from './ui/safari';
import { Iphone } from './ui/iphone';

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
);

const CaseStudies = () => {
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

    return (
        <div className="py-16 sm:py-24 bg-white text-black space-y-24" id="portfolio">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase">Our Portfolio</p>
                <h2 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight">
                    Success Stories That <span className="text-brand-orange">Speak Volumes</span>
                </h2>
            </div>
            <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-24">
                {cases.map((c, i) => (
                    <div key={i} className={`grid lg:grid-cols-2 gap-12 items-center ${i === 1 ? 'lg:grid-flow-col-dense' : ''}`} data-animate="fade-in">
                        <div className={`${i === 1 ? 'lg:col-start-2' : ''} flex justify-center items-center`} data-animate="slide-up">
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
                            <a href="#contact" className="mt-8 inline-block px-8 py-3 bg-brand-orange text-white text-sm font-bold rounded-md hover:bg-orange-600 transition-colors">
                                START YOUR PROJECT
                            </a>
                        </div>
                    </div>
                ))}
                <div className="text-center pt-12">
                    <p className="text-gray-600 mb-6">View more success stories from businesses worldwide</p>
                    <a href="#contact" className="text-sm font-bold flex items-center justify-center hover:text-brand-orange transition-colors">
                        DISCUSS YOUR PROJECT <ArrowRightIcon/>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CaseStudies;
