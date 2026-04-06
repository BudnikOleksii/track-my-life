import type { JWTPayload, JWTVerifyOptions } from 'jose';

import { jwtVerify } from 'jose';

import { SECONDS_TO_MS } from '../constants/time';

export type { JWTPayload } from 'jose';

const checkIsTokenExpiredOnly = (token: string): boolean => {
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

const extractUserIdFromPayload = (token: string): string | null => {
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

interface VerifyTokenConfig extends Pick<JWTVerifyOptions, 'audience' | 'issuer'> {
  secret: string | undefined;
}

export const verifyToken = async (
  token: string,
  config: VerifyTokenConfig,
): Promise<JWTPayload | null> => {
  if (!config.secret) {
    console.warn('[middleware] JWT_SECRET is not set — falling back to expiration-only validation');
    return checkIsTokenExpiredOnly(token)
      ? null
      : { sub: extractUserIdFromPayload(token) ?? undefined };
  }

  const { secret, ...options } = config;

  try {
    const encodedSecret = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify(token, encodedSecret, options);
    return payload;
  } catch {
    return null;
  }
};

export const extractUserIdFromToken = (
  token: string,
  verifiedPayload?: JWTPayload | null,
): string | null => {
  if (verifiedPayload?.sub) {
    return verifiedPayload.sub;
  }

  return extractUserIdFromPayload(token);
};
