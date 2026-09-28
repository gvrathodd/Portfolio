import React from 'react';
import { portfolioData } from '../data/portfolioData';

export const Footer: React.FC = () => (
  <footer className="mx-auto max-w-[1240px] px-4 sm:px-6">
    <div className="flex flex-wrap items-center justify-between gap-4 py-8 text-sm text-muted">
      <span>
        © {new Date().getFullYear()} {portfolioData.personal.name}
      </span>
      <a href="#top" className="transition-colors hover:text-ink">
        Back to top ↑
      </a>
    </div>
  </footer>
);
