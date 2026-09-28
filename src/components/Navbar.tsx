import React, { useEffect, useState } from 'react';
import { portfolioData } from '../data/portfolioData';

const links = [
  { label: 'About', href: '#about', always: false },
  { label: 'Work', href: '#work', always: true },
  { label: 'Experience', href: '#experience', always: false },
  { label: 'Toolkit', href: '#skills', always: false },
  { label: 'Contact', href: '#contact', always: true },
];

/** Returns the tone of whichever sky band is currently behind the navbar. */
const useToneBehind = (y: number) => {
  const [tone, setTone] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      for (const band of document.querySelectorAll<HTMLElement>('[data-tone]')) {
        const rect = band.getBoundingClientRect();
        if (rect.top <= y && rect.bottom > y) {
          setTone(band.dataset.tone === 'dark' ? 'dark' : 'light');
          return;
        }
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, [y]);

  return tone;
};

export const Navbar: React.FC = () => {
  const tone = useToneBehind(32);

  return (
    <header
      className={`tone-${tone} sticky top-0 z-40 border-b border-line bg-paper/55 text-ink backdrop-blur-xl transition-colors duration-500`}
    >
      <nav className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5 font-medium tracking-tight whitespace-nowrap">
          <span
            aria-hidden
            className="size-6 rounded-full ring-1 ring-white/40"
            style={{ background: 'linear-gradient(180deg, #5aa9e6 0%, #cbe6fa 55%, #1f4388 56%, #060f28 100%)' }}
          />
          {portfolioData.personal.name}
        </a>
        <ul className="flex items-center gap-5 text-sm sm:gap-7">
          {links.map((link) => (
            <li key={link.href} className={link.always ? 'hidden sm:block' : 'hidden md:block'}>
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
};
