import { z } from 'zod';

const MIN_PASSWORD_LENGTH = 8;

export const changePasswordFormSchema = z.object({
  currentPassword: z.string().min(MIN_PASSWORD_LENGTH, 'currentPasswordRequired'),
  newPassword: z.string().min(MIN_PASSWORD_LENGTH, 'newPasswordMinLength'),
});

export type ChangePasswordFormValues = z.infer<typeof changePasswordFormSchema>;
