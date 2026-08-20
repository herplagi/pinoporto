'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Star, 
  Upload, 
  X, 
  Check, 
  AlertCircle,
  FolderGit2,
  BookOpen,
  Cpu,
  CheckCircle2,
  ImageIcon,
  Github,
  Lock
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { getProjects } from '@/lib/data';
import { Project, ProjectRepoLink } from '@/types/database';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form State
  const [form, setForm] = useState({
    title: '',
    slug: '',
    summary: '',
    description: '',
    background: '',
    category: 'Fullstack',
    tags: '',
    core_tech: '',
    key_features: '',
    metrics: '',
    image_url: '',
    screenshots: '',
    live_url: '',
    github_url: '',
    github_repos: [] as ProjectRepoLink[],
    featured: true,
    is_private: false,
    confidentiality_note: '',
    sort_order: 0,
  });

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const isSupabaseLive = supabaseUrl && !supabaseUrl.includes('placeholder');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    const data = await getProjects();
    setProjects(data);
    setLoading(false);
  };

  const openCreateModal = () => {
    setEditingProject(null);
    setForm({
      title: '',
      slug: '',
      summary: '',
      description: '',
      background: '',
      category: 'Fullstack',
      tags: 'React Native, Express.js, MySQL',
      core_tech: 'React Native (Mobile App)\nExpress.js (Backend API)\nMySQL (Database)',
      key_features: 'Sistem booking real-time\nDashboard admin web terintegrasi\nAutentikasi aman JWT',
      metrics: '',
      image_url: '',
      screenshots: '',
      live_url: '',
      github_url: '',
      github_repos: [
        { label: 'Mobile App (React Native)', url: 'https://github.com/alvinoalbas' },
        { label: 'Web Admin Dashboard (React.js)', url: 'https://github.com/alvinoalbas' },
        { label: 'Backend REST API (Express.js)', url: 'https://github.com/alvinoalbas' },
      ],
      featured: true,
      is_private: false,
      confidentiality_note: '',
      sort_order: projects.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (proj: Project) => {
    setEditingProject(proj);
    
    // Determine existing github repos or fallback from github_url
    let existingRepos: ProjectRepoLink[] = [];
    if (proj.github_repos && Array.isArray(proj.github_repos) && proj.github_repos.length > 0) {
      existingRepos = proj.github_repos;
    } else if (proj.github_url) {
      existingRepos = [{ label: 'Main Repository', url: proj.github_url }];
    }

    setForm({
      title: proj.title,
      slug: proj.slug,
      summary: proj.summary,
      description: proj.description,
      background: proj.background || '',
      category: proj.category,
      tags: proj.tags.join(', '),
      core_tech: (proj.core_tech || []).join('\n'),
      key_features: (proj.key_features || []).join('\n'),
      metrics: proj.metrics || '',
      image_url: proj.image_url || '',
      screenshots: (proj.screenshots || []).join('\n'),
      live_url: proj.live_url || '',
      github_url: proj.github_url || '',
      github_repos: existingRepos,
      featured: proj.featured,
      is_private: proj.is_private || false,
      confidentiality_note: proj.confidentiality_note || '',
      sort_order: proj.sort_order || 0,
    });
    setModalOpen(true);
  };

  const handleAddRepo = () => {
    setForm((prev) => ({
      ...prev,
      github_repos: [...prev.github_repos, { label: '', url: '' }],
    }));
  };

  const handleUpdateRepo = (index: number, field: 'label' | 'url', value: string) => {
    setForm((prev) => {
      const updated = [...prev.github_repos];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, github_repos: updated };
    });
  };

  const handleRemoveRepo = (index: number) => {
    setForm((prev) => ({
      ...prev,
      github_repos: prev.github_repos.filter((_, i) => i !== index),
    }));
  };

  const handleSlugGenerate = (title: string) => {
    const generatedSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setForm((prev) => ({ ...prev, title, slug: generatedSlug }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isSupabaseLive) {
      // Mock local object URL for preview
      const previewUrl = URL.createObjectURL(file);
      setForm((prev) => ({ 
        ...prev, 
        image_url: previewUrl,
        screenshots: prev.screenshots ? `${prev.screenshots}\n${previewUrl}` : previewUrl
      }));
      setNotification({ type: 'success', message: 'Local image preview selected.' });
      return;
    }

    try {
      setUploading(true);
      const supabase = createClient();
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('portfolio-media')
        .getPublicUrl(filePath);

      const newUrl = publicUrlData.publicUrl;
      setForm((prev) => ({ 
        ...prev, 
        image_url: prev.image_url || newUrl,
        screenshots: prev.screenshots ? `${prev.screenshots}\n${newUrl}` : newUrl
      }));
      setNotification({ type: 'success', message: 'Image uploaded to Supabase Storage!' });
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message || 'Upload failed' });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const validRepos = form.github_repos.filter((r) => r.url.trim().length > 0);
    const primaryGithubUrl = validRepos[0]?.url || form.github_url || null;

    const projectPayload = {
      title: form.title,
      slug: form.slug,
      summary: form.summary,
      description: form.description,
      background: form.background || null,
      category: form.category,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      core_tech: form.core_tech.split('\n').map((t) => t.trim()).filter(Boolean),
      key_features: form.key_features.split('\n').map((t) => t.trim()).filter(Boolean),
      metrics: form.metrics || null,
      image_url: form.image_url || null,
      screenshots: form.screenshots.split('\n').map((t) => t.trim()).filter(Boolean),
      live_url: form.live_url || null,
      github_url: primaryGithubUrl,
      github_repos: validRepos.length > 0 ? validRepos : null,
      featured: form.featured,
      is_private: form.is_private,
      confidentiality_note: form.is_private ? (form.confidentiality_note || null) : null,
      sort_order: Number(form.sort_order),
    };

    if (!isSupabaseLive) {
      // Simulate save locally
      if (editingProject) {
        setProjects((prev) =>
          prev.map((p) =>
            p.id === editingProject.id ? { ...p, ...projectPayload, id: editingProject.id } : p
          )
        );
      } else {
        const newProj: Project = {
          ...projectPayload,
          id: `proj-${Date.now()}`,
          created_at: new Date().toISOString(),
        };
        setProjects((prev) => [newProj, ...prev]);
      }
      setSaving(false);
      setModalOpen(false);
      setNotification({ type: 'success', message: 'Project details saved in local state!' });
      return;
    }

    try {
      const supabase = createClient();
      if (editingProject) {
        const { error } = await supabase
          .from('projects')
          .update(projectPayload)
          .eq('id', editingProject.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('projects').insert([projectPayload]);
        if (error) throw error;
      }

      await loadProjects();
      setModalOpen(false);
      setNotification({ type: 'success', message: 'Project successfully saved to Supabase!' });
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message || 'Failed to save project' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    if (!isSupabaseLive) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setNotification({ type: 'success', message: 'Project removed (Local state).' });
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      await loadProjects();
      setNotification({ type: 'success', message: 'Project deleted from Supabase!' });
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message || 'Failed to delete' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-surface-border">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-text-primary">
            Manage Projects &amp; Case Studies
          </h1>
          <p className="text-xs font-mono text-text-secondary mt-1">
            Add background, core tech stack, proof screenshots, and deliverables
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-emerald hover:bg-emerald-400 text-background font-mono text-xs font-semibold transition-all shadow-md shadow-brand-emerald/10"
        >
          <Plus size={15} />
          <span>New Project</span>
        </button>
      </div>

      {/* Notifications */}
      {notification && (
        <div
          className={`p-3.5 rounded-xl text-xs font-mono flex items-center justify-between gap-3 ${
            notification.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
              : 'bg-red-500/10 border border-red-500/30 text-red-400'
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? <Check size={15} /> : <AlertCircle size={15} />}
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)}>
            <X size={14} />
          </button>
        </div>
      )}

      {/* Projects List */}
      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="text-center py-12 font-mono text-xs text-text-muted">
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center space-y-3">
            <FolderGit2 size={32} className="mx-auto text-text-muted" />
            <p className="font-mono text-xs text-text-secondary">
              No projects found in database. Click &ldquo;New Project&rdquo; to create your first build.
            </p>
          </div>
        ) : (
          projects.map((proj) => (
            <div
              key={proj.id}
              className="glass-card rounded-xl p-5 border border-surface-border flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2.5">
                  <h3 className="font-display text-base font-bold text-text-primary">
                    {proj.title}
                  </h3>
                  {proj.featured && (
                    <span className="px-2 py-0.5 rounded badge-emerald text-[10px] font-mono flex items-center gap-1">
                      <Star size={10} />
                      <span>Featured</span>
                    </span>
                  )}
                  {proj.is_private && (
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono flex items-center gap-1">
                      <Lock size={10} />
                      <span>Private / NDA</span>
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded bg-surface-hover border border-surface-border text-[10px] font-mono text-text-secondary">
                    {proj.category}
                  </span>
                </div>

                <p className="text-xs text-text-secondary line-clamp-2">
                  {proj.summary}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {proj.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-surface border border-surface-border text-[10px] font-mono text-text-muted"
                    >
                      {t}
                    </span>
                  ))}
                  {proj.background && (
                    <span className="text-[10px] font-mono text-brand-emerald">
                      • Has Background Context
                    </span>
                  )}
                  {proj.screenshots && proj.screenshots.length > 0 && (
                    <span className="text-[10px] font-mono text-brand-amber">
                      • {proj.screenshots.length} Screenshots
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => openEditModal(proj)}
                  className="p-2 rounded-lg bg-surface-hover hover:bg-surface-border border border-surface-border text-text-secondary hover:text-text-primary transition-colors"
                  title="Edit Project Details"
                >
                  <Edit3 size={15} />
                </button>
                <button
                  onClick={() => handleDelete(proj.id)}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 transition-colors"
                  title="Delete Project"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create / Edit Project Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-surface border border-surface-border rounded-2xl p-6 sm:p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto my-8">
            <div className="flex items-center justify-between pb-4 border-b border-surface-border mb-6">
              <h2 className="font-display text-lg font-bold text-text-primary">
                {editingProject ? 'Edit Project Details & Proof' : 'Create New Project & Case Study'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-text-muted hover:text-text-primary"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-text-muted">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => handleSlugGenerate(e.target.value)}
                    placeholder="e.g. Potongin — Barbershop Marketplace"
                    className="w-full px-3 py-2 rounded-lg bg-surface-hover border border-surface-border text-xs font-mono text-text-primary focus:outline-none focus:border-brand-emerald"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-mono text-text-muted">
                    Slug (URL key) *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="potongin-marketplace"
                    className="w-full px-3 py-2 rounded-lg bg-surface-hover border border-surface-border text-xs font-mono text-text-primary focus:outline-none focus:border-brand-emerald"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-text-muted">
                    Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-surface-hover border border-surface-border text-xs font-mono text-text-primary focus:outline-none focus:border-brand-emerald"
                  >
                    <option value="Fullstack & Mobile">Fullstack &amp; Mobile</option>
                    <option value="Fullstack">Fullstack</option>
                    <option value="Web Applications">Web Applications</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Backend">Backend</option>
                    <option value="Frontend">Frontend</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-mono text-text-muted">
                    Badge / Metrics Tag
                  </label>
                  <input
                    type="text"
                    value={form.metrics}
                    onChange={(e) => setForm({ ...form, metrics: e.target.value })}
                    placeholder="e.g. React Native & Web Dashboard"
                    className="w-full px-3 py-2 rounded-lg bg-surface-hover border border-surface-border text-xs font-mono text-text-primary focus:outline-none focus:border-brand-emerald"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-mono text-text-muted">
                  Short Summary (One-liner for card view) *
                </label>
                <input
                  type="text"
                  required
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  placeholder="Short impact-focused summary of the system..."
                  className="w-full px-3 py-2 rounded-lg bg-surface-hover border border-surface-border text-xs font-mono text-text-primary focus:outline-none focus:border-brand-emerald"
                />
              </div>

              {/* Background Section */}
              <div className="space-y-1 p-3.5 rounded-xl bg-surface-hover border border-surface-border">
                <label className="block text-xs font-mono text-brand-emerald font-semibold flex items-center gap-1.5">
                  <BookOpen size={14} />
                  <span>Project Background &amp; Problem Context</span>
                </label>
                <textarea
                  rows={3}
                  value={form.background}
                  onChange={(e) => setForm({ ...form, background: e.target.value })}
                  placeholder="Explain why this project was initiated, what problem it solved, or thesis/internship background..."
                  className="w-full px-3 py-2 rounded-lg bg-surface border border-surface-border text-xs font-mono text-text-primary focus:outline-none focus:border-brand-emerald resize-none"
                />
              </div>

              {/* Core Tech Stack Section */}
              <div className="space-y-1 p-3.5 rounded-xl bg-surface-hover border border-surface-border">
                <label className="block text-xs font-mono text-text-primary font-semibold flex items-center gap-1.5">
                  <Cpu size={14} className="text-brand-emerald" />
                  <span>Core Tech Stack &amp; Architectural Roles (1 item per line)</span>
                </label>
                <textarea
                  rows={3}
                  value={form.core_tech}
                  onChange={(e) => setForm({ ...form, core_tech: e.target.value })}
                  placeholder="React Native (Mobile Customer App)&#10;Express.js & Node.js (REST API)&#10;MySQL (Centralized Relational Database)"
                  className="w-full px-3 py-2 rounded-lg bg-surface border border-surface-border text-xs font-mono text-text-primary focus:outline-none focus:border-brand-emerald resize-none"
                />
              </div>

              {/* Key Features Section */}
              <div className="space-y-1 p-3.5 rounded-xl bg-surface-hover border border-surface-border">
                <label className="block text-xs font-mono text-text-primary font-semibold flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-brand-amber" />
                  <span>Key Features &amp; Deliverables (1 item per line)</span>
                </label>
                <textarea
                  rows={3}
                  value={form.key_features}
                  onChange={(e) => setForm({ ...form, key_features: e.target.value })}
                  placeholder="Real-time booking and queue scheduling&#10;Web admin dashboard for merchants&#10;Secure JWT token authentication"
                  className="w-full px-3 py-2 rounded-lg bg-surface border border-surface-border text-xs font-mono text-text-primary focus:outline-none focus:border-brand-emerald resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-mono text-text-muted">
                  Full Technical Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Technical overview of implementation, architecture, databases..."
                  className="w-full px-3 py-2 rounded-lg bg-surface-hover border border-surface-border text-xs font-mono text-text-primary focus:outline-none focus:border-brand-emerald resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-mono text-text-muted">
                  Tech Tags (Comma separated) *
                </label>
                <input
                  type="text"
                  required
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="React Native, React.js, Express.js, MySQL, BPMN"
                  className="w-full px-3 py-2 rounded-lg bg-surface-hover border border-surface-border text-xs font-mono text-text-primary focus:outline-none focus:border-brand-emerald"
                />
              </div>

              {/* Image Upload & Screenshots */}
              <div className="space-y-3 p-3.5 rounded-xl bg-surface-hover border border-surface-border">
                <label className="block text-xs font-mono text-text-primary font-semibold flex items-center gap-1.5">
                  <ImageIcon size={14} className="text-brand-emerald" />
                  <span>Project Proofs &amp; Screenshots</span>
                </label>
                
                <div>
                  <label className="block text-[11px] font-mono text-text-muted mb-1">
                    Upload Screenshot (to Supabase Storage)
                  </label>
                  <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-surface border border-surface-border text-xs font-mono text-text-secondary hover:text-text-primary hover:border-brand-emerald transition-all w-full justify-center">
                    <Upload size={14} className="text-brand-emerald" />
                    <span>{uploading ? 'Uploading to Supabase...' : 'Upload Image File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-text-muted mb-1">
                    Primary Cover Image URL
                  </label>
                  <input
                    type="url"
                    value={form.image_url}
                    onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 rounded-lg bg-surface border border-surface-border text-xs font-mono text-text-primary focus:outline-none focus:border-brand-emerald"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-text-muted mb-1">
                    Additional Screenshot Proof URLs (1 URL per line)
                  </label>
                  <textarea
                    rows={2}
                    value={form.screenshots}
                    onChange={(e) => setForm({ ...form, screenshots: e.target.value })}
                    placeholder="https://...&#10;https://..."
                    className="w-full px-3 py-2 rounded-lg bg-surface border border-surface-border text-xs font-mono text-text-primary focus:outline-none focus:border-brand-emerald resize-none"
                  />
                </div>
              </div>

              {/* Multi-Repository GitHub Links */}
              <div className="space-y-3 p-3.5 rounded-xl bg-surface-hover border border-surface-border">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-mono text-text-primary font-semibold flex items-center gap-1.5">
                    <Github size={14} className="text-brand-emerald" />
                    <span>GitHub Repositories (Multi-Repo &amp; Monorepo Support)</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleAddRepo}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface hover:bg-surface-border border border-surface-border text-[11px] font-mono text-brand-emerald transition-colors"
                  >
                    <Plus size={12} />
                    <span>Add Repo Link</span>
                  </button>
                </div>

                <p className="text-[11px] font-mono text-text-muted">
                  Add links for each component if your project separates Mobile, Backend API, and Web Dashboard.
                </p>

                {form.github_repos.length === 0 ? (
                  <div className="p-3 rounded-lg bg-surface border border-surface-border text-center">
                    <p className="text-[11px] font-mono text-text-muted">
                      No GitHub repositories added. Click &ldquo;Add Repo Link&rdquo; to add backend, frontend, or mobile repositories.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {form.github_repos.map((repo, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2.5 rounded-lg bg-surface border border-surface-border"
                      >
                        <div className="w-full sm:w-1/3">
                          <input
                            type="text"
                            value={repo.label}
                            onChange={(e) => handleUpdateRepo(idx, 'label', e.target.value)}
                            placeholder="e.g. Mobile (React Native)"
                            className="w-full px-2.5 py-1.5 rounded-md bg-surface-hover border border-surface-border text-xs font-mono text-text-primary focus:outline-none focus:border-brand-emerald"
                          />
                        </div>
                        <div className="flex-1">
                          <input
                            type="url"
                            value={repo.url}
                            onChange={(e) => handleUpdateRepo(idx, 'url', e.target.value)}
                            placeholder="https://github.com/username/repo-name"
                            className="w-full px-2.5 py-1.5 rounded-md bg-surface-hover border border-surface-border text-xs font-mono text-text-primary focus:outline-none focus:border-brand-emerald"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveRepo(idx)}
                          className="p-1.5 rounded-md text-red-400 hover:bg-red-500/10 transition-colors self-end sm:self-center"
                          title="Remove repository"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Confidentiality & NDA Protection */}
              <div className="space-y-3 p-3.5 rounded-xl bg-surface-hover border border-surface-border">
                <div className="flex items-center justify-between">
                  <div>
                    <label
                      htmlFor="private-toggle"
                      className="text-xs font-mono font-semibold text-text-primary flex items-center gap-2 cursor-pointer"
                    >
                      <Lock size={14} className={form.is_private ? 'text-brand-amber' : 'text-text-muted'} />
                      <span>Private / Enterprise System (NDA Protected)</span>
                    </label>
                    <p className="text-[11px] font-mono text-text-muted mt-0.5">
                      Enable for internal client / company projects where code cannot be shared publicly.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="private-toggle"
                    checked={form.is_private}
                    onChange={(e) => setForm({ ...form, is_private: e.target.checked })}
                    className="w-4 h-4 rounded bg-surface border-surface-border text-brand-amber focus:ring-0 cursor-pointer"
                  />
                </div>

                {form.is_private && (
                  <div className="pt-2 border-t border-surface-border/60 space-y-1">
                    <label className="block text-[11px] font-mono text-brand-amber">
                      Confidentiality Note (Optional notice shown to visitors)
                    </label>
                    <input
                      type="text"
                      value={form.confidentiality_note}
                      onChange={(e) => setForm({ ...form, confidentiality_note: e.target.value })}
                      placeholder="e.g. Developed under NDA for enterprise client. Codebase and internal databases are protected."
                      className="w-full px-3 py-2 rounded-lg bg-surface border border-surface-border text-xs font-mono text-text-primary focus:outline-none focus:border-brand-amber"
                    />
                  </div>
                )}
              </div>

              {/* Live Demo URL */}
              <div className="space-y-1">
                <label className="block text-xs font-mono text-text-muted">
                  Live Demo URL (Optional — leave empty if none)
                </label>
                <input
                  type="url"
                  value={form.live_url}
                  onChange={(e) => setForm({ ...form, live_url: e.target.value })}
                  placeholder="https://yourproject.com (Leave blank if no live deployment)"
                  className="w-full px-3 py-2 rounded-lg bg-surface-hover border border-surface-border text-xs font-mono text-text-primary focus:outline-none focus:border-brand-emerald"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="rounded bg-surface border-surface-border text-brand-emerald focus:ring-0"
                />
                <label htmlFor="featured-check" className="text-xs font-mono text-text-primary cursor-pointer">
                  Mark as Featured Project on Homepage
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-border">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-surface-hover text-xs font-mono text-text-secondary hover:text-text-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="px-5 py-2 rounded-lg bg-brand-emerald hover:bg-emerald-400 disabled:opacity-50 text-background font-mono text-xs font-semibold shadow-md shadow-brand-emerald/10"
                >
                  {saving ? 'Saving...' : editingProject ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
