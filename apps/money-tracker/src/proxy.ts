import type { NextRequest } from 'next/server';

import { MiddlewareTokenProvider } from '@track-my-life/next-shared/src/api/client/token/middleware-token-provider';
import { routing } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { verifyToken } from '@track-my-life/shared/src/utils/jwt';
import createIntlMiddleware from 'next-intl/middleware';
import type { NextResponse } from 'next/server';

import { applySecurityHeaders, generateNonce } from '@/utils/middleware/csp';
import { checkIsPublicPath } from '@/utils/middleware/path';
import { attemptTokenRefreshOrRedirect } from '@/utils/middleware/redirect';

const { JWT_SECRET, JWT_ISSUER, JWT_AUDIENCE } = process.env;

const handleI18nRouting = createIntlMiddleware(routing);

const handleAuthenticatedRoute = async (
  request: NextRequest,
  response: NextResponse,
): Promise<NextResponse> => {
  const tokenProvider = new MiddlewareTokenProvider(request, response);
  const accessToken = tokenProvider.getAccessToken();

  if (!accessToken) {
    return attemptTokenRefreshOrRedirect(tokenProvider, request, response);
  }

  const payload = await verifyToken(accessToken, {
    secret: JWT_SECRET,
    ...(JWT_ISSUER !== undefined && { issuer: JWT_ISSUER }),
    ...(JWT_AUDIENCE !== undefined && { audience: JWT_AUDIENCE }),
  });

  if (!payload) {
    return attemptTokenRefreshOrRedirect(tokenProvider, request, response);
  }

  return response;
};

export const proxy = async (request: NextRequest): Promise<NextResponse> => {
  const nonce = generateNonce();
  request.headers.set('x-nonce', nonce);

  if (checkIsPublicPath(request.nextUrl.pathname)) {
    return applySecurityHeaders(handleI18nRouting(request), nonce);
  }

  const i18nResponse = handleI18nRouting(request);

  if (!i18nResponse.ok) {
    return applySecurityHeaders(i18nResponse, nonce);
  }

  return applySecurityHeaders(await handleAuthenticatedRoute(request, i18nResponse), nonce);
};

export const config = {
  matcher: [`/((?!api|_next|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.svg$|.*\\.ico$).*)`],
};
