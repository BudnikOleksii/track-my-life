import { z } from 'zod';

import { MIN_PASSWORD_LENGTH } from '@/constants/min-password-length';

export const deleteAccountFormSchema = z.object({
  password: z.string().min(MIN_PASSWORD_LENGTH, 'passwordMinLength'),
});

export type DeleteAccountFormValues = z.infer<typeof deleteAccountFormSchema>;
