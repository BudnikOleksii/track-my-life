import type { NextRequest } from 'next/server';

import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

import { supabaseConfig } from './config';

export const updateSession = async (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({
    request,
  });
  // With Fluid compute, don't put this client in a global environment
  // Variable. Always create a new one on each request.
  const supabase = createServerClient(supabaseConfig.url, supabaseConfig.publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });
  // Do not run code between createServerClient and
  // Supabase.auth.getClaims(). A simple mistake could make it very hard to debug
  // Issues with users being randomly logged out.
  // IMPORTANT: If you remove getClaims() and you use server-side rendering
  // With the Supabase client, your users may be randomly logged out.
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    // No user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // Creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    Const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    MyNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    The cookies!
  // 4. Finally:
  //    Return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // Of sync and terminate the user's session prematurely!
  return supabaseResponse;
};
