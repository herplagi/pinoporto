'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Github, 
  Layers, 
  ArrowUpRight, 
  X, 
  Cpu, 
  BookOpen, 
  CheckCircle2, 
  ImageIcon, 
  ChevronRight,
  ExternalLink,
  Maximize2,
  Lock
} from 'lucide-react';
import { Project } from '@/types/database';

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);

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

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 text-brand-emerald font-mono text-xs mb-2">
            <Layers size={14} />
            <span>PORTFOLIO SHOWCASE &amp; CASE STUDIES</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
            Featured Projects
          </h2>
          <p className="text-xs font-mono text-text-secondary mt-1 max-w-md">
            Click on any project to view complete architecture, background, core tech, and visual proofs.
          </p>
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
            onClick={() => handleOpenDetail(project)}
            className="group glass-card rounded-2xl overflow-hidden flex flex-col justify-between cursor-pointer border border-surface-border hover:border-brand-emerald/40 transition-all"
          >
            <div>
              {/* Image Preview Container */}
              {project.image_url && (
                <div className="relative w-full h-52 sm:h-60 bg-surface overflow-hidden border-b border-surface-border">
                  <Image
                    src={project.image_url}
                    alt={project.title}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
                  
                  {/* Category & Status Pill on Image */}
                  <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-background/85 backdrop-blur-md border border-surface-border text-[11px] font-mono text-text-primary">
                      {project.category}
                    </span>

                    {project.status === 'In Progress' ? (
                      <span className="px-2 py-1 rounded-md bg-cyan-950/85 backdrop-blur-md border border-cyan-500/40 text-[10px] font-mono text-cyan-300 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        <span>In Progress</span>
                      </span>
                    ) : project.status === 'Maintenance' ? (
                      <span className="px-2 py-1 rounded-md bg-purple-950/85 backdrop-blur-md border border-purple-500/40 text-[10px] font-mono text-purple-300 font-semibold flex items-center gap-1">
                        <span>⚙ Maintenance</span>
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded-md bg-emerald-950/85 backdrop-blur-md border border-emerald-500/40 text-[10px] font-mono text-emerald-300 font-semibold flex items-center gap-1">
                        <CheckCircle2 size={10} className="text-emerald-400" />
                        <span>Completed</span>
                      </span>
                    )}
                  </div>

                  {/* Private / NDA Badge on Image */}
                  {project.is_private && (
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-950/85 backdrop-blur-md border border-amber-500/40 text-[10px] font-mono text-amber-300 font-semibold shadow-sm">
                        <Lock size={10} />
                        <span>Private / NDA</span>
                      </span>
                    </div>
                  )}

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

                <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
                  {project.summary}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-surface-hover border border-surface-border text-[11px] font-mono text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="px-2 py-1 rounded-md bg-surface border border-surface-border text-[11px] font-mono text-text-muted">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="px-6 pb-6 pt-3 border-t border-surface-border/40 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-xs font-mono text-brand-emerald group-hover:underline">
                <span>View Details &amp; Proof</span>
                <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </span>

              {project.is_private && !project.github_url && (!project.github_repos || project.github_repos.length === 0) ? (
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/25 text-xs font-mono text-amber-400"
                  title="Source code is private under corporate NDA"
                >
                  <Lock size={12} />
                  <span>NDA Protected</span>
                </span>
              ) : project.github_repos && project.github_repos.length > 1 ? (
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-hover border border-surface-border text-xs font-mono text-text-secondary group-hover:border-brand-emerald/40 transition-colors"
                  title={`${project.github_repos.length} Repositories (Mobile, Backend, Frontend)`}
                >
                  <Github size={13} className="text-brand-emerald" />
                  <span>{project.github_repos.length} Repos</span>
                </span>
              ) : (project.github_repos && project.github_repos.length === 1) || project.github_url ? (
                <a
                  href={project.github_repos?.[0]?.url || project.github_url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-xs font-mono text-text-secondary hover:text-text-primary transition-colors p-1"
                  title="Source Code"
                >
                  <Github size={14} />
                  <span>GitHub</span>
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      {/* Global Confidentiality Disclaimer Banner under grid */}
      <div className="mt-10 p-4 sm:p-5 rounded-2xl glass-card border border-surface-border flex flex-col sm:flex-row items-start sm:items-center gap-3.5 text-xs font-mono text-text-muted">
        <div className="p-2.5 rounded-xl bg-surface border border-surface-border text-amber-400 shrink-0">
          <Lock size={18} />
        </div>
        <div className="space-y-0.5 leading-relaxed">
          <span className="text-text-primary font-semibold block sm:inline mr-1.5">
            Notice on Enterprise Projects &amp; Confidentiality (NDA):
          </span>
          <span>
            Beberapa projek korporat atau magang dikembangkan di bawah perjanjian kerahasiaan (*Non-Disclosure Agreement*). Akses repositori dan data sensitif dilindungi secara privat, namun arsitektur teknis, implementasi sistem, dan hasil kerja yang telah disanitasi dapat dipresentasikan di atas.
          </span>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          onClick={handleCloseDetail}
        >
          <div 
            className="bg-surface border border-surface-border rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto my-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-20 bg-surface/95 backdrop-blur-md p-6 border-b border-surface-border flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded badge-emerald text-[11px] font-mono">
                    {selectedProject.category}
                  </span>
                  {selectedProject.status === 'In Progress' ? (
                    <span className="px-2.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-mono text-cyan-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      <span>In Progress (Tahap Pengembangan)</span>
                    </span>
                  ) : selectedProject.status === 'Maintenance' ? (
                    <span className="px-2.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-[11px] font-mono text-purple-400 flex items-center gap-1">
                      <span>⚙ Maintenance &amp; Iteration</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 size={11} />
                      <span>Completed (Selesai)</span>
                    </span>
                  )}
                  {selectedProject.is_private && (
                    <span className="px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-[11px] font-mono text-amber-400 flex items-center gap-1">
                      <Lock size={11} />
                      <span>NDA / Private Enterprise</span>
                    </span>
                  )}
                  {selectedProject.metrics && (
                    <span className="text-[11px] font-mono text-brand-amber">
                      • {selectedProject.metrics}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-text-primary">
                  {selectedProject.title}
                </h3>
              </div>

              <button
                onClick={handleCloseDetail}
                className="p-2 rounded-xl bg-surface-hover hover:bg-surface-border text-text-secondary hover:text-text-primary transition-colors shrink-0"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              {/* Image Proof Gallery */}
              {((selectedProject.screenshots && selectedProject.screenshots.length > 0) || selectedProject.image_url) && {
                const currentImg =
                  selectedProject.screenshots?.[activeImageIdx] ||
                  selectedProject.image_url ||
                  '';

                return (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
                        <ImageIcon size={14} className="text-brand-emerald" />
                        <span>VISUAL PROOFS &amp; SCREENSHOTS</span>
                      </div>

                      {selectedProject.screenshots && selectedProject.screenshots.length > 1 && (
                        <span className="text-[11px] font-mono text-text-muted">
                          {activeImageIdx + 1} of {selectedProject.screenshots.length}
                        </span>
                      )}
                    </div>

                    {/* Main Selected Image Showcase (Responsive for Mobile Portrait, Tablet, & Web Landscape) */}
                    <div className="relative w-full min-h-[260px] sm:min-h-[380px] max-h-[560px] h-[42vh] sm:h-[50vh] rounded-xl overflow-hidden border border-surface-border bg-gradient-to-b from-background/95 via-surface/70 to-background/90 flex items-center justify-center p-3 sm:p-5 group/preview">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                          src={currentImg}
                          alt={selectedProject.title}
                          fill
                          className="object-contain transition-all duration-300 drop-shadow-md"
                          sizes="(max-width: 768px) 100vw, 800px"
                          priority
                        />
                      </div>

                      {/* Full-size view button */}
                      <a
                        href={currentImg}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-3 right-3 z-10 px-2.5 py-1.5 rounded-lg bg-background/80 hover:bg-background border border-surface-border text-text-secondary hover:text-text-primary text-[11px] font-mono flex items-center gap-1.5 backdrop-blur-md transition-all shadow-md"
                        title="Open full resolution in new tab"
                      >
                        <Maximize2 size={12} className="text-brand-emerald" />
                        <span className="hidden sm:inline">View Full Image</span>
                      </a>
                    </div>

                    {/* Thumbnail Row if multiple screenshots exist */}
                    {selectedProject.screenshots && selectedProject.screenshots.length > 1 && (
                      <div className="flex items-center gap-2.5 overflow-x-auto pb-1.5 pt-0.5">
                        {selectedProject.screenshots.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveImageIdx(idx)}
                            className={`relative w-20 sm:w-24 h-14 sm:h-16 rounded-lg overflow-hidden shrink-0 border-2 bg-background transition-all ${
                              activeImageIdx === idx
                                ? 'border-brand-emerald shadow-md ring-2 ring-brand-emerald/20'
                                : 'border-surface-border opacity-60 hover:opacity-100'
                            }`}
                          >
                            <Image
                              src={img}
                              alt={`Thumbnail ${idx + 1}`}
                              fill
                              className="object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }()}

              {/* Background & Context Section */}
              {selectedProject.background && (
                <div className="p-5 rounded-xl bg-surface-hover border border-surface-border space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-brand-emerald">
                    <BookOpen size={14} />
                    <span>PROJECT BACKGROUND &amp; CONTEXT</span>
                  </div>
                  <p className="text-sm text-text-primary leading-relaxed">
                    {selectedProject.background}
                  </p>
                </div>
              )}

              {/* Confidentiality & NDA Notice Box */}
              {selectedProject.is_private && (
                <div className="p-4 sm:p-5 rounded-xl bg-amber-500/5 border border-amber-500/25 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-amber-400">
                    <Lock size={14} />
                    <span>CONFIDENTIALITY &amp; NDA NOTICE</span>
                  </div>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {selectedProject.confidentiality_note ||
                      'Projek ini dikembangkan sebagai sistem korporat internal / client dengan perlindungan kerahasiaan (Non-Disclosure Agreement). Akses repositori dan data sensitif dilindungi secara privat, namun arsitektur teknis, implementasi sistem, dan hasil kerja yang telah disanitasi dapat dipresentasikan di atas.'}
                  </p>
                </div>
              )}

              {/* Core Technologies & Architecture */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-text-muted uppercase tracking-wider">
                  <Cpu size={14} className="text-brand-emerald" />
                  <span>Core Tech Stack &amp; Implementation</span>
                </div>

                {selectedProject.core_tech && selectedProject.core_tech.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedProject.core_tech.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-surface-hover/80 border border-surface-border flex items-start gap-2.5 text-xs font-mono text-text-primary"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-lg bg-surface-hover border border-surface-border text-xs font-mono text-text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Key Features & Architecture Deliverables */}
              {selectedProject.key_features && selectedProject.key_features.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-text-muted uppercase tracking-wider">
                    <CheckCircle2 size={14} className="text-brand-amber" />
                    <span>Key Features &amp; System Capabilities</span>
                  </div>

                  <ul className="space-y-2">
                    {selectedProject.key_features.map((feat, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-text-secondary"
                      >
                        <CheckCircle2 size={15} className="text-brand-emerald shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Full Technical Description */}
              <div className="space-y-2 pt-2 border-t border-surface-border">
                <div className="text-xs font-mono text-text-muted uppercase tracking-wider">
                  Technical Overview
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Multi-Repository Showcase Section */}
              {((selectedProject.github_repos && selectedProject.github_repos.length > 0) || selectedProject.github_url) ? (
                <div className="space-y-3 pt-4 border-t border-surface-border">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-text-muted uppercase tracking-wider">
                    <Github size={14} className="text-brand-emerald" />
                    <span>
                      Source Code Repositories {selectedProject.github_repos && selectedProject.github_repos.length > 1 ? `(${selectedProject.github_repos.length} Repositories)` : ''}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedProject.github_repos && selectedProject.github_repos.length > 0 ? (
                      selectedProject.github_repos.map((repo, idx) => (
                        <a
                          key={idx}
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/repo p-3.5 rounded-xl bg-surface-hover hover:bg-surface-border border border-surface-border hover:border-brand-emerald/50 flex items-center justify-between gap-3 transition-all shadow-sm"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="p-2 rounded-lg bg-surface border border-surface-border text-brand-emerald group-hover/repo:text-text-primary shrink-0">
                              <Github size={16} />
                            </div>
                            <div className="truncate">
                              <div className="text-xs font-mono font-semibold text-text-primary group-hover/repo:text-brand-emerald transition-colors truncate">
                                {repo.label || 'Repository'}
                              </div>
                              <div className="text-[10px] font-mono text-text-muted truncate mt-0.5">
                                {repo.url.replace(/^https?:\/\//, '')}
                              </div>
                            </div>
                          </div>
                          <ArrowUpRight size={14} className="text-text-muted group-hover/repo:text-brand-emerald shrink-0 group-hover/repo:translate-x-0.5 group-hover/repo:-translate-y-0.5 transition-transform" />
                        </a>
                      ))
                    ) : (
                      <a
                        href={selectedProject.github_url!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/repo p-3.5 rounded-xl bg-surface-hover hover:bg-surface-border border border-surface-border hover:border-brand-emerald/50 flex items-center justify-between gap-3 transition-all sm:col-span-2"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 rounded-lg bg-surface border border-surface-border text-brand-emerald group-hover/repo:text-text-primary shrink-0">
                            <Github size={16} />
                          </div>
                          <div>
                            <div className="text-xs font-mono font-semibold text-text-primary group-hover/repo:text-brand-emerald transition-colors">
                              Source Code Repository
                            </div>
                            <div className="text-[10px] font-mono text-text-muted truncate mt-0.5">
                              {selectedProject.github_url?.replace(/^https?:\/\//, '')}
                            </div>
                          </div>
                        </div>
                        <ArrowUpRight size={14} className="text-text-muted group-hover/repo:text-brand-emerald shrink-0 group-hover/repo:translate-x-0.5 group-hover/repo:-translate-y-0.5 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>
              ) : selectedProject.is_private ? (
                <div className="space-y-3 pt-4 border-t border-surface-border">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-text-muted uppercase tracking-wider">
                    <Github size={14} className="text-brand-emerald" />
                    <span>Source Code Access</span>
                  </div>
                  <div className="p-4 rounded-xl bg-surface border border-surface-border flex items-start gap-3.5">
                    <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                      <Lock size={16} />
                    </div>
                    <div className="space-y-1 text-xs font-mono">
                      <div className="text-text-primary font-semibold">Repository Access Restricted (Private / NDA)</div>
                      <div className="text-text-secondary leading-relaxed">
                        Akses repositori kode dan server database bersifat privat untuk internal organisasi. Detail arsitektur dan komponen inti telah dirangkum pada case study di atas.
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Footer Modal Action */}
              <div className="pt-6 border-t border-surface-border flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs font-mono text-text-muted">
                  Identifier: <code className="text-text-primary font-mono">{selectedProject.slug}</code>
                </div>

                {selectedProject.live_url && (
                  <a
                    href={selectedProject.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-emerald hover:bg-emerald-400 text-background font-mono text-xs font-semibold transition-colors shadow-md shadow-brand-emerald/10"
                  >
                    <span>Open Live Deployment</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
