import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  useEffect(() => {
    // Only enable cursor glow on non-touch devices
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsPointerDevice(mediaQuery.matches);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    if (mediaQuery.matches) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#09090b] text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Background Subtle Grid Texture */}
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Interactive Cursor Spotlight (Desktop only) */}
      {isPointerDevice && (
        <div
          className="fixed pointer-events-none rounded-full blur-[140px] opacity-25 transition-transform duration-75 ease-out z-0"
          style={{
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, rgba(6, 182, 212, 0.2) 40%, transparent 70%)',
            left: `${mousePos.x - 300}px`,
            top: `${mousePos.y - 300}px`,
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
      </div>
    </div>
  );
};

export default App;
