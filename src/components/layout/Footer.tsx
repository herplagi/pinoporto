'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { Profile } from '@/types/database';

interface FooterProps {
  profile: Profile;
}

export default function Footer({ profile }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-surface-border py-8 mt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: name + copyright */}
        <div className="flex items-center gap-6 text-sm text-text-muted">
          <span>© {new Date().getFullYear()} {profile.full_name}</span>
          <Link
            href="/admin/login"
            className="hover:text-text-secondary transition-colors"
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
            className="text-xs text-text-muted hover:text-text-secondary transition-colors ml-2"
            aria-label="Scroll to top"
          >
            ↑ Top
          </button>
        </div>
      </div>
    </footer>
  );
}
