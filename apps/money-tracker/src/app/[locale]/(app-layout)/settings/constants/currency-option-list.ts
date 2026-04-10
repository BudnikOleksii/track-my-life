import type { ComboboxOption } from '@track-my-life/ui/src/components/molecules/combobox/combobox';

import { CURRENCY_CODE_LIST } from '@track-my-life/shared/src/constants/currency';

export const CURRENCY_OPTION_LIST: ComboboxOption[] = CURRENCY_CODE_LIST.map((code) => ({
  value: code,
  label: code,
}));
