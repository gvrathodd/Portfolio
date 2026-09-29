import React, { useEffect, useRef } from 'react';
import { portfolioData } from '../data/portfolioData';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';

/** Sets --progress (0 to 1) on the element as the viewport's middle travels through it. */
const useScrollProgress = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const progress = (window.innerHeight * 0.6 - rect.top) / rect.height;
      el.style.setProperty('--progress', String(Math.min(Math.max(progress, 0), 1)));
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
  }, []);

  return ref;
};

export const Experience: React.FC = () => {
  const listRef = useScrollProgress<HTMLOListElement>();

  return (
    <section id="experience" className="py-12 md:py-16">
      <SectionHeading index="04" eyebrow="Experience" title="Leadership, teams and competitions" />

      <h3 className="mb-8 text-sm font-medium tracking-wide text-accent uppercase">Leadership & teams</h3>
      <ol ref={listRef} className="relative pl-8 md:pl-12">
        {/* Track, and the lit part that grows as you scroll */}
        <span aria-hidden className="absolute top-2 bottom-2 left-[5px] w-px bg-line" />
        <span
          aria-hidden
          className="absolute top-2 bottom-2 left-[5px] w-px origin-top bg-gradient-to-b from-accent to-accent/40 shadow-[0_0_12px_rgb(255_196_138/0.6)]"
          style={{ transform: 'scaleY(var(--progress, 0))' }}
        />

        {portfolioData.experience.map((item) => (
          <Reveal as="li" key={item.id} className="relative grid gap-x-8 gap-y-3 pb-12 last:pb-0 md:grid-cols-12 md:pb-16">
            <span
              aria-hidden
              className="timeline-dot absolute top-1.5 -left-8 size-[11px] rounded-full border border-accent bg-[#2a2458] md:-left-12"
            />
            <p className="text-sm text-muted md:col-span-3">
              <span className="font-mono text-ink">{item.period}</span>
              {item.location && <span className="block">{item.location}</span>}
            </p>
            <div className="md:col-span-4">
              <h3 className="text-lg font-medium tracking-tight md:text-xl">{item.role}</h3>
              <p className="mt-0.5 text-accent">{item.organization}</p>
            </div>
            <div className="text-muted md:col-span-5">
              {item.description && <p className="leading-relaxed text-ink">{item.description}</p>}
              {item.highlights.length > 0 && (
                <ul className="mt-3 space-y-2 leading-relaxed first:mt-0">
                  {item.highlights.map((h) => (
                    <li key={h} className="grid grid-cols-[1.25rem_1fr]">
                      <span aria-hidden className="mt-2.5 size-1.5 rounded-full bg-accent/70" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </ol>

      <h3 className="mt-16 mb-6 text-sm font-medium tracking-wide text-accent uppercase md:mt-20">Competitions</h3>
      <ul className="grid gap-3 md:grid-cols-3">
        {portfolioData.competitions.map((c, i) => (
          <Reveal as="li" key={c.event} delay={i} className="sky-glass rounded-3xl p-6">
            <p className="text-3xl font-medium tracking-tight text-accent">{c.result}</p>
            <p className="mt-3 font-medium">{c.event}</p>
            <p className="mt-1 text-sm leading-snug text-muted">{c.detail}</p>
          </Reveal>
        ))}
      </ul>

      <h3 className="mt-16 mb-6 text-sm font-medium tracking-wide text-accent uppercase md:mt-20">Education</h3>
      <Reveal className="grid gap-x-8 gap-y-2 md:grid-cols-12">
        <p className="font-mono text-sm text-ink md:col-span-3">{portfolioData.education.period}</p>
        <div className="md:col-span-9">
          <p className="text-lg font-medium tracking-tight">
            {portfolioData.education.degree} <span className="text-muted">· {portfolioData.education.school}</span>
          </p>
          <p className="mt-2 max-w-[62ch] leading-relaxed text-muted">{portfolioData.education.note}</p>
        </div>
      </Reveal>
    </section>
  );
};
