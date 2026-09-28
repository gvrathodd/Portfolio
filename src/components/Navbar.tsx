import React, { useState, useEffect } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { portfolioData } from '../data/portfolioData';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'projects', 'experience', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#hero', id: 'hero' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const mobileMenuSpring = useSpring({
    transform: mobileMenuOpen ? 'translateY(0%)' : 'translateY(-110%)',
    opacity: mobileMenuOpen ? 1 : 0,
    config: { tension: 320, friction: 28 },
  });

  return (
    <>
      {/* Floating Pill Dock (Watermelon UI & Godly style) */}
      <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav className="pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-5 py-2.5 rounded-full glass-pill border border-sky-400/25 shadow-2xl shadow-sky-950/40 backdrop-blur-2xl transition-all duration-300">
          {/* Brand Logo Monogram */}
          <a
            href="#hero"
            className="flex items-center gap-2 group font-semibold text-sm tracking-tight text-white hover:text-sky-300 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-sky-300 flex items-center justify-center text-slate-950 font-black text-xs shadow-md shadow-sky-500/25 group-hover:scale-105 transition-transform">
              GR
            </div>
            <span className="font-bold hidden sm:inline text-white">Gaurav</span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-full border border-sky-500/10">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-sky-500 text-slate-950 font-bold shadow-sm shadow-sky-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Resume CTA & Mobile Toggle */}
          <div className="flex items-center gap-2">
            <a
              href={portfolioData.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-sky-400 via-sky-500 to-blue-500 hover:from-sky-300 hover:to-sky-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-sky-500/20 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-full bg-slate-900/80 border border-sky-400/20 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Smooth Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-xl md:hidden pt-24 px-6 flex flex-col items-center"
          onClick={() => setMobileMenuOpen(false)}
        >
          <animated.div
            style={mobileMenuSpring}
            className="w-full max-w-sm rounded-3xl glass-card border border-sky-400/25 p-6 shadow-2xl flex flex-col gap-3 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-4 rounded-2xl text-sm font-semibold text-slate-200 hover:bg-sky-500/10 hover:text-sky-300 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3 border-t border-sky-500/15">
              <a
                href={portfolioData.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-full bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25"
              >
                <span>View Full Resume</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </animated.div>
        </div>
      )}
    </>
  );
};
