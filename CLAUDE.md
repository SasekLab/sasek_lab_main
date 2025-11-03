# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "phenomenon-studio-clone", a React 19 + TypeScript landing page for a digital agency/consultancy. It's built with modern web technologies and focuses on high-performance animations and UI components.

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS v4 with custom animations
- **Motion**: Framer Motion (via `motion` package)
- **UI Components**: Custom components with Radix UI primitives
- **Icons**: Lucide React
- **Server**: Vite dev server on port 3000

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Setup

The project expects a `GEMINI_API_KEY` environment variable. Configure it in:
- `.env.local` file in the root directory
- Or set it as a system environment variable

## Architecture Overview

### Component Structure
The application follows a modular component architecture with clear separation:

```
App.tsx (main layout)
├── Header (navigation)
├── Hero (main landing section)
├── Stats (metrics display)
├── ClientWins (social proof)
├── StartupPartner (services)
├── Priority (value propositions)
├── Process (workflow)
├── Team (team showcase)
├── CaseStudies (portfolio)
├── Testimonials (customer feedback)
├── Contact (lead generation)
└── Footer (site footer)
```

### Key Architectural Patterns

1. **Section-based Layout**: Each landing page section is a separate component
2. **Centralized Exports**: All components exported from `components/index.ts`
3. **UI Component Library**: Reusable animated components in `components/ui/`
4. **Animation System**: Uses Framer Motion with custom Tailwind animations
5. **Color System**: Brand colors defined in CSS variables (`--color-brand-orange`, `--color-brand-dark`)

### Special Components

- **InteractiveNet**: Animated network visualization component
- **ServiceIcons/ServiceBackgrounds**: Service-specific visual elements
- **UI Components**: Advanced animated components like:
  - `AnimatedBeam`: Connection animations between elements
  - `MagicCard`: Interactive card with hover effects
  - `ShimmerButton`: Animated button with shimmer effect
  - `NumberTicker`: Animated number counting
  - `TextAnimate`: Text reveal animations

### Styling System

- **Tailwind v4**: Uses new Tailwind v4 syntax with `@theme` blocks
- **CSS Variables**: Custom brand colors and animation keyframes
- **Dark/Light Mode**: Built-in theme support via CSS classes
- **Custom Animations**: Extensive animation library defined in `index.css`

### Path Aliases

- `@/*`: Points to root directory (configured in both Vite and TypeScript)

## Development Workflow

1. **Adding New Sections**: Create component in `components/`, export from `index.ts`, import in `App.tsx`
2. **Modifying Content**: Data is typically hardcoded in component constants
3. **Styling**: Use Tailwind utility classes and brand color variables
4. **Animations**: Leverage existing UI components or create new ones with Framer Motion

## Key Files

- `App.tsx`: Main application layout and section organization
- `components/index.ts`: Central component exports
- `index.css`: Tailwind setup, custom animations, and CSS variables
- `vite.config.ts`: Build configuration with environment variable handling
- `tailwind.config.ts`: Tailwind configuration with custom theme
- `components.json`: shadcn/ui component configuration

## GSAP Animation Best Practices & Lessons Learned

### ⚠️ CRITICAL MISTAKES TO AVOID

1. **NEVER Assume Animations Work Without Testing**: Always use DevTools MCP to verify animations are actually working. Console logs alone are insufficient.

2. **Dynamic GSAP Import Issues**: When using dynamic imports, GSAP may not be available on window object. Make GSAP globally available:
   ```typescript
   window.gsap = gsap;
   window.ScrollTrigger = ScrollTrigger;
   ```

3. **ScrollTrigger Conflicts**: Multiple ScrollTrigger instances can conflict. Use manual scroll listeners when needed:
   ```typescript
   const handleScroll = () => {
     const rect = sectionRef.current.getBoundingClientRect();
     const progress = calculateScrollProgress(rect);
     gsap.set(elements, { rotationY: rotationValue });
   };
   window.addEventListener('scroll', handleScroll, { passive: true });
   ```

4. **Proper Cleanup**: Always remove event listeners and kill animations:
   ```typescript
   return () => {
     if (handleScroll) {
       window.removeEventListener('scroll', handleScroll);
     }
   };
   ```

