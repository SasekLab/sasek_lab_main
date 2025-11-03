// Animated Background Components for BentoGrid Services
import React from 'react';

export const WebsiteBackground = () => (
  <div className="absolute inset-0 overflow-hidden rounded-xl">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
    <div className="absolute top-4 left-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg opacity-20 animate-pulse" />
    <div className="absolute bottom-4 right-4 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg opacity-20 animate-pulse delay-300" />
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full opacity-30 animate-bounce" />
    </div>
    {/* Floating geometric shapes */}
    <div className="absolute top-8 right-8 w-6 h-6 border-2 border-blue-300 opacity-20 animate-spin" style={{ animationDuration: '8s' }} />
    <div className="absolute bottom-8 left-8 w-4 h-4 bg-indigo-300 rounded-full opacity-20 animate-ping" />
  </div>
);

export const AutomationBackground = () => (
  <div className="absolute inset-0 overflow-hidden rounded-xl">
    <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50" />
    <div className="absolute top-3 right-3 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-15 animate-pulse" />
    <div className="absolute bottom-3 left-3 w-14 h-14 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl opacity-15 animate-pulse delay-500" />
    {/* Gear-like animation */}
    <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-6 h-6 bg-emerald-400 rounded-full opacity-25 animate-spin" style={{ animationDuration: '4s' }} />
    </div>
    <div className="absolute top-1/3 right-1/3 transform translate-x-1/2 -translate-y-1/2">
      <div className="w-4 h-4 bg-teal-400 rounded-sm opacity-25 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
    </div>
    {/* Circuit-like lines */}
    <div className="absolute inset-0 opacity-10">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <path d="M20 20 L80 20 L80 80 L20 80 Z" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-green-500" />
        <circle cx="20" cy="20" r="2" fill="currentColor" className="text-green-500" />
        <circle cx="80" cy="80" r="2" fill="currentColor" className="text-emerald-500" />
      </svg>
    </div>
  </div>
);

export const ConsultingBackground = () => (
  <div className="absolute inset-0 overflow-hidden rounded-xl">
    <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50" />
    <div className="absolute top-2 left-2 w-18 h-18 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl opacity-15 animate-pulse" />
    <div className="absolute bottom-2 right-2 w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg opacity-15 animate-pulse delay-700" />
    {/* Chart-like visualization */}
    <div className="absolute bottom-4 left-4 right-4 h-12 opacity-20">
      <div className="flex items-end justify-between h-full">
        <div className="w-2 bg-orange-400 rounded-t animate-pulse" style={{ height: '40%' }} />
        <div className="w-2 bg-amber-400 rounded-t animate-pulse delay-100" style={{ height: '70%' }} />
        <div className="w-2 bg-yellow-400 rounded-t animate-pulse delay-200" style={{ height: '50%' }} />
        <div className="w-2 bg-orange-500 rounded-t animate-pulse delay-300" style={{ height: '85%' }} />
        <div className="w-2 bg-red-400 rounded-t animate-pulse delay-400" style={{ height: '60%' }} />
      </div>
    </div>
    {/* Floating elements */}
    <div className="absolute top-6 right-6 w-3 h-3 bg-orange-400 rounded-full opacity-25 animate-bounce" style={{ animationDelay: '1s' }} />
    <div className="absolute top-12 left-12 w-2 h-2 bg-amber-400 opacity-25 animate-ping" />
  </div>
);