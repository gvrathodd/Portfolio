import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';

export const About: React.FC = () => {
  const { about } = portfolioData;
  const [lead, ...rest] = about.paragraphs;

  return (
    <section id="about" className="py-20 md:py-28">
      <SectionHeading index="01" eyebrow="About" title={about.title} />

      <div className="grid gap-10 md:grid-cols-12 md:gap-14">
        <Reveal className="md:col-span-5">
          <figure className="group relative overflow-hidden rounded-[1.75rem] border border-line bg-sky">
            <img
              src={about.photo}
              alt={about.photoAlt}
              width={960}
              height={1200}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
            <figcaption className="absolute bottom-4 left-4 rounded-full border border-white/60 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-[#0b1422] backdrop-blur-md">
              {about.photoCaption}
            </figcaption>
          </figure>
        </Reveal>

        <div className="md:col-span-7 md:pt-2">
          <Reveal>
            <p className="text-xl leading-relaxed tracking-tight text-pretty md:text-2xl md:leading-snug">{lead}</p>
          </Reveal>
          {rest.map((para, i) => (
            <Reveal key={i} delay={i + 1}>
              <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-muted text-pretty">{para}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
