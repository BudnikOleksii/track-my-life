import type { JWTPayload, JWTVerifyOptions } from 'jose';

import { jwtVerify } from 'jose';

export type { JWTPayload } from 'jose';

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

const verifyTokenWithoutSecret = (_token: string): null => {
  console.warn('[middleware] JWT_SECRET is not set — rejecting authentication');
  return null;
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
