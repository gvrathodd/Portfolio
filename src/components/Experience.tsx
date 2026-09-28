import React, { useState } from 'react';
import { portfolioData, ExperienceItem } from '../data/portfolioData';
import { 
  GraduationCap, 
  Award, 
  Users, 
  Trophy, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Briefcase
} from 'lucide-react';

export const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'All' | 'Education' | 'Leadership' | 'Activities'>('All');

  const filteredItems = activeTab === 'All'
    ? portfolioData.experience
    : portfolioData.experience.filter((item) => item.category === activeTab);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Education':
        return <GraduationCap className="w-4 h-4 text-sky-400" />;
      case 'Leadership':
        return <Users className="w-4 h-4 text-cyan-400" />;
      case 'Activities':
      default:
        return <Trophy className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header with Seasats / Klausen Architectural Telemetry */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-6 border-b border-sky-500/20">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-sky-400 uppercase tracking-widest mb-2">
            <span className="text-sky-300 font-bold">// 02</span>
            <span>TRAJECTORY & IMPACT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white uppercase">
            Chronology & Expeditions
          </h2>
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-slate-400 mt-3">
            <span className="text-sky-400 font-semibold">[LOG // 2024 — 2026]</span>
            <span className="text-slate-600">•</span>
            <span>INDIAN INSTITUTE OF TECHNOLOGY MANDI</span>
            <span className="text-slate-600">•</span>
            <span className="text-cyan-400 font-medium">LEADERSHIP & COMPETITIVE TRACK</span>
          </div>
        </div>

        {/* Filter Tabs with Architectural Brackets */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950/90 p-1.5 rounded-xl border border-sky-500/20 backdrop-blur-md">
          {(['All', 'Education', 'Leadership', 'Activities'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/25'
                  : 'text-slate-400 hover:text-sky-300 hover:bg-slate-900'
              }`}
            >
              [{tab.toUpperCase()}]
            </button>
          ))}
        </div>
      </div>

      {/* Vertical Timeline with Technical Markings */}
      <div className="relative pl-6 sm:pl-8 border-l border-sky-500/25 space-y-10 sm:space-y-12">
        {filteredItems.map((item, idx) => (
          <div key={item.id} className="relative group">
            {/* Timeline Glowing Node */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-950 border border-sky-500/40 group-hover:border-sky-400 group-hover:shadow-sky-500/30 transition-all shadow-md shadow-sky-950/50">
              {getCategoryIcon(item.category)}
            </div>

            {/* Content Dossier Card */}
            <div className="p-6 sm:p-7 rounded-2xl glass-panel group-hover:border-sky-500/40 transition-all duration-300 relative overflow-hidden">
              {/* Dossier Index Tag Watermark */}
              <div className="absolute right-4 top-2 pointer-events-none select-none font-mono text-3xl font-black text-sky-400/10 group-hover:text-sky-400/20 transition-colors">
                LOG // 0{idx + 1}
              </div>

              {/* Header: Title, Org, Badge, Period */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-sky-500/15">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono text-sky-400 font-bold uppercase tracking-wider">
                    LOG // 0{idx + 1}
                  </span>
                  <span className="text-slate-600 font-mono text-[10px]">•</span>
                  <span className="px-2 py-0.5 text-xs font-mono rounded-md bg-slate-900 border border-sky-500/20 text-slate-300">
                    {item.category}
                  </span>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs font-mono font-medium rounded-md bg-sky-500/10 text-sky-300 border border-sky-500/25">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-sky-400" />
                  <span>{item.period}</span>
                </div>
              </div>

              {/* Role & Organization */}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 tracking-tight">
                {item.role}
              </h3>
              <div className="flex items-center gap-2 text-sky-400 text-sm font-medium mb-4">
                <span className="font-semibold">{item.organization}</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400 flex items-center gap-1 text-xs font-mono">
                  <MapPin className="w-3.5 h-3.5 text-sky-400/80" />
                  {item.location}
                </span>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Highlights */}
              {item.highlights && item.highlights.length > 0 && (
                <ul className="space-y-2 pt-2 border-t border-slate-900">
                  {item.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-slate-400 text-xs sm:text-sm leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-sky-400/80 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
