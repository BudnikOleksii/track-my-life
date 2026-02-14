import type { NextRequest, NextResponse } from 'next/server';

import { routing } from '@track-my-life/shared/src/i18n/navigation/navigation';
import { updateSession } from '@track-my-life/shared/src/supabase/proxy';
import createIntlMiddleware from 'next-intl/middleware';

const handleI18nRouting = createIntlMiddleware(routing);

export const proxy = async (request: NextRequest): Promise<NextResponse> => {
  const { pathname } = request.nextUrl;

  // Skip i18n middleware for auth callbacks
  if (pathname.startsWith('/auth/')) {
    return await updateSession(request);
  }

  // Handle Supabase session
  const supabaseResponse = await updateSession(request);

  // Handle i18n routing
  const intlResponse = handleI18nRouting(request);

  // Merge cookies from Supabase response
  supabaseResponse.cookies.getAll().forEach((cookie) => {
    const { name, value, ...options } = cookie;
    intlResponse.cookies.set(name, value, options);
  });

  return intlResponse;
};

export const config = {
  matcher: [`/((?!api|_next|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.svg$|.*\\.ico$).*)`],
};
