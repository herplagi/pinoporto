'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Github, Layers, ArrowUpRight } from 'lucide-react';
import { Project } from '@/types/database';

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 text-brand-emerald font-mono text-xs mb-2">
            <Layers size={14} />
            <span>SELECTED ARCHITECTURE &amp; BUILDS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
            Featured Projects
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-surface border border-surface-border">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeCategory === cat
                  ? 'bg-brand-emerald text-background font-semibold shadow-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="group glass-card rounded-2xl overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Image Preview Container */}
              {project.image_url && (
                <div className="relative w-full h-48 sm:h-56 bg-surface overflow-hidden border-b border-surface-border">
                  <Image
                    src={project.image_url}
                    alt={project.title}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
                  
                  {/* Category Pill on Image */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-background/80 backdrop-blur-md border border-surface-border text-[11px] font-mono text-text-primary">
                      {project.category}
                    </span>
                  </div>

                  {/* Metrics Badge */}
                  {project.metrics && (
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface/90 backdrop-blur-md border border-surface-border text-[11px] font-mono text-brand-emerald">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald" />
                        {project.metrics}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Content Area */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-display text-xl font-bold text-text-primary group-hover:text-brand-emerald transition-colors">
                    {project.title}
                  </h3>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  {project.summary}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-surface-hover border border-surface-border text-[11px] font-mono text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="px-6 pb-6 pt-2 border-t border-surface-border/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-text-primary hover:text-brand-emerald transition-colors"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <Github size={14} />
                    <span>Source</span>
                  </a>
                )}
              </div>

              <span className="text-[11px] font-mono text-text-muted">
                #{project.slug}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
