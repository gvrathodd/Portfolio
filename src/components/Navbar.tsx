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
      const bands = [...document.querySelectorAll<HTMLElement>('[data-tone]')];
      const behind =
        bands.find((band) => {
          const rect = band.getBoundingClientRect();
          return rect.top <= y && rect.bottom > y;
        }) ?? bands[0];
      if (behind) setTone(behind.dataset.tone === 'dark' ? 'dark' : 'light');
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
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const headerRef = useRef<HTMLElement>(null);

  // Close the phone menu on Escape, or on a tap or scroll outside it. Taps, drags and wheel
  // scrolls inside the menu are ignored (and don't scroll the page underneath).
  useEffect(() => {
    const header = headerRef.current;
    if (!open || !header) return;

    const close = () => setOpen(false);
    let startY = window.scrollY;
    let lastInside = 0;
    const markInside = () => {
      lastInside = performance.now();
      startY = window.scrollY;
    };

    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    const onPointerDown = (e: PointerEvent) => {
      if (header.contains(e.target as Node)) markInside();
      else close();
    };
    const onScroll = () => {
      // Ignore scroll that comes from (or right after) interacting with the menu itself,
      // e.g. mobile browser chrome shifting after a tap.
      if (performance.now() - lastInside < 700) {
        startY = window.scrollY;
        return;
      }
      if (Math.abs(window.scrollY - startY) > 12) close();
    };
    const swallowInside = (e: Event) => {
      e.preventDefault();
      markInside();
    };

    window.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('scroll', onScroll, { passive: true });
    header.addEventListener('wheel', swallowInside, { passive: false });
    header.addEventListener('touchmove', swallowInside, { passive: false });
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('scroll', onScroll);
      header.removeEventListener('wheel', swallowInside);
      header.removeEventListener('touchmove', swallowInside);
    };
  }, [open]);

  const resume = portfolioData.personal.resumeUrl;

  return (
    <header
      ref={headerRef}
      data-lenis-prevent={open ? '' : undefined}
      className={`tone-${tone} nav-appear sticky top-0 z-40 px-3 pt-3 text-ink sm:px-6`}
    >
      <nav data-top={atTop ? '' : undefined} className="nav-glass mx-auto flex h-14 max-w-[1240px] items-center justify-between gap-4 rounded-full pr-2 pl-4 transition-colors duration-500 sm:pl-5">
        <a href="#top" onClick={() => setOpen(false)} className="flex min-h-11 min-w-0 items-center gap-2.5 font-medium tracking-tight whitespace-nowrap">
          <img src="/brand/logo.svg" alt="" width={28} height={28} className="size-7 shrink-0 rounded-[0.45rem] shadow-sm" />
          {portfolioData.personal.name}
        </a>

        {/* Desktop */}
        <ul className="hidden items-center gap-7 text-sm md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="inline-flex min-h-11 items-center text-muted transition-colors hover:text-ink">
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-medium text-paper transition-colors hover:bg-accent"
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
          className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-ink text-paper transition-transform active:scale-95 md:hidden"
        >
          {open ? <X className="size-5" strokeWidth={1.75} /> : <Menu className="size-5" strokeWidth={1.75} />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        inert={!open}
        className={`absolute inset-x-3 top-full mt-2 grid overflow-hidden rounded-3xl border border-white/50 bg-paper shadow-[0_24px_50px_-20px_rgb(10_24_48/0.5)] transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:inset-x-6 md:hidden ${open ? 'grid-rows-[1fr] opacity-100' : 'pointer-events-none grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <ul className="px-5 pt-2 pb-5">
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
                onClick={() => setOpen(false)}
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
