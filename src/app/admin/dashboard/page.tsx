'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FolderGit2, 
  MessageSquare, 
  Database, 
  UserCheck, 
  Plus, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertTriangle,
  Zap
} from 'lucide-react';
import { getProjects, getProfile } from '@/lib/data';
import { Project, Profile } from '@/types/database';

export default function AdminDashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const isSupabaseConnected = supabaseUrl && !supabaseUrl.includes('placeholder');

  useEffect(() => {
    async function loadData() {
      const [projData, profData] = await Promise.all([
        getProjects(),
        getProfile(),
      ]);
      setProjects(projData);
      setProfile(profData);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-surface-border">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-text-primary">
            Dashboard Overview
          </h1>
          <p className="text-xs font-mono text-text-secondary mt-1">
            Realtime Portfolio Management &amp; Analytics
          </p>
        </div>

        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-emerald hover:bg-emerald-400 text-background font-mono text-xs font-semibold transition-all shadow-md shadow-brand-emerald/10"
        >
          <Plus size={15} />
          <span>Add New Project</span>
        </Link>
      </div>

      {/* Supabase Connection Status Card */}
      <div
        className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          isSupabaseConnected
            ? 'bg-emerald-500/5 border-emerald-500/30 text-emerald-400'
            : 'bg-amber-500/5 border-amber-500/30 text-amber-300'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              isSupabaseConnected
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-amber-500/20 text-brand-amber'
            }`}
          >
            <Database size={18} />
          </div>
          <div>
            <div className="font-mono text-xs font-semibold">
              {isSupabaseConnected
                ? 'Supabase Backend Connected (Live Mode)'
                : 'Local Preview Mode Active'}
            </div>
            <div className="text-[11px] font-mono text-text-muted mt-0.5">
              {isSupabaseConnected
                ? `Connected to: ${supabaseUrl}`
                : 'Set NEXT_PUBLIC_SUPABASE_URL & ANON_KEY in .env.local to persist directly to cloud.'}
            </div>
          </div>
        </div>

        <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-surface border border-surface-border text-text-secondary">
          RLS Enabled
        </span>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="glass-card rounded-2xl p-5 border border-surface-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-text-muted">Total Projects</span>
            <FolderGit2 size={16} className="text-brand-emerald" />
          </div>
          <div className="font-mono text-3xl font-bold text-text-primary mt-3">
            {loading ? '...' : projects.length}
          </div>
          <div className="text-[11px] font-mono text-text-secondary mt-1">
            {projects.filter((p) => p.featured).length} marked as Featured
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-surface-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-text-muted">Availability</span>
            <UserCheck size={16} className="text-brand-amber" />
          </div>
          <div className="font-mono text-3xl font-bold text-text-primary mt-3">
            {profile?.available_for_hire ? 'Open' : 'Busy'}
          </div>
          <div className="text-[11px] font-mono text-text-secondary mt-1">
            Status pill on public homepage
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-surface-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-text-muted">Deploy Target</span>
            <Zap size={16} className="text-cyan-400" />
          </div>
          <div className="font-mono text-3xl font-bold text-text-primary mt-3">
            Vercel
          </div>
          <div className="text-[11px] font-mono text-text-secondary mt-1">
            Next.js App Router (SSR/ISR)
          </div>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {/* Recent Projects List */}
        <div className="glass-card rounded-2xl p-6 border border-surface-border">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-surface-border">
            <h2 className="font-display text-base font-bold text-text-primary">
              Recent Projects
            </h2>
            <Link
              href="/admin/projects"
              className="text-xs font-mono text-brand-emerald hover:underline flex items-center gap-1"
            >
              <span>Manage all</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>

          <div className="space-y-3">
            {projects.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="p-3 rounded-xl bg-surface-hover border border-surface-border flex items-center justify-between gap-3"
              >
                <div>
                  <div className="font-mono text-xs font-semibold text-text-primary">
                    {p.title}
                  </div>
                  <div className="text-[11px] font-mono text-text-muted">
                    {p.category} · {p.tags.slice(0, 3).join(', ')}
                  </div>
                </div>
                {p.featured && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono badge-emerald">
                    Featured
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Database Setup Guide */}
        <div className="glass-card rounded-2xl p-6 border border-surface-border space-y-4">
          <h2 className="font-display text-base font-bold text-text-primary pb-3 border-b border-surface-border">
            Supabase Setup Checklist
          </h2>

          <ul className="space-y-3 text-xs font-mono">
            <li className="flex items-start gap-2.5 text-text-secondary">
              <CheckCircle2 size={15} className="text-brand-emerald shrink-0 mt-0.5" />
              <span>
                1. Copy SQL script from <code className="text-text-primary bg-surface-hover px-1 py-0.5 rounded">supabase/schema.sql</code>
              </span>
            </li>
            <li className="flex items-start gap-2.5 text-text-secondary">
              <CheckCircle2 size={15} className="text-brand-emerald shrink-0 mt-0.5" />
              <span>2. Paste into Supabase Dashboard &rarr; SQL Editor &rarr; Run</span>
            </li>
            <li className="flex items-start gap-2.5 text-text-secondary">
              <CheckCircle2 size={15} className="text-brand-emerald shrink-0 mt-0.5" />
              <span>3. Add Project URL &amp; Anon Key into <code className="text-text-primary bg-surface-hover px-1 py-0.5 rounded">.env.local</code></span>
            </li>
            <li className="flex items-start gap-2.5 text-text-secondary">
              <CheckCircle2 size={15} className="text-brand-emerald shrink-0 mt-0.5" />
              <span>4. Create admin user in Supabase Auth &rarr; Users &rarr; Add User</span>
            </li>
          </ul>

          <div className="pt-2">
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-hover border border-surface-border text-xs font-mono text-text-primary hover:border-brand-emerald transition-colors"
            >
              <span>Open Supabase Dashboard</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
