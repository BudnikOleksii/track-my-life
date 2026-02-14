import { createSupabaseServerClient } from '../server';

export const signOutServer = async () => {
  const supabase = await createSupabaseServerClient();

  return supabase.auth.signOut();
};
