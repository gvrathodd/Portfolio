import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import { ArrowUp, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-4 sm:px-6 border-t border-sky-500/20 bg-slate-950/90 text-slate-400 text-xs font-mono backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Branding, Coordinates & Telemetry */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <span className="text-white font-bold tracking-wider">
            {portfolioData.personal.name.toUpperCase()}
          </span>
          <span className="hidden sm:inline text-slate-700">•</span>
          <span className="text-sky-400">
            COORD // 31.77° N, 76.98° E
          </span>
          <span className="hidden sm:inline text-slate-700">•</span>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span>{time ? `${time} IST` : '00:00:00 IST'}</span>
          </div>
        </div>

        {/* Center: System Status Indicator */}
        <div className="flex items-center gap-2 text-slate-400 text-center">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-300 font-semibold">[SYS // NOMINAL 60 FPS]</span>
          <span className="text-slate-600 hidden lg:inline">•</span>
          <span className="hidden lg:inline text-slate-400">REACT 19 + SPRING PHYSICS</span>
        </div>

        {/* Right: Back to Top with Magnetic/Technical Border */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-sky-300 hover:text-white border border-sky-500/30 hover:border-sky-400 transition-all focus:outline-none"
          aria-label="Back to top"
        >
          <span>ASCEND [TOP]</span>
          <ArrowUp className="w-3.5 h-3.5 text-sky-400" />
        </button>
      </div>
    </footer>
  );
};
