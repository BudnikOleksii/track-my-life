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
    const base64 = payloadPart.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64)) as { exp?: number };
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
    const base64 = payloadPart.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64)) as { sub?: string };
    return payload.sub ?? null;
  } catch {
    return null;
  }
};

interface VerifyTokenConfig extends Pick<JWTVerifyOptions, 'audience' | 'issuer'> {
  secret: string | undefined;
}

const verifyTokenWithoutSecret = (token: string): JWTPayload | null => {
  console.warn('[middleware] JWT_SECRET is not set — falling back to expiration-only validation');
  if (checkIsTokenExpiredOnly(token)) {
    return null;
  }

  const sub = extractUserIdFromPayload(token);
  return sub !== null ? { sub } : {};
};

export const verifyToken = async (
  token: string,
  config: VerifyTokenConfig,
): Promise<JWTPayload | null> => {
  if (!config.secret) {
    return verifyTokenWithoutSecret(token);
  }

  const { secret, ...options } = config;

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret), options);
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
