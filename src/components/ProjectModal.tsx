import React, { useEffect } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { Project } from '../data/portfolioData';
import { X, ExternalLink, CheckCircle2, Sparkles, Layers, ArrowUpRight } from 'lucide-react';
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
    transform: isOpen ? 'translateY(0%) scale(1)' : 'translateY(5%) scale(0.96)',
    opacity: isOpen ? 1 : 0,
    config: { mass: 0.9, tension: 320, friction: 26 },
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md"
      onClick={onClose}
    >
      <animated.div
        style={modalSpring}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0b1426] border border-sky-400/30 rounded-3xl shadow-2xl p-7 sm:p-9 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-900/80 border border-sky-400/20 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Badge */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-sky-500/10 text-sky-300 border border-sky-400/20">
            {project.category}
          </span>
          {project.badge && (
            <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/10 text-cyan-200 border border-cyan-400/20">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              {project.badge}
            </span>
          )}
        </div>

        {/* Title & Tagline */}
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
          {project.title}
        </h3>
        <p className="text-slate-300 text-base mb-6 leading-relaxed">
          {project.tagline}
        </p>

        {/* Metric Highlight Card */}
        {project.metrics && (
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-sky-400/20 mb-6 flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
              Key Metric / Impact
            </span>
            <div className="text-right">
              <span className="text-sm font-bold text-sky-300 font-mono">
                {project.metrics.value}
              </span>
              <span className="text-xs text-slate-400 ml-2">
                ({project.metrics.label})
              </span>
            </div>
          </div>
        )}

        {/* Overview Description */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs uppercase tracking-wider text-sky-400 font-bold flex items-center gap-2">
            <Layers className="w-4 h-4 text-sky-400" />
            <span>Architecture & Scope</span>
          </h4>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Bullet Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="space-y-3 mb-6">
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Engineering Accomplishments
            </h4>
            <ul className="space-y-2.5">
              {project.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-slate-300 text-sm leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack Tags */}
        <div className="mb-8">
          <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2.5">
            Technologies & Tools
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-lg bg-slate-900 text-sky-200 border border-sky-400/15"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-sky-500/10">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-sky-400/20 text-white font-medium text-sm transition-all"
            >
              <GithubIcon className="w-4 h-4 text-slate-300" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 font-bold text-sm transition-all shadow-md shadow-sky-500/20"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demonstration</span>
            </a>
          )}
          <button
            onClick={onClose}
            className="ml-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-sm font-medium transition-colors border border-slate-800"
          >
            Close
          </button>
        </div>
      </animated.div>
    </animated.div>
  );
};
