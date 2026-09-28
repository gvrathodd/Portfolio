import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { Stats } from './Stats';
import { Birds, SunRays } from './SkyLife';

const rise = (i: number) => ({ '--i': i }) as React.CSSProperties;

const istFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata',
  hour: '2-digit',
  minute: '2-digit',
});

const LocalTime: React.FC = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="text-sm text-muted">
      {portfolioData.personal.location} <span className="mx-1.5 opacity-50">/</span>
      <span className="font-mono text-ink tabular-nums">{istFormat.format(now)}</span> IST
    </span>
  );
};

/** "Scroll" label over a thin track with a dot gliding down it; sits at the foot of the first screen. */
const ScrollHint: React.FC = () => (
  <a
    href="#about"
    aria-label="Scroll to About"
    className="rise group absolute bottom-5 left-1/2 flex min-h-11 min-w-11 -translate-x-1/2 flex-col items-center gap-2 px-3 pt-1 text-muted transition-colors hover:text-ink"
    style={rise(7)}
  >
    <span className="text-xs font-medium tracking-[0.25em] uppercase">Scroll</span>
    <span className="relative h-9 w-px overflow-hidden rounded-full bg-current/30">
      <span className="scroll-cue absolute top-0 left-0 h-3 w-px rounded-full bg-current" />
    </span>
  </a>
);

export const Hero: React.FC = () => {
  const { personal } = portfolioData;

  return (
    <section id="top" className="dawn-text pb-12 md:pb-16">
      <div className="relative flex min-h-[calc(100dvh-4.25rem)] flex-col pt-8 pb-24 md:pt-12">
        <div className="rise flex items-center justify-between gap-4" style={rise(0)}>
          <span className="sky-glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-50 motion-reduce:hidden" />
              <span className="relative size-2 rounded-full bg-emerald-500" />
            </span>
            {personal.availability}
          </span>
          <span className="hidden sm:block">
            <LocalTime />
          </span>
        </div>

        <div className="mt-auto grid gap-10 pt-20 md:grid-cols-12 md:items-end md:gap-8">
          <h1 className="text-[clamp(3.25rem,10vw,8.5rem)] leading-[0.86] font-medium tracking-[-0.05em] md:col-span-7">
            {personal.name.split(' ').map((word, i, words) => (
              <span key={word} className="block overflow-hidden pb-[0.06em]">
                <span
                  className={`hero-word ${i > 0 && i < words.length - 1 ? 'text-accent' : ''}`}
                  style={{ '--w': i } as React.CSSProperties}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <div className="md:col-span-5 md:pb-2">
            <p className="rise text-lg leading-snug tracking-tight text-pretty md:text-xl" style={rise(2)}>
              {personal.intro} <span className="text-muted">{personal.introAside}</span>
            </p>
            <div className="rise mt-8 flex flex-wrap items-center gap-3" style={rise(3)}>
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ffe0b2] to-[#ffa06b] px-5 py-3 text-sm font-semibold text-[#1b1740] shadow-[0_10px_30px_-10px_rgb(255_140_80/0.7)] transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
              >
                See my work
                <ArrowDown className="size-4" strokeWidth={1.75} />
              </a>
              <a
                href="#contact"
                className="sky-glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Get in touch
                <ArrowUpRight className="size-4" strokeWidth={1.75} />
              </a>
            </div>
            <p className="rise mt-6 flex flex-wrap items-center gap-x-5 text-sm text-muted" style={rise(4)}>
              <span className="inline-flex min-h-11 items-center text-ink">{personal.education}</span>
              {personal.socials.slice(0, 2).map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center transition-colors hover:text-ink">
                  {s.label} ↗
                </a>
              ))}
            </p>
          </div>
        </div>

        <ScrollHint />
      </div>

      <Stats className="rise" style={rise(5)} />
    </section>
  );
};

/** Sunrise glow, clouds, birds and glass orbs behind the hero. Reacts to scroll and to the cursor. */
export const MorningSky: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  // Scroll parallax (--sy) plus a smoothed cursor offset (--px, --py in -1..1), all as CSS
  // variables so React never re-renders. The cursor loop only runs while it's catching up.
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const tick = () => {
      frame = 0;
      el.style.setProperty('--sy', String(Math.min(window.scrollY, 1200)));
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.setProperty('--px', cx.toFixed(4));
      el.style.setProperty('--py', cy.toFixed(4));
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) schedule();
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || window.scrollY > window.innerHeight) return;
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
      schedule();
    };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('pointermove', onPointer, { passive: true });
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('pointermove', onPointer);
      cancelAnimationFrame(frame);
    };
  }, []);

  /** `scroll`: px moved per px scrolled. `depth`: px moved at the edge of the screen. */
  const layer = (scroll: number, depth: number): React.CSSProperties => ({
    transform: `translate3d(calc(var(--px, 0) * ${-depth}px), calc(var(--sy, 0) * ${scroll}px + var(--py, 0) * ${-depth * 0.6}px), 0)`,
  });

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 will-change-transform" style={layer(0.45, 14)}>
        <div className="sunrise absolute right-[2%] bottom-[-300px] size-[720px]">
          <div className="absolute -inset-[15%]">
            <SunRays />
          </div>
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: 'radial-gradient(circle, rgb(255 244 214 / 1) 0%, rgb(255 214 150 / 0.75) 12%, rgb(255 168 104 / 0.38) 30%, rgb(255 130 90 / 0.12) 48%, transparent 66%)' }}
          />
        </div>
      </div>
      <div className="appear absolute inset-0 will-change-transform" style={layer(0.25, 30)}>
        <div className="cloud top-[16%] left-[-10%] h-40 w-[50%]" />
        <div className="cloud top-[6%] right-[-12%] h-32 w-[40%] [animation-duration:52s]" />
      </div>
      <div className="absolute inset-0 will-change-transform" style={layer(0.18, 18)}>
        <Birds />
      </div>
      <div className="appear absolute inset-0 will-change-transform" style={layer(0.1, 44)}>
        <div className="cloud top-[52%] left-[30%] h-48 w-[60%] [animation-duration:64s]" />
      </div>

      {/* Glass orbs at different depths: the nearer, the more they follow the cursor */}
      <div className="appear absolute inset-0 hidden md:block will-change-transform" style={layer(0.3, 26)}>
        <div className="float-slow glass-orb absolute top-[22%] left-[46%] aspect-square w-[clamp(34px,4vw,64px)] rounded-full" />
      </div>
      <div className="appear absolute inset-0 hidden md:block will-change-transform" style={layer(0.16, 60)}>
        <div className="float glass-orb absolute top-[58%] right-[4%] aspect-square w-[clamp(64px,8vw,140px)] rounded-full" />
        <div className="float-slow glass-bubble absolute top-[64%] left-[-2%] aspect-square w-[clamp(110px,13vw,220px)] rounded-full" />
      </div>

      {/* Dawn: fades away on load so the page opens with a sunrise */}
      <div
        className="dawn absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #070c24 0%, #111a44 45%, #2a2f66 75%, #5a4a7a 100%)' }}
      />
    </div>
  );
};
