import React from 'react';
import { animated } from '@react-spring/web';
import { Project } from '../data/portfolioData';
import { useTilt } from '../hooks/useTilt';
import { GithubIcon } from './Icons';
import { 
  ExternalLink, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  Layers 
} from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onSelect: (p: Project) => void;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect, index }) => {
  const { elementRef, handleMouseMove, handleMouseEnter, handleMouseLeave, transform, isHovered, glarePos } = useTilt(4, 1.012);

  const isTopRanked = index < 4;

  return (
    <div className="w-full h-full">
      <animated.div
        ref={elementRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: transform,
        }}
        className={`relative h-full flex flex-col justify-between p-7 sm:p-8 rounded-3xl glass-card transition-all duration-300 overflow-hidden shadow-xl shadow-black/20 ${
          isTopRanked
            ? 'border-sky-400/25 hover:border-sky-400/50 hover:shadow-2xl hover:shadow-sky-500/15'
            : 'border-slate-800/80 hover:border-sky-400/30'
        }`}
      >
        {/* Soft Radial Glare Follower on Hover */}
        <div 
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: `radial-gradient(circle 350px at ${glarePos.x}% ${glarePos.y}%, rgba(56, 189, 248, 0.12), transparent 70%)`,
          }}
        />

        {/* Ambient Top Corner Light */}
        {isTopRanked && (
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
        )}

        <div className="relative z-10 flex-1 flex flex-col">
          {/* Card Top Category & Rank Pill */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300">
                {project.category}
              </span>
              {isTopRanked && (
                <span className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-blue-500/15 text-blue-200 border border-blue-400/20">
                  Top #{index + 1}
                </span>
              )}
            </div>

            {project.badge && (
              <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/10 text-cyan-200 border border-cyan-400/20">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                {project.badge}
              </span>
            )}
          </div>

          {/* Project Title */}
          <h3 
            onClick={() => onSelect(project)}
            className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2.5 hover:text-sky-300 transition-colors cursor-pointer flex items-center justify-between group"
          >
            <span>{project.title}</span>
            <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-sky-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
          </h3>

          {/* Tagline */}
          <p className="text-slate-300 text-sm leading-relaxed mb-5 line-clamp-2">
            {project.tagline}
          </p>

          {/* Key Metric Pill */}
          {project.metrics && (
            <div className="mb-5 px-4 py-2.5 rounded-2xl bg-slate-900/60 border border-sky-400/15 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">{project.metrics.label}</span>
              <span className="text-sky-300 font-bold font-mono">{project.metrics.value}</span>
            </div>
          )}

          {/* Key Engineering Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <ul className="space-y-2 mb-6 text-xs text-slate-300/90 flex-1">
              {project.highlights.slice(0, 2).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{item}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6 pt-3 border-t border-sky-500/10">
            {project.tags.slice(0, 5).map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-900/80 text-sky-200/90 border border-sky-400/10"
              >
                {t}
              </span>
            ))}
            {project.tags.length > 5 && (
              <span className="px-2 py-1 text-[10px] text-slate-500">
                +{project.tags.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* Card Footer: Action Links */}
        <div className="relative z-10 pt-4 border-t border-sky-500/10 flex items-center justify-between gap-3 mt-auto">
          <button
            onClick={() => onSelect(project)}
            className="text-xs font-semibold text-sky-300 hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>Read Architecture</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="View Source on GitHub"
                className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors border border-sky-400/15"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Live Demonstration"
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 hover:text-white transition-colors border border-sky-400/25 text-xs font-medium"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Demo</span>
              </a>
            )}
          </div>
        </div>
      </animated.div>
    </div>
  );
};
