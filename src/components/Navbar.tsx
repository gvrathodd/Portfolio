import React from 'react';
import { portfolioData } from '../data/portfolioData';

const links = [
  { label: 'About', href: '#about', always: false },
  { label: 'Work', href: '#work', always: true },
  { label: 'Experience', href: '#experience', always: false },
  { label: 'Toolkit', href: '#skills', always: false },
  { label: 'Contact', href: '#contact', always: true },
];

export const Navbar: React.FC = () => (
  <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/75 backdrop-blur-xl">
    <nav className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-4 sm:px-6">
      <a href="#top" className="flex items-center gap-2.5 font-medium tracking-tight">
        <span
          aria-hidden
          className="size-6 rounded-full ring-1 ring-ink/10"
          style={{ background: 'linear-gradient(180deg, var(--sky-top), var(--sky-bottom))' }}
        />
        {portfolioData.personal.name}
      </a>
      <ul className="flex items-center gap-5 text-sm sm:gap-7">
        {links.map((link) => (
          <li key={link.href} className={link.always ? '' : 'hidden sm:block'}>
            <a href={link.href} className="text-muted transition-colors hover:text-ink">
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href={portfolioData.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-accent"
          >
            Resume
          </a>
        </li>
      </ul>
    </nav>
  </header>
);
