import React from 'react';
import { animated, useSpring } from '@react-spring/web';
import { portfolioData } from '../data/portfolioData';
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

  // Spring animation for initial entrance
  const entranceSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(24px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { mass: 1, tension: 280, friction: 32 },
    delay: 150,
  });

  // Spring animation for stats grid
  const statsSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { mass: 1, tension: 280, friction: 32 },
    delay: 350,
  });

  return (
    <section id="hero" className="relative min-h-[92vh] pt-32 sm:pt-40 pb-20 flex flex-col justify-center items-center px-4 sm:px-6">
      {/* Subtle Ambient Radial Glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[750px] h-[350px] sm:h-[450px] bg-gradient-to-tr from-emerald-500/10 via-cyan-500/10 to-transparent blur-[120px] pointer-events-none rounded-full" 
      />

      <animated.div style={entranceSpring} className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center">
        {/* Availability Beacon Pill (Watermelon UI style) */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300 mb-6 shadow-sm">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-zinc-400 font-mono">{personal.statusBadge}</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-400 flex items-center gap-1 font-mono text-[11px]">
            <MapPin className="w-3 h-3 text-emerald-400" />
            IIT Mandi
          </span>
        </div>

        {/* Large Name */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4 leading-[1.1]">
          {personal.name}
        </h1>

        {/* Short Tagline */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <span className="text-lg sm:text-2xl font-semibold bg-gradient-to-r from-emerald-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
            {personal.role}
          </span>
        </div>

        {/* About Me Paragraph */}
        <p className="max-w-2xl text-zinc-400 text-base sm:text-lg leading-relaxed mb-8 text-balance">
          {personal.aboutMe}
        </p>

        {/* Primary Action Buttons (Resume, GitHub, LinkedIn, Contact) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
          {/* Resume Button */}
          <a
            href={personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm sm:text-base transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
          >
            <FileDown className="w-4 h-4" />
            <span>Download Resume</span>
          </a>

          {/* View Projects CTA */}
          <a
            href="#projects"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 font-semibold text-sm sm:text-base transition-all duration-200 hover:-translate-y-0.5"
          >
            <span>Explore Projects</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-400" />
          </a>

          {/* GitHub Icon Link */}
          <a
            href={personal.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 transition-all duration-200 hover:-translate-y-0.5"
            aria-label="GitHub Profile"
            title="GitHub"
          >
            <GithubIcon className="w-5 h-5" />
          </a>

          {/* LinkedIn Icon Link */}
          <a
            href={personal.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 transition-all duration-200 hover:-translate-y-0.5"
            aria-label="LinkedIn Profile"
            title="LinkedIn"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>

          {/* Email Quick Contact */}
          <a
            href={`mailto:${personal.email}`}
            className="p-3 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 transition-all duration-200 hover:-translate-y-0.5"
            aria-label="Email Me"
            title="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Quick Stats Grid (Godly minimalist bento style) */}
        <animated.div style={statsSpring} className="w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-left">
          {personal.quickStats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl glass-panel hover:border-zinc-700/80 transition-all duration-300 group"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight group-hover:text-emerald-400 transition-colors">
                {stat.value}
              </div>
              <div className="text-xs text-zinc-400 mt-1 font-medium leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </animated.div>
      </animated.div>
    </section>
  );
};
