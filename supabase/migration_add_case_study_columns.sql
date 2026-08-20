-- ==============================================================================
-- MIGRATION: Add Missing Columns to 'projects' Table
-- Run this in your Supabase SQL Editor if you get PGRST204 schema cache errors
-- ==============================================================================

-- 1. Add background, screenshots, core_tech, and key_features columns
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS background TEXT,
ADD COLUMN IF NOT EXISTS screenshots TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS core_tech TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS key_features TEXT[] DEFAULT '{}';

-- 2. Force reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';
