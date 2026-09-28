import React, { useState } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { portfolioData, Project } from '../data/portfolioData';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';
import { trackPointer } from './motion';

const GithubMark: React.FC<{ className?: string }> = ({ className = 'size-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

const fmt = (n: number, unit?: string) => (unit ? `${n.toFixed(1)}${unit}` : n.toFixed(n < 1 && String(n).length > 4 ? 3 : 2));

const Comparison: React.FC<{ comparison: NonNullable<Project['comparison']>; open: boolean }> = ({ comparison, open }) => (
  <div className="mt-8 rounded-2xl border border-line bg-surface p-5 sm:p-6">
    <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
      <span className="flex items-center gap-2">
        <span className="h-1.5 w-4 rounded-full bg-muted/35" />
        {comparison.baselineLabel}
      </span>
      <span className="flex items-center gap-2">
        <span className="h-1.5 w-4 rounded-full bg-accent" />
        This model
      </span>
    </div>
    <dl className="space-y-4">
      {comparison.rows.map((row, i) => (
        <div key={row.label}>
          <div className="mb-1.5 flex items-baseline justify-between gap-4 text-sm">
            <dt>{row.label}</dt>
            <dd className="font-mono text-xs text-muted">
              {fmt(row.before, row.unit)} <span aria-hidden>→</span>{' '}
              <span className="text-accent">{fmt(row.after, row.unit)}</span>
            </dd>
          </div>
          <div className="space-y-1">
            <div className="h-1.5 overflow-hidden rounded-full bg-sky/50">
              <div className="h-full rounded-full bg-muted/35" style={{ width: `${(row.before / row.max) * 100}%` }} />
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-sky/50">
              <div
                className="h-full origin-left rounded-full bg-accent transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  width: `${(row.after / row.max) * 100}%`,
                  transform: open ? 'scaleX(1)' : 'scaleX(0)',
                  transitionDelay: `${200 + i * 90}ms`,
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </dl>
  </div>
);

const ProjectRow: React.FC<{ project: Project; index: number; open: boolean; onToggle: () => void }> = ({
  project,
  index,
  open,
  onToggle,
}) => {
  const panelId = `project-${project.id}`;

  return (
    <li className={`transition-colors duration-300 ${open ? 'bg-sky/35' : 'hover:bg-sky/25'}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="group grid w-full cursor-pointer grid-cols-[2rem_1fr_auto] items-baseline gap-x-4 px-5 py-6 text-left sm:px-8 md:grid-cols-[3rem_1fr_9rem_9rem_2rem] md:py-8"
      >
        <span className={`font-mono text-sm transition-colors ${open ? 'text-accent' : 'text-muted'}`}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span>
          <span className="block text-xl font-medium tracking-tight md:text-2xl">{project.title}</span>
          <span className="mt-1.5 block max-w-[58ch] text-muted">{project.tagline}</span>
        </span>
        <span className="hidden text-sm text-muted md:block">
          {project.category}
          {project.year && <span className="mt-0.5 block font-mono text-xs">{project.year}</span>}
        </span>
        <span className="hidden text-right md:block">
          {project.metrics && (
            <>
              <span className="block font-mono text-lg tracking-tight text-accent">{project.metrics.value}</span>
              <span className="block text-xs text-muted">{project.metrics.label}</span>
            </>
          )}
        </span>
        <span
          className={`flex size-8 items-center justify-center self-center justify-self-end rounded-full border transition-all duration-300 ${
            open ? 'rotate-45 border-accent bg-accent text-surface' : 'border-line text-muted group-hover:border-ink group-hover:text-ink'
          }`}
        >
          <Plus aria-hidden strokeWidth={1.75} className="size-4" />
        </span>
      </button>

      <div
        id={panelId}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <div className="grid gap-x-4 gap-y-8 px-5 pb-10 sm:px-8 md:grid-cols-[3rem_1fr_20rem]">
            <div className="hidden md:block" />
            <div className="max-w-[62ch]">
              <p className="leading-relaxed">{project.description}</p>
              {project.highlights.length > 0 && (
                <ul className="mt-5 space-y-2.5 leading-relaxed">
                  {project.highlights.map((h) => (
                    <li key={h} className="grid grid-cols-[1.25rem_1fr] text-muted">
                      <span aria-hidden className="mt-2.5 size-1.5 rounded-full bg-accent/70" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
              {project.comparison && <Comparison comparison={project.comparison} open={open} />}
              {project.gallery && (
                <div className="mt-8">
                  <p className="mb-3 text-sm font-medium">What the model sees</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {project.gallery.map((img) => (
                      <figure key={img.src} className="overflow-hidden rounded-2xl border border-line bg-surface">
                        <img src={img.src} alt={img.alt} loading="lazy" width={842} height={317} className="w-full" />
                        <figcaption className="px-4 py-3 text-xs leading-relaxed text-muted">{img.caption}</figcaption>
                      </figure>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-muted">Left to right: input, heatmap overlay, raw anomaly map.</p>
                </div>
              )}
            </div>
            <div className="space-y-4">
              {(project.githubUrl || project.liveUrl) && (
                <div className="flex flex-wrap gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-white shadow-[0_8px_24px_-10px_rgb(10_24_48/0.6)] transition-all hover:-translate-y-0.5 hover:bg-accent active:scale-[0.98]"
                    >
                      <GithubMark />
                      View source
                      <ArrowUpRight className="size-4" strokeWidth={1.75} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-surface px-4 py-2.5 text-sm font-medium text-accent transition-all hover:-translate-y-0.5 hover:border-accent active:scale-[0.98]"
                    >
                      <span className="relative flex size-2">
                        <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />
                        <span className="relative size-2 rounded-full bg-emerald-500" />
                      </span>
                      Live demo
                      <ArrowUpRight className="size-4" strokeWidth={1.75} />
                    </a>
                  )}
                </div>
              )}
              {project.metrics && (
                <div className="rounded-2xl border border-line bg-surface p-5">
                  <p className="font-mono text-4xl tracking-tight text-accent">{project.metrics.value}</p>
                  <p className="mt-1 text-sm text-muted">{project.metrics.label}</p>
                </div>
              )}
              <ul className="flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <li key={t} className="rounded-full border border-line bg-surface px-2.5 py-1 text-xs text-muted">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export const Projects: React.FC = () => {
  const featured = portfolioData.projects.filter((p) => p.featured);
  const others = portfolioData.projects.filter((p) => !p.featured);
  // Each project opens and closes on its own; auto-closing another one above the reader
  // would collapse content above them and throw the page out from under them.
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(featured[0] ? [featured[0].id] : []));
  const toggle = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <section id="work" className="py-20 md:py-28">
      <SectionHeading index="02" eyebrow="Work" title="Selected projects" aside="Click a project for details" />

      <Reveal>
        <ul className="divide-y divide-line overflow-hidden rounded-[1.75rem] border border-line bg-surface">
          {featured.map((project, i) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={i}
              open={openIds.has(project.id)}
              onToggle={() => toggle(project.id)}
            />
          ))}
        </ul>
      </Reveal>

      {others.length > 0 && (
        <div className="mt-16 md:mt-20">
          <Reveal>
            <h3 className="mb-5 text-xl font-medium tracking-tight">Also built</h3>
          </Reveal>
          <ul className="grid gap-3 md:grid-cols-2 md:gap-4">
            {others.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i}>
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={!p.githubUrl}
                  onPointerMove={trackPointer}
                  className={`spotlight group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-300 ${
                    p.githubUrl ? 'hover:-translate-y-0.5 hover:border-accent/40' : 'pointer-events-none'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs text-muted">{p.category}</p>
                      <h4 className="mt-1 text-lg font-medium tracking-tight">{p.title}</h4>
                    </div>
                    {p.githubUrl ? (
                      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-white transition-colors group-hover:bg-accent">
                        <GithubMark className="size-3.5" />
                        Source
                        <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.75} />
                      </span>
                    ) : (
                      <span className="shrink-0 rounded-full border border-line px-3 py-1.5 text-xs text-muted">Private</span>
                    )}
                  </div>
                  <p className="mt-2 flex-1 text-muted">{p.tagline}</p>
                  <p className="mt-4 text-xs text-muted">{p.tags.join('  ·  ')}</p>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
