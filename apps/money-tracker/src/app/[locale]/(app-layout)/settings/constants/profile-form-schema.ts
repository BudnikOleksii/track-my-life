import { z } from 'zod';

export const profileFormSchema = z.object({
  firstName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
  countryCode: z.string().optional(),
  baseCurrencyCode: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
