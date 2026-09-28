import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { 
  Code2, 
  Cpu, 
  Globe, 
  Wrench, 
  Sparkles 
} from 'lucide-react';

export const Skills: React.FC = () => {
  const { skillCategories } = portfolioData;

  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Code2 className="w-5 h-5 text-sky-400" />;
      case 1:
        return <Cpu className="w-5 h-5 text-sky-300" />;
      case 2:
        return <Globe className="w-5 h-5 text-blue-400" />;
      case 3:
      default:
        return <Wrench className="w-5 h-5 text-cyan-300" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Advanced':
        return 'bg-sky-500/15 text-sky-300 border-sky-400/25';
      case 'Proficient':
        return 'bg-blue-500/15 text-blue-300 border-blue-400/25';
      case 'Familiar':
      default:
        return 'bg-slate-800/80 text-slate-300 border-slate-700/60';
    }
  };

  return (
    <section id="skills" className="py-28 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Clean, Elegant Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-semibold text-sky-300 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Skills & Technologies
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2.5 max-w-xl leading-relaxed">
            Core toolkits, systems, and frameworks I use to engineer robust backend services and intelligent AI pipelines.
          </p>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {skillCategories.map((category, catIdx) => (
          <div
            key={category.title}
            className="p-7 sm:p-8 rounded-3xl glass-card hover:border-sky-400/40 transition-all duration-300 flex flex-col justify-between group shadow-xl shadow-black/10"
          >
            <div>
              {/* Category Header */}
              <div className="flex items-center gap-3.5 mb-3.5">
                <div className="p-2.5 rounded-2xl bg-sky-500/10 border border-sky-400/20 text-sky-400">
                  {getCategoryIcon(catIdx)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                    {category.title}
                  </h3>
                </div>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm mb-6 leading-relaxed">
                {category.description}
              </p>

              {/* Skills Tags List */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-sky-400/15 hover:border-sky-400/35 transition-all duration-200 text-xs sm:text-sm shadow-sm"
                  >
                    <span className="font-medium text-slate-200">{skill.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md border font-medium ${getLevelColor(skill.level)}`}>
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom count badge */}
            <div className="pt-6 mt-6 border-t border-sky-500/10 flex items-center justify-between text-xs text-slate-400">
              <span>{category.skills.length} core technologies</span>
              <span className="text-sky-400 font-semibold">Production Ready</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
