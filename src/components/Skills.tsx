import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { 
  Code2, 
  Cpu, 
  Globe, 
  Terminal, 
  Wrench, 
  Layers, 
  Sparkles, 
  Check, 
  ShieldCheck 
} from 'lucide-react';

export const Skills: React.FC = () => {
  const { skillCategories } = portfolioData;

  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Terminal className="w-5 h-5 text-emerald-400" />;
      case 1:
        return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 2:
        return <Globe className="w-5 h-5 text-indigo-400" />;
      case 3:
      default:
        return <Wrench className="w-5 h-5 text-violet-400" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Advanced':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Proficient':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'Familiar':
      default:
        return 'bg-zinc-800/60 text-zinc-400 border-zinc-700/60';
    }
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-400 uppercase tracking-widest mb-2">
          <Layers className="w-4 h-4" />
          Technical Proficiency
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          Skills & Tech Stack
        </h2>
        <p className="text-zinc-400 text-base max-w-2xl">
          Core toolkits, systems, and frameworks I use to engineer scalable backend services, intelligent AI pipelines, and responsive mobile/web applications.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category, catIdx) => (
          <div
            key={category.title}
            className="p-6 sm:p-8 rounded-3xl glass-panel hover:border-zinc-700/80 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                  {getCategoryIcon(catIdx)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {category.title}
                  </h3>
                </div>
              </div>

              <p className="text-zinc-400 text-xs sm:text-sm mb-6 leading-relaxed">
                {category.description}
              </p>

              {/* Skills Tags List */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800/90 hover:border-zinc-700 transition-all duration-200 text-xs sm:text-sm"
                  >
                    <span className="font-medium text-zinc-200">{skill.name}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md border ${getLevelColor(skill.level)}`}>
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom accent badge */}
            <div className="pt-6 mt-6 border-t border-zinc-900/80 flex items-center justify-between text-xs text-zinc-500 font-mono">
              <span>{category.skills.length} core technologies</span>
              <span className="text-emerald-400/80 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Production Ready
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
