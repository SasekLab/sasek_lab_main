# SASEK Labs Website Design System & Style Guide

> **AI Agent Directive**: This style guide defines the complete design system for SASEK Labs. All new components, sections, and modifications **MUST** strictly adhere to these patterns to maintain visual consistency across the website.

## Table of Contents
1. [Color System](#color-system)
2. [Typography System](#typography-system)
3. [Layout Patterns](#layout-patterns)
4. [Component Design Patterns](#component-design-patterns)
5. [Animation System](#animation-system)
6. [Interactive Elements](#interactive-elements)
7. [Section Structure](#section-structure)
8. [Responsive Design](#responsive-design)
9. [Implementation Rules](#implementation-rules)

---

## Color System

### Primary Brand Colors
```css
:root {
  --color-brand-orange: #F97316;  /* Primary accent color */
  --color-brand-dark: #111111;    /* Main background for dark sections */
  --color-white: #FFFFFF;         /* White backgrounds and text */
  --color-black: #000000;         /* Pure black for text */
}
```

### Extended Color Palette
```css
/* Light Theme Colors */
--color-gray-50: #F9FAFB;
--color-gray-100: #F3F4F6;
--color-gray-200: #E5E7EB;
--color-gray-300: #D1D5DB;
--color-gray-400: #9CA3AF;
--color-gray-500: #6B7280;
--color-gray-600: #4B5563;
--color-gray-700: #374151;
--color-gray-800: #1F2937;
--color-gray-900: #111827;

/* Gradient Accents */
--gradient-brand: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
--gradient-blue: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
--gradient-purple: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%);
--gradient-green: linear-gradient(135deg, #10B981 0%, #059669 100%);
```

### Color Usage Patterns
- **Dark Sections**: `bg-brand-dark text-white` (Hero, Process, Contact, Footer)
- **Light Sections**: `bg-white text-black` (ClientWins, Priority, Team, Testimonials)
- **Gray Sections**: `bg-gray-50 text-black` (Services, CaseStudies)
- **Accent Text**: `text-brand-orange` for highlights and CTAs
- **Gradients**: Used for text highlights, buttons, and decorative elements

---

## Typography System

### Font Family
```css
font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
```

### Typography Scale
```css
/* Display Text */
.text-6xl { font-size: 60px; line-height: 1.1; }  /* Hero headlines */
.text-5xl { font-size: 48px; line-height: 1.1; }  /* Section headlines */
.text-4xl { font-size: 36px; line-height: 1.2; }  /* Subheadlines */

/* Headings */
.text-3xl { font-size: 30px; line-height: 1.2; }
.text-2xl { font-size: 24px; line-height: 1.3; }
.text-xl { font-size: 20px; line-height: 1.4; }

/* Body Text */
.text-lg { font-size: 18px; line-height: 1.6; }
.text-base { font-size: 16px; line-height: 1.6; }
.text-sm { font-size: 14px; line-height: 1.5; }
.text-xs { font-size: 12px; line-height: 1.4; }
```

### Font Weights
- **Light**: `font-light` (300)
- **Normal**: `font-normal` (400)
- **Medium**: `font-medium` (500)
- **Semibold**: `font-semibold` (600)
- **Bold**: `font-bold` (700)
- **Extrabold**: `font-extrabold` (800)

### Typography Hierarchy
```tsx
{/* Section Headlines */}
<h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
  Headline Text <span className="text-brand-orange">Highlight</span>
</h2>

{/* Service/Feature Titles */}
<h3 className="text-2xl font-bold text-gray-900 mb-2">
  Service Name
</h3>

{/* Subheadings */}
<h4 className="text-lg font-semibold text-gray-700">
  Subheading
</h4>

{/* Body Text */}
<p className="text-gray-600">
  Description text content.
</p>

{/* Small Labels */}
<p className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
  Label Text
</p>
```

---

## Layout Patterns

### Container System
```tsx
<div className="max-w-7xl mx-auto px-6 lg:px-8">
  {/* Content */}
</div>
```

### Section Spacing
```tsx
<section className="py-16 sm:py-24 lg:py-32">
  {/* Section Content */}
</section>
```

### Background Alternation Pattern
```tsx
{/* Dark Section */}
<section className="bg-brand-dark text-white py-16 sm:py-24 lg:py-32">

{/* Light Section */}
<section className="bg-white text-black py-16 sm:py-24 lg:py-32">

{/* Gray Section */}
<section className="bg-gray-50 text-black py-16 sm:py-24 lg:py-32">
```

### Grid Systems
```tsx
/* 2-Column Grid (Services/Features) */
<div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-2 lg:gap-12">
  {/* Cards */}
</div>

/* 3-Column Grid (Features/Stats) */
<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
  {/* Items */}
</div>

/* 4-Column Grid (Stats/Small Items) */
<div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
  {/* Items */}
</div>
```

---

## Component Design Patterns

### Card Design System

#### Standard Service Card
```tsx
<div className="group/card relative flex flex-col overflow-hidden transform-gpu transition-all duration-500 hover:scale-105 hover:-translate-y-2">
  {/* Shadow Layers */}
  <div className="absolute inset-0 rounded-3xl shadow-2xl group-hover/card:shadow-3xl transition-shadow duration-500">
    <div className="absolute inset-0 rounded-3xl shadow-blue-500/20 group-hover/card:shadow-blue-500/40"></div>
  </div>

  {/* Glass Morphism Background */}
  <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/50 to-white/30 backdrop-blur-2xl border border-white/50 rounded-3xl group-hover/card:border-white/70 transition-all duration-500">
    <div className="absolute inset-0 rounded-3xl shadow-inner"></div>
  </div>

  {/* Animated Gradient Border */}
  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 animate-gradient-rotate"></div>

  {/* Content */}
  <div className="relative flex flex-col justify-between flex-1 p-10 lg:py-12 lg:px-12">
    {/* Card Content */}
  </div>
</div>
```

#### Card Corner Accents (Optional)
```tsx
{/* Corner accent brackets */}
<div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-blue-400/50 group-hover/card:border-blue-400/70 transition-colors duration-300"></div>
<div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-purple-400/50 group-hover/card:border-purple-400/70 transition-colors duration-300"></div>
<div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-pink-400/50 group-hover/card:border-pink-400/70 transition-colors duration-300"></div>
<div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-blue-400/50 group-hover/card:border-blue-400/70 transition-colors duration-300"></div>
```

### Button Patterns

#### ShimmerButton (Primary CTA)
```tsx
<ShimmerButton
  className="shadow-2xl"
  background="bg-brand-orange"
>
  <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 dark:text-white dark:to-slate-900">
    Button Text
  </span>
</ShimmerButton>
```

#### Standard Button
```tsx
<button className="inline-flex items-center justify-center rounded-lg bg-brand-orange px-8 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:bg-brand-orange/90 hover:shadow-xl hover:scale-105">
  Button Text
</button>
```

### Icon Styling
```tsx
<div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-lg group-hover/icon:shadow-xl transition-shadow duration-300">
  {/* Icon content */}
</div>
```

---

## Animation System

### GSAP Scroll Animations
```tsx
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Standard scroll-triggered animation pattern
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    // Fade in from bottom
    gsap.fromTo('.animate-element',
      {
        y: 60,
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.trigger-element',
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, sectionRef);

  return () => ctx.revert();
}, []);
```

### CSS Keyframe Animations
```css
/* Shimmer Effect */
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite linear;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
}

/* Gradient Rotation */
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

/* Pulse Animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

### Hover Animations
```tsx
// Standard hover effect
<div className="transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl">
  {/* Content */}
</div>

// Icon hover effect
<div className="transform transition-all duration-300 group-hover/icon:rotate-12 group-hover/icon:scale-110">
  {/* Icon */}
</div>

// Text gradient hover
<span className="bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent group-hover/card:from-blue-600 group-hover/card:to-purple-600 transition-all duration-500">
  Text Content
</span>
```

---

## Interactive Elements

### Hover States
```tsx
/* Card Hover */
group-hover/card:scale-105
group-hover/card:-translate-y-2
group-hover/card:shadow-3xl
group-hover/card:border-white/70

/* Icon Hover */
group-hover/icon:rotate-12
group-hover/icon:scale-110
group-hover/icon:shadow-xl

/* Text Hover */
group-hover:from-blue-600
group-hover:to-purple-600
```

### Focus States
```tsx
// Button focus
focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2

// Input focus
focus:border-brand-orange focus:ring-1 focus:ring-brand-orange
```

### Loading States
```tsx
// Skeleton loading
<div className="animate-pulse bg-gray-200 rounded-lg h-4 w-3/4"></div>

// Spinner loading
<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-orange"></div>
```

---

## Section Structure

### Standard Section Template
```tsx
<section className="py-16 sm:py-24 lg:py-32 bg-[background-color] text-[text-color]">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    {/* Section Header */}
    <div className="text-center mb-16">
      <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase mb-4">
        Section Label
      </p>
      <h2 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight">
        Main Headline <span className="text-brand-orange">Highlight</span>
      </h2>
      <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
        Section description text that provides context and value proposition.
      </p>
    </div>

    {/* Section Content */}
    <div className="relative">
      {/* Grid, cards, or other content */}
    </div>
  </div>
</section>
```

### LazySection Pattern
```tsx
<LazySection rootMargin="[distance]" className="[background-color] text-[text-color]">
  <section>
    <Component />
  </section>
</LazySection>

// Example rootMargin values:
// ClientWins: rootMargin="100px"
// Services: rootMargin="200px"
// Priority: rootMargin="300px"
// Process: rootMargin="400px"
// Team: rootMargin="500px"
// CaseStudies: rootMargin="600px"
// Testimonials: rootMargin="700px"
// Contact: rootMargin="800px"
```

---

## Responsive Design

### Breakpoint System
```css
/* Mobile (default) */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Small desktops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large desktops */
```

### Responsive Typography
```tsx
<h2 className="text-4xl sm:text-5xl font-extrabold">
  {/* Scales from 36px to 48px */}
</h2>

<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
  {/* 1 column mobile, 2 tablet, 3+ desktop */}
</div>
```

### Mobile-First Patterns
```tsx
// Base styles (mobile-first)
<div className="py-16">

// Enhanced for larger screens
<div className="py-16 sm:py-24 lg:py-32">

// Layout adjustments
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
```

---

## Implementation Rules

### 1. **Strict Adherence Required**
- **NEVER** deviate from the documented patterns
- **ALWAYS** use the specified class names and values
- **MAINTAIN** consistency across all components

### 2. **Color Usage**
- **ALWAYS** use CSS variables for brand colors
- **NEVER** hardcode color values except white/black
- **FOLLOW** the background alternation pattern strictly

### 3. **Typography Rules**
- **ALWAYS** use Inter font family
- **MAINTAIN** the specified hierarchy and scales
- **NEVER** use font sizes outside the defined scale

### 4. **Spacing System**
- **USE** the defined container and section patterns
- **MAINTAIN** consistent spacing units (4, 8, 12, 16, 24, 32)
- **FOLLOW** the py-16/24/32 pattern for sections

### 5. **Animation Guidelines**
- **USE** GSAP for scroll-triggered animations
- **IMPLEMENT** hover states with transition-all duration-300
- **INCLUDE** proper cleanup functions for GSAP animations

### 6. **Component Architecture**
- **FOLLOW** the card design patterns exactly
- **USE** the specified border-radius values (rounded-3xl for cards)
- **IMPLEMENT** glass morphism effects where appropriate

### 7. **Performance Requirements**
- **USE** LazySection for performance optimization
- **INCLUDE** proper animation cleanup
- **OPTIMIZE** images and assets appropriately

### 8. **Accessibility Standards**
- **INCLUDE** proper focus states
- **MAINTAIN** color contrast ratios
- **PROVIDE** semantic HTML structure

---

## Quick Reference Cheat Sheet

### Common Classes
```tsx
// Section styling
"py-16 sm:py-24 lg:py-32"
"max-w-7xl mx-auto px-6 lg:px-8"
"text-center mb-16"

// Headlines
"text-4xl sm:text-5xl font-extrabold tracking-tight"
"text-brand-orange"

// Card styling
"group/card relative"
"rounded-3xl"
"backdrop-blur-2xl"
"transition-all duration-500"
"hover:scale-105 hover:-translate-y-2"

// Text styling
"text-gray-600" // Body text
"text-gray-500 uppercase tracking-widest" // Labels
"font-semibold" // Medium emphasis
"font-bold" // Strong emphasis

// Animations
"animate-pulse"
"transition-all duration-300"
"group-hover:scale-105"
```

### Color Combinations
```tsx
// Dark sections
bg-brand-dark text-white

// Light sections
bg-white text-black

// Accent colors
text-brand-orange
bg-brand-orange
border-brand-orange
```

---

## AI Agent Checklist

Before implementing any new component or section, verify:

- [ ] Colors follow the documented system
- [ ] Typography uses the defined scale and hierarchy
- [ ] Layout follows the container and spacing patterns
- [ ] Component design matches the established patterns
- [ ] Animations use the correct GSAP patterns
- [ ] Responsive breakpoints are implemented correctly
- [ ] Interactive states follow the hover/focus patterns
- [ ] Performance optimizations (LazySection) are included
- [ ] Accessibility standards are met
- [ ] Code follows the established architecture patterns

**Remember**: Consistency is paramount. When in doubt, refer to existing components and follow their patterns exactly.