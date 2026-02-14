import type { NextRequest, NextResponse } from 'next/server';

import { HTTP_STATUS_CODE } from '@track-my-life/shared/src/constants/http-status-code';
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

  if (
    supabaseResponse.redirected ||
    supabaseResponse.status === HTTP_STATUS_CODE.TEMPORARY_REDIRECT ||
    supabaseResponse.status === HTTP_STATUS_CODE.FORBIDDEN
  ) {
    return supabaseResponse;
  }

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
