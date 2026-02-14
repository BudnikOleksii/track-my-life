const getSupabaseConfig = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!publishableKey || !url) {
    throw new Error('Environment variables for supabase are not set');
  }

  return { publishableKey, url };
};

export const SUPABASE_CONFIG = getSupabaseConfig();
