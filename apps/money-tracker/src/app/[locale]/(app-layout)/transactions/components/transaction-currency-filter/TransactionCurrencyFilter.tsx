'use client';

import type { FC } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@track-my-life/ui/src/components/atoms/select/select';
import { useTranslations } from 'next-intl';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

const ALL_CURRENCIES_VALUE = 'ALL';

const CURRENCY_CODE_LIST = ['USD', 'EUR', 'GBP', 'UAH'] as const;

interface TransactionCurrencyFilterProps {
  currencyCode: string;
  onCurrencyChange: (value: string) => void;
}

export const TransactionCurrencyFilter: FC<TransactionCurrencyFilterProps> = ({
  currencyCode,
  onCurrencyChange,
}) => {
  const translations = useTranslations(I18N_NAMESPACE.transactionsPage);

  const handleValueChange = (value: string) => {
    onCurrencyChange(value === ALL_CURRENCIES_VALUE ? '' : value);
  };

  return (
    <Select value={currencyCode || ALL_CURRENCIES_VALUE} onValueChange={handleValueChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL_CURRENCIES_VALUE}>
          {translations('content.allCurrencies')}
        </SelectItem>
        {CURRENCY_CODE_LIST.map((code) => (
          <SelectItem key={code} value={code}>
            {code}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
