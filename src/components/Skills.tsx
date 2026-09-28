import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { 
  Terminal, 
  Cpu, 
  Globe, 
  Wrench, 
  Layers, 
  ShieldCheck 
} from 'lucide-react';

export const Skills: React.FC = () => {
  const { skillCategories } = portfolioData;

  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Terminal className="w-5 h-5 text-sky-400" />;
      case 1:
        return <Cpu className="w-5 h-5 text-cyan-300" />;
      case 2:
        return <Globe className="w-5 h-5 text-blue-400" />;
      case 3:
      default:
        return <Wrench className="w-5 h-5 text-sky-300" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Advanced':
        return 'bg-sky-500/15 text-sky-300 border-sky-400/30';
      case 'Proficient':
        return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/25';
      case 'Familiar':
      default:
        return 'bg-slate-800/60 text-slate-400 border-slate-700/60';
    }
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header with Seasats / Klausen Architectural Telemetry */}
      <div className="mb-14 pb-6 border-b border-sky-500/20">
        <div className="flex items-center gap-2 text-xs font-mono font-medium text-sky-400 uppercase tracking-widest mb-2">
          <span className="text-sky-300 font-bold">// 03</span>
          <span>CAPABILITY MATRIX</span>
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white uppercase mb-3">
          Technical Specifications
        </h2>
        <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-slate-400">
          <span className="text-sky-400 font-semibold">[SPEC // 04 DOMAIN MATRICES]</span>
          <span className="text-slate-600">•</span>
          <span>SYSTEMS, DEEP LEARNING, FULL-STACK & EMBEDDED</span>
          <span className="text-slate-600">•</span>
          <span className="text-emerald-400 font-medium">PRODUCTION DEPLOYED</span>
        </div>
      </div>

      {/* Bento Grid Spec Sheets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category, catIdx) => (
          <div
            key={category.title}
            className="p-6 sm:p-8 rounded-2xl glass-panel hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
          >
            {/* Spec Sheet Index Tag Watermark */}
            <div className="absolute right-4 top-2 pointer-events-none select-none font-mono text-3xl font-black text-sky-400/10 group-hover:text-sky-400/20 transition-colors">
              SPEC // 0{catIdx + 1}
            </div>

            <div>
              {/* Category Spec Header */}
              <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-sky-500/15">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-slate-900 border border-sky-500/20 text-sky-400 shadow-sm">
                    {getCategoryIcon(catIdx)}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-sky-400 font-bold uppercase tracking-wider block">
                      SPEC_SHEET // 0{catIdx + 1}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                      {category.title}
                    </h3>
                  </div>
                </div>
              </div>

              <p className="text-slate-400 text-xs sm:text-sm mb-6 leading-relaxed">
                {category.description}
              </p>

              {/* Skills Tags List */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-sky-500/15 hover:border-sky-400/40 transition-all duration-200 text-xs font-mono shadow-sm"
                  >
                    <span className="font-semibold text-slate-200">{skill.name}</span>
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${getLevelColor(skill.level)}`}>
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom accent badge */}
            <div className="pt-6 mt-6 border-t border-slate-900 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span className="text-slate-400">[{category.skills.length} VERIFIED MODULES]</span>
              <span className="text-sky-400 flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" /> Benchmarked
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
