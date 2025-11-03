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
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div 
                    className="bg-gray-50 p-6 rounded-xl"
                    data-animate="slide-up"
                    data-animate-delay="300"
                >
                    <div className="w-12 h-12 bg-brand-orange/10 rounded-lg flex items-center justify-center mb-3">
                        <span className="text-xs text-brand-orange font-bold">[ICON-LOCAL]</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Local Expertise</h3>
                    <p className="text-gray-600 text-sm">
                        Deep understanding of regional market needs, business culture, and growth challenges.
                    </p>
                </div>
                <div 
                    className="bg-gray-50 p-6 rounded-xl"
                    data-animate="slide-up"
                    data-animate-delay="400"
                >
                    <div className="w-12 h-12 bg-brand-orange/10 rounded-lg flex items-center justify-center mb-3">
                        <span className="text-xs text-brand-orange font-bold">[ICON-GLOBAL]</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Global Standards</h3>
                    <p className="text-gray-600 text-sm">
                        World-class technology, design practices, and development methodologies.
                    </p>
                </div>
                <div 
                    className="bg-gray-50 p-6 rounded-xl"
                    data-animate="slide-up"
                    data-animate-delay="500"
                >
                    <div className="w-12 h-12 bg-brand-orange/10 rounded-lg flex items-center justify-center mb-3">
                        <span className="text-xs text-brand-orange font-bold">[ICON-RESULTS]</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Proven Results</h3>
                    <p className="text-gray-600 text-sm">
                        Track record of helping businesses worldwide increase revenue and efficiency.
                    </p>
                </div>
            </div>
            <div 
                className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
                data-animate="fade-in"
                data-animate-delay="600"
            >
                <div className="col-span-2 sm:col-span-2 lg:col-span-2 lg:row-span-2 rounded-2xl overflow-hidden aspect-square bg-gray-100 flex items-center justify-center">
                    <div className="text-center p-8">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-xs text-gray-400">[ICON]</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-500">[TEAM-PHOTO-MAIN]</span>
                        <p className="text-xs text-gray-400 mt-2">Team collaboration shot</p>
                    </div>
                </div>
                <div className="col-span-2 sm:col-span-1 lg:col-span-2 lg:row-span-2 rounded-2xl overflow-hidden aspect-square bg-gray-100 flex items-center justify-center">
                    <div className="text-center p-8">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-xs text-gray-400">[ICON]</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-500">[TEAM-PHOTO-OFFICE]</span>
                        <p className="text-xs text-gray-400 mt-2">Office workspace</p>
                    </div>
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square bg-gray-100 flex items-center justify-center">
                    <div className="text-center p-4">
                        <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-xs text-gray-400">[ICON]</span>
                        </div>
                        <span className="text-xs font-semibold text-gray-500">[TEAM-MEMBER-1]</span>
                    </div>
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square bg-gray-100 flex items-center justify-center">
                    <div className="text-center p-4">
                        <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-xs text-gray-400">[ICON]</span>
                        </div>
                        <span className="text-xs font-semibold text-gray-500">[TEAM-MEMBER-2]</span>
                    </div>
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square bg-gray-100 flex items-center justify-center">
                    <div className="text-center p-4">
                        <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-xs text-gray-400">[ICON]</span>
                        </div>
                        <span className="text-xs font-semibold text-gray-500">[TEAM-MEMBER-3]</span>
                    </div>
                </div>
                <div className="bg-brand-orange rounded-2xl p-6 sm:p-8 flex flex-col justify-center items-center text-center aspect-square text-white">
                    <p className="text-4xl sm:text-5xl font-extrabold">100%</p>
                    <p className="mt-2 text-sm sm:text-base font-semibold">Dedicated Team</p>
                    <a href="#contact" className="mt-3 sm:mt-4 text-xs sm:text-sm font-bold flex items-center hover:text-gray-900 transition-colors">MEET THE TEAM <ArrowRightIcon/></a>
                </div>
            </div>
        </div>
    </div>
);

export default Team;
