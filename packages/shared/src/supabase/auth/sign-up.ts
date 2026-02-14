import type { SignUpWithPasswordCredentials } from '@supabase/supabase-js';

import { createSupabaseServerClient } from '../server';

export const signUpWithEmailAndPassword = async (credentials: SignUpWithPasswordCredentials) => {
  const supabase = await createSupabaseServerClient();

  return supabase.auth.signUp(credentials);
};
