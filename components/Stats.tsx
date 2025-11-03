import React from 'react';
import { MagicCard } from './ui/magic-card';
import { BorderBeam } from './ui/border-beam';

const Stats = () => {
    const stats = [
        { value: 300, suffix: '%', label: 'Lead Generation Increase' },
        { value: 25, suffix: ' hrs', label: 'Saved Per Week on Average' },
        { value: 200, suffix: '%', label: 'Improvement in Mobile Conversions' },
        { value: 100, suffix: '%', label: 'Accuracy in Automated Processes' },
    ];

    // Duplicate stats array for infinite loop effect
    const duplicatedStats = [...stats, ...stats];

    return (
        <div className="py-16 sm:py-24 border-t border-gray-800 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <p className="text-center text-sm font-semibold tracking-widest text-gray-400 uppercase mb-12">SASEK Labs by the Numbers</p>

                {/* Infinite horizontal scroll container */}
                <div className="relative overflow-hidden">
                    <div className="flex animate-scroll-horizontal">
                        {duplicatedStats.map((stat, i) => (
                            <div key={i} className="flex-shrink-0 w-64 mx-3">
                                <MagicCard gradientFrom="#FF6B35" gradientTo="#1A1A1A" className="p-8 text-center h-full">
                                    <BorderBeam colorFrom="#FF6B35" colorTo="#FFFFFF" size={100} duration={6} delay={i * 0.5} />
                                    <div className="text-4xl lg:text-5xl font-extrabold text-black flex items-center justify-center">
                                        <span>{stat.value}</span>
                                        <span>{stat.suffix}</span>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-400 max-w-[150px] mx-auto">{stat.label}</p>
                                </MagicCard>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Custom styles for infinite scroll animation */}
            <style jsx>{`
                @keyframes scroll-horizontal {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                .animate-scroll-horizontal {
                    animation: scroll-horizontal 20s linear infinite;
                    display: flex;
                    width: fit-content;
                }
            `}</style>
        </div>
    );
};

export default Stats;