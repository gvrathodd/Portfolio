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
  CheckCircle2,
  Code2
} from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onSelect: (p: Project) => void;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect, index }) => {
  const { elementRef, handleMouseMove, handleMouseEnter, handleMouseLeave, transform, isHovered, glarePos } = useTilt(6, 1.018);

  const isTopFour = index < 4;

  return (
    <animated.div
      ref={elementRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
      onClick={() => onSelect(project)}
      className={`group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl glass-panel transition-all duration-300 cursor-pointer overflow-hidden shadow-xl shadow-black/40 ${
        isTopFour
          ? 'border-sky-500/25 hover:border-sky-400/60 hover:shadow-sky-950/30'
          : 'hover:border-sky-500/40'
      }`}
    >
      {/* Dynamic Cursor Light Sheen (Mobbin / Curated luxury feel) */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `radial-gradient(circle 350px at ${glarePos.x}% ${glarePos.y}%, rgba(56, 189, 248, 0.16), transparent 70%)`,
        }}
      />

      {/* Ambient background glow inside top cards */}
      {isTopFour && (
        <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
      )}

      <div className="relative z-10">
        {/* Top Category & Priority Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-slate-900/90 border border-sky-500/20 text-slate-300 group-hover:border-sky-500/40 transition-colors">
              {project.category}
            </span>
            {isTopFour && (
              <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded-md bg-sky-500/20 text-sky-300 border border-sky-400/30">
                #{index + 1} Featured
              </span>
            )}
          </div>

          {project.badge && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-medium rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/25">
              <Sparkles className="w-3 h-3 text-sky-400" />
              {project.badge}
            </span>
          )}
        </div>

        {/* Project Title */}
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2 group-hover:text-sky-300 transition-colors flex items-center justify-between">
          <span>{project.title}</span>
          <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-sky-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
        </h3>

        {/* Tagline */}
        <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-2">
          {project.tagline}
        </p>

        {/* Key Metric Pill */}
        {project.metrics && (
          <div className="mb-5 px-3.5 py-2 rounded-xl bg-slate-900/70 border border-sky-500/15 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-mono text-[11px]">{project.metrics.label}</span>
            <span className="text-sky-300 font-mono font-semibold">{project.metrics.value}</span>
          </div>
        )}

        {/* Highlight Bullets (first 2) */}
        {project.highlights && project.highlights.length > 0 && (
          <ul className="space-y-1.5 mb-5 text-xs text-slate-400">
            {project.highlights.slice(0, 2).map((item, i) => (
              <li key={i} className="flex items-start gap-1.5 line-clamp-1">
                <span className="text-sky-400">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer: Tags and Action Links */}
      <div className="relative z-10 pt-4 border-t border-slate-900 flex items-center justify-between gap-2 mt-auto">
        <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-7">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-900 text-slate-400 border border-slate-800"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-1.5 py-0.5 text-[11px] font-mono text-slate-500">
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
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-sky-300 transition-colors border border-sky-500/20"
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
              className="p-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/25 text-sky-300 transition-colors border border-sky-500/30"
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
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-sky-400 uppercase tracking-widest mb-2">
            <Flame className="w-4 h-4" />
            Selected Technical Portfolio
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Projects & Architecture
          </h2>
        </div>

        {/* Category Filter Pills (Mobbin / Curated inspired) */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950/90 p-1.5 rounded-2xl border border-sky-500/20 backdrop-blur-md">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/25'
                  : 'text-slate-400 hover:text-sky-300 hover:bg-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid with 3D Spring Tilt */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onSelect={setSelectedProject}
          />
        ))}
      </div>

      {/* Quick helper note for user */}
      <div className="mt-8 text-center text-xs text-slate-500 font-mono">
        💡 Tap any project card to inspect full technical architecture, metrics, and source links.
      </div>

      {/* Project Deep Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
