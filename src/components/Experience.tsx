import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';

export const Experience: React.FC = () => (
  <section id="experience" className="py-16 md:py-24">
    <SectionHeading index="03" eyebrow="Experience" title="Leadership, teams and competitions" />

    <ol className="divide-y divide-line border-y border-line">
      {portfolioData.experience.map((item) => (
        <Reveal as="li" key={item.id} className="grid gap-x-8 gap-y-3 py-8 md:grid-cols-12 md:py-10">
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
  </section>
);
