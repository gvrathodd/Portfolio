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
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-sky-400 uppercase tracking-widest mb-2">
            <Flame className="w-4 h-4" />
            Special Showcase & Engineering
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Projects & Architecture
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-xl">
            Interactive 3D cards with front/back architecture flip, live neural pipeline simulation, and real-time pathfinding engine.
          </p>
        </div>

        {/* Category Filter Pills (Mobbin / Curated style) */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950/90 p-1.5 rounded-2xl border border-sky-500/20 backdrop-blur-md">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/25'
                  : 'text-slate-400 hover:text-sky-300 hover:bg-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* SPECIAL COMPONENT #1: Interactive Deepfake Pipeline Simulator */}
      <DeepfakeSimulator />

      {/* SPECIAL COMPONENT #2: 3D Flip Project Cards (React Spring 3D Physics) */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-mono text-sky-300 uppercase tracking-wider flex items-center gap-2 font-semibold">
          <Layers className="w-4 h-4 text-sky-400" />
          Ranked Technical Systems (Click 'Blueprint' to 3D Flip)
        </h3>
        <span className="text-xs text-slate-500 font-mono hidden sm:inline">
          Showing {filteredProjects.length} systems
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
