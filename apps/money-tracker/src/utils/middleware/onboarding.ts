import type { JWTPayload } from '@track-my-life/shared/src/utils/jwt';
import type { NextRequest, NextResponse } from 'next/server';

import { API_BASE_URL } from '@track-my-life/shared/src/api/api-config';
import { ProfileApiService } from '@track-my-life/shared/src/api/services/profile-api.service';
import { extractUserIdFromToken } from '@track-my-life/shared/src/utils/jwt';

import { COOKIE } from '@/constants/cookie';
import { PATHS } from '@/constants/paths';

import { checkIsOnboardingPath } from './path';
import { createRedirectWithCookies } from './redirect';

const getOnboardingCookieName = (
  accessToken: string,
  verifiedPayload?: JWTPayload | null,
): string | null => {
  const userId = extractUserIdFromToken(accessToken, verifiedPayload);
  return userId ? `${COOKIE.ONBOARDING_COMPLETED}_${userId}` : null;
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

const fetchAndCacheOnboardingStatus = async (
  accessToken: string,
  cookieName: string,
  response: NextResponse,
): Promise<boolean> => {
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

export const checkOnboardingStatus = async (
  request: NextRequest,
  response: NextResponse,
  tokenResult: { accessToken: string; payload: JWTPayload | null },
): Promise<boolean> => {
  const cookieName = getOnboardingCookieName(tokenResult.accessToken, tokenResult.payload);

  if (!cookieName) {
    const onboardingCompleted = await fetchOnboardingStatus(tokenResult.accessToken);
    return onboardingCompleted ?? true;
  }

  const cached = getCachedOnboardingStatus(request, cookieName);

  if (cached !== null) {
    return cached;
  }

  return fetchAndCacheOnboardingStatus(tokenResult.accessToken, cookieName, response);
};

export const handleOnboardingRedirect = (
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
