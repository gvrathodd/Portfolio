import React, { useEffect, useRef } from 'react';

interface BandProps {
  tone: 'light' | 'dark';
  /** Extra palette on top of the tone, e.g. the warm dawn hero. */
  variant?: 'dawn';
  background: string;
  decor?: React.ReactNode;
  /** Sit the content on a frosted glass panel. */
  glass?: boolean;
  children: React.ReactNode;
}

/** A full-width slice of the sky. `tone` flips the colour tokens so text stays readable on it. */
export const Band: React.FC<BandProps> = ({ tone, variant, background, decor, glass, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Pause every animation in this band while it's off screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.removeAttribute('data-paused');
      else el.setAttribute('data-paused', '');
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-tone={tone} className={`tone-${tone} ${variant ? `sky-${variant}` : ''} relative isolate overflow-hidden text-ink`} style={{ background }}>
      {decor}
      <div className="relative mx-auto max-w-[1240px] px-3 sm:px-6">
        {glass ? (
          <div className="py-8 md:py-12">
            <div className="glass-panel rounded-[1.75rem] px-5 sm:px-10 md:rounded-[2.5rem] md:px-14">{children}</div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};
