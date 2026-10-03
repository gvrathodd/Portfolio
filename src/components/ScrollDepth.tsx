import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { scrollState } from './three/scrollState';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * Scroll-scrubbed motion for the page itself.
 * The hero pins while the name scatters into 3D space (the 3D sun bursts behind it, timed off the
 * same scroll range), then each glass panel swings up into place as it arrives.
 */
export const useScrollDepth = (scope: React.RefObject<HTMLElement | null>) => {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const hero = scope.current?.querySelector<HTMLElement>('[data-band]');
        if (!hero) return;

        const split = SplitText.create('.hero-name .hero-word', { type: 'chars' });
        const r = gsap.utils.random;

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: '+=170%',
            pin: true,
            scrub: true,
            onRefresh: (self) => {
              scrollState.heroEnd = self.end;
            },
          },
        });

        tl.set('.hero-line', { overflow: 'visible' }, 0.001)
          .set('.hero-name', { perspective: 700 }, 0)
          .to('.hero-top, .hero-copy', { autoAlpha: 0, y: -50, duration: 0.14 }, 0)
          .set('.hero-hint', { visibility: 'hidden' }, 0.05)
          .to(
            split.chars,
            {
              x: () => r(-260, 260),
              y: () => r(-320, 120),
              z: () => r(-300, 700),
              rotateX: () => r(-200, 200),
              rotateY: () => r(-140, 140),
              opacity: 0,
              ease: 'power2.in',
              duration: 0.26,
              stagger: { each: 0.008, from: 'random' },
            },
            0.02,
          )
          // hold the empty sky for the burst and the spill, which happen in the 3D layer
          .to({}, { duration: 0.6 });

        gsap.utils.toArray<HTMLElement>('.glass-panel').forEach((panel) => {
          gsap.fromTo(
            panel,
            { y: 120, rotateX: 14, scale: 0.92, transformPerspective: 1400, transformOrigin: '50% 0%' },
            {
              y: 0,
              rotateX: 0,
              scale: 1,
              ease: 'none',
              scrollTrigger: { trigger: panel, start: 'top bottom', end: 'top 50%', scrub: true },
            },
          );
        });

        return () => {
          split.revert();
          scrollState.heroEnd = 0;
        };
      });
    },
    { scope },
  );
};
