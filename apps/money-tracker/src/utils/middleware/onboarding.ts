import type { JWTPayload } from '@track-my-life/shared/src/utils/jwt';
import type { NextRequest, NextResponse } from 'next/server';

import { API_BASE_URL } from '@track-my-life/shared/src/api/api-config';
import { OnboardingApiService } from '@track-my-life/shared/src/api/services/onboarding-api.service';
import { extractUserIdFromToken } from '@track-my-life/shared/src/utils/jwt';

import { COOKIE } from '@/constants/cookie';
import { PATHS } from '@/constants/paths';

import { checkIsOnboardingPath, checkIsVerifyEmailPath } from './path';
import { createRedirectWithCookies } from './redirect';

interface OnboardingStatus {
  emailVerified: boolean;
  onboardingCompleted: boolean;
}

const getOnboardingCookieName = (
  accessToken: string,
  verifiedPayload?: JWTPayload | null,
): string | null => {
  const userId = extractUserIdFromToken(accessToken, verifiedPayload);
  return userId ? `${COOKIE.ONBOARDING_STATUS}_${userId}` : null;
};

const fetchOnboardingStatusFromApi = async (
  accessToken: string,
): Promise<OnboardingStatus | null> => {
  const onboardingApiService = new OnboardingApiService({ baseUrl: API_BASE_URL });
  onboardingApiService.addRequestInterceptor((request) => {
    const authenticatedRequest = new Request(request, {
      headers: new Headers(request.headers),
    });
    authenticatedRequest.headers.set('Authorization', `Bearer ${accessToken}`);
    return authenticatedRequest;
  });

  const { data, error } = await onboardingApiService.fetchStatus();

  if (error || !data) {
    return null;
  }

  return {
    emailVerified: data.emailVerified,
    onboardingCompleted: data.onboardingCompleted,
  };
};

const getCachedOnboardingStatus = (
  request: NextRequest,
  cookieName: string,
): OnboardingStatus | null => {
  const cachedValue = request.cookies.get(cookieName)?.value;

  if (!cachedValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(cachedValue) as OnboardingStatus;
    if (
      typeof parsed.emailVerified === 'boolean' &&
      typeof parsed.onboardingCompleted === 'boolean'
    ) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
};

const fetchAndCacheOnboardingStatus = async (
  accessToken: string,
  cookieName: string,
  response: NextResponse,
): Promise<OnboardingStatus> => {
  const status = await fetchOnboardingStatusFromApi(accessToken);

  if (!status) {
    return { emailVerified: true, onboardingCompleted: true };
  }

  response.cookies.set(cookieName, JSON.stringify(status), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
  });

  return status;
};

export const checkOnboardingStatus = async (
  request: NextRequest,
  response: NextResponse,
  tokenResult: { accessToken: string; payload: JWTPayload | null },
): Promise<OnboardingStatus> => {
  const cookieName = getOnboardingCookieName(tokenResult.accessToken, tokenResult.payload);

  if (!cookieName) {
    const status = await fetchOnboardingStatusFromApi(tokenResult.accessToken);
    return status ?? { emailVerified: true, onboardingCompleted: true };
  }

  const cached = getCachedOnboardingStatus(request, cookieName);

  if (cached) {
    return cached;
  }

  return fetchAndCacheOnboardingStatus(tokenResult.accessToken, cookieName, response);
};

const handleVerifiedUserRedirect = (
  request: NextRequest,
  response: NextResponse,
  status: OnboardingStatus,
): NextResponse | null => {
  const isOnboardingPath = checkIsOnboardingPath(request.nextUrl.pathname);

  if (status.onboardingCompleted && isOnboardingPath) {
    return createRedirectWithCookies(PATHS.dashboard, request, response);
  }

  if (!status.onboardingCompleted && !isOnboardingPath) {
    return createRedirectWithCookies(PATHS.onboarding, request, response);
  }

  return null;
};

export const handleOnboardingRedirect = (
  request: NextRequest,
  response: NextResponse,
  status: OnboardingStatus,
): NextResponse | null => {
  const isVerifyEmailPath = checkIsVerifyEmailPath(request.nextUrl.pathname);

  if (!status.emailVerified) {
    return isVerifyEmailPath
      ? null
      : createRedirectWithCookies(PATHS.verifyEmail, request, response);
  }

  if (isVerifyEmailPath) {
    const destination = status.onboardingCompleted ? PATHS.dashboard : PATHS.onboarding;
    return createRedirectWithCookies(destination, request, response);
  }

  return handleVerifiedUserRedirect(request, response, status);
};
