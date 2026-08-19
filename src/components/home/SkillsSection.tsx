'use client';

import React from 'react';
import { Cpu, CheckCircle2 } from 'lucide-react';
import { Skill } from '@/types/database';

interface SkillsSectionProps {
  skills: Skill[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  // Group skills by category
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-surface-border/50">
      <div className="mb-12">
        <div className="flex items-center gap-2 text-brand-emerald font-mono text-xs mb-2">
          <Cpu size={14} />
          <span>TECHNICAL CAPABILITIES</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
          Core Tech Stack &amp; Tools
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => {
          const categorySkills = skills.filter((s) => s.category === category);

          return (
            <div
              key={category}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-mono text-xs font-semibold text-text-muted uppercase tracking-wider mb-4 pb-2 border-b border-surface-border">
                  {category}
                </h3>

                <ul className="space-y-3">
                  {categorySkills.map((skill) => (
                    <li key={skill.id || skill.name} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-text-primary flex items-center gap-1.5">
                          <CheckCircle2 size={12} className="text-brand-emerald" />
                          {skill.name}
                        </span>
                        <span className="text-text-muted">{skill.proficiency}%</span>
                      </div>
                      <div className="w-full h-1 rounded-full bg-surface-border overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-brand-emerald to-cyan-400"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
