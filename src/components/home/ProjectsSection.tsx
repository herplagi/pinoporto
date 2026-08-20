'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  ArrowUpRight,
  X,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Maximize2,
  Lock
} from 'lucide-react';
import { Project } from '@/types/database';
import AnimateIn from '@/components/ui/AnimateIn';

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const handleOpenDetail = (project: Project) => {
    setSelectedProject(project);
    setActiveImageIdx(0);
  };

  const handleCloseDetail = () => {
    setSelectedProject(null);
  };

  const statusLabel = (status?: string) => {
    if (status === 'In Progress') return { text: 'In Progress', color: 'text-cyan-400' };
    if (status === 'Maintenance') return { text: 'Maintenance', color: 'text-purple-400' };
    return { text: 'Completed', color: 'text-accent' };
  };

  return (
    <section id="projects" className="py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Header */}
      <AnimateIn>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
            Selected Work
          </h2>

          {/* Category filters as text links */}
          <div className="flex items-center gap-5 text-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`transition-colors duration-200 ${
                  activeCategory === cat
                    ? 'text-text-primary'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </AnimateIn>

      {/* Project List — Editorial rows */}
      <div className="border-t border-surface-border">
        {filteredProjects.map((project, idx) => {
          const st = statusLabel(project.status);
          return (
            <AnimateIn key={project.id} delay={idx * 0.05}>
              <div
                className="project-row group border-b border-surface-border py-6 md:py-8 cursor-pointer relative"
                onClick={() => handleOpenDetail(project)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div className="flex items-start md:items-center justify-between gap-4">
                  {/* Left: Title + meta */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-display text-xl md:text-2xl font-semibold text-text-primary group-hover:text-accent transition-colors duration-300 truncate">
                        {project.title}
                      </h3>
                      {project.is_private && (
                        <Lock size={14} className="text-text-muted shrink-0" />
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-muted">
                      <span>{project.category}</span>
                      <span className={st.color}>{st.text}</span>
                      <span className="hidden md:inline">{project.tags.slice(0, 3).join(' · ')}</span>
                    </div>
                  </div>

                  {/* Right: Arrow */}
                  <div className="shrink-0 text-text-muted group-hover:text-accent transition-colors duration-300">
                    <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </div>

                {/* Hover image reveal - positioned absolutely */}
                {project.image_url && hoveredIdx === idx && (
                  <div className="hidden lg:block absolute right-16 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                    <div className="project-thumb w-64 h-40 rounded-lg overflow-hidden shadow-2xl shadow-black/50">
                      <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="256px"
                      />
                    </div>
                  </div>
                )}
              </div>
            </AnimateIn>
          );
        })}
      </div>

      {/* NDA disclaimer — subtle text, not a card */}
      {projects.some(p => p.is_private) && (
        <AnimateIn>
          <p className="mt-8 text-xs text-text-muted leading-relaxed max-w-2xl">
            <Lock size={11} className="inline mr-1.5 -mt-0.5" />
            Some projects were built under corporate NDA. Source code and sensitive data are kept private, but sanitized architecture details and implementation highlights are available above.
          </p>
        </AnimateIn>
      )}

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            onClick={handleCloseDetail}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-background border border-surface-border rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-md px-6 py-5 border-b border-surface-border flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2 text-xs text-text-muted">
                    <span>{selectedProject.category}</span>
                    <span className="w-1 h-1 rounded-full bg-surface-border" />
                    <span className={statusLabel(selectedProject.status).color}>
                      {statusLabel(selectedProject.status).text}
                    </span>
                    {selectedProject.is_private && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-surface-border" />
                        <span className="text-amber-400 flex items-center gap-1">
                          <Lock size={10} />
                          NDA
                        </span>
                      </>
                    )}
                    {selectedProject.metrics && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-surface-border" />
                        <span className="text-accent">{selectedProject.metrics}</span>
                      </>
                    )}
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-text-primary">
                    {selectedProject.title}
                  </h3>
                </div>

                <button
                  onClick={handleCloseDetail}
                  className="p-2 rounded-lg hover:bg-surface text-text-muted hover:text-text-primary transition-colors shrink-0"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 md:p-8 space-y-8">
                {/* Image Gallery */}
                {((selectedProject.screenshots && selectedProject.screenshots.length > 0) || selectedProject.image_url) && (() => {
                  const currentImg =
                    selectedProject.screenshots?.[activeImageIdx] ||
                    selectedProject.image_url ||
                    '';

                  return (
                    <div className="space-y-3">
                      {/* Main Image */}
                      <div className="relative w-full min-h-[260px] sm:min-h-[380px] max-h-[560px] h-[42vh] sm:h-[50vh] rounded-xl overflow-hidden border border-surface-border bg-surface flex items-center justify-center p-3 sm:p-5">
                        <div className="relative w-full h-full flex items-center justify-center">
                          <Image
                            src={currentImg}
                            alt={selectedProject.title}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 800px"
                            priority
                          />
                        </div>

                        <a
                          href={currentImg}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute top-3 right-3 z-10 p-2 rounded-lg bg-background/80 hover:bg-background border border-surface-border text-text-muted hover:text-text-primary transition-all text-xs flex items-center gap-1.5"
                          title="Open full resolution"
                        >
                          <Maximize2 size={12} />
                          <span className="hidden sm:inline">Full size</span>
                        </a>
                      </div>

                      {/* Thumbnails */}
                      {selectedProject.screenshots && selectedProject.screenshots.length > 1 && (
                        <div className="flex items-center gap-2 overflow-x-auto pb-1">
                          {selectedProject.screenshots.map((img, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActiveImageIdx(idx)}
                              className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                                activeImageIdx === idx
                                  ? 'border-accent opacity-100'
                                  : 'border-surface-border opacity-50 hover:opacity-80'
                              }`}
                            >
                              <Image src={img} alt={`Screenshot ${idx + 1}`} fill className="object-cover" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Background */}
                {selectedProject.background && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-text-muted uppercase tracking-wider">Background</h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {selectedProject.background}
                    </p>
                  </div>
                )}

                {/* NDA Notice */}
                {selectedProject.is_private && (
                  <div className="py-4 px-5 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-1.5">
                    <div className="text-xs font-medium text-amber-400 flex items-center gap-1.5">
                      <Lock size={12} />
                      Confidentiality Notice
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {selectedProject.confidentiality_note ||
                        'Projek ini dikembangkan sebagai sistem korporat internal / client dengan perlindungan kerahasiaan (Non-Disclosure Agreement). Akses repositori dan data sensitif dilindungi secara privat, namun arsitektur teknis, implementasi sistem, dan hasil kerja yang telah disanitasi dapat dipresentasikan di atas.'}
                    </p>
                  </div>
                )}

                {/* Tech Stack */}
                <div className="space-y-3">
                  <h4 className="text-xs font-medium text-text-muted uppercase tracking-wider">Stack</h4>
                  {selectedProject.core_tech && selectedProject.core_tech.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.core_tech.map((item, idx) => (
                        <span key={idx} className="px-3 py-1.5 rounded-lg border border-surface-border text-xs text-text-primary">
                          {item}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1.5 rounded-lg border border-surface-border text-xs text-text-primary">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Key Features */}
                {selectedProject.key_features && selectedProject.key_features.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-medium text-text-muted uppercase tracking-wider">Features</h4>
                    <ul className="space-y-2">
                      {selectedProject.key_features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-text-secondary">
                          <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Description */}
                <div className="space-y-2 pt-4 border-t border-surface-border">
                  <h4 className="text-xs font-medium text-text-muted uppercase tracking-wider">Overview</h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Repositories */}
                {((selectedProject.github_repos && selectedProject.github_repos.length > 0) || selectedProject.github_url) ? (
                  <div className="space-y-3 pt-4 border-t border-surface-border">
                    <h4 className="text-xs font-medium text-text-muted uppercase tracking-wider">Source Code</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedProject.github_repos && selectedProject.github_repos.length > 0 ? (
                        selectedProject.github_repos.map((repo, idx) => (
                          <a
                            key={idx}
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/repo p-3.5 rounded-xl border border-surface-border hover:border-accent/40 flex items-center justify-between gap-3 transition-all"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <Github size={16} className="text-text-muted group-hover/repo:text-accent shrink-0" />
                              <div className="truncate">
                                <div className="text-xs font-medium text-text-primary group-hover/repo:text-accent transition-colors truncate">
                                  {repo.label || 'Repository'}
                                </div>
                                <div className="text-[11px] text-text-muted truncate">
                                  {repo.url.replace(/^https?:\/\//, '')}
                                </div>
                              </div>
                            </div>
                            <ArrowUpRight size={14} className="text-text-muted group-hover/repo:text-accent shrink-0 transition-colors" />
                          </a>
                        ))
                      ) : (
                        <a
                          href={selectedProject.github_url!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/repo p-3.5 rounded-xl border border-surface-border hover:border-accent/40 flex items-center justify-between gap-3 transition-all sm:col-span-2"
                        >
                          <div className="flex items-center gap-2.5">
                            <Github size={16} className="text-text-muted group-hover/repo:text-accent shrink-0" />
                            <div>
                              <div className="text-xs font-medium text-text-primary group-hover/repo:text-accent transition-colors">
                                Source Code
                              </div>
                              <div className="text-[11px] text-text-muted truncate">
                                {selectedProject.github_url?.replace(/^https?:\/\//, '')}
                              </div>
                            </div>
                          </div>
                          <ArrowUpRight size={14} className="text-text-muted group-hover/repo:text-accent shrink-0 transition-colors" />
                        </a>
                      )}
                    </div>
                  </div>
                ) : selectedProject.is_private ? (
                  <div className="space-y-2 pt-4 border-t border-surface-border">
                    <h4 className="text-xs font-medium text-text-muted uppercase tracking-wider">Source Code</h4>
                    <p className="text-xs text-text-muted flex items-center gap-1.5">
                      <Lock size={11} />
                      Repository access restricted under NDA
                    </p>
                  </div>
                ) : null}

                {/* Footer */}
                <div className="pt-6 border-t border-surface-border flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-text-muted">
                    {selectedProject.slug}
                  </span>

                  {selectedProject.live_url && (
                    <a
                      href={selectedProject.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent hover:bg-emerald-400 text-background text-xs font-medium transition-colors"
                    >
                      <span>View Live</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
