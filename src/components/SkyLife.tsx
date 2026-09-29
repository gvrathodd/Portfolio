import React from 'react';

/* ---------- Morning: a small flock gliding across the hero ---------- */

const flock = [
  { x: 0, y: 0, size: 26, flap: 0 },
  { x: -38, y: 18, size: 20, flap: 0.18 },
  { x: -64, y: -10, size: 18, flap: 0.33 },
  { x: -92, y: 26, size: 15, flap: 0.09 },
  { x: -118, y: 6, size: 13, flap: 0.26 },
  { x: -146, y: 30, size: 16, flap: 0.41 },
  { x: -172, y: -4, size: 12, flap: 0.14 },
  { x: -198, y: 18, size: 11, flap: 0.36 },
];

const Bird: React.FC<{ size: number; flap: number }> = ({ size, flap }) => (
  <svg width={size} height={size / 2} viewBox="0 0 24 12" className="overflow-visible">
    <path
      className="bird-wings"
      style={{ animationDelay: `${flap}s` }}
      d="M0 5 Q6 -1 12 6 Q18 -1 24 5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Birds: React.FC = () => (
  <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[44%] h-28 overflow-hidden text-[#2a1638]/70">
    <div className="bird-flight absolute top-0 left-0">
      <div className="bird-bob relative">
        {flock.map((b, i) => (
          <div key={i} className="absolute" style={{ transform: `translate(${b.x}px, ${b.y}px)` }}>
            <Bird size={b.size} flap={b.flap} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

/** Slowly turning light rays around the sunrise glow. */
export const SunRays: React.FC = () => <div aria-hidden className="sun-rays absolute inset-0 rounded-full" />;

/* ---------- Night: a continuous meteor shower ---------- */

const METEORS = 7;

const randomise = (el: HTMLElement) => {
  // Start somewhere across the upper-right two thirds of the sky, then fall down-left.
  el.style.left = `${30 + Math.random() * 75}%`;
  el.style.top = `${Math.random() * 45}%`;
  el.style.setProperty('--len', `${90 + Math.random() * 120}px`);
};

export const MeteorShower: React.FC = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
    {Array.from({ length: METEORS }, (_, i) => (
      <span
        key={i}
        ref={(el) => {
          if (el && !el.dataset.ready) {
            el.dataset.ready = '1';
            randomise(el);
          }
        }}
        onAnimationIteration={(e) => randomise(e.currentTarget)}
        className="meteor"
        style={{
          animationDuration: `${3.2 + (i % 4) * 0.9}s`,
          animationDelay: `${i * 0.55}s`,
        }}
      />
    ))}
  </div>
);
