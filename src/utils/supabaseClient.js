import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ewhovsevwmbyjvkkioii.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3aG92c2V2d21ieWp2a2tpb2lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwOTE4NTMsImV4cCI6MjA5ODY2Nzg1M30.1qx7bt-XsbomHF6Xybawiaz5we6NEqyHHitHvX1baXc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
