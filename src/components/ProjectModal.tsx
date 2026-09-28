import React, { useEffect } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { Project } from '../data/portfolioData';
import { X, ExternalLink, CheckCircle2, Sparkles, Layers } from 'lucide-react';
import { GithubIcon } from './Icons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const isOpen = Boolean(project);

  const backdropSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    config: { tension: 300, friction: 30 },
  });

  const modalSpring = useSpring({
    transform: isOpen ? 'translateY(0%) scale(1)' : 'translateY(8%) scale(0.96)',
    opacity: isOpen ? 1 : 0,
    config: { mass: 0.8, tension: 350, friction: 28 },
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <animated.div
      style={backdropSpring}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <animated.div
        style={modalSpring}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-zinc-950 border border-zinc-800/90 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors focus:outline-none"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Badge */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {project.category}
          </span>
          {project.badge && (
            <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              <Sparkles className="w-3 h-3" />
              {project.badge}
            </span>
          )}
        </div>

        {/* Title & Tagline */}
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
          {project.title}
        </h3>
        <p className="text-zinc-400 text-base mb-6 leading-relaxed">
          {project.tagline}
        </p>

        {/* Metric Highlight Card (Watermelon UI style) */}
        {project.metrics && (
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 mb-6 flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-mono text-zinc-400">
              Key Metric / Impact
            </span>
            <div className="text-right">
              <span className="text-sm font-semibold text-emerald-400 font-mono">
                {project.metrics.value}
              </span>
              <span className="text-xs text-zinc-500 ml-2">
                ({project.metrics.label})
              </span>
            </div>
          </div>
        )}

        {/* Overview Description */}
        <div className="space-y-4 mb-6">
          <h4 className="text-xs uppercase tracking-wider font-mono text-zinc-400 font-semibold flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            System Overview & Architecture
          </h4>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Bullet Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="space-y-3 mb-6">
            <h4 className="text-xs uppercase tracking-wider font-mono text-zinc-400 font-semibold">
              Key Engineering Achievements
            </h4>
            <ul className="space-y-2.5">
              {project.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-zinc-300 text-sm leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack Tags */}
        <div className="mb-8">
          <h4 className="text-xs uppercase tracking-wider font-mono text-zinc-400 font-semibold mb-2.5">
            Technologies & Frameworks
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-mono rounded-md bg-zinc-900 text-zinc-300 border border-zinc-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-zinc-800">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-white font-medium text-sm transition-all duration-200"
            >
              <GithubIcon className="w-4 h-4" />
              <span>View Source Code</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-500/20"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demonstration</span>
            </a>
          )}
          <button
            onClick={onClose}
            className="ml-auto px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-sm font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </animated.div>
    </animated.div>
  );
};
