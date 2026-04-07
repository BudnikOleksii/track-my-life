import type { JWTPayload } from '@track-my-life/shared/src/utils/jwt';
import type { NextRequest } from 'next/server';

import { MiddlewareTokenProvider } from '@track-my-life/next-shared/src/api/client/token/middleware-token-provider';
import { routing } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { verifyToken } from '@track-my-life/shared/src/utils/jwt';
import createIntlMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';

import { checkOnboardingStatus, handleOnboardingRedirect } from '@/utils/middleware/onboarding';
import { checkIsPublicPath } from '@/utils/middleware/path';
import { attemptTokenRefreshOrRedirect } from '@/utils/middleware/redirect';

const { JWT_SECRET, JWT_ISSUER, JWT_AUDIENCE } = process.env;

const handleI18nRouting = createIntlMiddleware(routing);

const validateAccessToken = async (
  request: NextRequest,
  response: NextResponse,
): Promise<{ accessToken: string; payload: JWTPayload | null } | NextResponse> => {
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

  return { accessToken, payload };
};

const handleAuthenticatedRoute = async (
  request: NextRequest,
  response: NextResponse,
): Promise<NextResponse> => {
  const tokenResult = await validateAccessToken(request, response);

  if (tokenResult instanceof NextResponse) {
    return tokenResult;
  }

  const onboardingCompleted = await checkOnboardingStatus(request, response, tokenResult);

  return handleOnboardingRedirect(request, response, onboardingCompleted) ?? response;
};

export const proxy = async (request: NextRequest): Promise<NextResponse> => {
  if (checkIsPublicPath(request.nextUrl.pathname)) {
    return handleI18nRouting(request);
  }

  const i18nResponse = handleI18nRouting(request);

  if (!i18nResponse.ok) {
    return i18nResponse;
  }

  return handleAuthenticatedRoute(request, i18nResponse);
};

export const config = {
  matcher: [`/((?!api|_next|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.svg$|.*\\.ico$).*)`],
};
