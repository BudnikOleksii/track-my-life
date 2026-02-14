import type { User } from '@supabase/supabase-js';

import { createServerClient } from '@supabase/ssr';
import { getLocale } from 'next-intl/server';
import { cookies } from 'next/headers';

import { redirect } from '../i18n/navigation/navigation';
import { SUPABASE_CONFIG } from './config';

const createSupabaseServerClient = async () => {
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

const signInWithEmailAndPassword = async (email: string, password: string) => {
  const supabase = await createSupabaseServerClient();

  return supabase.auth.signInWithPassword({
    email,
    password,
  });
};

const signUpWithEmailAndPassword = async (email: string, password: string) => {
  const supabase = await createSupabaseServerClient();

  return supabase.auth.signUp({
    email,
    password,
  });
};

const signOutServer = async () => {
  const supabase = await createSupabaseServerClient();

  return supabase.auth.signOut();
};

const getAuthenticatedUserOrRedirect = async (redirectPath: string) => {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    const locale = await getLocale();
    redirect({ href: redirectPath, locale });
  }

  return user as User;
};

export {
  createSupabaseServerClient,
  getAuthenticatedUserOrRedirect,
  signInWithEmailAndPassword,
  signOutServer,
  signUpWithEmailAndPassword,
};
