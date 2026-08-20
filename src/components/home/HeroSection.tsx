'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Profile } from '@/types/database';

interface HeroSectionProps {
  profile: Profile;
  projectsCount?: number;
}

export default function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section className="min-h-[90vh] flex flex-col justify-end px-6 md:px-10 pb-16 md:pb-24 max-w-7xl mx-auto">
      <div className="space-y-6">
        {/* Name as typography statement */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.9] tracking-tighter text-text-primary"
        >
          {profile.full_name || 'Alvino Albas'}
        </motion.h1>

        {/* One sentence */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base md:text-lg text-text-secondary max-w-xl leading-relaxed"
        >
          {profile.bio}
        </motion.p>

        {/* Minimal context line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center gap-4 text-sm text-text-muted"
        >
          <span>{profile.location || 'Padang, Indonesia'}</span>
          <span className="w-1 h-1 rounded-full bg-text-muted" />
          <span>Full-Stack & Mobile Developer</span>
          {profile.available_for_hire && (
            <>
              <span className="w-1 h-1 rounded-full bg-text-muted" />
              <span className="text-accent">Open to work</span>
            </>
          )}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-6 md:left-10 flex items-center gap-2 text-xs text-text-muted"
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
  );
}
