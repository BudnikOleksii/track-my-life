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
  return NextResponse.redirect(signInUrl);
};

const attemptTokenRefresh = async (
  tokenProvider: MiddlewareTokenProvider,
  request: NextRequest,
): Promise<NextResponse | null> => {
  const refreshToken = tokenProvider.getRefreshToken();

  if (!refreshToken) {
    return createSignInRedirect(request);
  }

  const authApiService = new AuthApiService({ baseUrl: API_BASE_URL });
  const refreshResult = await authApiService.refreshToken({ refreshToken });

  if (refreshResult.error || !refreshResult.data) {
    tokenProvider.clearTokenPair();
    return createSignInRedirect(request);
  }

  tokenProvider.setTokenPair(refreshResult.data.accessToken, refreshResult.data.refreshToken);

  return null;
};

export const proxy = async (request: NextRequest): Promise<NextResponse> => {
  const { pathname } = request.nextUrl;

  if (checkIsPublicPath(pathname)) {
    return handleI18nRouting(request);
  }

  const i18nResponse = handleI18nRouting(request);
  const response = NextResponse.next({ request, headers: i18nResponse.headers });
  const tokenProvider = new MiddlewareTokenProvider(request, response);
  const accessToken = tokenProvider.getAccessToken();

  if (!accessToken) {
    return (await attemptTokenRefresh(tokenProvider, request)) ?? response;
  }

  return response;
};

export const config = {
  matcher: [`/((?!api|_next|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.svg$|.*\\.ico$).*)`],
};
