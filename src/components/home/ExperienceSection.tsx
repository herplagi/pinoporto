'use client';

import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { Experience } from '@/types/database';

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-surface-border/50">
      <div className="mb-12">
        <div className="flex items-center gap-2 text-brand-emerald font-mono text-xs mb-2">
          <Briefcase size={14} />
          <span>CAREER TIMELINE</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
          Work Experience
        </h2>
      </div>

      <div className="space-y-6">
        {experiences.map((exp, idx) => (
          <div
            key={exp.id || idx}
            className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="font-display text-xl font-bold text-text-primary">
                  {exp.role}
                </h3>
                <div className="font-mono text-sm text-brand-emerald mt-0.5">
                  {exp.company}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-text-muted">
                {exp.location && (
                  <div className="flex items-center gap-1">
                    <MapPin size={13} />
                    <span>{exp.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface-hover border border-surface-border text-text-secondary">
                  <Calendar size={13} />
                  <span>{exp.period}</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed mb-6 max-w-3xl">
              {exp.description}
            </p>

            {/* Skills tag pill container */}
            {exp.skills_used && exp.skills_used.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2 border-t border-surface-border/50">
                {exp.skills_used.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-0.5 rounded-full bg-surface-hover border border-surface-border text-[11px] font-mono text-text-secondary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
