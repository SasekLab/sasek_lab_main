import React, { useState } from 'react';
import { ShineBorder } from './ui/shine-border';
import { ShimmerButton } from './ui/shimmer-button';
import { Confetti } from './ui/confetti';

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
    };
    
    return (
    <div className="py-12 sm:py-16 md:py-24" id="contact">
        <div className="section-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight" data-animate="fade-in">
                Ready to Transform <br className="hidden sm:block" />
                <span className="text-brand-orange">Your Business?</span>
            </h2>
            <p className="mt-4 text-lg text-gray-300 max-w-3xl" data-animate="fade-in">
                Don't let outdated technology hold you back. Join successful businesses worldwide who have already transformed their operations with SASEK Labs.
            </p>
            
            <div className="mt-12 grid lg:grid-cols-2 gap-8 mb-16">
                <div className="bg-gray-800/50 p-8 rounded-2xl hover-lift" data-animate="slide-right">
                    <h3 className="text-2xl font-bold mb-4">For Businesses</h3>
                    <p className="text-gray-300 mb-6">Get a free consultation and discover how we can automate your processes and create a website that drives real results.</p>
                </div>
                <div className="bg-gray-800/50 p-8 rounded-2xl hover-lift" data-animate="slide-left">
                    <h3 className="text-2xl font-bold mb-4">For Individuals</h3>
                    <p className="text-gray-300 mb-6">Whether you're launching a startup or growing your personal brand, we have solutions tailored for your needs.</p>
                </div>
            </div>

            <div id="contact-form" className="mt-12 sm:mt-16 grid lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-16">
                <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="relative">
                            <label htmlFor="name" className="text-xs font-bold text-gray-400">YOUR NAME</label>
                            <div className="relative">
                                <input type="text" id="name" placeholder="ENTER YOUR NAME *" className="w-full bg-gray-900/50 text-white placeholder:text-gray-400 outline-none py-4 px-4 h-12 text-sm font-medium rounded-md border-2 border-transparent relative z-20"/>
                                <ShineBorder shineColor="#FF6B35" borderWidth={2} className="absolute inset-0 rounded-md" />
                            </div>
                        </div>
                        <div className="relative">
                            <label htmlFor="email" className="text-xs font-bold text-gray-400">YOUR EMAIL</label>
                            <div className="relative">
                                <input type="email" id="email" placeholder="ENTER YOUR EMAIL *" className="w-full bg-gray-900/50 text-white placeholder:text-gray-400 outline-none py-4 px-4 h-12 text-sm font-medium rounded-md border-2 border-transparent relative z-20"/>
                                <ShineBorder shineColor="#FF6B35" borderWidth={2} className="absolute inset-0 rounded-md" />
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <label htmlFor="message" className="text-xs font-bold text-gray-400">MESSAGE</label>
                        <div className="relative">
                            <textarea id="message" placeholder="" rows={4} className="w-full bg-gray-900/50 text-white placeholder:text-gray-400 outline-none py-4 px-4 resize-none min-h-[100px] text-sm font-medium rounded-md border-2 border-transparent relative z-20"></textarea>
                            <ShineBorder shineColor="#FF6B35" borderWidth={2} className="absolute inset-0 rounded-md" />
                        </div>
                    </div>
                        <div>
                        <ShimmerButton type="submit" shimmerColor="#FF6B35" background="#FF6B35" className="px-8 py-4">
                            SUBMIT
                        </ShimmerButton>
                    </div>
                    {submitted && (
                        <Confetti
                            className="absolute inset-0 pointer-events-none"
                            options={{
                                particleCount: 100,
                                spread: 70,
                                origin: { y: 0.6 }
                            }}
                        />
                    )}
                </form>
                <div className="space-y-10">
                    <div>
                        <h3 className="font-bold">Business Inquiries</h3>
                        <div className="mt-4">
                            <a href="mailto:saseklabs@gmail.com" className="text-sm font-semibold text-brand-orange hover:underline">saseklabs@gmail.com</a>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Connect With Us</h3>
                        <div className="flex items-center space-x-4">
                            <a href="https://www.instagram.com/saseklabs/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                                <svg className="w-6 h-6 text-brand-orange" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/company/saseklabs/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                                <svg className="w-6 h-6 text-brand-orange" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                            </a>
                            <a href="#" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                                <svg className="w-6 h-6 text-brand-orange" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Contact;
