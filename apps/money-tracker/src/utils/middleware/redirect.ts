import type { NextRequest } from 'next/server';

import { parseCookieString } from '@track-my-life/next-shared/src/api/client/token/forward-response-cookie-list';
import { MiddlewareTokenProvider } from '@track-my-life/next-shared/src/api/client/token/middleware-token-provider';
import { fetchRefreshToken } from '@track-my-life/shared/src/api/fetch-refresh-token';
import { NextResponse } from 'next/server';

import { PATHS } from '@/constants/paths';

export const createSignInRedirect = (request: NextRequest): NextResponse => {
  const signInUrl = new URL(PATHS.signIn, request.url);
  const redirectResponse = NextResponse.redirect(signInUrl);
  new MiddlewareTokenProvider(request, redirectResponse).clearAccessToken();
  return redirectResponse;
};

export const createSameUrlRedirect = (
  request: NextRequest,
  response: NextResponse,
): NextResponse => {
  const redirectResponse = NextResponse.redirect(request.url);
  response.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set(cookie.name, cookie.value);
  });
  return redirectResponse;
};

export const createRedirectWithCookies = (
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

const forwardResponseCookieListToRedirect = (source: Response, target: NextResponse): void => {
  for (const setCookie of source.headers.getSetCookie()) {
    const parsed = parseCookieString(setCookie);

    if (parsed) {
      target.cookies.set(parsed.name, parsed.value, { ...parsed.options, path: '/' });
    }
  }
};

const buildRefreshRedirect = async (
  refreshResponse: Response,
  tokenProvider: MiddlewareTokenProvider,
  context: { request: NextRequest; response: NextResponse },
): Promise<NextResponse> => {
  const refreshData = (await refreshResponse.json()) as { accessToken: string };
  tokenProvider.setAccessToken(refreshData.accessToken);

  const redirectResponse = createSameUrlRedirect(context.request, context.response);
  forwardResponseCookieListToRedirect(refreshResponse, redirectResponse);

  return redirectResponse;
};

export const attemptTokenRefresh = async (
  tokenProvider: MiddlewareTokenProvider,
  request: NextRequest,
  response: NextResponse,
): Promise<NextResponse> => {
  const cookieHeader = tokenProvider.getRequestCookieHeader();

  if (!cookieHeader) {
    return createSignInRedirect(request);
  }

  const refreshResponse = await fetchRefreshToken(cookieHeader);

  if (!refreshResponse.ok) {
    return createSignInRedirect(request);
  }

  return buildRefreshRedirect(refreshResponse, tokenProvider, { request, response });
};

export const attemptTokenRefreshOrRedirect = async (
  tokenProvider: MiddlewareTokenProvider,
  request: NextRequest,
  response: NextResponse,
): Promise<NextResponse> => {
  try {
    return await attemptTokenRefresh(tokenProvider, request, response);
  } catch {
    return createSignInRedirect(request);
  }
};
