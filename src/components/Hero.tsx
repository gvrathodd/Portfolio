import React from 'react';
import { animated, useSpring } from '@react-spring/web';
import { portfolioData } from '../data/portfolioData';
import { MagneticButton } from './MagneticButton';
import { WordFlipper } from './WordFlipper';
import { 
  FileDown, 
  ArrowDownRight, 
  Sparkles, 
  Terminal, 
  Cpu, 
  Activity, 
  Layers, 
  Binary, 
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Hero: React.FC = () => {
  const { personal } = portfolioData;

  // Spring animation for entrance
  const entranceSpring = useSpring({
    from: { opacity: 0, transform: 'translate3d(0, 32px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0px, 0)' },
    config: { mass: 1.2, tension: 220, friction: 28 },
    delay: 100,
  });

  return (
    <section id="hero" className="relative min-h-[96vh] pt-28 sm:pt-36 pb-20 flex flex-col justify-center px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Background Aurora Glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[950px] h-[380px] sm:h-[500px] bg-gradient-to-tr from-sky-500/10 via-cyan-500/10 to-indigo-600/5 blur-[140px] pointer-events-none rounded-full animate-aurora" 
      />

      <animated.div style={entranceSpring} className="relative z-10 w-full">
        {/* Top Technical Metadata Bar (Seasats style) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-sky-500/15 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-sky-300 font-bold uppercase tracking-widest">
              [SYSTEMS // MACHINE LEARNING // VISION]
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span>ENGINEERING SCHOLAR</span>
            <span className="text-slate-600">•</span>
            <span className="text-sky-300">IIT MANDI</span>
          </div>
        </div>

        {/* The Tie-Break / Klausen Style Monumental Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12">
          {/* Left Column (8 cols): Massive Editorial Typography */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tighter text-white uppercase leading-[0.92] mb-4">
                SYSTEMS &<br />
                <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                  MACHINE
                </span><br />
                LEARNING
              </h1>

              {/* Kinetic Role Flipper */}
              <div className="mb-6">
                <WordFlipper />
              </div>

              {/* Mission Statement */}
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mb-8 font-normal">
                {personal.aboutMe}
              </p>
            </div>

            {/* Action Triggers with React Spring Magnetic Physics */}
            <div className="flex flex-wrap items-center gap-3.5 pt-4 border-t border-sky-500/15">
              <MagneticButton
                href="#projects"
                className="flex items-center gap-2 px-6 py-3.5 rounded bg-sky-400 hover:bg-sky-300 text-slate-950 font-display font-bold text-sm tracking-wider uppercase transition-colors shadow-lg shadow-sky-500/25"
              >
                <span>EXPLORE WORK</span>
                <ArrowDownRight className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3.5 rounded bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-sky-500/20 hover:border-sky-400/50 font-mono text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                <FileDown className="w-4 h-4 text-sky-400" />
                <span>RESUME.PDF</span>
              </MagneticButton>

              <MagneticButton
                href={personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                ariaLabel="LinkedIn Profile"
                className="p-3.5 rounded bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-white border border-sky-500/20 hover:border-sky-400/50 transition-colors"
              >
                <LinkedinIcon className="w-5 h-5" />
              </MagneticButton>

              <MagneticButton
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                ariaLabel="GitHub Profile"
                className="p-3.5 rounded bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-white border border-sky-500/20 hover:border-sky-400/50 transition-colors"
              >
                <GithubIcon className="w-5 h-5" />
              </MagneticButton>
            </div>
          </div>

          {/* Right Column (5 cols): Seasats-Style Engineering Telemetry Terminal */}
          <div className="lg:col-span-5 w-full">
            <div className="tech-panel p-6 sm:p-7 rounded-2xl border border-sky-500/25 shadow-2xl shadow-black/80 font-mono text-xs text-slate-300 space-y-5">
              {/* Telemetry Header */}
              <div className="flex items-center justify-between pb-3 border-b border-sky-500/20">
                <span className="text-[11px] uppercase tracking-wider text-sky-400 font-bold flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  SYSTEM TELEMETRY // SPECS
                </span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> VERIFIED
                </span>
              </div>

              {/* Metric Rows */}
              <div className="space-y-3.5">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-sky-500/15 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">Primary Architecture</span>
                    <span className="text-white font-bold text-sm">DINOv2 ViT-L/14 + SRM</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sky-300 font-bold text-sm">0.884 AUC</span>
                    <span className="text-[10px] text-emerald-400 block">+5.3% WildDeepfake</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-sky-500/15 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">Graph Traversal Visualizer</span>
                    <span className="text-white font-bold text-sm">Path-Finder Engine</span>
                  </div>
                  <div className="text-right">
                    <span className="text-cyan-300 font-bold text-sm">60 FPS</span>
                    <span className="text-[10px] text-slate-400 block">2,500+ nodes</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-sky-500/15 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">Native Desktop Application</span>
                    <span className="text-white font-bold text-sm">QTextEditor (C++17 / Qt)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sky-300 font-bold text-sm">Low-Latency</span>
                    <span className="text-[10px] text-slate-400 block">Multi-Tab Buffer</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-sky-500/15 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">Autonomous Systems</span>
                    <span className="text-white font-bold text-sm">Hudson RC Car (OpenCV)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-indigo-300 font-bold text-sm">30+ FPS</span>
                    <span className="text-[10px] text-slate-400 block">PID Steering</span>
                  </div>
                </div>
              </div>

              {/* Status Footer */}
              <div className="pt-3 border-t border-sky-500/20 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5 text-sky-300">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping inline-block" />
                  STATUS: READY FOR ROLES
                </span>
                <span className="text-slate-500">MANDI, HP</span>
              </div>
            </div>
          </div>
        </div>
      </animated.div>
    </section>
  );
};
