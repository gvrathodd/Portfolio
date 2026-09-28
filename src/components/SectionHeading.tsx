import React from 'react';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  aside?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ index, eyebrow, title, aside }) => (
  <Reveal className="mb-10 flex items-end justify-between gap-6 md:mb-14">
    <div>
      <p className="mb-4 flex items-center gap-2.5 text-sm font-medium text-accent">
        <span className="font-mono text-xs">{index}</span>
        <span className="h-px w-6 bg-accent/50" />
        {eyebrow}
      </p>
      <h2 className="text-3xl font-medium tracking-tighter text-balance md:text-5xl">{title}</h2>
    </div>
    {aside && <p className="hidden pb-1.5 text-sm text-muted sm:block">{aside}</p>}
  </Reveal>
);
