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
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">READY TO TRANSFORM</p>
            <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight" data-animate="fade-in">
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
                    <a href="#contact-form" className="inline-block px-8 py-4 bg-brand-orange text-white text-sm font-bold rounded-md hover:bg-orange-600 transition-colors clickable" data-animate="pulse">
                        Schedule Free Consultation
                    </a>
                </div>
                <div className="bg-gray-800/50 p-8 rounded-2xl hover-lift" data-animate="slide-left">
                    <h3 className="text-2xl font-bold mb-4">For Individuals</h3>
                    <p className="text-gray-300 mb-6">Whether you're launching a startup or growing your personal brand, we have solutions tailored for your needs.</p>
                    <a href="#contact-form" className="inline-block px-8 py-4 bg-gray-700 text-white text-sm font-bold rounded-md hover:bg-gray-600 transition-colors" data-animate="pulse" data-animate-delay="100">
                        Get Custom Quote
                    </a>
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
                            <textarea id="message" placeholder="TELL US ABOUT YOUR PROJECT" rows={4} className="w-full bg-gray-900/50 text-white placeholder:text-gray-400 outline-none py-4 px-4 resize-none min-h-[100px] text-sm font-medium rounded-md border-2 border-transparent relative z-20"></textarea>
                            <ShineBorder shineColor="#FF6B35" borderWidth={2} className="absolute inset-0 rounded-md" />
                        </div>
                    </div>
                    <div>
                        <button type="button" className="px-5 py-3 bg-gray-800 text-sm font-semibold rounded-md hover:bg-gray-700">ATTACH FILE</button>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400">YOUR BUDGET FOR THIS PROJECT?</label>
                        <div className="mt-4 flex flex-wrap gap-3">
                            {['UP TO $10K', '$10-$20K', '$20-$50K', '$50-$100K', '>$100K'].map(b => (
                                <button key={b} type="button" className="px-4 py-2 border border-gray-700 rounded-full text-sm text-white hover:bg-gray-800 focus:bg-white focus:text-black">{b}</button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <ShimmerButton type="submit" shimmerColor="#FF6B35" background="#FF6B35" className="px-8 py-4">
                            SUBMIT
                        </ShimmerButton>
                        <p className="mt-4 text-xs text-gray-500">BY CLICKING THIS BUTTON YOU ACCEPT <a href="#" className="underline">TERMS OF SERVICE</a> AND <a href="#" className="underline">PRIVACY POLICY</a>.</p>
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
                        <div className="mt-4 space-y-3">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
                                    <span className="text-xs text-brand-orange">[ICON]</span>
                                </div>
                                <a href="mailto:saseklabs@gmail.com" className="text-sm font-semibold text-brand-orange hover:underline">saseklabs@gmail.com</a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
                                    <span className="text-xs text-brand-orange">[ICON]</span>
                                </div>
                                <p className="text-sm text-gray-400">Serving businesses worldwide</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Connect With Us</h3>
                        <div className="flex items-center space-x-4">
                            <a href="#" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                                <span className="text-xs text-brand-orange">[LI]</span>
                            </a>
                            <a href="#" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                                <span className="text-xs text-brand-orange">[IG]</span>
                            </a>
                            <a href="#" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                                <span className="text-xs text-brand-orange">[X]</span>
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
