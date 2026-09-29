import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Copy, X } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { Reveal } from './Reveal';
import { MaskWords } from './motion';
import { MeteorShower } from './SkyLife';
import { useMailFallback } from './useMailFallback';

export const Contact: React.FC = () => {
  const { personal } = portfolioData;
  const [copied, setCopied] = useState(false);
  const mail = useMailFallback(personal.email);

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
            onClick={mail.onClick}
            className="inline-flex max-w-full items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium break-all text-[#231d4d] shadow-[0_0_40px_-8px_rgb(255_196_138/0.45)] transition-transform hover:-translate-y-0.5 active:scale-[0.98] sm:text-base"
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

        {/* Shown only when the mailto link didn't open anything */}
        <div
          role="status"
          inert={!mail.fallback}
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mail.fallback ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="sky-glass mt-4 flex max-w-xl flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl px-5 py-4 text-sm">
              <p className="flex-1 basis-60 text-muted">
                <span className="font-medium text-ink">No email app opened.</span> The address is copied, or write from your browser:
              </p>
              <div className="flex gap-2">
                <a href={mail.gmailUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-ink px-3.5 py-2 font-medium text-[#231d4d] transition-transform hover:-translate-y-0.5">
                  Gmail
                </a>
                <a href={mail.outlookUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line px-3.5 py-2 font-medium transition-colors hover:border-ink">
                  Outlook
                </a>
                <button type="button" onClick={mail.dismiss} aria-label="Dismiss" className="flex size-11 cursor-pointer items-center justify-center rounded-full text-muted transition-colors hover:text-ink">
                  <X className="size-4" strokeWidth={1.75} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <ul className="mt-16 flex flex-wrap gap-x-7 gap-y-2 text-sm font-medium">
          {links.map((s) => (
            <li key={s.label}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1 text-muted transition-colors hover:text-ink"
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
    <MeteorShower />
    <div
      className="absolute top-[18%] right-[6%] size-24 rounded-full md:size-32"
      style={{
        background: 'radial-gradient(circle at 35% 35%, #f4f9ff 0%, #d9e9fb 55%, #b9d3f0 100%)',
        boxShadow: '0 0 80px 20px rgb(190 220 255 / 0.18)',
      }}
    />
  </div>
);
