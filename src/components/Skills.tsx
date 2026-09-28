import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';

export const Skills: React.FC = () => (
  <section id="skills" className="py-16 md:py-24">
    <SectionHeading index="04" eyebrow="Toolkit" title="What I work with" />

    <Reveal>
      <div className="grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {portfolioData.skills.map((group) => (
          <div key={group.title} className="bg-surface p-6 md:p-8">
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
