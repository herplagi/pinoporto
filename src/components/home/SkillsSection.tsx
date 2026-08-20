'use client';

import React from 'react';
import { Skill } from '@/types/database';
import AnimateIn from '@/components/ui/AnimateIn';

interface SkillsSectionProps {
  skills: Skill[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <section id="skills" className="py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto">
      <AnimateIn>
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-16">
          Stack
        </h2>
      </AnimateIn>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
        {categories.map((category, catIdx) => {
          const categorySkills = skills.filter((s) => s.category === category);

          return (
            <AnimateIn key={category} delay={catIdx * 0.08}>
              <div>
                <h3 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-4 pb-3 border-b border-surface-border">
                  {category}
                </h3>
                <ul className="space-y-2.5">
                  {categorySkills.map((skill) => (
                    <li key={skill.id || skill.name} className="text-sm text-text-secondary">
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>
          );
        })}
      </div>
    </section>
  );
}
