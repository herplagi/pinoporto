'use client';

import React from 'react';
import { Experience } from '@/types/database';
import AnimateIn from '@/components/ui/AnimateIn';

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto">
      <AnimateIn>
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-16">
          Experience
        </h2>
      </AnimateIn>

      <div className="border-t border-surface-border">
        {experiences.map((exp, idx) => (
          <AnimateIn key={exp.id || idx} delay={idx * 0.05}>
            <div className="border-b border-surface-border py-8 md:py-10 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-10">
              {/* Left: meta */}
              <div className="space-y-1">
                <div className="text-sm text-text-muted">{exp.period}</div>
                {exp.location && (
                  <div className="text-sm text-text-muted">{exp.location}</div>
                )}
              </div>

              {/* Right: content */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-display text-lg font-semibold text-text-primary">
                    {exp.role}
                  </h3>
                  <div className="text-sm text-accent">{exp.company}</div>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed">
                  {exp.description}
                </p>

                {exp.skills_used && exp.skills_used.length > 0 && (
                  <div className="text-xs text-text-muted">
                    {exp.skills_used.join(' · ')}
                  </div>
                )}
              </div>
            </div>
          </AnimateIn>
        ))}
      </div>
    </section>
  );
}
