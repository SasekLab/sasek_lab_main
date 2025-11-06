import React from 'react';

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
);

const Team = () => (
    <div className="py-16 sm:py-24 bg-white text-black" id="about">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p 
                className="text-sm font-semibold tracking-widest text-gray-500 uppercase"
                data-animate="fade-in"
            >
                ABOUT SASEK LABS
            </p>
            <h2 
                className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight"
                data-animate="fade-in"
                data-animate-delay="100"
            >
                Your <span className="text-brand-orange">Digital Transformation</span> Partner
            </h2>
            <p 
                className="mt-6 max-w-3xl text-lg text-gray-600"
                data-animate="fade-in"
                data-animate-delay="200"
            >
                SASEK Labs specializes in creating stunning websites and intelligent automation solutions for businesses worldwide. We combine deep understanding of local markets with cutting-edge global technology standards to deliver transformative results.
            </p>
            {/* Cards removed - content ready for future updates */}
        </div>
    </div>
);

export default Team;
