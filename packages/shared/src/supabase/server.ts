import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

import { SUPABASE_CONFIG } from './config';

export const createSupabaseServerClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookieList) {
        cookieList.forEach((cookieItem) => {
          cookieStore.set(cookieItem.name, cookieItem.value, cookieItem.options);
        });
      },
    },
  });
};
