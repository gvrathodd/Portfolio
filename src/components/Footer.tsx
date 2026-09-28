import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-4 sm:px-6 border-t border-sky-400/15 bg-[#070c18] text-slate-400 text-xs">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Branding & Institute */}
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="text-white font-semibold">
            {portfolioData.personal.name}
          </span>
          <span className="text-slate-600">•</span>
          <span>IIT Mandi</span>
        </div>

        {/* Center: Built with */}
        <div className="text-slate-400 text-center">
          Crafted with fluid React Spring physics & sky blue aesthetics
        </div>

        {/* Right: Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-card hover:bg-white/10 text-sky-300 hover:text-white border border-sky-400/20 hover:border-sky-400/40 transition-all text-xs font-medium"
          aria-label="Back to top"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
