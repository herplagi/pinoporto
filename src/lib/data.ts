import { createClient } from '@/lib/supabase/client';
import { 
  initialProfile, 
  initialProjects, 
  initialExperiences, 
  initialSkills 
} from './supabase/mock-data';
import { Profile, Project, Experience, Skill, Message } from '@/types/database';

const isSupabaseConfigured = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && key && !url.includes('placeholder') && !key.includes('placeholder');
};

export async function getProfile(): Promise<Profile> {
  if (!isSupabaseConfigured()) return initialProfile;
  
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .limit(1)
      .single();
      
    if (error || !data) return initialProfile;
    return data as Profile;
  } catch (err) {
    console.warn('Using fallback profile data:', err);
    return initialProfile;
  }
}

export async function getProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured()) return initialProjects;

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true });
      
    if (error || !data || data.length === 0) return initialProjects;
    return data as Project[];
  } catch (err) {
    console.warn('Using fallback projects data:', err);
    return initialProjects;
  }
}

export async function getExperiences(): Promise<Experience[]> {
  if (!isSupabaseConfigured()) return initialExperiences;

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('sort_order', { ascending: true });
      
    if (error || !data || data.length === 0) return initialExperiences;
    return data as Experience[];
  } catch (err) {
    console.warn('Using fallback experiences data:', err);
    return initialExperiences;
  }
}

export async function getSkills(): Promise<Skill[]> {
  if (!isSupabaseConfigured()) return initialSkills;

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('sort_order', { ascending: true });
      
    if (error || !data || data.length === 0) return initialSkills;
    return data as Skill[];
  } catch (err) {
    console.warn('Using fallback skills data:', err);
    return initialSkills;
  }
}

export async function sendContactMessage(payload: {
  sender_name: string;
  sender_email: string;
  subject?: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    // Simulate successful submission for local test
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { success: true };
  }

  try {
    const supabase = createClient();
    const { error } = await supabase.from('messages').insert([payload]);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to submit message' };
  }
}
