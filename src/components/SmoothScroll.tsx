import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/**
 * Eased, inertial scrolling for mouse wheels and trackpads.
 * Touch devices keep native scrolling, and it's skipped entirely when the visitor prefers reduced motion.
 */
export const SmoothScroll: React.FC = () => {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });

    let frame = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    });

    // Lenis's own `anchors` option doesn't cancel the browser's native jump, so the two race and
    // land in the wrong place. Handle in-page links here instead: cancel the jump, then glide.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = link?.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target);
      history.pushState(null, '', hash);
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
};
