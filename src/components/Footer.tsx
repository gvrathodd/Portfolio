import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import { ArrowUp, Heart, Clock } from 'lucide-react';

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
    <footer className="py-12 px-4 sm:px-6 border-t border-zinc-900 bg-zinc-950/80 text-zinc-500 text-xs font-mono">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Branding & Status */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <span className="text-zinc-300 font-semibold">
            {portfolioData.personal.name}
          </span>
          <span className="hidden sm:inline text-zinc-700">•</span>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>{time ? `${time} IST (India)` : 'Loading time...'}</span>
          </div>
        </div>

        {/* Center: Built with */}
        <div className="flex items-center gap-1.5 text-zinc-400 text-center">
          <span>Designed with Watermelon & Godly aesthetics</span>
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors focus:outline-none"
          aria-label="Back to top"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5 text-emerald-400" />
        </button>
      </div>
    </footer>
  );
};
