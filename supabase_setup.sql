-- Run this script in the Supabase SQL Editor to set up your tables

-- 1. Create the Users table
CREATE TABLE IF NOT EXISTS public.users (
  id uuid default gen_random_uuid() primary key,
  username text unique not null,
  name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create the Lessons table
CREATE TABLE IF NOT EXISTS public.lessons (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  course text not null,
  drafted_by text not null,
  status text default 'Draft' not null,
  pages_count integer default 1,
  components jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create the Activities table
CREATE TABLE IF NOT EXISTS public.activities (
  id uuid default gen_random_uuid() primary key,
  "user" text not null,
  action text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS) to allow all operations for now (since we're prototyping)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous read/write" ON public.users FOR ALL USING (true);
CREATE POLICY "Allow anonymous read/write" ON public.lessons FOR ALL USING (true);
CREATE POLICY "Allow anonymous read/write" ON public.activities FOR ALL USING (true);
