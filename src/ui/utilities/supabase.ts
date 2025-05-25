import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env['SUPABASE_URL']!,
  import.meta.env['SUPABASE_ANON_KEY']!,
);

export type { SupabaseClient };
