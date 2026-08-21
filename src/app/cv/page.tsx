import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, ExternalLink, FileText, AlertCircle } from 'lucide-react';
import { getProfile } from '@/lib/data';

export const metadata = {
  title: 'Curriculum Vitae (CV) | Alvino Albas',
  description: 'View and download the Curriculum Vitae of Alvino Albas - Full-Stack Developer & Software Engineer.',
};

export const revalidate = 0;

export default async function CVPage() {
  const profile = await getProfile();
  const resumeUrl = profile.resume_url;
  const hasValidUrl = resumeUrl && resumeUrl !== '#' && resumeUrl.trim() !== '';

  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col">
      {/* Top Header Navigation */}
      <header className="border-b border-surface-border bg-surface/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-text-secondary hover:text-text-primary px-3 py-1.5 rounded-lg bg-surface-hover hover:bg-surface-border transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Portfolio</span>
            </Link>

            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-surface-border">
              <span className="font-display font-semibold text-sm text-text-primary">
                {profile.full_name}
              </span>
              <span className="text-xs font-mono text-text-muted">· Curriculum Vitae</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {hasValidUrl && (
              <>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface border border-surface-border text-xs font-mono text-text-secondary hover:text-text-primary hover:border-text-muted transition-colors"
                >
                  <ExternalLink size={14} />
                  <span className="hidden sm:inline">Open in New Tab</span>
                  <span className="sm:hidden">Open</span>
                </a>
                <a
                  href={resumeUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 hover:bg-emerald-500/20 transition-colors font-medium"
                >
                  <Download size={14} />
                  <span>Download PDF</span>
                </a>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Preview Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8 flex flex-col">
        {hasValidUrl ? (
          <div className="w-full flex-1 min-h-[82vh] bg-surface rounded-2xl border border-surface-border overflow-hidden shadow-2xl relative">
            <iframe
              src={`${resumeUrl}#toolbar=1&navpanes=0`}
              className="w-full h-full min-h-[82vh] border-0"
              title={`CV of ${profile.full_name}`}
            />
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-5 bg-surface/50 border border-surface-border rounded-2xl my-auto">
            <div className="w-16 h-16 rounded-2xl bg-surface border border-surface-border flex items-center justify-center text-text-muted">
              <AlertCircle size={32} />
            </div>
            <div className="space-y-2 max-w-md">
              <h2 className="font-display text-xl font-bold text-text-primary">
                CV Belum Diunggah
              </h2>
              <p className="text-xs font-mono text-text-secondary leading-relaxed">
                Dokumen Curriculum Vitae sedang diperbarui. Silakan kembali lagi nanti atau hubungi langsung melalui email.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/#contact"
                className="px-5 py-2.5 rounded-xl bg-accent text-background font-mono text-xs font-semibold hover:bg-emerald-400 transition-colors"
              >
                Hubungi via Kontak &rarr;
              </Link>
              <Link
                href="/"
                className="px-5 py-2.5 rounded-xl bg-surface-hover border border-surface-border font-mono text-xs text-text-secondary hover:text-text-primary transition-colors"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
