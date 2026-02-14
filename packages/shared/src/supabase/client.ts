'use client';

import type { SupabaseClient } from '@supabase/supabase-js';

import { createBrowserClient } from '@supabase/ssr';

import { SUPABASE_CONFIG } from './config';

let browserClient: SupabaseClient | undefined = undefined;

export const getSupabaseBrowserClient = (): SupabaseClient => {
  if (!browserClient) {
    browserClient = createBrowserClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.publishableKey);
  }

  return browserClient;
};
