import React from 'react';
import { portfolioData } from '../data/portfolioData';

export const Footer: React.FC = () => (
  <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-line py-8 text-sm text-muted">
    <span>
      © {new Date().getFullYear()} {portfolioData.personal.name}
    </span>
    <a href="#top" className="inline-flex min-h-11 items-center transition-colors hover:text-ink">
      Back to morning ↑
    </a>
  </footer>
);
