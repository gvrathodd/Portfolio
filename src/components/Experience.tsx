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
  ChevronRight,
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
        return <GraduationCap className="w-4 h-4 text-emerald-400" />;
      case 'Leadership':
        return <Users className="w-4 h-4 text-cyan-400" />;
      case 'Activities':
      default:
        return <Trophy className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-400 uppercase tracking-widest mb-2">
            <Briefcase className="w-4 h-4" />
            Background & Milestones
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Experience & Activities
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800/80">
          {(['All', 'Education', 'Leadership', 'Activities'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 sm:pl-8 border-l border-zinc-800/80 space-y-10 sm:space-y-12">
        {filteredItems.map((item) => (
          <div key={item.id} className="relative group">
            {/* Timeline Glowing Node */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-zinc-950 border border-zinc-700/80 group-hover:border-emerald-500/80 transition-colors shadow-md">
              {getCategoryIcon(item.category)}
            </div>

            {/* Content Card */}
            <div className="p-6 sm:p-7 rounded-3xl glass-panel group-hover:border-zinc-700 transition-all duration-300">
              {/* Header: Title, Org, Badge, Period */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 text-xs font-mono rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">
                    {item.category}
                  </span>
                  {item.badge && (
                    <span className="px-2.5 py-1 text-xs font-mono font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{item.period}</span>
                </div>
              </div>

              {/* Role & Organization */}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 tracking-tight">
                {item.role}
              </h3>
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium mb-4">
                <span>{item.organization}</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-400 flex items-center gap-1 text-xs">
                  <MapPin className="w-3 h-3 text-zinc-500" />
                  {item.location}
                </span>
              </div>

              {/* Description */}
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Highlights */}
              {item.highlights && item.highlights.length > 0 && (
                <ul className="space-y-2 pt-2 border-t border-zinc-900">
                  {item.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-zinc-400 text-xs sm:text-sm leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400/80 shrink-0 mt-0.5" />
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
