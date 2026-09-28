import React, { useState, useEffect } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { portfolioData } from '../data/portfolioData';
import { Menu, X, FileDown, Radio, Activity } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [time, setTime] = useState<string>('');

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

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { label: '01 // WORK', href: '#projects', id: 'projects' },
    { label: '02 // LABS', href: '#projects', id: 'projects' },
    { label: '03 // ARCHIVE', href: '#experience', id: 'experience' },
    { label: '04 // SKILLS', href: '#skills', id: 'skills' },
    { label: '05 // CONTACT', href: '#contact', id: 'contact' },
  ];

  const mobileMenuSpring = useSpring({
    transform: mobileMenuOpen ? 'translateY(0%)' : 'translateY(-120%)',
    opacity: mobileMenuOpen ? 1 : 0,
    config: { tension: 300, friction: 26 },
  });

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 w-full bg-[#030712]/90 backdrop-blur-xl border-b border-sky-500/20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 font-mono text-xs">
          {/* Left: Seasats / Klausen Index & Brand */}
          <div className="flex items-center gap-3">
            <a href="#hero" className="flex items-center gap-2.5 text-white font-bold tracking-wider hover:text-sky-300 transition-colors">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping inline-block" />
              <span className="text-sky-400 font-bold">[GR // 26]</span>
              <span className="font-display font-extrabold tracking-tight text-sm hidden sm:inline">
                GAURAV RATHOD
              </span>
            </a>

            <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded border border-sky-500/20 bg-sky-500/5 text-[10px] text-sky-300">
              <Radio className="w-3 h-3 text-sky-400 animate-pulse" />
              <span>SYS: NOMINAL</span>
            </div>
          </div>

          {/* Center: Live Telemetry Coordinates (Seasats style) */}
          <div className="hidden md:flex items-center gap-3 text-slate-400 text-[11px] border-x border-slate-800/80 px-6 h-10">
            <span>IIT MANDI 31.77°N, 76.98°E</span>
            <span className="text-slate-600">•</span>
            <span className="text-sky-300 font-bold">{time} IST</span>
          </div>

          {/* Right: Navigation Items & Dossier Link */}
          <div className="flex items-center gap-3 sm:gap-6">
            <nav className="hidden md:flex items-center gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-slate-400 hover:text-sky-300 transition-colors tracking-wider"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Resume / Dossier Button */}
            <a
              href={portfolioData.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-xs transition-colors shadow-sm shadow-sky-500/25 tracking-wider"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>RESUME.PDF</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded border border-sky-500/30 text-slate-300 hover:text-white"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-950/95 backdrop-blur-2xl md:hidden pt-20 px-6 font-mono"
          onClick={() => setMobileMenuOpen(false)}
        >
          <animated.div
            style={mobileMenuSpring}
            className="w-full bg-slate-900/90 border border-sky-500/30 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 text-center mt-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center gap-2 py-1.5 px-3 rounded bg-sky-500/10 border border-sky-500/20 text-xs text-sky-300 mx-auto">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span>TELEMETRY: ONLINE • IIT MANDI</span>
            </div>

            <div className="flex flex-col gap-3 mt-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 px-4 rounded-xl text-sm font-semibold tracking-wider text-slate-200 hover:bg-slate-800 hover:text-sky-300 transition-colors border border-transparent hover:border-sky-500/20"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800">
              <a
                href={portfolioData.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-sky-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 tracking-wider shadow-lg shadow-sky-500/25"
              >
                <FileDown className="w-4 h-4" />
                <span>DOWNLOAD VERIFIED RESUME</span>
              </a>
            </div>
          </animated.div>
        </div>
      )}
    </>
  );
};
