'use client';

import type { CategoryResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { Link } from '@track-my-life/shared/src/i18n/navigation/navigation';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Input } from '@track-my-life/ui/src/components/atoms/input/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@track-my-life/ui/src/components/atoms/select/select';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { Combobox } from '@track-my-life/ui/src/components/molecules/combobox/combobox';
import {
  Field,
  FieldLabel,
  FormField,
} from '@track-my-life/ui/src/components/molecules/field/field';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';

import { PATHS } from '@/constants/paths';
import { TRANSACTION_TYPE } from '@/constants/transaction';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import styles from './CategoryFormPage.module.scss';
import { useCategoryFormPage } from './hooks/use-category-form-page';

interface CategoryFormPageProps {
  category: CategoryResponseDto | null;
  parentCategoryList: CategoryResponseDto[];
}

export const CategoryFormPage: FC<CategoryFormPageProps> = ({ category, parentCategoryList }) => {
  const translations = useTranslations(I18N_NAMESPACE.categoriesFormPage);

  const {
    isEditing,
    register,
    handleSubmit,
    control,
    errors,
    isSubmitting,
    parentOptionList,
    handleFormSubmit,
    handleCancel,
  } = useCategoryFormPage({ category, parentCategoryList });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link
          href={PATHS.categories}
          className={styles.backLink}
          aria-label={translations('content.backToList')}
        >
          <ArrowLeft size={20} />
        </Link>
        <Typography variant="title-l">
          {isEditing
            ? translations('content.editPageTitle')
            : translations('content.createPageTitle')}
        </Typography>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
        <FormField
          label={translations('content.nameLabel')}
          htmlFor="category-name"
          error={errors.name}
        >
          <Input
            id="category-name"
            placeholder={translations('content.namePlaceholder')}
            error={Boolean(errors.name)}
            {...register('name')}
          />
        </FormField>

        <FormField label={translations('content.typeLabel')} error={errors.type}>
          <Controller
            name="type"
            control={control}
            render={({ field }) => {
              const handleTypeChange = field.onChange;
              return (
                <Select value={field.value} onValueChange={handleTypeChange} disabled={isEditing}>
                  <SelectTrigger error={Boolean(errors.type)}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={TRANSACTION_TYPE.EXPENSE}>
                      {translations('content.expenseType')}
                    </SelectItem>
                    <SelectItem value={TRANSACTION_TYPE.INCOME}>
                      {translations('content.incomeType')}
                    </SelectItem>
                  </SelectContent>
                </Select>
              );
            }}
          />
        </FormField>

        {parentOptionList.length > EMPTY_LIST_LENGTH && (
          <Field>
            <FieldLabel>{translations('content.parentCategoryLabel')}</FieldLabel>
            <Controller
              name="parentCategoryId"
              control={control}
              render={({ field }) => {
                const handleParentChange = field.onChange;
                return (
                  <Combobox
                    optionList={parentOptionList}
                    value={field.value ?? ''}
                    onValueChange={handleParentChange}
                    placeholder={translations('content.parentCategoryPlaceholder')}
                  />
                );
              }}
            />
          </Field>
        )}

        <div className={styles.actions}>
          <Button variant="outline" type="button" onClick={handleCancel}>
            {translations('content.cancel')}
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isEditing ? translations('content.save') : translations('content.createButton')}
          </Button>
        </div>
      </form>
    </div>
  );
};
