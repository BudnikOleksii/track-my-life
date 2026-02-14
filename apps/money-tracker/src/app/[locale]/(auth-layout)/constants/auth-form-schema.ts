import { z } from 'zod';

import { MIN_PASSWORD_LENGTH } from './min-password-length';

export const authFormSchema = z.object({
  email: z.email('emailInvalid'),
  password: z.string('passwordRequired').min(MIN_PASSWORD_LENGTH, 'passwordMinLength'),
});

export type AuthFormValues = z.infer<typeof authFormSchema>;
