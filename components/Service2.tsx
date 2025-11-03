import React from 'react';
import { Star } from 'lucide-react';

const Service2 = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-green-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-orange-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 border-2 border-blue-200/30 rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 border-2 border-purple-200/30 rotate-12 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
      <div className="absolute top-1/3 right-20 w-12 h-12 bg-gradient-to-br from-green-200/20 to-teal-200/20 rounded-lg animate-bounce"></div>

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="text-center relative">
            {/* Enhanced heading with gradient text */}
            <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase mb-4">Our Services</p>
            <h2 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight relative">
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                Services That Drive
              </span>
              <span className="bg-gradient-to-r from-brand-orange via-orange-500 to-brand-orange bg-clip-text text-transparent animate-pulse drop-shadow-lg">
                {" "}Real Results
              </span>
              {/* Decorative underline - positioned under "Real Results" */}
              <div className="absolute -bottom-2 left-[60%] transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-brand-orange to-orange-500 rounded-full"></div>
            </h2>
            </div>

          <div className="relative mt-16 md:mt-24">
            {/* Enhanced background gradient */}
            <div className="absolute -inset-x-4 inset-y-20 md:-inset-x-8 md:-inset-y-16">
              <div
                className="w-full h-full max-w-6xl mx-auto rounded-3xl opacity-40 blur-2xl filter animate-pulse"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)'
                }}
              ></div>
            </div>

            {/* Asymmetric grid layout - Both cards on same row */}
            <div className="relative grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-2 lg:gap-12 xl:gap-16">
              {/* First card - Enhanced with all effects */}
              <div className="group/card relative flex flex-col overflow-hidden transform-gpu transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                {/* Multiple shadow layers for 3D effect */}
                <div className="absolute inset-0 rounded-3xl shadow-2xl group-hover/card:shadow-3xl transition-shadow duration-500">
                  <div className="absolute inset-0 rounded-3xl shadow-blue-500/20 group-hover/card:shadow-blue-500/40"></div>
                  <div className="absolute inset-0 rounded-3xl shadow-purple-500/20 group-hover/card:shadow-purple-500/40"></div>
                </div>

                {/* Enhanced glass morphism background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/50 to-white/30 backdrop-blur-2xl border border-white/50 rounded-3xl group-hover/card:border-white/70 transition-all duration-500">
                  {/* Inner shadow for depth */}
                  <div className="absolute inset-0 rounded-3xl shadow-inner"></div>
                </div>

                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 animate-gradient-rotate"></div>

                {/* Corner accent brackets */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-blue-400/50 group-hover/card:border-blue-400/70 transition-colors duration-300"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-purple-400/50 group-hover/card:border-purple-400/70 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-pink-400/50 group-hover/card:border-pink-400/70 transition-colors duration-300"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-blue-400/50 group-hover/card:border-blue-400/70 transition-colors duration-300"></div>

                {/* Enhanced floating particles */}
                <div className="absolute top-6 left-6 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse shadow-lg group-hover/card:scale-150 transition-transform duration-300"></div>
                <div className="absolute top-12 right-8 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-8 left-10 w-3 h-3 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 right-12 w-2 h-2 bg-white/60 rounded-full animate-ping"></div>

                {/* Ambient glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"></div>

                <div className="relative flex flex-col justify-between flex-1 p-10 lg:py-12 lg:px-12">
                  <div className="flex-1">
                    <div className="flex items-center mb-8 group/icon">
                      <div className="mr-6 transform transition-all duration-300 group-hover/icon:rotate-12 group-hover/icon:scale-110">
                        <div className="relative">
                          <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-lg group-hover/icon:shadow-xl transition-shadow duration-300">
                            <span className="text-gray-600 text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ICON</span>
                          </div>
                          {/* Icon glow */}
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-lg opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 font-pj mb-2 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent group-hover/card:from-blue-600 group-hover/card:to-purple-600 transition-all duration-500">
                          High Converting Websites
                        </h3>
                        <h4 className="text-lg font-semibold text-gray-700 font-pj">
                          3D & Animated Websites
                        </h4>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-gray-600">
                        We craft stunning, quality websites that combine sophisticated animations with fully responsive designs. Every element is meticulously designed to deliver exceptional user experiences across all devices while driving meaningful conversions for your business.
                      </p>
                    </div>
                  </div>

                  {/* Decorative element */}
                  <div className="mt-8 flex justify-center">
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full opacity-60 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>

              {/* Second card - Similar enhancements with green/teal theme */}
              <div className="group/card relative flex flex-col overflow-hidden transform-gpu transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                {/* Multiple shadow layers for 3D effect */}
                <div className="absolute inset-0 rounded-3xl shadow-2xl group-hover/card:shadow-3xl transition-shadow duration-500">
                  <div className="absolute inset-0 rounded-3xl shadow-green-500/20 group-hover/card:shadow-green-500/40"></div>
                  <div className="absolute inset-0 rounded-3xl shadow-teal-500/20 group-hover/card:shadow-teal-500/40"></div>
                </div>

                {/* Enhanced glass morphism background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/50 to-white/30 backdrop-blur-2xl border border-white/50 rounded-3xl group-hover/card:border-white/70 transition-all duration-500">
                  {/* Inner shadow for depth */}
                  <div className="absolute inset-0 rounded-3xl shadow-inner"></div>
                </div>

                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-400/20 via-teal-400/20 to-cyan-400/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 animate-gradient-rotate"></div>

                {/* Corner accent brackets */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-green-400/50 group-hover/card:border-green-400/70 transition-colors duration-300"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-teal-400/50 group-hover/card:border-teal-400/70 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-cyan-400/50 group-hover/card:border-cyan-400/70 transition-colors duration-300"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-green-400/50 group-hover/card:border-green-400/70 transition-colors duration-300"></div>

                {/* Enhanced floating particles */}
                <div className="absolute top-6 left-6 w-3 h-3 bg-gradient-to-r from-green-400 to-teal-400 rounded-full animate-pulse shadow-lg group-hover/card:scale-150 transition-transform duration-300"></div>
                <div className="absolute top-12 right-8 w-4 h-4 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-8 left-10 w-3 h-3 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 right-12 w-2 h-2 bg-white/60 rounded-full animate-ping"></div>

                {/* Ambient glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-3xl blur-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"></div>

                <div className="relative flex flex-col justify-between flex-1 p-10 lg:py-12 lg:px-12">
                  <div className="flex-1">
                    <div className="flex items-center mb-8 group/icon">
                      <div className="mr-6 transform transition-all duration-300 group-hover/icon:rotate-12 group-hover/icon:scale-110">
                        <div className="relative">
                          <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-lg group-hover/icon:shadow-xl transition-shadow duration-300">
                            <span className="text-gray-600 text-sm font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">ICON</span>
                          </div>
                          {/* Icon glow */}
                          <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-2xl blur-lg opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 font-pj mb-2 bg-gradient-to-r from-gray-900 to-green-600 bg-clip-text text-transparent group-hover/card:from-green-600 group-hover/card:to-teal-600 transition-all duration-500">
                          AI Automation
                        </h3>
                        <h4 className="text-lg font-semibold text-gray-700 font-pj">
                          AI Business Automation
                        </h4>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-gray-600">
                        Intelligent workflows that eliminate repetitive tasks with custom automation solutions, system integrations, and chatbots tailored for your business.
                      </p>
                    </div>
                  </div>

                  {/* Decorative element */}
                  <div className="mt-8 flex justify-center">
                    <div className="w-24 h-1 bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400 rounded-full opacity-60 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom styles for gradient animation */}
      <style jsx>{`
        @keyframes gradient-rotate {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-rotate {
          background-size: 200% 200%;
          animation: gradient-rotate 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Service2;