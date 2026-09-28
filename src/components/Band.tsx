import React from 'react';

interface BandProps {
  tone: 'light' | 'dark';
  background: string;
  decor?: React.ReactNode;
  children: React.ReactNode;
}

/** A full-width slice of the sky. `tone` flips the colour tokens so text stays readable on it. */
export const Band: React.FC<BandProps> = ({ tone, background, decor, children }) => (
  <div data-tone={tone} className={`tone-${tone} relative isolate overflow-hidden text-ink`} style={{ background }}>
    {decor}
    <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">{children}</div>
  </div>
);
