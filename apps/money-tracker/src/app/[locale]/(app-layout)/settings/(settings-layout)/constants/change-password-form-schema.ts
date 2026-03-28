import { z } from 'zod';

const MIN_PASSWORD_LENGTH = 8;

export const changePasswordFormSchema = z.object({
  currentPassword: z.string().min(MIN_PASSWORD_LENGTH, 'Password must be at least 8 characters'),
  newPassword: z.string().min(MIN_PASSWORD_LENGTH, 'Password must be at least 8 characters'),
});

export type ChangePasswordFormValues = z.infer<typeof changePasswordFormSchema>;
