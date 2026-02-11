import type { ObjectValuesUnion } from '@track-my-life/shared/src/types/object-values-union';

export const LOGIN_ERROR = {
  validation: 'validation',
  credentials: 'credentials',
} as const;

export type LoginError = ObjectValuesUnion<typeof LOGIN_ERROR>;
