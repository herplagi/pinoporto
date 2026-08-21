'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowUpRight, Mail } from 'lucide-react';
import { Profile } from '@/types/database';
import CVModal from '@/components/ui/CVModal';

interface HeroSectionProps {
  profile: Profile;
  projectsCount?: number;
}

export default function HeroSection({ profile }: HeroSectionProps) {
  const [cvModalOpen, setCvModalOpen] = useState(false);

  return (
    <>
      <section className="min-h-[92vh] flex flex-col justify-end px-6 md:px-10 pb-16 md:pb-24 max-w-7xl mx-auto relative">
        <div className="space-y-6">
          {/* Name as typography statement */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.8rem,9vw,7.5rem)] font-bold leading-[0.9] tracking-tighter text-text-primary"
          >
            {profile.full_name || 'Alvino Albas'}
          </motion.h1>

          {/* One sentence summary */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-lg text-text-secondary max-w-xl leading-relaxed font-sans"
          >
            {profile.bio}
          </motion.p>

          {/* Minimal context line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-text-muted"
          >
            <span>{profile.location || 'Padang, Indonesia'}</span>
            <span className="w-1 h-1 rounded-full bg-text-muted hidden sm:inline-block" />
            <span>Full-Stack &amp; Mobile Developer</span>
            {profile.available_for_hire && (
              <>
                <span className="w-1 h-1 rounded-full bg-text-muted hidden sm:inline-block" />
                <span className="text-accent flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping inline-block" />
                  <span>Open to work</span>
                </span>
              </>
            )}
          </motion.div>

          {/* Action CTAs: CV Viewer & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <button
              onClick={() => setCvModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-hover hover:bg-surface-border border border-surface-border text-xs font-mono text-text-primary hover:border-accent hover:text-accent transition-all group shadow-sm"
            >
              <FileText size={14} className="text-accent group-hover:scale-110 transition-transform" />
              <span>Curriculum Vitae (CV)</span>
              <ArrowUpRight size={13} className="text-text-muted group-hover:text-accent transition-colors" />
            </button>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-transparent hover:bg-surface-hover border border-transparent hover:border-surface-border text-xs font-mono text-text-secondary hover:text-text-primary transition-all"
            >
              <Mail size={14} className="text-text-muted" />
              <span>Get in Touch</span>
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-6 left-6 md:left-10 hidden sm:flex items-center gap-2 text-xs text-text-muted"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
          <span>Scroll</span>
        </motion.div>
      </section>

      {/* Interactive CV Modal Viewer */}
      <CVModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
        resumeUrl={profile.resume_url}
        name={profile.full_name}
      />
    </>
  );
}
