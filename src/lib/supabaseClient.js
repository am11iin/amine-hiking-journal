import { createClient } from '@supabase/supabase-js';

// URL publique du projet Supabase (fallback automatique si non définie dans les env Netlify)
const defaultUrl = 'https://nhfndtepdimhlxplkrkn.supabase.co';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || defaultUrl;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy';

if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn("⚠️ VITE_SUPABASE_ANON_KEY non trouvée dans les variables Netlify. Assurez-vous d'avoir configuré VITE_SUPABASE_ANON_KEY dans Netlify Site Settings.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
