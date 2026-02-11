import type { NextRequest, NextResponse } from 'next/server';

import { routing } from '@track-my-life/shared/src/i18n/navigation';
import createIntlMiddleware from 'next-intl/middleware';

export const proxy = (request: NextRequest): NextResponse => {
	const handleI18nRouting = createIntlMiddleware(routing);
	const response = handleI18nRouting(request);

	return response;
};

export const config = {
	matcher: [`/((?!api|_next|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.svg$|.*\\.ico$).*)`],
};
