import React from 'react';

const Services = () => {
    const services = [
        {
            title: "WEBSITE DEVELOPMENT",
            description: "We create responsive, high-performance websites using cutting-edge technologies. Our sites are optimized for speed, SEO, and user experience to ensure your business stands out online.",
            icon: "[ICON-WEBSITE]"
        },
        {
            title: "AI AND AUTOMATION",
            description: "Leverage the power of artificial intelligence to automate repetitive tasks, analyze data, and make smarter business decisions. Our AI solutions give you a competitive edge.",
            icon: "[ICON-AUTOMATION]"
        }
    ];

    return (
        <div className="py-16 sm:py-24" id="services">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div>
                    <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">WHAT WE OFFER</p>
                    <h2 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight">
                        Our <span className="text-brand-orange">Services</span>
                    </h2>
                </div>

                {/* Services Cards - Static Grid Layout */}
                <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {services.map((service, index) => (
                        <div key={service.title} className="group">
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
                                            <span className="text-xs text-brand-orange font-bold">{service.icon}</span>
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