import type { ObjectValuesUnion } from '@track-my-life/shared/src/types/object-values-union';

export const SIGN_UP_ERROR = {
  validation: 'validation',
  generic: 'generic',
} as const;

export type SignUpError = ObjectValuesUnion<typeof SIGN_UP_ERROR>;
