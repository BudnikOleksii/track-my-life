import { z } from 'zod';

import { MIN_PASSWORD_LENGTH } from '@/constants/min-password-length';

export const changePasswordFormSchema = z.object({
  currentPassword: z.string().min(MIN_PASSWORD_LENGTH, 'passwordMinLength'),
  newPassword: z.string().min(MIN_PASSWORD_LENGTH, 'passwordMinLength'),
});

export type ChangePasswordFormValues = z.infer<typeof changePasswordFormSchema>;
