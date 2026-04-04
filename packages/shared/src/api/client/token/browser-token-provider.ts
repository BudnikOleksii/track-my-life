import type { ReadWriteTokenProvider } from './types';

import { ACCESS_TOKEN_COOKIE } from '../../../constants/cookie';
const CAPTURE_GROUP_INDEX = 1;

const getCookieValue = (name: string): string | null => {
  const match = globalThis.document?.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[CAPTURE_GROUP_INDEX] ?? '') || null : null;
};

export class BrowserTokenProvider implements ReadWriteTokenProvider {
  private accessToken: string | null = null;

  getAccessToken(): string | null {
    if (!this.accessToken) {
      this.accessToken = getCookieValue(ACCESS_TOKEN_COOKIE);
    }
    return this.accessToken;
  }

  setAccessToken(accessToken: string): void {
    this.accessToken = accessToken;
  }

  clearAccessToken(): void {
    this.accessToken = null;
  }
}
