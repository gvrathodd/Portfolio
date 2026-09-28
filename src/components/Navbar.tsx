import React, { useState, useEffect } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { portfolioData } from '../data/portfolioData';
import { Menu, X, FileDown, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Detect scroll to add slight shadow and backdrop enhancement
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'projects', 'experience', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 180;

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

  // Mobile menu spring animation
  const mobileMenuSpring = useSpring({
    transform: mobileMenuOpen ? 'translateY(0%) scale(1)' : 'translateY(-120%) scale(0.95)',
    opacity: mobileMenuOpen ? 1 : 0,
    config: { tension: 280, friction: 24 },
  });

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 sm:px-6 pt-4 sm:pt-6 pointer-events-none">
        <nav
          className={`pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 max-w-4xl w-full ${
            isScrolled
              ? 'glass-pill shadow-2xl shadow-sky-950/40 bg-slate-950/85 border-sky-500/20'
              : 'glass-panel bg-slate-950/65 border-sky-500/10'
          }`}
        >
          {/* Logo / Name */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 group text-slate-100 font-bold tracking-tight text-sm sm:text-base focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 to-cyan-300 p-[1.5px] shadow-sm shadow-sky-500/30">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-xs font-mono font-bold text-sky-200 group-hover:bg-gradient-to-tr group-hover:from-sky-400 group-hover:to-cyan-300 group-hover:text-slate-950 transition-all duration-200">
                GR
              </div>
            </div>
            <span className="hidden xs:inline font-semibold text-slate-200 group-hover:text-sky-300 transition-colors">
              {portfolioData.personal.preferredName}
            </span>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1 bg-slate-900/70 p-1 rounded-full border border-sky-500/15">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-sky-200 bg-sky-950/80 border border-sky-500/30 shadow-sm shadow-sky-500/20'
                      : 'text-slate-400 hover:text-sky-300 hover:bg-slate-800/40'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Right Action: Status Beacon & Resume */}
          <div className="flex items-center gap-2.5">
            {/* Pulsing Availability Beacon */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/25 text-[11px] font-mono text-sky-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400"></span>
              </span>
              <span>Available</span>
            </div>

            {/* Resume Button */}
            <a
              href={portfolioData.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-xs transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] shadow-md shadow-sky-500/25"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-full bg-slate-900 border border-sky-500/20 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-950/80 backdrop-blur-lg md:hidden pt-24 px-6"
          onClick={() => setMobileMenuOpen(false)}
        >
          <animated.div
            style={mobileMenuSpring}
            className="w-full bg-slate-950 border border-sky-500/20 rounded-3xl p-6 shadow-2xl flex flex-col gap-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Status Beacon on Mobile */}
            <div className="flex items-center justify-center gap-2 py-1.5 px-3 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-sky-300 mx-auto">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400"></span>
              </span>
              <span>Available for software & AI/ML roles</span>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-3 px-4 rounded-xl text-base font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-sky-950/60 border border-sky-500/30 text-sky-300'
                      : 'text-slate-300 hover:bg-slate-900/60'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-900 flex flex-col gap-2">
              <a
                href={portfolioData.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-sky-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25"
              >
                <FileDown className="w-4 h-4" />
                <span>View Full Resume</span>
              </a>
            </div>
          </animated.div>
        </div>
      )}
    </>
  );
};
