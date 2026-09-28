import React from 'react';
import { animated, useSpring } from '@react-spring/web';
import { portfolioData } from '../data/portfolioData';
import { WordFlipper } from './WordFlipper';
import { 
  ArrowDown, 
  FileDown, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Hero: React.FC = () => {
  const { personal } = portfolioData;

  // Silky smooth entrance spring
  const entranceSpring = useSpring({
    from: { opacity: 0, transform: 'translate3d(0, 24px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0px, 0)' },
    config: { mass: 1, tension: 180, friction: 24 },
    delay: 80,
  });

  return (
    <section id="hero" className="relative min-h-[92vh] pt-36 sm:pt-44 pb-20 flex flex-col justify-center items-center text-center px-4 sm:px-6 max-w-5xl mx-auto">
      <animated.div style={entranceSpring} className="relative z-10 w-full flex flex-col items-center">
        {/* Availability Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-pill border border-sky-400/25 text-xs font-medium text-sky-200 mb-8 shadow-lg shadow-sky-950/20">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span>Available for Software Engineering & AI/ML Roles</span>
        </div>

        {/* Name Header */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4">
          Hi, I'm <span className="sky-gradient-text">{personal.name}</span>
        </h1>

        {/* Dynamic Rotating Role Tagline */}
        <div className="mb-6 flex justify-center">
          <WordFlipper />
        </div>

        {/* Clean, Readable Bio */}
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mb-10 font-normal">
          {personal.aboutMe}
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-14">
          <a
            href="#projects"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 hover:from-sky-300 hover:to-sky-400 text-slate-950 font-bold text-sm transition-all duration-200 shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.03] active:scale-[0.98]"
          >
            <span>Explore Projects</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <a
            href={personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-full glass-card hover:bg-white/10 text-sky-200 border border-sky-400/25 text-sm font-semibold transition-all hover:scale-[1.03] active:scale-[0.98]"
          >
            <FileDown className="w-4 h-4 text-sky-400" />
            <span>Resume</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <a
            href={personal.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="p-3 rounded-full glass-card hover:bg-white/10 text-slate-300 hover:text-sky-300 border border-sky-400/25 transition-all hover:scale-105"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          <a
            href={personal.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Profile"
            className="p-3 rounded-full glass-card hover:bg-white/10 text-slate-300 hover:text-sky-300 border border-sky-400/25 transition-all hover:scale-105"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Clean Highlight Stats Card */}
        <div className="w-full max-w-4xl p-5 sm:p-6 rounded-3xl glass-card border border-sky-400/20 shadow-2xl shadow-sky-950/20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="space-y-1">
            <span className="text-xl sm:text-2xl font-bold text-white block">IIT Mandi</span>
            <span className="text-xs text-sky-300/90 font-medium">B.Tech Engineering</span>
          </div>

          <div className="space-y-1">
            <span className="text-xl sm:text-2xl font-bold text-sky-300 block">0.884 AUC</span>
            <span className="text-xs text-slate-400 font-medium">Deepfake Detection SOTA</span>
          </div>

          <div className="space-y-1">
            <span className="text-xl sm:text-2xl font-bold text-white block">60 FPS</span>
            <span className="text-xs text-sky-300/90 font-medium">Graph Engine Visualizer</span>
          </div>

          <div className="space-y-1">
            <span className="text-xl sm:text-2xl font-bold text-sky-300 block">C++ & Python</span>
            <span className="text-xs text-slate-400 font-medium">Core Systems & AI Stack</span>
          </div>
        </div>
      </animated.div>
    </section>
  );
};
