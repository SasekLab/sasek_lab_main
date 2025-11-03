interface PerformanceMetrics {
  cls: number;
  lcp: number;
  fid: number;
  ttfb: number;
  domContentLoaded: number;
  loadComplete: number;
  memoryUsage?: {
    used: number;
    total: number;
    limit: number;
  };
}

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: PerformanceObserver[] = [];
  private isProduction: boolean;

  constructor() {
    this.isProduction = process.env.NODE_ENV === 'production';
    this.init();
  }

  private init() {
    if (typeof window === 'undefined' || !this.isProduction) return;

    // Observe Core Web Vitals
    this.observeCLS();
    this.observeLCP();
    this.observeFID();
    this.observeTTFB();

    // Measure navigation timing
    this.measureNavigationTiming();

    // Monitor memory usage
    this.monitorMemoryUsage();

    // Log performance data periodically
    setInterval(() => this.logMetrics(), 30000); // Every 30 seconds
  }

  private observeCLS() {
    try {
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            this.metrics.cls = (this.metrics.cls || 0) + (entry as any).value;
          }
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);
    } catch (e) {
      console.warn('CLS not supported');
    }
  }

  private observeLCP() {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.lcp = lastEntry.startTime;
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(lcpObserver);
    } catch (e) {
      console.warn('LCP not supported');
    }
  }

  private observeFID() {
    try {
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.metrics.fid = (entry as any).processingStart - entry.startTime;
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.push(fidObserver);
    } catch (e) {
      console.warn('FID not supported');
    }
  }

  private observeTTFB() {
    try {
      const ttfbObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.metrics.ttfb = entry.responseStart - entry.requestStart;
        }
      });
      ttfbObserver.observe({ entryTypes: ['navigation'] });
      this.observers.push(ttfbObserver);
    } catch (e) {
      console.warn('TTFB not supported');
    }
  }

  private measureNavigationTiming() {
    if (performance.timing) {
      const timing = performance.timing;
      this.metrics.domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;
      this.metrics.loadComplete = timing.loadEventEnd - timing.navigationStart;
    }
  }

  private monitorMemoryUsage() {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      this.metrics.memoryUsage = {
        used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
        total: Math.round(memory.totalJSHeapSize / 1024 / 1024),
        limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024)
      };
    }
  }

  private logMetrics() {
    if (!this.isProduction) return;

    const metrics = this.getMetrics();

    // Log to console in production
    console.group('🚀 Performance Metrics');
    console.log('CLS:', metrics.cls?.toFixed(3) || 'N/A');
    console.log('LCP:', Math.round(metrics.lcp || 0) + 'ms');
    console.log('FID:', Math.round(metrics.fid || 0) + 'ms');
    console.log('TTFB:', Math.round(metrics.ttfb || 0) + 'ms');
    console.log('DOM Content Loaded:', Math.round(metrics.domContentLoaded || 0) + 'ms');
    console.log('Load Complete:', Math.round(metrics.loadComplete || 0) + 'ms');

    if (metrics.memoryUsage) {
      console.log('Memory Usage:', `${metrics.memoryUsage.used}MB / ${metrics.memoryUsage.total}MB`);
    }
    console.groupEnd();

    // Check for performance issues
    this.checkPerformanceIssues(metrics);
  }

  private checkPerformanceIssues(metrics: Partial<PerformanceMetrics>) {
    const issues: string[] = [];

    if (metrics.cls && metrics.cls > 0.1) {
      issues.push(`High CLS: ${metrics.cls.toFixed(3)} (should be < 0.1)`);
    }

    if (metrics.lcp && metrics.lcp > 2500) {
      issues.push(`Slow LCP: ${Math.round(metrics.lcp)}ms (should be < 2500ms)`);
    }

    if (metrics.fid && metrics.fid > 100) {
      issues.push(`High FID: ${Math.round(metrics.fid)}ms (should be < 100ms)`);
    }

    if (metrics.ttfb && metrics.ttfb > 600) {
      issues.push(`High TTFB: ${Math.round(metrics.ttfb)}ms (should be < 600ms)`);
    }

    if (issues.length > 0) {
      console.warn('⚠️ Performance Issues Detected:', issues);
    }
  }

  public getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  public logPageLoad() {
    if (!this.isProduction) return;

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const pageLoad = Math.round(navigation.loadEventEnd - navigation.startTime);

    console.log(`📄 Page loaded in ${pageLoad}ms`);
  }

  public destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Initialize performance monitor
let performanceMonitor: PerformanceMonitor;

export const initPerformanceMonitor = () => {
  if (typeof window !== 'undefined') {
    performanceMonitor = new PerformanceMonitor();

    // Log page load after DOM is ready
    if (document.readyState === 'complete') {
      performanceMonitor.logPageLoad();
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => performanceMonitor.logPageLoad(), 0);
      });
    }
  }
};

export const getPerformanceMetrics = () => {
  return performanceMonitor?.getMetrics() || {};
};

export default PerformanceMonitor;