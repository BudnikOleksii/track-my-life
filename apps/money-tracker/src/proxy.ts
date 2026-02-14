import type { NextRequest, NextResponse } from 'next/server';

import { routing } from '@track-my-life/shared/src/i18n/navigation/navigation';
import { updateSession } from '@track-my-life/shared/src/supabase/proxy';
import createIntlMiddleware from 'next-intl/middleware';

const handleI18nRouting = createIntlMiddleware(routing);

const AUTH_CALLBACK_ROUTES_PATH = '/auth/';

export const proxy = async (request: NextRequest): Promise<NextResponse> => {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith(AUTH_CALLBACK_ROUTES_PATH)) {
    return await updateSession(request);
  }

  const supabaseResponse = await updateSession(request);
  const intlResponse = handleI18nRouting(request);

  supabaseResponse.cookies.getAll().forEach((cookie) => {
    const { name, value, ...options } = cookie;
    intlResponse.cookies.set(name, value, options);
  });

  return intlResponse;
};

export const config = {
  matcher: [`/((?!api|_next|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.svg$|.*\\.ico$).*)`],
};
