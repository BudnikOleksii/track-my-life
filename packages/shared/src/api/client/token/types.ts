export interface TokenProvider {
  getAccessToken: () => string | null | Promise<string | null>;
  getRefreshToken: () => string | null | Promise<string | null>;
  setTokenPair: (accessToken: string, refreshToken: string) => void | Promise<void>;
  clearTokenPair: () => void | Promise<void>;
}
