export interface ReadOnlyTokenProvider {
  getAccessToken: () => string | null | Promise<string | null>;
  getRefreshToken: () => string | null | Promise<string | null>;
}

export interface ReadWriteTokenProvider extends ReadOnlyTokenProvider {
  setTokenPair: (accessToken: string, refreshToken: string) => void | Promise<void>;
  clearTokenPair: () => void | Promise<void>;
}

export const checkIsReadWriteTokenProvider = (
  provider: ReadOnlyTokenProvider | ReadWriteTokenProvider,
): provider is ReadWriteTokenProvider => 'setTokenPair' in provider && 'clearTokenPair' in provider;
