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

export const Hero: React.FC = () => {
  const { personal } = portfolioData;

  return (
    <section id="top" className="flex min-h-[calc(100dvh-4rem)] flex-col pt-8 pb-12 md:pt-12 md:pb-16">
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
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white shadow-[0_10px_30px_-12px_rgb(10_24_48/0.6)] transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
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
          <p className="rise mt-6 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted" style={rise(4)}>
            <span className="text-ink">{personal.education}</span>
            {personal.socials.slice(0, 2).map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
                {s.label} ↗
              </a>
            ))}
          </p>
        </div>
      </div>

      <Stats className="rise mt-14 md:mt-20" style={rise(5)} />
    </section>
  );
};

/** Sunrise glow and drifting clouds behind the hero. */
export const MorningSky: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  // Parallax: the sun sinks faster than the clouds as you scroll away from the hero.
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      el.style.setProperty('--sy', String(Math.min(window.scrollY, 1200)));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', schedule, { passive: true });
    return () => {
      window.removeEventListener('scroll', schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  const layer = (speed: number) => ({ transform: `translate3d(0, calc(var(--sy, 0) * ${speed}px), 0)` });

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 will-change-transform" style={layer(0.45)}>
        <div className="absolute -top-56 right-[-10%] size-[680px]">
          <div className="absolute -inset-[15%]">
            <SunRays />
          </div>
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: 'radial-gradient(circle, rgb(255 248 228 / 0.85) 0%, rgb(255 240 205 / 0.3) 32%, transparent 66%)' }}
          />
        </div>
      </div>
      <div className="absolute inset-0 will-change-transform" style={layer(0.25)}>
        <div className="cloud top-[16%] left-[-10%] h-40 w-[50%]" />
        <div className="cloud top-[6%] right-[-12%] h-32 w-[40%] [animation-duration:52s]" />
      </div>
      <div className="absolute inset-0 will-change-transform" style={layer(0.18)}>
        <Birds />
      </div>
      <div className="absolute inset-0 will-change-transform" style={layer(0.1)}>
        <div className="cloud top-[52%] left-[30%] h-48 w-[60%] [animation-duration:64s]" />
      </div>
    </div>
  );
};
