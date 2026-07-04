-- Run this in your Supabase SQL Editor to add the new fields

ALTER TABLE public.lessons 
ADD COLUMN IF NOT EXISTS description text,
ADD COLUMN IF NOT EXISTS level text;
