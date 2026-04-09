import { z } from 'zod';

import { MIN_PASSWORD_LENGTH } from '@/constants/min-password-length';

export const passwordStepSchema = z
  .object({
    password: z.string().min(MIN_PASSWORD_LENGTH, 'passwordMinLength'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'passwordMismatch',
    path: ['confirmPassword'],
  });

export type PasswordStepValues = z.infer<typeof passwordStepSchema>;
