import type { NextRequest, NextResponse } from 'next/server';

import { routing } from '@track-my-life/shared/src/i18n/navigation/navigation';
import createIntlMiddleware from 'next-intl/middleware';

const handleI18nRouting = createIntlMiddleware(routing);

// TODO: re-add authentication session checks when API integration is ready
export const proxy = async (request: NextRequest): Promise<NextResponse> =>
  handleI18nRouting(request);

export const config = {
  matcher: [`/((?!api|_next|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.svg$|.*\\.ico$).*)`],
};
