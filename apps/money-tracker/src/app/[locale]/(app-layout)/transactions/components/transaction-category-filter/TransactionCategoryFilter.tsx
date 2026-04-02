'use client';

import type { CategoryResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';
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

const ALL_CATEGORIES_VALUE = 'ALL';

interface TransactionCategoryFilterProps {
  categoryId: string;
  categoryList: CategoryResponseDto[];
  onCategoryChange: (value: string) => void;
}

export const TransactionCategoryFilter: FC<TransactionCategoryFilterProps> = ({
  categoryId,
  categoryList,
  onCategoryChange,
}) => {
  const translations = useTranslations(I18N_NAMESPACE.transactionsPage);

  const handleValueChange = (value: string) => {
    onCategoryChange(value === ALL_CATEGORIES_VALUE ? '' : value);
  };

  return (
    <Select value={categoryId || ALL_CATEGORIES_VALUE} onValueChange={handleValueChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL_CATEGORIES_VALUE}>
          {translations('content.allCategories')}
        </SelectItem>
        {categoryList.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
