import type { NextRequest, NextResponse } from 'next/server';

import { updateSession } from '@track-my-life/shared/src/supabase/proxy';
import createIntlMiddleware from 'next-intl/middleware';

import { routing } from '../../../packages/shared/src/i18n/navigation/navigation';

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
    intlResponse.cookies.set(cookie.name, cookie.value);
  });

  return intlResponse;
};

export const config = {
  matcher: [`/((?!api|_next|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.svg$|.*\\.ico$).*)`],
};
