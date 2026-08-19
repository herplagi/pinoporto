'use client';

import React, { useState, useEffect } from 'react';
import { UserCheck, Save, Check, AlertCircle, Sparkles } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { getProfile } from '@/lib/data';
import { Profile } from '@/types/database';

export default function AdminSettingsPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const isSupabaseLive = supabaseUrl && !supabaseUrl.includes('placeholder');

  useEffect(() => {
    async function load() {
      const data = await getProfile();
      setProfile(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    setNotification(null);

    if (!isSupabaseLive) {
      setSaving(false);
      setNotification({ type: 'success', message: 'Profile updated in local preview state!' });
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profile.full_name,
          headline: profile.headline,
          bio: profile.bio,
          email: profile.email,
          location: profile.location,
          avatar_url: profile.avatar_url,
          resume_url: profile.resume_url,
          github_url: profile.github_url,
          linkedin_url: profile.linkedin_url,
          twitter_url: profile.twitter_url,
          available_for_hire: profile.available_for_hire,
          years_of_experience: Number(profile.years_of_experience),
          updated_at: new Date().toISOString(),
        })
        .eq('id', profile.id);

      if (error) throw error;
      setNotification({ type: 'success', message: 'Profile saved to Supabase successfully!' });
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message || 'Failed to update profile' });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !profile) {
    return (
      <div className="py-12 text-center font-mono text-xs text-text-muted">
        Loading profile settings...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-surface-border">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-text-primary">
            Profile &amp; Bio Settings
          </h1>
          <p className="text-xs font-mono text-text-secondary mt-1">
            Update your public persona, availability, and contact links
          </p>
        </div>
      </div>

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
        </div>
      )}

      <form onSubmit={handleSave} className="glass-card rounded-2xl p-6 sm:p-8 space-y-5 border border-surface-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-xs font-mono text-text-muted">Full Name *</label>
            <input
              type="text"
              required
              value={profile.full_name}
              onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-surface-hover border border-surface-border text-xs font-mono text-text-primary focus:outline-none focus:border-brand-emerald"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-mono text-text-muted">Contact Email *</label>
            <input
              type="email"
              required
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-surface-hover border border-surface-border text-xs font-mono text-text-primary focus:outline-none focus:border-brand-emerald"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-mono text-text-muted">Headline Role *</label>
          <input
            type="text"
            required
            value={profile.headline}
            onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
            placeholder="Software Engineer & Fullstack Architect"
            className="w-full px-3.5 py-2.5 rounded-lg bg-surface-hover border border-surface-border text-xs font-mono text-text-primary focus:outline-none focus:border-brand-emerald"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-mono text-text-muted">
            Bio (Anti-AI Slop: Specific &amp; Direct) *
          </label>
          <textarea
            required
            rows={3}
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg bg-surface-hover border border-surface-border text-xs font-mono text-text-primary focus:outline-none focus:border-brand-emerald resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-xs font-mono text-text-muted">Years of Experience</label>
            <input
              type="number"
              min="0"
              value={profile.years_of_experience}
              onChange={(e) => setProfile({ ...profile, years_of_experience: Number(e.target.value) })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-surface-hover border border-surface-border text-xs font-mono text-text-primary focus:outline-none focus:border-brand-emerald"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-mono text-text-muted">Location</label>
            <input
              type="text"
              value={profile.location || ''}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              placeholder="Jakarta, Indonesia (UTC+7)"
              className="w-full px-3.5 py-2.5 rounded-lg bg-surface-hover border border-surface-border text-xs font-mono text-text-primary focus:outline-none focus:border-brand-emerald"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="space-y-1">
            <label className="block text-xs font-mono text-text-muted">GitHub Profile URL</label>
            <input
              type="url"
              value={profile.github_url || ''}
              onChange={(e) => setProfile({ ...profile, github_url: e.target.value })}
              placeholder="https://github.com/..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-surface-hover border border-surface-border text-xs font-mono text-text-primary focus:outline-none focus:border-brand-emerald"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-mono text-text-muted">LinkedIn Profile URL</label>
            <input
              type="url"
              value={profile.linkedin_url || ''}
              onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })}
              placeholder="https://linkedin.com/in/..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-surface-hover border border-surface-border text-xs font-mono text-text-primary focus:outline-none focus:border-brand-emerald"
            />
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="p-4 rounded-xl bg-surface-hover border border-surface-border flex items-center justify-between">
          <div>
            <div className="text-xs font-mono font-semibold text-text-primary flex items-center gap-2">
              <UserCheck size={14} className="text-brand-emerald" />
              <span>Available for Hire (Pill on Homepage)</span>
            </div>
            <div className="text-[11px] font-mono text-text-muted mt-0.5">
              Displays the green glowing status badge in the navbar and hero
            </div>
          </div>
          <input
            type="checkbox"
            checked={profile.available_for_hire}
            onChange={(e) => setProfile({ ...profile, available_for_hire: e.target.checked })}
            className="w-4 h-4 rounded bg-surface border-surface-border text-brand-emerald focus:ring-0 cursor-pointer"
          />
        </div>

        <div className="pt-4 border-t border-surface-border flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-emerald hover:bg-emerald-400 disabled:opacity-50 text-background font-mono text-xs font-semibold transition-all shadow-md shadow-brand-emerald/10"
          >
            <Save size={15} />
            <span>{saving ? 'Updating...' : 'Save Profile Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
