import { z } from 'zod';

const MIN_PASSWORD_LENGTH = 1;

export const deleteAccountFormSchema = z.object({
  password: z.string().min(MIN_PASSWORD_LENGTH, 'passwordRequired'),
});

export type DeleteAccountFormValues = z.infer<typeof deleteAccountFormSchema>;
