export interface Profile {
  id: string;
  full_name: string;
  headline: string;
  bio: string;
  email: string;
  location?: string | null;
  avatar_url?: string | null;
  resume_url?: string | null;
  github_url?: string | null;
  linkedin_url?: string | null;
  twitter_url?: string | null;
  available_for_hire: boolean;
  years_of_experience: number;
  created_at?: string;
  updated_at?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  background?: string | null;
  image_url?: string | null;
  screenshots?: string[] | null;
  category: string;
  tags: string[];
  core_tech?: string[] | null;
  key_features?: string[] | null;
  metrics?: string | null;
  featured: boolean;
  live_url?: string | null;
  github_url?: string | null;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string | null;
  period: string;
  description: string;
  skills_used: string[];
  sort_order: number;
  created_at?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Mobile' | 'Database' | 'DevOps & Tools' | 'Architecture' | string;
  proficiency: number;
  icon_name?: string | null;
  sort_order: number;
  created_at?: string;
}

export interface Message {
  id: string;
  sender_name: string;
  sender_email: string;
  subject?: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}
