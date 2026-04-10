import type { ComboboxOption } from '@track-my-life/ui/src/components/molecules/combobox/combobox';

import { COUNTRY_CODE_LIST } from '@track-my-life/shared/src/constants/country';

export const COUNTRY_OPTION_LIST: ComboboxOption[] = COUNTRY_CODE_LIST.map((code) => ({
  value: code,
  label: code,
}));
