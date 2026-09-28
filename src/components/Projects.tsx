import React, { useState } from 'react';
import { portfolioData, Project } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { Sparkles, Layers } from 'lucide-react';

type CategoryOption = 'All' | Project['category'];

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryOption>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories: CategoryOption[] = ['All', 'AI & ML', 'Software Dev', 'Android & Mobile', 'Systems & Robotics'];

  const filteredProjects = activeCategory === 'All'
    ? portfolioData.projects
    : portfolioData.projects.filter((p: Project) => p.category === activeCategory);

  return (
    <section id="projects" className="py-28 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Clean, Elegant Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-semibold text-sky-300 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Crafted Systems & Research
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2.5 max-w-xl leading-relaxed">
            High-impact deep learning pipelines, algorithmic engines, and native software engineered with precision.
          </p>
        </div>

        {/* Smooth Category Filter Pills (Watermelon UI style) */}
        <div className="flex flex-wrap gap-1.5 p-1.5 rounded-full glass-card border border-sky-400/20 self-start md:self-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-sky-400 text-slate-950 shadow-md shadow-sky-400/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onSelect={setSelectedProject}
          />
        ))}
      </div>

      {/* Smooth Project Deep Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
