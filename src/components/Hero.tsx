import React from 'react';
import { animated, useSpring } from '@react-spring/web';
import { portfolioData } from '../data/portfolioData';
import { MagneticButton } from './MagneticButton';
import { 
  FileDown, 
  Mail, 
  ArrowUpRight, 
  Sparkles, 
  MapPin, 
  Code2, 
  Cpu, 
  Terminal
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Hero: React.FC = () => {
  const { personal } = portfolioData;

  // Flowy spring animation for initial entrance
  const entranceSpring = useSpring({
    from: { opacity: 0, transform: 'translate3d(0, 30px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0px, 0)' },
    config: { mass: 1.2, tension: 240, friction: 28 },
    delay: 150,
  });

  // Spring animation for stats grid
  const statsSpring = useSpring({
    from: { opacity: 0, transform: 'translate3d(0, 24px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0px, 0)' },
    config: { mass: 1.2, tension: 240, friction: 28 },
    delay: 350,
  });

  return (
    <section id="hero" className="relative min-h-[94vh] pt-32 sm:pt-40 pb-20 flex flex-col justify-center items-center px-4 sm:px-6 overflow-hidden">
      {/* Flowing Ambient Sky Blue Aurora Mesh */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[850px] h-[350px] sm:h-[480px] bg-gradient-to-tr from-sky-500/15 via-cyan-500/15 to-blue-600/10 blur-[130px] pointer-events-none rounded-full animate-aurora" 
      />

      <animated.div style={entranceSpring} className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center">
        {/* Availability Beacon Pill (Mobbin / Curated style) */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-sky-500/25 text-xs text-slate-300 mb-6 shadow-sm shadow-sky-500/10 backdrop-blur-md">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400"></span>
          </span>
          <span className="text-sky-300 font-mono">{personal.statusBadge}</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400 flex items-center gap-1 font-mono text-[11px]">
            <MapPin className="w-3 h-3 text-sky-400" />
            IIT Mandi
          </span>
        </div>

        {/* Large Name */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4 leading-[1.08]">
          {personal.name}
        </h1>

        {/* Short Tagline with Sky Blue Gradient */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <span className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
            {personal.role}
          </span>
        </div>

        {/* About Me Paragraph */}
        <p className="max-w-2xl text-slate-300/90 text-base sm:text-lg leading-relaxed mb-10 text-balance font-normal">
          {personal.aboutMe}
        </p>

        {/* Primary Action Buttons with React Spring Magnetic Physics */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mb-14">
          {/* Resume Button */}
          <MagneticButton
            href={personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-sm sm:text-base transition-colors duration-200 shadow-xl shadow-sky-500/30"
          >
            <FileDown className="w-4 h-4" />
            <span>Download Resume</span>
          </MagneticButton>

          {/* View Projects CTA */}
          <MagneticButton
            href="#projects"
            className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-900/90 hover:bg-slate-800/90 text-slate-200 border border-sky-500/25 hover:border-sky-400/50 font-semibold text-sm sm:text-base transition-colors duration-200 shadow-lg shadow-black/40"
          >
            <span>Explore Projects</span>
            <ArrowUpRight className="w-4 h-4 text-sky-400" />
          </MagneticButton>

          {/* GitHub Icon Link */}
          <MagneticButton
            href={personal.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            ariaLabel="GitHub Profile"
            className="p-3.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-white border border-sky-500/20 hover:border-sky-400/50 transition-colors duration-200 shadow-md shadow-black/30"
          >
            <GithubIcon className="w-5 h-5" />
          </MagneticButton>

          {/* LinkedIn Icon Link */}
          <MagneticButton
            href={personal.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            ariaLabel="LinkedIn Profile"
            className="p-3.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-white border border-sky-500/20 hover:border-sky-400/50 transition-colors duration-200 shadow-md shadow-black/30"
          >
            <LinkedinIcon className="w-5 h-5" />
          </MagneticButton>

          {/* Email Quick Contact */}
          <MagneticButton
            href={`mailto:${personal.email}`}
            title="Email"
            ariaLabel="Email Me"
            className="p-3.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-white border border-sky-500/20 hover:border-sky-400/50 transition-colors duration-200 shadow-md shadow-black/30"
          >
            <Mail className="w-5 h-5" />
          </MagneticButton>
        </div>

        {/* Quick Stats Grid with Flowy Bento styling */}
        <animated.div style={statsSpring} className="w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 text-left">
          {personal.quickStats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl glass-panel hover:border-sky-500/40 transition-all duration-300 group"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight group-hover:text-sky-300 transition-colors">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 mt-1.5 font-medium leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </animated.div>
      </animated.div>
    </section>
  );
};
