import React from 'react';

type Orb = {
  kind: 'sphere' | 'bubble';
  size: string;
  left?: string;
  right?: string;
  top: string;
};

/** Where the spheres sit in each glass band; several peek past the panel edges on purpose. */
const layouts: Record<'about' | 'work' | 'skills' | 'experience', Orb[]> = {
  about: [
    { kind: 'sphere', size: 'clamp(120px, 15vw, 260px)', left: '-3vw', top: '8%' },
    { kind: 'bubble', size: 'clamp(90px, 10vw, 170px)', right: '6vw', top: '4%' },
    { kind: 'sphere', size: 'clamp(70px, 8vw, 140px)', right: '-2vw', top: '62%' },
  ],
  work: [
    { kind: 'sphere', size: 'clamp(140px, 18vw, 300px)', right: '-5vw', top: '6%' },
    { kind: 'bubble', size: 'clamp(110px, 13vw, 220px)', left: '-4vw', top: '40%' },
    { kind: 'sphere', size: 'clamp(60px, 6vw, 110px)', left: '14vw', top: '2%' },
    { kind: 'sphere', size: 'clamp(100px, 12vw, 200px)', right: '8vw', top: '78%' },
  ],
  skills: [
    { kind: 'sphere', size: 'clamp(120px, 15vw, 250px)', left: '-4vw', top: '14%' },
    { kind: 'bubble', size: 'clamp(100px, 12vw, 200px)', right: '-3vw', top: '48%' },
  ],
  experience: [
    { kind: 'bubble', size: 'clamp(120px, 14vw, 240px)', right: '4vw', top: '3%' },
    { kind: 'sphere', size: 'clamp(110px, 14vw, 240px)', left: '-4vw', top: '38%' },
    { kind: 'sphere', size: 'clamp(70px, 8vw, 140px)', right: '-2vw', top: '72%' },
  ],
};

/** Glossy blue spheres and soap-bubble rings behind a glass panel. They don't move, so the glass blur stays cheap. */
export const GlassOrbs: React.FC<{ layout: keyof typeof layouts }> = ({ layout }) => (
  <div aria-hidden className="pointer-events-none absolute inset-0">
    {layouts[layout].map((orb, i) => (
      <div
        key={i}
        className={`absolute aspect-square rounded-full ${orb.kind === 'sphere' ? 'glass-orb' : 'glass-bubble'}`}
        style={{ width: orb.size, left: orb.left, right: orb.right, top: orb.top }}
      />
    ))}
  </div>
);
