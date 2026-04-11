import type { NextResponse } from 'next/server';

import { API_BASE_URL } from '@track-my-life/shared/src/api/api-config';
import { IS_DEV } from '@track-my-life/shared/src/constants/environment';
import { randomBytes } from 'node:crypto';

const NONCE_BYTE_LENGTH = 16;

export const generateNonce = (): string => randomBytes(NONCE_BYTE_LENGTH).toString('base64');

const buildCspHeader = (nonce: string): string =>
  `default-src 'self'; script-src 'self' 'nonce-${nonce}'${IS_DEV ? " 'unsafe-eval'" : ''}; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' ${API_BASE_URL}; frame-ancestors 'none'`;

export const applySecurityHeaders = (response: NextResponse, nonce: string): NextResponse => {
  response.headers.set('Content-Security-Policy', buildCspHeader(nonce));
  return response;
};
