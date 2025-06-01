import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env } from '@shared/environment';

export const supabase = createClient(env.supabase.url, env.supabase.anonKey);

export type { SupabaseClient };
