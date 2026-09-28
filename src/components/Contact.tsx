import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { Reveal } from './Reveal';

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
    <section id="contact" className="py-16 md:py-24">
      <Reveal>
        <div className="sky-panel rounded-[1.75rem] px-5 py-12 sm:px-10 md:rounded-[2.5rem] md:px-14 md:py-20">
          <div aria-hidden className="cloud top-[-10%] right-[-8%] h-48 w-[50%]" />
          <div aria-hidden className="cloud bottom-[-15%] left-[-5%] h-56 w-[60%] [animation-duration:56s]" />

          <p className="mb-5 flex items-center gap-2.5 text-sm font-medium text-[var(--sky-muted)]">
            <span className="font-mono text-xs">05</span>
            <span className="h-px w-6 bg-current opacity-50" />
            Contact
          </p>
          <h2 className="max-w-[16ch] text-4xl font-medium tracking-tighter text-balance md:text-6xl">
            Working on something interesting? I'd like to hear about it.
          </h2>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex max-w-full items-center gap-2 rounded-full bg-[var(--sky-ink)] px-5 py-3 text-sm font-medium break-all text-[var(--sky-btn-text)] transition-transform hover:-translate-y-0.5 active:scale-[0.98] sm:text-base"
            >
              {personal.email}
              <ArrowUpRight className="size-4 shrink-0" strokeWidth={1.75} />
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="sky-glass inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
            >
              {copied ? <Check className="size-4" strokeWidth={1.75} /> : <Copy className="size-4" strokeWidth={1.75} />}
              <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
            </button>
          </div>

          <ul className="mt-14 flex flex-wrap gap-x-7 gap-y-2 text-sm font-medium">
            {links.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[var(--sky-muted)] transition-colors hover:text-[var(--sky-ink)]"
                >
                  {s.label}
                  <ArrowUpRight className="size-3.5" strokeWidth={1.75} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
};
