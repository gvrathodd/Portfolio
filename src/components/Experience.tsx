import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { 
  GraduationCap, 
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
        return <Users className="w-4 h-4 text-sky-300" />;
      case 'Activities':
      default:
        return <Trophy className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <section id="experience" className="py-28 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Clean, Elegant Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-semibold text-sky-300 mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Journey & Leadership</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Experience & Activities
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2.5 max-w-xl leading-relaxed">
            Academic foundation at IIT Mandi, major fest sponsorships, and engineering teams.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 p-1.5 rounded-full glass-card border border-sky-400/20 self-start md:self-auto">
          {(['All', 'Education', 'Leadership', 'Activities'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-sky-400 text-slate-950 shadow-md shadow-sky-400/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Smooth Vertical Timeline */}
      <div className="relative pl-6 sm:pl-8 border-l border-sky-400/20 space-y-8 sm:space-y-10">
        {filteredItems.map((item) => (
          <div key={item.id} className="relative group">
            {/* Timeline Node */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-2 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0b1426] border border-sky-400/30 group-hover:border-sky-400 group-hover:scale-110 transition-all shadow-md shadow-sky-950/40">
              {getCategoryIcon(item.category)}
            </div>

            {/* Experience Card */}
            <div className="p-6 sm:p-8 rounded-3xl glass-card hover:border-sky-400/40 transition-all duration-300 shadow-xl shadow-black/10">
              {/* Header: Category, Badge & Period */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-0.5 text-xs font-semibold rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300">
                    {item.category}
                  </span>
                  {item.badge && (
                    <span className="px-3 py-0.5 text-xs font-semibold rounded-full bg-blue-500/15 text-blue-200 border border-blue-400/20">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-sky-400" />
                  <span>{item.period}</span>
                </div>
              </div>

              {/* Role & Organization */}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5 tracking-tight">
                {item.role}
              </h3>
              <div className="flex items-center gap-2 text-sky-300 text-sm font-semibold mb-4">
                <span>{item.organization}</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400 flex items-center gap-1 text-xs font-normal">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {item.location}
                </span>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Highlights */}
              {item.highlights && item.highlights.length > 0 && (
                <ul className="space-y-2 pt-3 border-t border-sky-500/10">
                  {item.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-slate-300 text-xs sm:text-sm leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
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
