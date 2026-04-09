import { CURRENCY_CODE_LIST } from '@track-my-life/shared/src/constants/currency';
import { z } from 'zod';

export const currencyStepSchema = z.object({
  baseCurrencyCode: z.enum(CURRENCY_CODE_LIST, { message: 'currencyRequired' }),
});

export type CurrencyStepValues = z.infer<typeof currencyStepSchema>;
