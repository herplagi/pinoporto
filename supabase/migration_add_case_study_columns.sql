-- ==============================================================================
-- MIGRATION: Add Missing Columns to 'projects' Table
-- Run this in your Supabase SQL Editor if you get PGRST204 schema cache errors
-- ==============================================================================

-- 1. Add background, screenshots, core_tech, key_features, github_repos, is_private, confidentiality_note, and status columns
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS background TEXT,
ADD COLUMN IF NOT EXISTS screenshots TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS core_tech TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS key_features TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS github_repos JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS is_private BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS confidentiality_note TEXT,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Completed';

-- 2. Force reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';
