'use client';

import React, { useState } from 'react';
import { ArrowDown, Copy, Check, ExternalLink, Terminal, Zap } from 'lucide-react';
import { Profile } from '@/types/database';

interface HeroSectionProps {
  profile: Profile;
}

export default function HeroSection({ profile }: HeroSectionProps) {
  const [copied, setCopied] = useState(false);
  const npxCommand = 'npx alvino-albas';

  const handleCopy = () => {
    navigator.clipboard.writeText(npxCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Top micro badges */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-emerald text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
          <span>Status: Available for Full-Stack &amp; Mobile Roles</span>
        </div>

        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full badge-slate text-xs font-mono">
          <Zap size={12} className="text-brand-amber" />
          <span>Laravel · Express.js · React Native · Flutter</span>
        </div>
      </div>

      {/* Main Headline */}
      <div className="space-y-4 max-w-4xl">
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-text-primary leading-[1.08]">
          Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-text-primary via-slate-200 to-slate-400">scalable web apps</span> &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald via-teal-300 to-cyan-400">mobile solutions</span>.
        </h1>

        <p className="text-base sm:text-xl text-text-secondary max-w-2xl leading-relaxed pt-2">
          {profile.bio}
        </p>
      </div>

      {/* Terminal Command & Action Buttons */}
      <div className="pt-8 flex flex-col sm:flex-row sm:items-center gap-4">
        <a
          href="#projects"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-emerald hover:bg-emerald-400 text-background font-mono text-sm font-semibold transition-all duration-200 shadow-lg shadow-brand-emerald/20 hover:shadow-brand-emerald/30 hover:-translate-y-0.5"
        >
          <span>Explore Featured Works</span>
          <ArrowDown size={16} />
        </a>

        <a
          href="#contact"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-surface hover:bg-surface-hover border border-surface-border text-text-primary font-mono text-sm transition-all duration-200 hover:-translate-y-0.5"
        >
          <span>Get in Touch</span>
          <ExternalLink size={15} className="text-text-muted" />
        </a>

        {/* Interactive CLI badge */}
        <div className="hidden lg:flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-surface border border-surface-border font-mono text-xs text-text-secondary">
          <Terminal size={14} className="text-brand-emerald" />
          <span className="text-text-primary">{npxCommand}</span>
          <button
            onClick={handleCopy}
            className="p-1 rounded hover:bg-surface-hover text-text-muted hover:text-text-primary transition-colors ml-1"
            title="Copy command"
          >
            {copied ? <Check size={14} className="text-brand-emerald" /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      {/* Stats Grid Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-16 pt-8 border-t border-surface-border/60">
        <div className="p-4 rounded-xl bg-surface/60 border border-surface-border">
          <div className="font-mono text-2xl sm:text-3xl font-bold text-text-primary">
            3+ <span className="text-brand-emerald text-lg">Years</span>
          </div>
          <div className="text-xs font-mono text-text-muted mt-1">Fullstack Development</div>
        </div>

        <div className="p-4 rounded-xl bg-surface/60 border border-surface-border">
          <div className="font-mono text-2xl sm:text-3xl font-bold text-text-primary">
            4+ <span className="text-brand-amber text-lg">Core</span>
          </div>
          <div className="text-xs font-mono text-text-muted mt-1">Production Builds</div>
        </div>

        <div className="p-4 rounded-xl bg-surface/60 border border-surface-border">
          <div className="font-mono text-2xl sm:text-3xl font-bold text-text-primary">
            SI <span className="text-brand-emerald text-lg">Unand</span>
          </div>
          <div className="text-xs font-mono text-text-muted mt-1">Information Systems Grad</div>
        </div>

        <div className="p-4 rounded-xl bg-surface/60 border border-surface-border">
          <div className="font-mono text-2xl sm:text-3xl font-bold text-text-primary">
            Web &amp; <span className="text-cyan-400 text-lg">App</span>
          </div>
          <div className="text-xs font-mono text-text-muted mt-1">Cross-Platform Solutions</div>
        </div>
      </div>
    </section>
  );
}
