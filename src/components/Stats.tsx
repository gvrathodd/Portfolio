import React, { useEffect, useRef, useState } from 'react';
import { portfolioData, Stat } from '../data/portfolioData';
import { trackPointer } from './motion';

const format = (stat: Stat, value: number) =>
  `${stat.prefix ?? ''}${value.toLocaleString('en-IN', {
    minimumFractionDigits: stat.decimals ?? 0,
    maximumFractionDigits: stat.decimals ?? 0,
  })}${stat.suffix ?? ''}`;

/** Counts from 0 to the stat's value once the tile scrolls into view. */
const CountUp: React.FC<{ stat: Stat }> = ({ stat }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(stat.value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setValue(0);
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const duration = 1400;
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 4);
        setValue(stat.value * eased);
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [stat.value]);

  return (
    <span ref={ref} aria-label={format(stat, stat.value)} className="tabular-nums">
      {format(stat, value)}
    </span>
  );
};

export const Stats: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = '', style }) => (
  <dl
    className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-4 ${className}`}
    style={style}
  >
    {portfolioData.stats.map((stat) => (
      <div key={stat.label} onPointerMove={trackPointer} className="sky-glass stat-tile spotlight flex flex-col rounded-3xl p-6 md:p-7">
        <dd className="order-1 text-4xl font-medium tracking-tighter text-accent md:text-5xl">
          <CountUp stat={stat} />
        </dd>
        <dt className="order-2 mt-3 text-sm font-medium">{stat.label}</dt>
        <dd className="order-3 mt-1 text-sm leading-snug text-muted">{stat.context}</dd>
      </div>
    ))}
  </dl>
);
