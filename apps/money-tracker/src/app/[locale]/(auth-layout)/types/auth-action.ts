import type { FieldErrorList } from '@track-my-life/shared/src/types/field-error';

import type { AuthFormValues } from '@/app/[locale]/(auth-layout)/constants/auth-form-schema';

export type AuthAction = ({
  email,
  password,
}: AuthFormValues) => Promise<{ errors: FieldErrorList } | null>;
