'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Twitter, FileText } from 'lucide-react';
import { Profile } from '@/types/database';

interface FooterProps {
  profile: Profile;
}

export default function Footer({ profile }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasResume = profile.resume_url && profile.resume_url !== '#' && profile.resume_url.trim() !== '';

  return (
    <footer className="border-t border-surface-border py-8 mt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: name + copyright + links */}
        <div className="flex items-center gap-5 text-sm text-text-muted flex-wrap">
          <span>© {new Date().getFullYear()} {profile.full_name}</span>
          <span className="w-1 h-1 rounded-full bg-surface-border" />
          <Link
            href="/cv"
            className="hover:text-text-secondary transition-colors inline-flex items-center gap-1 text-xs font-mono text-text-secondary"
          >
            <FileText size={12} className="text-accent" />
            <span>Curriculum Vitae</span>
          </Link>
          <span className="w-1 h-1 rounded-full bg-surface-border" />
          <Link
            href="/admin/login"
            className="hover:text-text-secondary transition-colors text-xs font-mono"
          >
            Admin
          </Link>
        </div>

        {/* Right: social + top */}
        <div className="flex items-center gap-5">
          {profile.github_url && (
            <a
              href={profile.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
          )}
          {profile.linkedin_url && (
            <a
              href={profile.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
          )}
          {profile.twitter_url && (
            <a
              href={profile.twitter_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={16} />
            </a>
          )}

          <button
            onClick={scrollToTop}
            className="text-xs text-text-muted hover:text-text-secondary transition-colors ml-2 font-mono"
            aria-label="Scroll to top"
          >
            ↑ Top
          </button>
        </div>
      </div>
    </footer>
  );
}
