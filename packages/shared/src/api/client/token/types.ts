export interface ReadOnlyTokenProvider {
  getAccessToken: () => string | null | Promise<string | null>;
}

export interface ReadWriteTokenProvider extends ReadOnlyTokenProvider {
  setAccessToken: (accessToken: string) => void | Promise<void>;
  clearAccessToken: () => void | Promise<void>;
}

export const checkIsReadWriteTokenProvider = (
  provider: ReadOnlyTokenProvider | ReadWriteTokenProvider,
): provider is ReadWriteTokenProvider =>
  'setAccessToken' in provider && 'clearAccessToken' in provider;
