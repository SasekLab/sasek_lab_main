import React, { useState } from 'react';
import { ShimmerButton } from './ui/shimmer-button';

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navLinks = [
        { label: "SERVICES", href: "#services" },
        { label: "PORTFOLIO", href: "#portfolio" },
        { label: "ABOUT", href: "#about" },
        { label: "CONTACT", href: "#contact" }
    ];
    
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/80 backdrop-blur-md border-b border-gray-800/50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex justify-between items-center">
                <a href="/" className="text-xl font-bold tracking-tight">
                    <span className="text-brand-orange">SASEK</span> Labs
                </a>
                
                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-10">
                    {navLinks.map((link, i) => (
                        <a key={i} href={link.href} className="text-xs font-bold tracking-widest text-white hover:text-brand-orange transition-colors uppercase">
                            {link.label}
                        </a>
                    ))}
                </nav>
                
                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden p-2 text-white"
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
                
                {/* CTA Button */}
                <ShimmerButton
                    className="hidden lg:inline-flex items-center uppercase text-black px-6 py-3"
                    shimmerColor="#FF6B35"
                    background="white"
                    borderRadius="12px"
                    onClick={() => {
                        const contactSection = document.getElementById('contact');
                        if (contactSection) {
                            contactSection.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                >
                    GET IN TOUCH
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </ShimmerButton>
            </div>
            
            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-brand-dark/95 backdrop-blur-md border-t border-gray-800/50">
                    <nav className="max-w-7xl mx-auto px-6 py-6 space-y-4">
                        {navLinks.map((link, i) => (
                            <a 
                                key={i} 
                                href={link.href} 
                                className="block text-xs font-bold tracking-widest text-white hover:text-brand-orange transition-colors py-2 uppercase"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                        <ShimmerButton
                            className="flex items-center justify-center w-full text-center mt-4 uppercase text-black px-6 py-3"
                            shimmerColor="#FF6B35"
                            background="white"
                            borderRadius="12px"
                            onClick={() => {
                                const contactSection = document.getElementById('contact');
                                if (contactSection) {
                                    contactSection.scrollIntoView({ behavior: 'smooth' });
                                }
                                setMobileMenuOpen(false);
                            }}
                        >
                            GET IN TOUCH
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </ShimmerButton>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
