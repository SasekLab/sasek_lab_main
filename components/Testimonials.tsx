import React from 'react';

const Testimonials = () => {
    const testimonials = [
        {
            quote: "SASEK Labs transformed our outdated website into a stunning 3D experience that increased our online inquiries by 300%. Their automation solutions saved us 20 hours per week.",
            author: "Business Owner",
            location: "Africa",
            company: "Restaurant Chain",
            avatar: "[TESTIMONIAL-1-AVATAR]",
            logo: "[TESTIMONIAL-1-LOGO]"
        },
        {
            quote: "The team at SASEK Labs understood our vision perfectly. Our new website doesn't just look amazing – it actually helps us close more deals.",
            author: "Marketing Director",
            location: "Europe",
            company: "Retail Business",
            avatar: "[TESTIMONIAL-2-AVATAR]",
            logo: "[TESTIMONIAL-2-LOGO]"
        },
        {
            quote: "Best investment we've made for our business. The automated processes they set up have streamlined our operations completely.",
            author: "CEO",
            location: "Global",
            company: "Food Chain",
            avatar: "[TESTIMONIAL-3-AVATAR]",
            logo: "[TESTIMONIAL-3-LOGO]"
        },
    ];

    return (
        <div className="py-16 sm:py-24 bg-gray-50 text-black">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase text-center">Client Success Stories</p>
                <h2 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight text-center">
                    What Our Clients <span className="text-brand-orange">Are Saying</span>
                </h2>

                <div className="mt-16 grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl shadow-lg" data-animate="fade-in" data-animate-delay={i * 100}>
                            {/* Quote */}
                            <div className="mb-6">
                                <svg className="w-10 h-10 text-brand-orange mb-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                                <p className="text-gray-700 leading-relaxed italic">{testimonial.quote}</p>
                            </div>

                            {/* Author Info */}
                            <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                                {/* Avatar placeholder */}
                                <div className="w-12 h-12 bg-gradient-to-br from-brand-orange to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-xs">{testimonial.avatar}</span>
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-sm">{testimonial.author}</p>
                                    <p className="text-xs text-gray-500">{testimonial.location}</p>
                                    <p className="text-xs text-gray-400 mt-1">{testimonial.company}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-gray-600 mb-6">Join these successful businesses transforming their operations</p>
                    <a href="#contact" className="inline-block px-8 py-4 bg-brand-orange text-white text-sm font-bold rounded-md hover:bg-orange-600 transition-colors">
                        GET YOUR FREE CONSULTATION
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
