import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { Reveal } from './Reveal';
import { MaskWords } from './motion';

export const Contact: React.FC = () => {
  const { personal } = portfolioData;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${personal.email}`;
    }
  };

  const links = [...personal.socials, { label: 'Resume', url: personal.resumeUrl }];

  return (
    <section id="contact" className="pt-28 pb-20 md:pt-40 md:pb-28">
      <Reveal>
        <p className="mb-5 flex items-center gap-2.5 text-sm font-medium text-accent">
          <span className="font-mono text-xs">05</span>
          <span className="h-px w-6 bg-accent/50" />
          Contact
        </p>
        <h2 className="max-w-[18ch] text-4xl font-medium tracking-tighter text-balance md:text-7xl">
          <MaskWords text="Working on something interesting? I'd like to hear about it." />
        </h2>
      </Reveal>

      <Reveal delay={1}>
        <div className="mt-12 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${personal.email}`}
            className="inline-flex max-w-full items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium break-all text-[#0a1a40] shadow-[0_0_40px_-8px_rgb(134_205_250/0.5)] transition-transform hover:-translate-y-0.5 active:scale-[0.98] sm:text-base"
          >
            {personal.email}
            <ArrowUpRight className="size-4 shrink-0" strokeWidth={1.75} />
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="sky-glass inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-3.5 text-sm font-medium transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
          >
            {copied ? <Check className="size-4" strokeWidth={1.75} /> : <Copy className="size-4" strokeWidth={1.75} />}
            <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
          </button>
        </div>

        <ul className="mt-16 flex flex-wrap gap-x-7 gap-y-2 text-sm font-medium">
          {links.map((s) => (
            <li key={s.label}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-muted transition-colors hover:text-ink"
              >
                {s.label}
                <ArrowUpRight className="size-3.5" strokeWidth={1.75} />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
};

/** Stars and a low moon behind the contact section. */
export const NightSky: React.FC = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
    <div className="stars" />
    <span className="shooting-star top-[14%] left-[72%]" />
    <span className="shooting-star top-[34%] left-[48%] [animation-delay:6.5s] [animation-duration:13s]" />
    <div
      className="absolute top-[18%] right-[6%] size-24 rounded-full md:size-32"
      style={{
        background: 'radial-gradient(circle at 35% 35%, #f4f9ff 0%, #d9e9fb 55%, #b9d3f0 100%)',
        boxShadow: '0 0 80px 20px rgb(190 220 255 / 0.18)',
      }}
    />
  </div>
);
