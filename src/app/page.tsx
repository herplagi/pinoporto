import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import SkillsSection from '@/components/home/SkillsSection';
import ContactSection from '@/components/home/ContactSection';
import { getProfile, getProjects, getExperiences, getSkills } from '@/lib/data';

// Opt in to dynamic rendering so updates from Admin are immediately visible
export const revalidate = 0;

export default async function HomePage() {
  const [profile, projects, experiences, skills] = await Promise.all([
    getProfile(),
    getProjects(),
    getExperiences(),
    getSkills(),
  ]);

  return (
    <div className="relative min-h-screen">
      <Navbar availableForHire={profile.available_for_hire} />
      
      <main>
        <HeroSection profile={profile} projectsCount={projects.length} />
        <ProjectsSection projects={projects} />
        <ExperienceSection experiences={experiences} />
        <SkillsSection skills={skills} />
        <ContactSection profile={profile} />
      </main>

      <Footer profile={profile} />
    </div>
  );
}