5. **Scope Issues**: Define event handlers in outer scope to avoid "not defined" errors:
   ```typescript
   let handleScroll: (() => void) | null = null;
   // Inside useLayoutEffect:
   handleScroll = () => { /* implementation */ };
   ```

6. **Initial Visibility**: Never set opacity: 0 initially without proper entrance animation. Use opacity: 0.9-1.0 instead.

### ✅ BEST PRACTICES FOR ANIMATIONS

1. **TEST WITH DEVTOOLS MCP ALWAYS**: For any new animation feature:
   ```bash
   # Use Chrome DevTools MCP to:
   # 1. Navigate to page
   # 2. Take snapshots
   # 3. Check console for errors
   # 4. Test scroll behavior
   # 5. Verify transform values
   ```

2. **Debug Logging Strategy**: Add temporary console logs to track animation progress:
   ```typescript
   console.log('Animation progress:', {
     scrollTop: window.scrollY,
     elementTransform: window.getComputedStyle(element).transform,
     gsapValue: window.gsap.getProperty(element, 'rotationY')
   });
   ```

3. **Manual Scroll Triggers**: When ScrollTrigger conflicts occur, use manual scroll detection:
   ```typescript
   const triggerDistance = viewportHeight * 2;
   if (rect.top <= triggerDistance) {
     const progress = Math.min(1, Math.max(0, (triggerDistance - rect.top) / sectionHeight));
   }
   ```

4. **GSAP Best Practices**:
   - Use `force3D: true` for GPU acceleration
   - Use `transformStyle: "preserve-3d"` for 3D effects
   - Use `clearProps: "transform,opacity"` for cleanup
   - Use proper perspective values

5. **Animation Testing Workflow**:
   1. Implement feature
   2. Add debug logging
   3. Test with DevTools MCP
   4. Verify console shows expected values
   5. Remove debug logging once confirmed working

### 🔧 IMPLEMENTATION CHECKLIST

Before declaring any animation "working":

- [ ] **DevTools MCP Test**: Navigate to page and test functionality
- [ ] **Console Check**: No JavaScript errors in console
- [ ] **Visual Verification**: Animation actually visible to user
- [ ] **Value Testing**: Transform/property values change as expected
- [ ] **Scroll Test**: Scroll animations trigger at correct positions
- [ ] **Responsive Test**: Works on different screen sizes
- [ ] **Conflict Test**: No conflicts with existing animations
- [ ] **Cleanup Test**: Memory leaks prevented

### 📚 MEMORY OF SPECIFIC ISSUES

#### Card Turn Animation Implementation (Priority.tsx)
- **Issue**: Cards stuck at -15° rotation, not turning during scroll
- **Root Cause**: Scroll trigger condition `rect.top <= viewportHeight` never met
- **Solution**: Changed to `rect.top <= triggerDistance` where `triggerDistance = viewportHeight * 2`
- **Fix**: Manual scroll listener with proper progress calculation
- **Lesson**: Always verify scroll trigger conditions with actual measurements

#### GSAP Dynamic Import Issues
- **Issue**: `handleScroll is not defined` and GSAP targets not found
- **Root Cause**: Function scope issues and null refs
- **Solution**: Define handlers in outer scope, add null checks
- **Fix**: Proper TypeScript typing and cleanup functions
- **Lesson**: Dynamic imports need careful scope management

### 🚨 MANDATORY TESTING PROTOCOL

**ANY TIME a new animation feature is implemented:**

1. **Immediate DevTools MCP Testing**: Don't wait for user feedback
2. **Console Error Check**: Resolve all JavaScript errors first
3. **Functionality Verification**: Test the actual user experience
4. **Value Verification**: Confirm properties are changing correctly
5. **Only then declare as "working"**

**Never assume animations work based on code alone - always verify with actual browser testing using DevTools MCP.**

## CRITICAL ANIMATION FIXES - NEVER BREAK AGAIN

### 🚨 ISSUE: Sections from About Us onwards had no animations working

**Root Cause:** React `asChild` prop errors + LazySection IntersectionObserver failure causing sections to never render

