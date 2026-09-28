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
    transform: mobileMenuOpen ? 'translateY(0%)' : 'translateY(-120%)',
    opacity: mobileMenuOpen ? 1 : 0,
    config: { tension: 320, friction: 28 },
  });

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 sm:px-6 pt-4 sm:pt-6 pointer-events-none">
        <nav
          className={`pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 max-w-4xl w-full ${
            isScrolled
              ? 'glass-pill shadow-2xl shadow-black/60 bg-zinc-950/80 border-white/10'
              : 'glass-panel bg-zinc-950/60 border-white/5'
          }`}
        >
          {/* Logo / Name */}
          <a
            href="#hero"
            className="flex items-center gap-2 group text-zinc-100 font-bold tracking-tight text-sm sm:text-base focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-400 p-[1px] shadow-sm shadow-emerald-500/30">
              <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center text-xs font-mono font-bold text-white group-hover:bg-transparent group-hover:text-zinc-950 transition-colors">
                GR
              </div>
            </div>
            <span className="hidden xs:inline font-semibold text-zinc-200 group-hover:text-white transition-colors">
              {portfolioData.personal.preferredName}
            </span>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1 bg-zinc-900/60 p-1 rounded-full border border-zinc-800/80">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-zinc-800 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
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
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available</span>
            </div>

            {/* Resume Button */}
            <a
              href={portfolioData.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] shadow-md shadow-zinc-100/10"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white focus:outline-none"
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
          className="fixed inset-0 z-30 bg-black/70 backdrop-blur-md md:hidden pt-24 px-6"
          onClick={() => setMobileMenuOpen(false)}
        >
          <animated.div
            style={mobileMenuSpring}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl flex flex-col gap-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Status Beacon on Mobile */}
            <div className="flex items-center justify-center gap-2 py-1.5 px-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 mx-auto">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
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
                      ? 'bg-zinc-900 text-emerald-400'
                      : 'text-zinc-300 hover:bg-zinc-900/60'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-zinc-900 flex flex-col gap-2">
              <a
                href={portfolioData.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-emerald-500 text-zinc-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
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
