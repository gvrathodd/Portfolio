import React, { useState } from 'react';
import { portfolioData, Project } from '../data/portfolioData';
import { SpringFlipCard } from './SpringFlipCard';
import { DeepfakeSimulator } from './DeepfakeSimulator';
import { MiniPathfinder } from './MiniPathfinder';
import { ProjectModal } from './ProjectModal';
import { 
  Flame, 
  Sparkles, 
  Layers, 
  RotateCw, 
  Compass, 
  Cpu 
} from 'lucide-react';

type CategoryOption = 'All' | Project['category'];

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryOption>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories: CategoryOption[] = ['All', 'AI & ML', 'Software Dev', 'Android & Mobile', 'Systems & Robotics'];

  const filteredProjects = activeCategory === 'All'
    ? portfolioData.projects
    : portfolioData.projects.filter((p: Project) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header with Seasats / Klausen Architectural Telemetry */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-sky-500/20">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-sky-400 uppercase tracking-widest mb-2">
            <span className="text-sky-300 font-bold">// 01</span>
            <span>ARCHITECTURE & SYSTEMS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white uppercase">
            Engineered Systems & Research
          </h2>
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-slate-400 mt-3">
            <span className="text-sky-400 font-semibold">[INDEX // 08 ARTIFACTS]</span>
            <span className="text-slate-600">•</span>
            <span>OPTIMIZED WITH REACT SPRING PHYSICS</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              VERIFIED AT 60 FPS
            </span>
          </div>
        </div>

        {/* Category Filter Tabs with Architectural Brackets */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950/90 p-1.5 rounded-xl border border-sky-500/20 backdrop-blur-md">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/25'
                  : 'text-slate-400 hover:text-sky-300 hover:bg-slate-900'
              }`}
            >
              [{cat.toUpperCase()}]
            </button>
          ))}
        </div>
      </div>

      {/* SPECIAL COMPONENT #1: Interactive Deepfake Pipeline Simulator */}
      <DeepfakeSimulator />

      {/* SPECIAL COMPONENT #2: 3D Flip Project Cards (React Spring 3D Physics) */}
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-sky-500/15">
        <h3 className="text-xs sm:text-sm font-mono text-sky-300 uppercase tracking-widest flex items-center gap-2 font-bold">
          <Layers className="w-4 h-4 text-sky-400" />
          <span>// 01.1 ARTIFACT DOSSIERS — RANKED SYSTEMS</span>
        </h3>
        <span className="text-[11px] text-slate-400 font-mono">
          [COUNT: {filteredProjects.length} DOSSIERS]
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project, index) => (
          <SpringFlipCard
            key={project.id}
            project={project}
            index={index}
            onSelect={setSelectedProject}
          />
        ))}
      </div>

      {/* SPECIAL COMPONENT #3: Mini Pathfinder Traversal Visualizer */}
      <MiniPathfinder />

      {/* Project Deep Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
