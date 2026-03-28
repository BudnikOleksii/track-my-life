import type { NextRequest } from 'next/server';

import { MiddlewareTokenProvider } from '@track-my-life/shared/src/api/client/token/middleware-token-provider';
import { AuthApiService } from '@track-my-life/shared/src/api/services/auth-api.service';
import { routing } from '@track-my-life/shared/src/i18n/navigation/navigation';
import createIntlMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';

import { PATHS } from './constants/paths';

const API_BASE_URL = process.env.API_BASE_URL ?? 'http://localhost:8080';

const handleI18nRouting = createIntlMiddleware(routing);

const PUBLIC_PATH_LIST = [PATHS.signIn, PATHS.signUp, PATHS.verifyEmail];

const checkIsPublicPath = (pathname: string): boolean =>
  PUBLIC_PATH_LIST.some((publicPath) => {
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '');
    const normalizedPath = pathWithoutLocale || '/';
    return normalizedPath === publicPath || normalizedPath.startsWith(`${publicPath}/`);
  });

const createSignInRedirect = (request: NextRequest): NextResponse => {
  const signInUrl = new URL(PATHS.signIn, request.url);
  const redirectResponse = NextResponse.redirect(signInUrl);
  new MiddlewareTokenProvider(request, redirectResponse).clearTokenPair();
  return redirectResponse;
};

const createSameUrlRedirect = (request: NextRequest, response: NextResponse): NextResponse => {
  const redirectResponse = NextResponse.redirect(request.url);
  response.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set(cookie.name, cookie.value);
  });
  return redirectResponse;
};

const attemptTokenRefresh = async (
  tokenProvider: MiddlewareTokenProvider,
  request: NextRequest,
  response: NextResponse,
): Promise<NextResponse> => {
  const refreshToken = tokenProvider.getRefreshToken();

  if (!refreshToken) {
    return createSignInRedirect(request);
  }

  const authApiService = new AuthApiService({ baseUrl: API_BASE_URL });
  const refreshResult = await authApiService.refreshToken({ refreshToken });

  if (refreshResult.error || !refreshResult.data) {
    return createSignInRedirect(request);
  }

  tokenProvider.setTokenPair(refreshResult.data.accessToken, refreshResult.data.refreshToken);

  return createSameUrlRedirect(request, response);
};

const SECONDS_TO_MS = 1000;

const checkIsTokenExpired = (token: string): boolean => {
  const [, payloadPart] = token.split('.');

  if (!payloadPart) {
    return true;
  }

  try {
    const payload = JSON.parse(atob(payloadPart)) as { exp?: number };
    return typeof payload.exp === 'number' && payload.exp * SECONDS_TO_MS < Date.now();
  } catch {
    return true;
  }
};

const handleAuthenticatedRoute = async (
  request: NextRequest,
  response: NextResponse,
): Promise<NextResponse> => {
  const tokenProvider = new MiddlewareTokenProvider(request, response);
  const accessToken = tokenProvider.getAccessToken();

  if (!accessToken || checkIsTokenExpired(accessToken)) {
    try {
      return await attemptTokenRefresh(tokenProvider, request, response);
    } catch {
      return createSignInRedirect(request);
    }
  }

  return response;
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
