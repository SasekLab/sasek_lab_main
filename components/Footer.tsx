import React from 'react';

const Footer = () => (
    <footer className="bg-brand-dark text-gray-400 text-sm relative" data-animate="fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="text-center mb-8 flex items-center justify-center gap-4">
                <img
                    src="https://s76r76lcog.ufs.sh/f/7TPlciUQ16AemJSJCcnurbY4oPp3qCvGKalestyZHizEnIBx"
                    alt="SASEK Labs Logo"
                    className="h-8 w-auto"
                />
                <p className="text-gray-300 text-base sm:text-lg">Designed for Impact. Engineered for Growth.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center text-center">
                <div className="font-bold text-white text-xs sm:text-sm">
                    {/* Empty since logo moved to header */}
                </div>

            </div>
            <div className="mt-8 sm:mt-12 border-t border-gray-800 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                <div></div>
                <p className="text-xs sm:text-sm text-white">© 2026 SASEK Labs. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

export default Footer;