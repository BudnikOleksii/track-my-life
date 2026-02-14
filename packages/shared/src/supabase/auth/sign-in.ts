import type { SignInWithPasswordCredentials } from '@supabase/supabase-js';

import { createSupabaseServerClient } from '../server';

export const signInWithEmailAndPassword = async (credentials: SignInWithPasswordCredentials) => {
  const supabase = await createSupabaseServerClient();

  return supabase.auth.signInWithPassword(credentials);
};
