import { Profile, Project, Experience, Skill } from '@/types/database';

export const initialProfile: Profile = {
  id: 'alvino-albas-profile',
  full_name: 'Alvino Albas',
  headline: 'Full-Stack Developer & Information Systems Graduate',
  bio: 'Information Systems Graduate from Andalas University, specializing in Full-Stack Web & Mobile Development. Experienced in building scalable web and mobile applications using Laravel, Express.js, React Native, React.js, and Flutter.',
  email: 'alvinoalbas@gmail.com',
  location: 'Kuranji, Padang, West Sumatra, Indonesia',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80',
  resume_url: '#',
  github_url: 'https://github.com',
  linkedin_url: 'https://www.linkedin.com/in/alvinoalbas/',
  twitter_url: 'https://x.com',
  available_for_hire: true,
  years_of_experience: 3,
};

export const initialProjects: Project[] = [
  {
    id: 'proj-01',
    title: 'Potongin — Barbershop Marketplace Ecosystem',
    slug: 'potongin-marketplace',
    summary: 'Multi-platform barbershop marketplace ecosystem with React Native mobile app, React.js admin dashboard, and Express.js REST API.',
    description: 'Engineered an end-to-end booking and service management marketplace. Built an Express.js RESTful API handling authentication and business logic, synchronized a centralized MySQL database across mobile and web platforms, and optimized operations using BPMN process analysis.',
    category: 'Fullstack & Mobile',
    tags: ['React Native', 'React.js', 'Express.js', 'Node.js', 'MySQL', 'BPMN', 'REST API'],
    metrics: 'React Native App & Web Admin Dashboard',
    featured: true,
    image_url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80',
    live_url: 'https://my-portfolio-omegablue-59.vercel.app/',
    github_url: 'https://github.com',
    sort_order: 1,
  },
  {
    id: 'proj-02',
    title: 're:memory — Web-Based Photobooth Application',
    slug: 'rememory-photobooth',
    summary: 'Collaborative web-based photobooth system for capturing, managing, and rendering digital memories at events.',
    description: 'Co-developed a high-reliability event photobooth application utilizing PHP Laravel and MySQL. Designed normalized database schemas to handle active user sessions, photo metadata, and system logs, alongside building secure backend upload controllers.',
    category: 'Fullstack',
    tags: ['PHP Laravel', 'MySQL', 'JavaScript', 'TailwindCSS', 'REST API'],
    metrics: 'High-reliability photo ingestion',
    featured: true,
    image_url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80',
    live_url: 'https://my-portfolio-omegablue-59.vercel.app/',
    github_url: 'https://github.com',
    sort_order: 2,
  },
  {
    id: 'proj-03',
    title: 'Employee Leave Management System',
    slug: 'semen-padang-leave-system',
    summary: 'Enterprise employee leave request and approval portal built from the ground up for PT Semen Padang (SIG Group).',
    description: 'Developed a robust web application during internship at PT Semen Padang. Built secure database schemas in MySQL, translated corporate HR business logic into automated request approval flows, and engineered an intuitive interface using Native PHP and Bootstrap.',
    category: 'Web Applications',
    tags: ['Native PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'Enterprise IT'],
    metrics: 'Enterprise Internal Portal',
    featured: true,
    image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
    live_url: 'https://my-portfolio-omegablue-59.vercel.app/',
    github_url: 'https://github.com',
    sort_order: 3,
  },
  {
    id: 'proj-04',
    title: 'Flutter Cross-Platform Mobile Suite',
    slug: 'flutter-mobile-app',
    summary: 'Cross-platform mobile application utilizing Flutter and Dart with reactive UI and REST API integration.',
    description: 'Developed cross-platform mobile solutions in Flutter, connecting with external REST services, local SQLite caching, and modern Material Design aesthetics.',
    category: 'Mobile',
    tags: ['Flutter', 'Dart', 'Mobile Dev', 'REST API', 'SQLite'],
    metrics: 'Android & iOS Ready',
    featured: false,
    image_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80',
    live_url: 'https://my-portfolio-omegablue-59.vercel.app/',
    github_url: 'https://github.com',
    sort_order: 4,
  }
];

export const initialExperiences: Experience[] = [
  {
    id: 'exp-01',
    role: 'Full Stack Developer (Undergraduate Thesis)',
    company: 'Universitas Andalas',
    location: 'Padang, Indonesia',
    period: 'Oct 2025 — April 2026',
    description: 'Led the architecture and fullstack development of Potongin, a barbershop marketplace ecosystem. Developed the React Native mobile app for customer bookings and React.js dashboard for admin management, supported by an Express.js API and MySQL database.',
    skills_used: ['React Native', 'React.js', 'Express.js', 'Node.js', 'MySQL', 'BPMN'],
    sort_order: 1,
  },
  {
    id: 'exp-02',
    role: 'Full Stack Developer (Independent Project)',
    company: 'Independent Collaborative Project',
    location: 'Padang, Indonesia',
    period: 'Dec 2025 — Jan 2026',
    description: 'Co-developed re:memory, an event-based photobooth web application. Designed the relational database schema for session tracking and photo metadata, and programmed backend upload controllers in PHP Laravel.',
    skills_used: ['PHP Laravel', 'MySQL', 'Backend Architecture', 'JavaScript'],
    sort_order: 2,
  },
  {
    id: 'exp-03',
    role: 'Web Developer Intern',
    company: 'PT Semen Padang (SIG Group)',
    location: 'Padang, West Sumatra, Indonesia',
    period: 'Jan 2024 — Mar 2024',
    description: 'Built a full-featured employee leave request web application from scratch using Native PHP, Bootstrap, and MySQL. Collaborated with the corporate IT team to translate business logic into a reliable internal system.',
    skills_used: ['Native PHP', 'MySQL', 'Bootstrap', 'Enterprise IT'],
    sort_order: 3,
  },
  {
    id: 'exp-04',
    role: 'Bachelor of Information Systems',
    company: 'Universitas Andalas',
    location: 'Padang, Indonesia',
    period: 'Aug 2021 — April 2026',
    description: 'Focused on Software Engineering, Database Systems, and IT Governance frameworks. Completed multiple software engineering and mobile development projects.',
    skills_used: ['Software Engineering', 'IT Governance', 'MySQL', 'BPMN'],
    sort_order: 4,
  }
];

export const initialSkills: Skill[] = [
  // Backend
  { id: 'sk-1', name: 'PHP (Laravel & Native)', category: 'Backend', proficiency: 93, sort_order: 1 },
  { id: 'sk-2', name: 'Express.js & Node.js', category: 'Backend', proficiency: 90, sort_order: 2 },
  
  // Frontend
  { id: 'sk-3', name: 'JavaScript & TypeScript', category: 'Frontend', proficiency: 92, sort_order: 3 },
  { id: 'sk-4', name: 'React.js & Next.js', category: 'Frontend', proficiency: 90, sort_order: 4 },
  
  // Mobile
  { id: 'sk-5', name: 'React Native', category: 'Mobile', proficiency: 89, sort_order: 5 },
  { id: 'sk-6', name: 'Dart & Flutter', category: 'Mobile', proficiency: 86, sort_order: 6 },
  
  // Database
  { id: 'sk-7', name: 'MySQL & Relational Schema', category: 'Database', proficiency: 94, sort_order: 7 },
  { id: 'sk-8', name: 'PostgreSQL & Supabase', category: 'Database', proficiency: 88, sort_order: 8 },

  // DevOps & Tools
  { id: 'sk-9', name: 'Docker Containers', category: 'DevOps & Tools', proficiency: 84, sort_order: 9 },
  { id: 'sk-10', name: 'Azure Cloud & Linux VMs', category: 'DevOps & Tools', proficiency: 82, sort_order: 10 },
  { id: 'sk-11', name: 'Git & Version Control', category: 'DevOps & Tools', proficiency: 90, sort_order: 11 },
  { id: 'sk-12', name: 'BPMN Process Modeling', category: 'Architecture', proficiency: 88, sort_order: 12 },
];
