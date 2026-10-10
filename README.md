# Gaurav Girish Rathod — Personal Portfolio

The personal portfolio website of Gaurav Girish Rathod, highlighting projects and research across computer vision, machine learning systems, quantitative risk modeling, and C++ software.

Live site: [portfolio-gaurav-girish-rathod.vercel.app](https://portfolio-gaurav-girish-rathod.vercel.app)

---

## Architecture and Overview

The website is engineered as a responsive single-page application centered around a dynamic sky progression that transitions from dawn to night as the visitor navigates down the page.

### Key Technical Aspects

* **Graphics Pipeline**: Procedural WebGL 3D layer powered by Three.js and React Three Fiber. The scene renders a custom pearl sun with fractional Brownian motion (FBM) noise erosion, particle shockwaves, and moonlight reconstruction. Deferred execution via `requestIdleCallback` ensures fast First Contentful Paint.
* **Motion & Scroll Choreography**: Inertial scrolling managed by Lenis, synchronized with GSAP (`ScrollTrigger`, `SplitText`) for 3D headline character scattering and perspective card entrances.
* **Performance Optimizations**: Offscreen animation pausing using `IntersectionObserver` (`data-paused` attribute), CSS variable updates for high-frequency cursor/scroll tracking to eliminate React re-renders, and lightweight CSS orb fallbacks when WebGL is unavailable or motion is reduced.
* **Accessibility**: Comprehensive `prefers-reduced-motion` support across CSS keyframes, GSAP timelines, Lenis scroll easing, and WebGL canvas loops.

---

## Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework & Build** | React 19, TypeScript, Vite 6 | Application framework and build tooling |
| **Styling** | Tailwind CSS v4 | Utility-first styling with custom design tokens and tone switching |
| **3D Graphics & Shaders** | Three.js, @react-three/fiber, @react-three/drei | Procedural WebGL canvas with custom GLSL shaders |
| **Animation & Scrubbing** | GSAP 3 (ScrollTrigger, SplitText), @gsap/react | Scroll-driven layout transitions and text scatter effects |
| **Smooth Scroll** | Lenis | Inertial scrolling bound to the GSAP animation ticker |
| **Icons** | Lucide React | Clean, scalable interface iconography |

---

## Development

### Prerequisites

* Node.js 18 or higher
* npm 9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/gvrathodd/Portfolio.git
cd Portfolio

# Install dependencies
npm install
```

### Running Locally

```bash
npm run dev
```

The development server runs at `http://localhost:5173`.

### Production Build

```bash
npm run build
```

Production artifacts are generated in the `dist/` directory.

---

## Project Structure

```
├── public/                 # Static assets, branding icons, and resume PDF
├── src/
│   ├── components/         # UI components and layout sections
│   │   ├── three/          # WebGL Canvas, GLSL shaders, and Three.js scenes
│   │   ├── Band.tsx        # Dynamic sky band wrappers with tone switching
│   │   ├── Hero.tsx        # Landing stage with real-time clock and animations
│   │   ├── Projects.tsx    # Interactive project showcase with APK/source links
│   │   └── ...
│   ├── data/
│   │   └── portfolioData.ts # Central data source for portfolio content
│   ├── App.tsx             # Main application layout and coordinator
│   ├── index.css           # Tailwind configuration and design system styles
│   └── main.tsx            # Application entry point
├── package.json
└── vite.config.ts
```

---

## License

This repository is maintained for personal portfolio presentation. All rights reserved.
