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
    <footer className="py-12 px-4 sm:px-6 border-t border-sky-500/15 bg-slate-950/80 text-slate-500 text-xs font-mono">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Branding & Status */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <span className="text-slate-200 font-semibold">
            {portfolioData.personal.name}
          </span>
          <span className="hidden sm:inline text-slate-700">•</span>
          <div className="flex items-center gap-1.5 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span>{time ? `${time} IST (India)` : 'Loading time...'}</span>
          </div>
        </div>

        {/* Center: Built with */}
        <div className="flex items-center gap-1.5 text-slate-400 text-center">
          <span>Curated with Sky Blue fluid design & React Spring physics</span>
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-sky-500/20 hover:border-sky-400/40 transition-colors focus:outline-none"
          aria-label="Back to top"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5 text-sky-400" />
        </button>
      </div>
    </footer>
  );
};
