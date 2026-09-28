import React, { useEffect, useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { KineticMarquee } from './components/KineticMarquee';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  // Silky-smooth flowing spring cursor follower
  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { mass: 1.5, tension: 140, friction: 32 },
  }));

  useEffect(() => {
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
    <div className="relative min-h-screen bg-[#070c18] text-slate-100 selection:bg-sky-400 selection:text-slate-950 overflow-x-hidden">
      {/* Background Soft Luminous Sky Aura Orbs */}
      <div className="fixed top-0 left-1/4 -translate-x-1/2 w-[700px] h-[550px] rounded-full bg-gradient-to-tr from-sky-500/15 via-sky-400/10 to-transparent blur-[130px] pointer-events-none animate-aurora" />
      <div className="fixed top-1/3 -right-24 w-[650px] h-[600px] rounded-full bg-gradient-to-bl from-blue-600/15 via-sky-400/10 to-transparent blur-[140px] pointer-events-none" />
      <div className="fixed bottom-10 left-10 w-[600px] h-[500px] rounded-full bg-gradient-to-tr from-sky-600/10 via-cyan-400/10 to-transparent blur-[140px] pointer-events-none" />

      {/* Subtle modern soft grid pattern */}
      <div className="fixed inset-0 bg-grid-soft pointer-events-none opacity-40" />

      {/* Fluid React Spring Cursor Spotlight (Desktop only) */}
      {isPointerDevice && (
        <animated.div
          className="fixed pointer-events-none rounded-full blur-[140px] opacity-25 z-0"
          style={{
            width: '550px',
            height: '550px',
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, rgba(14, 165, 233, 0.2) 40%, transparent 75%)',
            transform: x.to((valX) => `translate3d(${valX - 275}px, ${y.get() - 275}px, 0)`),
          }}
        />
      )}

      {/* Main Content Layout */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <KineticMarquee />
          <Projects />
          <Experience />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
