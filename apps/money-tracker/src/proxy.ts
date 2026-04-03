import type { NextRequest } from 'next/server';

import { MiddlewareTokenProvider } from '@track-my-life/shared/src/api/client/token/middleware-token-provider';
import { AuthApiService } from '@track-my-life/shared/src/api/services/auth-api.service';
import { ProfileApiService } from '@track-my-life/shared/src/api/services/profile-api.service';
import { routing } from '@track-my-life/shared/src/i18n/navigation/navigation';
import createIntlMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';

import { PATHS } from './constants/paths';

const API_BASE_URL = process.env.API_BASE_URL ?? 'http://localhost:8080';

const handleI18nRouting = createIntlMiddleware(routing);

const PUBLIC_PATH_LIST = [PATHS.signIn, PATHS.signUp, PATHS.verifyEmail, PATHS.homePage];

const ONBOARDING_COMPLETED_COOKIE = 'onboarding_completed';

const getPathWithoutLocale = (pathname: string): string => {
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '');
  return pathWithoutLocale || '/';
};

const checkIsPublicPath = (pathname: string): boolean =>
  PUBLIC_PATH_LIST.some((publicPath) => {
    const normalizedPath = getPathWithoutLocale(pathname);
    return normalizedPath === publicPath || normalizedPath.startsWith(`${publicPath}/`);
  });

const checkIsOnboardingPath = (pathname: string): boolean => {
  const normalizedPath = getPathWithoutLocale(pathname);
  return normalizedPath === PATHS.onboarding || normalizedPath.startsWith(`${PATHS.onboarding}/`);
};

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

const extractUserIdFromToken = (token: string): string | null => {
  const [, payloadPart] = token.split('.');

  if (!payloadPart) {
    return null;
  }

  try {
    const payload = JSON.parse(atob(payloadPart)) as { sub?: string };
    return payload.sub ?? null;
  } catch {
    return null;
  }
};

const getOnboardingCookieName = (accessToken: string): string => {
  const userId = extractUserIdFromToken(accessToken);
  return userId ? `${ONBOARDING_COMPLETED_COOKIE}_${userId}` : ONBOARDING_COMPLETED_COOKIE;
};

const fetchOnboardingStatus = async (accessToken: string): Promise<boolean | null> => {
  const profileApiService = new ProfileApiService({ baseUrl: API_BASE_URL });
  profileApiService.addRequestInterceptor((request) => {
    const authenticatedRequest = new Request(request, {
      headers: new Headers(request.headers),
    });
    authenticatedRequest.headers.set('Authorization', `Bearer ${accessToken}`);
    return authenticatedRequest;
  });

  const { data, error } = await profileApiService.fetchProfile();

  if (error || !data) {
    return null;
  }

  return data.onboardingCompleted;
};

const getCachedOnboardingStatus = (request: NextRequest, cookieName: string): boolean | null => {
  const cachedStatus = request.cookies.get(cookieName)?.value;

  if (cachedStatus === 'true') {
    return true;
  }
  if (cachedStatus === 'false') {
    return false;
  }
  return null;
};

const checkOnboardingStatus = async (
  request: NextRequest,
  response: NextResponse,
  accessToken: string,
): Promise<boolean> => {
  const cookieName = getOnboardingCookieName(accessToken);
  const cached = getCachedOnboardingStatus(request, cookieName);

  if (cached !== null) {
    return cached;
  }

  const onboardingCompleted = await fetchOnboardingStatus(accessToken);

  if (onboardingCompleted === null) {
    return true;
  }

  response.cookies.set(cookieName, String(onboardingCompleted), {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
  });

  return onboardingCompleted;
};

const createRedirectWithCookies = (
  path: string,
  request: NextRequest,
  response: NextResponse,
): NextResponse => {
  const url = new URL(path, request.url);
  const redirectResponse = NextResponse.redirect(url);
  response.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set(cookie.name, cookie.value);
  });
  return redirectResponse;
};

const handleOnboardingRedirect = (
  request: NextRequest,
  response: NextResponse,
  onboardingCompleted: boolean,
): NextResponse | null => {
  const isOnboardingPath = checkIsOnboardingPath(request.nextUrl.pathname);

  if (onboardingCompleted && isOnboardingPath) {
    return createRedirectWithCookies(PATHS.dashboard, request, response);
  }

  if (!onboardingCompleted && !isOnboardingPath) {
    return createRedirectWithCookies(PATHS.onboarding, request, response);
  }

  return null;
};

const validateAccessToken = async (
  request: NextRequest,
  response: NextResponse,
): Promise<{ accessToken: string } | NextResponse> => {
  const tokenProvider = new MiddlewareTokenProvider(request, response);
  const accessToken = tokenProvider.getAccessToken();

  if (!accessToken || checkIsTokenExpired(accessToken)) {
    try {
      return await attemptTokenRefresh(tokenProvider, request, response);
    } catch {
      return createSignInRedirect(request);
    }
  }

  return { accessToken };
};

const handleAuthenticatedRoute = async (
  request: NextRequest,
  response: NextResponse,
): Promise<NextResponse> => {
  const tokenResult = await validateAccessToken(request, response);

  if (tokenResult instanceof NextResponse) {
    return tokenResult;
  }

  const onboardingCompleted = await checkOnboardingStatus(
    request,
    response,
    tokenResult.accessToken,
  );

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
