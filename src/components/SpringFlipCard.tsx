import React, { useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { Project } from '../data/portfolioData';
import { useTilt } from '../hooks/useTilt';
import { GithubIcon } from './Icons';
import { 
  ExternalLink, 
  Sparkles, 
  ArrowUpRight, 
  RotateCw, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Terminal, 
  ShieldCheck 
} from 'lucide-react';

interface SpringFlipCardProps {
  project: Project;
  onSelect: (p: Project) => void;
  index: number;
}

export const SpringFlipCard: React.FC<SpringFlipCardProps> = ({ project, onSelect, index }) => {
  const [flipped, setFlipped] = useState(false);
  const { elementRef, handleMouseMove, handleMouseEnter, handleMouseLeave, transform, isHovered, glarePos } = useTilt(5, 1.015);

  // 3D Flip Spring Physics (Inspired directly by react-spring.dev card flip demo)
  const { transform: flipTransform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(1000px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 1.2, tension: 240, friction: 22 },
  });

  const isTopRanked = index < 4;

  return (
    <div className="relative min-h-[360px] sm:min-h-[380px] w-full [perspective:1000px]">
      <animated.div
        ref={elementRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: transform,
        }}
        className="w-full h-full relative"
      >
        {/* ================= FRONT SIDE ================= */}
        <animated.div
          style={{
            opacity: opacity.to((o) => 1 - o),
            transform: flipTransform,
          }}
          className={`absolute inset-0 flex flex-col justify-between p-6 sm:p-7 rounded-3xl glass-panel transition-colors duration-300 overflow-hidden shadow-xl shadow-black/40 [backface-visibility:hidden] z-10 ${
            isTopRanked
              ? 'border-sky-500/30 hover:border-sky-400/60 hover:shadow-sky-950/30'
              : 'hover:border-sky-500/40'
          }`}
        >
          {/* Dynamic Light Sheen */}
          <div 
            className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: `radial-gradient(circle 350px at ${glarePos.x}% ${glarePos.y}%, rgba(56, 189, 248, 0.16), transparent 70%)`,
            }}
          />

          {/* Ambient Glow */}
          {isTopRanked && (
            <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
          )}

          <div className="relative z-10">
            {/* Badges */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-slate-900/90 border border-sky-500/20 text-slate-300">
                  {project.category}
                </span>
                {isTopRanked && (
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-md bg-sky-500/20 text-sky-300 border border-sky-400/30">
                    Rank #{index + 1}
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

            {/* Title */}
            <h3 
              onClick={() => onSelect(project)}
              className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2 hover:text-sky-300 transition-colors cursor-pointer flex items-center justify-between group"
            >
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

            {/* Highlights (first 2) */}
            {project.highlights && project.highlights.length > 0 && (
              <ul className="space-y-1.5 mb-4 text-xs text-slate-400">
                {project.highlights.slice(0, 2).map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5 line-clamp-1">
                    <span className="text-sky-400">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer Controls: Tags, Flip Button, Action Links */}
          <div className="relative z-10 pt-4 border-t border-slate-900 flex items-center justify-between gap-2 mt-auto">
            {/* Flip Button */}
            <button
              onClick={() => setFlipped(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-sky-300 hover:text-white border border-sky-500/30 text-xs font-mono transition-colors shadow-sm"
              title="Flip to inspect system architecture"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Blueprint</span>
            </button>

            {/* Direct Links */}
            <div className="flex items-center gap-1.5 shrink-0">
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
                  title="Live Demonstration"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              <button
                onClick={() => onSelect(project)}
                className="px-2.5 py-1.5 rounded-lg bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-xs transition-colors shadow-sm shadow-sky-500/20"
              >
                Details
              </button>
            </div>
          </div>
        </animated.div>

        {/* ================= BACK SIDE (ARCHITECTURE BLUEPRINT) ================= */}
        <animated.div
          style={{
            opacity,
            transform: flipTransform.to((t) => `${t} rotateY(180deg)`),
          }}
          className="absolute inset-0 flex flex-col justify-between p-6 sm:p-7 rounded-3xl glass-panel bg-slate-950/95 border-2 border-sky-400/50 shadow-2xl shadow-sky-950/40 overflow-hidden [backface-visibility:hidden] z-20 text-slate-100"
        >
          {/* Blueprint Watermark Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

          <div className="relative z-10 overflow-y-auto pr-1">
            {/* Header */}
            <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-sky-500/20">
              <span className="flex items-center gap-1.5 text-xs font-mono text-sky-300 font-semibold uppercase tracking-wider">
                <Layers className="w-4 h-4 text-sky-400" />
                Architecture Blueprint
              </span>
              <button
                onClick={() => setFlipped(false)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-sky-500/30 text-sky-300 hover:text-white text-xs font-mono"
              >
                <RotateCw className="w-3 h-3" />
                <span>Flip Back</span>
              </button>
            </div>

            <h4 className="text-base font-bold text-white mb-2">
              {project.title}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {project.description}
            </p>

            {/* Engineering Highlights */}
            {project.highlights && (
              <div className="space-y-1.5 mb-4">
                <span className="text-[11px] font-mono text-sky-400 uppercase tracking-wider font-semibold block">
                  Engineering Invariants
                </span>
                {project.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Stack List */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-900">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900 text-sky-300 border border-sky-500/20"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Back Footer */}
          <div className="relative z-10 pt-3 border-t border-sky-500/20 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Verified Spec</span>
            <button
              onClick={() => onSelect(project)}
              className="text-sky-300 hover:text-white font-bold underline"
            >
              Full Modal View →
            </button>
          </div>
        </animated.div>
      </animated.div>
    </div>
  );
};
