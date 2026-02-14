import { getSupabaseBrowserClient } from '../client';

export type OAuthProviderName = 'google' | 'github' | 'linkedin_oidc';

export const signInWithOAuthProvider = async (provider: OAuthProviderName, redirectTo?: string) => {
  const supabase = getSupabaseBrowserClient();

  const { error } = await supabase.auth.signInWithOAuth({
    options: redirectTo ? { redirectTo } : undefined,
    provider,
  });

  if (error) {
    throw error;
  }
};
