'use client';

import type { SupabaseClient } from '@supabase/supabase-js';

import { createBrowserClient } from '@supabase/ssr';

import { SUPABASE_CONFIG } from './config';

type OAuthProviderName = 'google' | 'github' | 'linkedin_oidc';

let browserClient: SupabaseClient | undefined = undefined;

const getSupabaseBrowserClient = (): SupabaseClient => {
  if (!browserClient) {
    browserClient = createBrowserClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.publishableKey);
  }

  return browserClient;
};

const signInWithOAuthProvider = async (provider: OAuthProviderName, redirectTo?: string) => {
  const supabase = getSupabaseBrowserClient();

  const { error } = await supabase.auth.signInWithOAuth({
    options: redirectTo ? { redirectTo } : undefined,
    provider,
  });

  if (error) {
    throw error;
  }
};

export type { OAuthProviderName };

export { getSupabaseBrowserClient, signInWithOAuthProvider };
