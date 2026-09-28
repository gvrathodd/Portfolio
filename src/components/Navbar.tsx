import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Toolkit', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
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
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Close the phone menu on Escape, a tap outside it, or any scroll.
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    const onPointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) close();
    };
    const startY = window.scrollY;
    const onScroll = () => {
      if (Math.abs(window.scrollY - startY) > 8) close();
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('scroll', onScroll);
    };
  }, [open]);

  const resume = portfolioData.personal.resumeUrl;

  return (
    <header
      ref={headerRef}
      className={`tone-${tone} sticky top-0 z-40 border-b border-line bg-paper/75 text-ink backdrop-blur-md transition-colors duration-500`}
    >
      <nav className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" onClick={() => setOpen(false)} className="flex min-w-0 items-center gap-2.5 font-medium tracking-tight whitespace-nowrap">
          <span
            aria-hidden
            className="size-6 shrink-0 rounded-full ring-1 ring-white/40"
            style={{ background: 'linear-gradient(180deg, #5aa9e6 0%, #cbe6fa 55%, #1f4388 56%, #060f28 100%)' }}
          />
          {portfolioData.personal.name}
        </a>

        {/* Desktop */}
        <ul className="hidden items-center gap-7 text-sm md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-muted transition-colors hover:text-ink">
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-accent"
            >
              Resume
            </a>
          </li>
        </ul>

        {/* Phone / tablet */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-ink text-paper transition-transform active:scale-95 md:hidden"
        >
          {open ? <X className="size-5" strokeWidth={1.75} /> : <Menu className="size-5" strokeWidth={1.75} />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        inert={!open}
        className={`absolute inset-x-0 top-full grid border-line bg-paper transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${open ? 'border-b shadow-[0_24px_40px_-24px_rgb(10_24_48/0.45)]' : ''} ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <ul className="px-4 pt-2 pb-6">
            {links.map((link, i) => (
              <li key={link.href} className="border-b border-line">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-baseline gap-4 py-4 text-2xl font-medium tracking-tight transition-all duration-500 ${
                    open ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
                  }`}
                  style={{ transitionDelay: open ? `${80 + i * 40}ms` : '0ms' }}
                >
                  <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-5">
              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-full bg-ink py-3.5 text-base font-medium text-paper"
              >
                Resume
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
