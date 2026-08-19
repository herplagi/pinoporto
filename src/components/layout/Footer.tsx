'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Github, Linkedin, Twitter, ArrowUp, Lock } from 'lucide-react';
import { Profile } from '@/types/database';

interface FooterProps {
  profile: Profile;
}

export default function Footer({ profile }: FooterProps) {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTimeString(new Intl.DateTimeFormat('en-GB', options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-surface-border bg-background pt-16 pb-12 mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-surface-border/60">
          {/* Col 1: Bio & Presence */}
          <div className="md:col-span-2 space-y-3">
            <span className="font-display font-bold text-lg text-text-primary">
              {profile.full_name}
            </span>
            <p className="text-sm text-text-secondary max-w-md leading-relaxed">
              Designing reliable software systems, low-latency web services, and high-fidelity interfaces.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {profile.github_url && (
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-surface hover:bg-surface-hover border border-surface-border flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
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
                  className="w-8 h-8 rounded-lg bg-surface hover:bg-surface-hover border border-surface-border flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
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
                  className="w-8 h-8 rounded-lg bg-surface hover:bg-surface-hover border border-surface-border flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
                  aria-label="Twitter / X"
                >
                  <Twitter size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs text-text-muted uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a href="#projects" className="text-text-secondary hover:text-brand-emerald transition-colors">
                  Featured Projects
                </a>
              </li>
              <li>
                <a href="#experience" className="text-text-secondary hover:text-brand-emerald transition-colors">
                  Work Experience
                </a>
              </li>
              <li>
                <a href="#skills" className="text-text-secondary hover:text-brand-emerald transition-colors">
                  Technical Stack
                </a>
              </li>
              <li>
                <a href="#contact" className="text-text-secondary hover:text-brand-emerald transition-colors">
                  Contact Form
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Realtime Status */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs text-text-muted uppercase tracking-wider">
              Local Time (WIB)
            </h4>
            <div className="p-3 rounded-lg bg-surface border border-surface-border">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-emerald animate-ping" />
                <span className="font-mono text-sm font-semibold text-text-primary">
                  {timeString || 'Jakarta, ID'}
                </span>
              </div>
              <p className="text-[11px] text-text-muted mt-1 font-mono">
                Jakarta, UTC+7 (Remote Available)
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
          <p>© {new Date().getFullYear()} {profile.full_name}. Built with Next.js & Supabase.</p>

          <div className="flex items-center gap-4">
            <Link
              href="/admin/login"
              className="hover:text-text-secondary flex items-center gap-1 transition-colors"
            >
              <Lock size={12} />
              <span>Admin Portal</span>
            </Link>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-text-secondary transition-colors"
              aria-label="Scroll to top"
            >
              <span>Top</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
