import React, { useState } from 'react';
import { animated } from '@react-spring/web';
import { portfolioData, Project } from '../data/portfolioData';
import { useTilt } from '../hooks/useTilt';
import { ProjectModal } from './ProjectModal';
import { GithubIcon } from './Icons';
import { 
  ExternalLink, 
  Sparkles, 
  ArrowUpRight, 
  Layers, 
  Cpu, 
  Bot, 
  Smartphone, 
  Flame,
  CheckCircle2
} from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onSelect: (p: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const { elementRef, handleMouseMove, handleMouseEnter, handleMouseLeave, transform, isHovered } = useTilt(6, 1.015);

  return (
    <animated.div
      ref={elementRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
      onClick={() => onSelect(project)}
      className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl glass-panel hover:border-emerald-500/40 transition-colors duration-300 cursor-pointer overflow-hidden shadow-lg shadow-black/40"
    >
      {/* Ambient hover glow inside card */}
      <div 
        className={`absolute -right-16 -top-16 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} 
      />

      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover:border-zinc-700 transition-colors">
            {project.category}
          </span>
          {project.badge && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-3 h-3" />
              {project.badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2 group-hover:text-emerald-300 transition-colors flex items-center justify-between">
          <span>{project.title}</span>
          <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
        </h3>

        {/* Tagline */}
        <p className="text-zinc-400 text-sm leading-relaxed mb-5 line-clamp-2">
          {project.tagline}
        </p>

        {/* Key Metric Pill if available */}
        {project.metrics && (
          <div className="mb-5 px-3 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-center justify-between text-xs">
            <span className="text-zinc-400 font-mono text-[11px]">{project.metrics.label}</span>
            <span className="text-emerald-400 font-mono font-semibold">{project.metrics.value}</span>
          </div>
        )}

        {/* Highlight Bullets (first 2) */}
        {project.highlights && project.highlights.length > 0 && (
          <ul className="space-y-1.5 mb-5 text-xs text-zinc-400">
            {project.highlights.slice(0, 2).map((item, i) => (
              <li key={i} className="flex items-start gap-1.5 line-clamp-1">
                <span className="text-emerald-400">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer: Tags and Action Links */}
      <div className="pt-4 border-t border-zinc-900/80 flex items-center justify-between gap-2 mt-auto">
        <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-7">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[11px] font-mono rounded bg-zinc-900 text-zinc-400 border border-zinc-800"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-1.5 py-0.5 text-[11px] font-mono text-zinc-500">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Direct Link Icons */}
        <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors border border-zinc-800"
              title="View on GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors border border-emerald-500/20"
              title="Live Demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </animated.div>
  );
};

type CategoryOption = 'All' | Project['category'];

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryOption>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories: CategoryOption[] = ['All', 'AI & ML', 'Software Dev', 'Android & Mobile', 'Systems & Robotics'];

  const filteredProjects = activeCategory === 'All'
    ? portfolioData.projects
    : portfolioData.projects.filter((p: Project) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-400 uppercase tracking-widest mb-2">
            <Flame className="w-4 h-4" />
            Featured Technical Work
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Projects & Engineering
          </h2>
        </div>

        {/* Category Filter Pills (Watermelon UI inspired) */}
        <div className="flex flex-wrap gap-1.5 bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800/80">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid with 3D Spring Tilt */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onSelect={setSelectedProject}
          />
        ))}
      </div>

      {/* Quick helper note for user */}
      <div className="mt-8 text-center text-xs text-zinc-500 font-mono">
        💡 Tip: Hover cards on desktop for 3D physics tilt; tap any card to view deep-dive architecture specs.
      </div>

      {/* Project Deep Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
