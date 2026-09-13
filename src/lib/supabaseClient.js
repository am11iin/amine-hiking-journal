import { createClient } from '@supabase/supabase-js';

// URL et Clé publiques du projet Supabase (fallbacks automatiques)
const defaultUrl = 'https://nhfndtepdimhlxplkrkn.supabase.co';
const defaultAnonKey = 'sb_publishable_9yB-Bbw6J3t6BG5eXE_YFg_MXl6_u3C';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || defaultUrl;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || defaultAnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

