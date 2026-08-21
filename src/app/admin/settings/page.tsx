'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  UserCheck, 
  Save, 
  Check, 
  AlertCircle, 
  Sparkles, 
  FileText, 
  Upload, 
  ExternalLink, 
  Trash2, 
  Loader2, 
  Eye, 
  Copy,
  FileCheck
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { getProfile } from '@/lib/data';
import { Profile } from '@/types/database';

export default function AdminSettingsPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingCv, setUploadingCv] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleCvFileUpload = async (file: File) => {
    if (!profile) return;

    // Validate file type
    const validExtensions = ['pdf', 'doc', 'docx'];
    const fileExt = file.name.split('.').pop()?.toLowerCase() || '';
    if (!validExtensions.includes(fileExt)) {
      setNotification({
        type: 'error',
        message: 'Format file tidak didukung. Harap upload file PDF, DOC, atau DOCX.',
      });
      return;
    }

    // Validate size (max 15MB)
    if (file.size > 15 * 1024 * 1024) {
      setNotification({
        type: 'error',
        message: 'Ukuran file terlalu besar. Maksimal ukuran file adalah 15MB.',
      });
      return;
    }

    setUploadingCv(true);
    setNotification(null);

    if (!isSupabaseLive) {
      // Local preview simulation
      const mockUrl = URL.createObjectURL(file);
      setProfile((prev) => (prev ? { ...prev, resume_url: mockUrl } : null));
      setUploadingCv(false);
      setNotification({
        type: 'success',
        message: `File "${file.name}" berhasil diunggah (Local Preview Mode).`,
      });
      return;
    }

    try {
      const supabase = createClient();
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const filePath = `resumes/${Date.now()}_${cleanFileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-media')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('portfolio-media')
        .getPublicUrl(filePath);

      const newResumeUrl = publicUrlData.publicUrl;

      // Update local state
      setProfile((prev) => (prev ? { ...prev, resume_url: newResumeUrl } : null));

      // Auto update profile in database
      const { error: dbError } = await supabase
        .from('profiles')
        .update({
          resume_url: newResumeUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', profile.id);

      if (dbError) throw dbError;

      setNotification({
        type: 'success',
        message: `CV "${file.name}" berhasil diupload ke Supabase Storage & tersimpan otomatis!`,
      });
    } catch (err: any) {
      setNotification({
        type: 'error',
        message: err.message || 'Gagal mengupload file CV ke storage.',
      });
    } finally {
      setUploadingCv(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleCvFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveCv = async () => {
    if (!profile) return;
    setProfile({ ...profile, resume_url: '' });
    setNotification({
      type: 'success',
      message: 'CV dihapus dari profil. Klik "Save Profile Changes" untuk menyimpan permanen.',
    });
  };

  const copyCvLink = () => {
    if (profile?.resume_url) {
      navigator.clipboard.writeText(profile.resume_url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

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

  const hasResume = profile.resume_url && profile.resume_url !== '#' && profile.resume_url.trim() !== '';

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-surface-border">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-text-primary">
            Profile &amp; Bio Settings
          </h1>
          <p className="text-xs font-mono text-text-secondary mt-1">
            Update your public persona, CV document, availability, and contact links
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

      {/* CURRICULUM VITAE (CV / RESUME) MANAGEMENT SECTION */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 border border-surface-border relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-accent">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-text-primary">
                Curriculum Vitae (CV / Resume)
              </h2>
              <p className="text-xs font-mono text-text-muted">
                Upload your latest PDF CV to be viewed and downloaded by recruiters &amp; visitors
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/cv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-surface-border text-xs font-mono text-text-secondary hover:text-text-primary transition-colors"
            >
              <Eye size={13} />
              <span>Public /cv Page</span>
              <ExternalLink size={11} className="text-text-muted" />
            </a>
          </div>
        </div>

        {/* Current Uploaded CV Status */}
        {hasResume ? (
          <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <FileCheck size={18} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-mono font-semibold text-text-primary flex items-center gap-2">
                    <span>CV Aktif Terpasang</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-mono">
                      Live
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-text-muted truncate max-w-md mt-0.5">
                    {profile.resume_url}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <a
                  href={profile.resume_url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-surface-border text-xs font-mono text-text-primary hover:border-brand-emerald transition-colors"
                >
                  <ExternalLink size={13} />
                  <span>Preview CV</span>
                </a>

                <button
                  type="button"
                  onClick={copyCvLink}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-surface-border text-xs font-mono text-text-secondary hover:text-text-primary transition-colors"
                  title="Copy link"
                >
                  {copiedLink ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copiedLink ? 'Copied' : 'Copy Link'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleRemoveCv}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  <Trash2 size={13} />
                  <span>Hapus CV</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-surface-hover border border-surface-border flex items-center gap-3 text-text-muted text-xs font-mono">
            <AlertCircle size={16} className="text-amber-400 shrink-0" />
            <span>Belum ada CV yang diunggah. Pengunjung akan melihat status menunggu pembaruan.</span>
          </div>
        )}

        {/* Drag & Drop / File Uploader Dropzone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
            dragOver
              ? 'border-brand-emerald bg-emerald-500/5 scale-[0.99]'
              : 'border-surface-border hover:border-text-muted bg-surface/50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,application/pdf"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleCvFileUpload(e.target.files[0]);
              }
            }}
          />

          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-surface-hover border border-surface-border flex items-center justify-center text-text-muted">
              {uploadingCv ? (
                <Loader2 size={24} className="animate-spin text-accent" />
              ) : (
                <Upload size={24} />
              )}
            </div>

            <div className="space-y-1">
              <p className="text-xs font-mono text-text-primary font-medium">
                {uploadingCv ? 'Mengunggah file CV ke Storage...' : 'Tarik & Letakkan file CV di sini, atau klik tombol di bawah'}
              </p>
              <p className="text-[11px] font-mono text-text-muted">
                Format yang didukung: <span className="text-text-secondary font-semibold">PDF (.pdf)</span>, DOCX (Maks. 15MB)
              </p>
            </div>

            <button
              type="button"
              disabled={uploadingCv}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-hover hover:bg-surface-border border border-surface-border text-xs font-mono text-text-primary transition-all disabled:opacity-50"
            >
              <Upload size={14} />
              <span>{hasResume ? 'Ganti File CV Baru' : 'Pilih File CV dari Perangkat'}</span>
            </button>
          </div>
        </div>

        {/* Manual URL Input (Optional External Link) */}
        <div className="pt-2">
          <label className="block text-xs font-mono text-text-muted mb-1.5">
            Atau Tautkan URL CV Manual (Google Drive, Cloud Storage, dll.)
          </label>
          <input
            type="url"
            value={profile.resume_url || ''}
            onChange={(e) => setProfile({ ...profile, resume_url: e.target.value })}
            placeholder="https://..."
            className="w-full px-3.5 py-2.5 rounded-lg bg-surface-hover border border-surface-border text-xs font-mono text-text-primary focus:outline-none focus:border-brand-emerald"
          />
        </div>
      </div>

      {/* GENERAL PROFILE INFORMATION FORM */}
      <form onSubmit={handleSave} className="glass-card rounded-2xl p-6 sm:p-8 space-y-5 border border-surface-border">
        <h2 className="font-display text-lg font-bold text-text-primary pb-3 border-b border-surface-border">
          Informasi Profil &amp; Biodata
        </h2>

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
              <UserCheck size={14} className="text-accent" />
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
            className="w-4 h-4 rounded bg-surface border-surface-border text-accent focus:ring-0 cursor-pointer"
          />
        </div>

        <div className="pt-4 border-t border-surface-border flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent hover:bg-emerald-400 disabled:opacity-50 text-background font-mono text-xs font-semibold transition-all shadow-md shadow-emerald-500/10"
          >
            <Save size={15} />
            <span>{saving ? 'Updating...' : 'Save Profile Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
