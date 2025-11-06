import React from 'react';
import InteractiveNet from './InteractiveNet';
import { AnimatedGradientText } from './ui/animated-gradient-text';
import { BlurFade } from './ui/blur-fade';
import { RainbowButton } from './ui/rainbow-button';

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
);

const Hero = () => (
    <>
        {/* Main Hero Banner with InteractiveNet - Separate from Header */}
        <div className="relative pt-40 pb-16 sm:pt-48 sm:pb-24 overflow-hidden min-h-screen flex items-center justify-center">
            {/* Interactive Net Background */}
            <InteractiveNet />
            
            {/* Content Layer */}
            <div className="relative z-10 w-full">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Web and Automation Agency</p>
                    <h1 className="mt-4 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
                        <AnimatedGradientText colorFrom="#FF6B35" colorTo="#FFFFFF">
                            Transform Your Business with Stunning Websites & Smart Automation
                        </AnimatedGradientText>
                    </h1>
                    <BlurFade delay={0.3}>
                        <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto">
                            SASEK Labs creates visually striking websites that captivate customers and intelligent automation systems that eliminate repetitive tasks. Focus on growth while we handle the tech.
                        </p>
                    </BlurFade>
                    <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
                        <RainbowButton size="lg" className="w-full sm:w-auto" asChild>
                            <a href="#contact">Get Your Free Consultation</a>
                        </RainbowButton>
                        <a href="#portfolio" className="w-full sm:w-auto px-8 py-4 bg-gray-700/50 text-white text-sm font-bold rounded-md hover:bg-gray-600/50 flex items-center justify-center transition-colors" data-animate="scale-in" data-animate-delay="100">
                            View Our Portfolio <ArrowRightIcon />
                        </a>
                    </div>
                </div>
            </div>
        </div>

        {/* Secondary Hero Section - No InteractiveNet */}
        <div className="py-16 sm:py-24 bg-brand-dark">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                    <div className="bg-gray-800/20 p-2 rounded-2xl shadow-2xl" data-animate="slide-right">
                        {/* [HERO-VISUAL] - Main hero background/3D element */}
                        <div className="bg-gradient-to-br from-brand-orange/20 to-purple-600/20 rounded-xl aspect-video overflow-hidden">
                            <img
                                src="https://s76r76lcog.ufs.sh/f/7TPlciUQ16AeaTMRnGLp2Rges5CdbK9F7yU3IvTNjLuZ1Soz"
                                alt="3D Animation"
                                className="w-full h-full object-cover rounded-xl"
                            />
                        </div>
                    </div>
                    <div className="mt-10 lg:mt-0" data-animate="slide-left">
                        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">Your Digital Transformation <span className="text-brand-orange">Partners</span></h2>
                        <p className="mt-6 text-gray-300 leading-relaxed">
                            We're not just another web agency. We're digital transformation specialists who combine cutting-edge 3D website design with intelligent automation solutions.
                        </p>
                        <p className="mt-8 text-sm font-semibold tracking-widest text-gray-400 uppercase">Trusted by Businesses Worldwide</p>
                        <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 text-gray-300">
                            <span className="text-base sm:text-lg md:text-xl font-bold">Local Expertise</span>
                            <span className="text-sm sm:text-base md:text-lg font-bold">•</span>
                            <span className="text-base sm:text-lg md:text-xl font-bold">Global Standards</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
);

export default Hero;