### 🔧 COMPLETE SOLUTION IMPLEMENTED:

#### 1. React `asChild` Prop Errors - NEVER REPEAT THIS MISTAKE

**Problem:** Multiple button components passing `asChild` prop to DOM elements, causing React crashes

**Files Fixed:**
- `components/ui/rainbow-button.tsx:52` - Added `{...(asChild ? {} : { asChild })}`
- `components/ui/button.tsx:55` - Added `{...(asChild ? {} : { asChild })}`
- `components/Header.tsx:62,95` - Replaced `asChild` with onClick handlers for ShimmerButton

**Rule:** When using Radix UI Slot with `asChild`, ALWAYS filter out `asChild` from DOM props:
```tsx
{...(asChild ? {} : { asChild })}
```

#### 2. LazySection IntersectionObserver Failure - CRITICAL ANIMATION BLOCKER

**Problem:** LazySection placeholders showing but content never revealed, blocking all animations

**Symptoms to Watch For:**
- Only 1-2 sections visible instead of 9+
- Page height much smaller than expected
- Placeholders visible: `document.querySelectorAll('.animate-pulse').length > 0`
- No lazy content: `document.querySelectorAll('.lazy-content').length === 0`

**Immediate Fix:** Temporarily disable lazy loading:
```tsx
// In components/LazySection.tsx
const [isVisible, setIsVisible] = useState(true); // Was false
const [hasLoaded, setHasLoaded] = useState(true); // Was false
```

#### 3. DIAGNOSTIC CHECKLIST - Always run this when animations fail:

```javascript
// Console diagnostic to identify if sections are rendering
const diagnostic = {
  totalSections: document.querySelectorAll('section').length,
  lazyContents: document.querySelectorAll('.lazy-content').length,
  placeholders: document.querySelectorAll('.animate-pulse').length,
  pageHeight: document.body.scrollHeight,
  hasClientWins: document.body.innerText.includes('TRUSTED BY'),
  hasProcess: document.body.innerText.includes('PROCESS'),
  hasTeam: document.body.innerText.includes('TEAM'),
  hasContact: document.body.innerText.includes('CONTACT')
};

// Expected healthy results:
// totalSections: 9, lazyContents: 8, placeholders: 0-4, pageHeight: 11000+
```

#### 4. ANIMATION SYSTEM VERIFICATION PROTOCOL:

**Before declaring animations "working":**
1. **Section Count Check:** Must have 9+ sections visible
2. **Page Height Check:** Must be 11,000px+ (not 4,000px)
3. **Console Check:** No React errors about `asChild` props
4. **Animation Messages:** Look for "🎬 ClientWins animations started"
5. **Scroll Test:** Verify scroll animations trigger: "Scroll animations refreshed"

#### 5. MEMORY TRIGGERS - When to immediately check these issues:

**IMMEDIATE RED FLAGS:**
- User reports "animations don't work from X section onwards"
- Console shows: "React does not recognize the `%s` prop on a DOM element. asChild aschild"
- Page has suspiciously few sections visible
- LazySection placeholders remain visible
- IntersectionObserver not triggering content visibility

**IMMEDIATE ACTIONS:**
1. Check console for `asChild` errors
2. Verify section count with diagnostic script
3. Check LazySection visibility
4. Filter `asChild` props in button components
5. Temporarily disable lazy loading if needed

#### 6. PREVENTION RULES:

**Never Do:**
- Pass `asChild` prop to DOM elements without filtering
- Assume lazy loading works without testing
- Trust section count without verification
- Declare animations fixed without section visibility confirmation

**Always Do:**
- Filter `asChild` from DOM props in custom button components
- Verify all sections render before testing animations
- Use diagnostic script when animations fail
- Check IntersectionObserver functionality
- Test scroll-based animations thoroughly

**Files to Monitor:**
- Any button component using `asChild` prop
- `components/LazySection.tsx` - IntersectionObserver logic
- `App.tsx` - LazySection integration
- Any component with scroll-triggered animations

This fix ensures all sections render properly so their animations can function, preventing the complete animation failure that occurred from About Us section onwards.