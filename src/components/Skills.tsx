import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';
import { trackPointer } from './motion';

export const Skills: React.FC = () => (
  <section id="skills" className="py-20 md:py-28">
    <SectionHeading index="03" eyebrow="Toolkit" title="What I work with" />

    <Reveal>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {portfolioData.skills.map((group) => (
          <div key={group.title} onPointerMove={trackPointer} className="sky-glass spotlight rounded-3xl p-6 md:p-8">
            <h3 className="mb-5 text-sm font-medium text-accent">{group.title}</h3>
            <ul className="space-y-2.5">
              {group.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Reveal>
  </section>
);
