import React, { useEffect, useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { InteractiveConsole } from './components/InteractiveConsole';

export const App: React.FC = () => {
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  // Silky-smooth flowing spring cursor follower
  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { mass: 1.5, tension: 160, friction: 30 },
  }));

  useEffect(() => {
    // Only enable cursor glow on non-touch devices
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsPointerDevice(mediaQuery.matches);

    const handleMouseMove = (e: MouseEvent) => {
      api.start({ x: e.clientX, y: e.clientY });
    };

    if (mediaQuery.matches) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [api]);

  return (
    <div className="relative min-h-screen bg-[#060913] text-slate-100 selection:bg-sky-500/30 selection:text-sky-200">
      {/* Background Subtle Flowing Grid Texture */}
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Fluid React Spring Cursor Spotlight (Desktop only) */}
      {isPointerDevice && (
        <animated.div
          className="fixed pointer-events-none rounded-full blur-[140px] opacity-35 z-0"
          style={{
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(14, 165, 233, 0.45) 0%, rgba(6, 182, 212, 0.25) 35%, rgba(3, 105, 161, 0.1) 60%, transparent 80%)',
            transform: x.to((valX) => `translate3d(${valX - 300}px, ${y.get() - 300}px, 0)`),
          }}
        />
      )}

      {/* Main Content Layout */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Projects />
          <Experience />
          <Skills />
          <Contact />
        </main>
        <Footer />
        {/* Floating Developer Terminal with Spring Drawer */}
        <InteractiveConsole />
      </div>
    </div>
  );
};

export default App;
