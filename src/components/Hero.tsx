import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { Stats } from './Stats';

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
    <span className="text-sm text-[var(--sky-muted)]">
      {portfolioData.personal.location} <span className="mx-1.5 opacity-50">/</span>
      <span className="font-mono text-[var(--sky-ink)] tabular-nums">{istFormat.format(now)}</span> IST
    </span>
  );
};

export const Hero: React.FC = () => {
  const { personal } = portfolioData;

  return (
    <section id="top" className="pt-3 sm:pt-5">
      <div className="sky-panel flex min-h-[min(86dvh,800px)] flex-col rounded-[1.75rem] px-5 py-6 sm:px-10 sm:py-8 md:rounded-[2.5rem] md:px-14 md:py-12">
        <div aria-hidden className="cloud top-[14%] left-[-10%] h-40 w-[55%]" />
        <div aria-hidden className="cloud top-[4%] right-[-12%] h-32 w-[45%] [animation-duration:52s]" />
        <div aria-hidden className="cloud bottom-[-8%] left-[25%] h-56 w-[70%] [animation-duration:64s]" />

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

        <div className="mt-auto grid gap-10 pt-24 md:grid-cols-12 md:items-end md:gap-8">
          <h1
            className="rise text-[clamp(3.25rem,9.5vw,7.75rem)] leading-[0.88] font-medium tracking-[-0.05em] md:col-span-7"
            style={rise(1)}
          >
            {personal.name.split(' ').map((word, i, words) => (
              <span key={word} className={`block ${i > 0 && i < words.length - 1 ? 'text-[var(--sky-muted)]' : ''}`}>
                {word}
              </span>
            ))}
          </h1>

          <div className="md:col-span-5 md:pb-2">
            <p className="rise text-lg leading-snug tracking-tight text-pretty md:text-xl" style={rise(2)}>
              {personal.intro} <span className="text-[var(--sky-muted)]">{personal.introAside}</span>
            </p>
            <div className="rise mt-8 flex flex-wrap items-center gap-3" style={rise(3)}>
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--sky-ink)] px-5 py-3 text-sm font-medium text-[var(--sky-btn-text)] transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
              >
                See my work
                <ArrowDown className="size-4" strokeWidth={1.75} />
              </a>
              <a
                href={`mailto:${personal.email}`}
                className="sky-glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Get in touch
                <ArrowUpRight className="size-4" strokeWidth={1.75} />
              </a>
            </div>
            <p className="rise mt-6 flex flex-wrap gap-x-5 gap-y-1 text-sm text-[var(--sky-muted)]" style={rise(4)}>
              <span className="text-[var(--sky-ink)]">{personal.education}</span>
              {personal.socials.slice(0, 2).map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--sky-ink)]">
                  {s.label} ↗
                </a>
              ))}
            </p>
          </div>
        </div>
      </div>

      <Stats className="rise mt-3 sm:mt-4" style={rise(5)} />
    </section>
  );
};
