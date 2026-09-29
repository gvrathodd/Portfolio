import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';
import { trackPointer } from './motion';

export const Skills: React.FC = () => (
  <section id="skills" className="py-12 md:py-16">
    <SectionHeading index="03" eyebrow="Toolkit" title="What I build with" aside="Each one used in a project above" />

    <Reveal>
      <div className="grid gap-3 md:grid-cols-3">
        {portfolioData.skills.map((group) => (
          <div key={group.title} onPointerMove={trackPointer} className="sky-glass spotlight rounded-3xl p-6 md:p-7">
            <h3 className="mb-5 text-sm font-medium text-accent">{group.title}</h3>
            <ul className="space-y-4">
              {group.skills.map((skill) => (
                <li key={skill.name}>
                  <span className="block font-medium">{skill.name}</span>
                  <span className="mt-0.5 block text-sm text-muted">{skill.usedIn.join(' · ')}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Reveal>

    <Reveal delay={1}>
      <p className="mt-6 text-sm text-muted">
        <span className="font-medium text-ink">Also familiar with:</span> {portfolioData.alsoFamiliar.join(', ')}.
      </p>
    </Reveal>
  </section>
);
