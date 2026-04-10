import { COUNTRY_CODE_LIST } from '@track-my-life/shared/src/constants/country';
import { CURRENCY_CODE_LIST } from '@track-my-life/shared/src/constants/currency';
import { z } from 'zod';

export const profileFormSchema = z.object({
  firstName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
  countryCode: z.enum(COUNTRY_CODE_LIST).optional(),
  baseCurrencyCode: z.enum(CURRENCY_CODE_LIST).optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
