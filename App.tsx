import React, { useEffect } from 'react';
import { initPerformanceMonitor } from './utils/performanceMonitor';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import CaseStudies from './components/CaseStudies';
import Team from './components/Team';
import Priority from './components/Priority';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LazySection from './components/LazySection';
import SmoothScroll from './components/SmoothScroll';

export default function App() {
  // Initialize performance monitoring
  useEffect(() => {
    initPerformanceMonitor();
  }, []);

  return (
    <div className="bg-brand-dark text-white font-sans">
      <Header />
      <SmoothScroll>
        <main className="relative">
          {/* Hero Section */}
          <section className="bg-brand-dark">
            <Hero />
          </section>

          {/* Services */}
          <LazySection rootMargin="200px" className="bg-brand-dark text-white">
            <section>
              <Services />
            </section>
          </LazySection>

          {/* Why Choose Us */}
          <LazySection rootMargin="300px" className="bg-white text-black">
            <section>
              <Priority />
            </section>
          </LazySection>

          {/* Process */}
          <LazySection rootMargin="400px" className="bg-brand-dark text-white">
            <section>
              <Process />
            </section>
          </LazySection>

          {/* Team */}
          <LazySection rootMargin="500px" className="bg-white text-black">
            <section>
              <Team />
            </section>
          </LazySection>

          {/* Case Studies */}
          <LazySection rootMargin="600px" className="bg-gray-50 text-black">
            <section>
              <CaseStudies />
            </section>
          </LazySection>

          {/* Contact */}
          <LazySection rootMargin="800px" className="bg-brand-dark text-white">
            <section>
              <Contact />
            </section>
          </LazySection>
        </main>
      </SmoothScroll>

      <Footer />
    </div>
  );
}