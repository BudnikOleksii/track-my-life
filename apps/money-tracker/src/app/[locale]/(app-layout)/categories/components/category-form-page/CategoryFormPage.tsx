'use client';

import type { CategoryResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { Link, useRouter } from '@track-my-life/shared/src/i18n/navigation/navigation';
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
  FieldError,
  FieldLabel,
} from '@track-my-life/ui/src/components/molecules/field/field';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { PATHS } from '@/constants/paths';
import { TRANSACTION_TYPE } from '@/constants/transaction';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import type { CategoryFormValues } from '../../constants/category-form-schema';

import { createCategory } from '../../actions/create-category';
import { updateCategory } from '../../actions/update-category';
import { categoryFormSchema } from '../../constants/category-form-schema';
import styles from './CategoryFormPage.module.scss';

interface CategoryFormPageProps {
  category: CategoryResponseDto | null;
  parentCategoryList: CategoryResponseDto[];
}

export const CategoryFormPage: FC<CategoryFormPageProps> = ({ category, parentCategoryList }) => {
  const translations = useTranslations(I18N_NAMESPACE.categoriesFormPage);
  const router = useRouter();
  const isEditing = Boolean(category);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: category?.name ?? '',
      type: category?.type ?? TRANSACTION_TYPE.EXPENSE,
      parentCategoryId: category?.parentCategoryId ?? '',
    },
  });

  const handleFormSubmit = useCallback(
    async (values: CategoryFormValues) => {
      const parentCategoryId = values.parentCategoryId || undefined;

      const result =
        isEditing && category
          ? await updateCategory(category.id, {
              name: values.name,
              parentCategoryId: parentCategoryId ? { id: parentCategoryId } : undefined,
            })
          : await createCategory({
              name: values.name,
              type: values.type,
              parentCategoryId,
            });

      if (result) {
        router.push(PATHS.categories);
      }
    },
    [isEditing, category, router],
  );

  const parentOptionList = parentCategoryList
    .filter((item) => item.id !== category?.id)
    .map((item) => ({ value: item.id, label: item.name }));

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
        <Field>
          <FieldLabel htmlFor="category-name">{translations('content.nameLabel')}</FieldLabel>
          <Input
            id="category-name"
            placeholder={translations('content.namePlaceholder')}
            error={Boolean(errors.name)}
            {...register('name')}
          />
          <FieldError errors={errors.name ? [errors.name] : undefined} />
        </Field>

        <Field>
          <FieldLabel>{translations('content.typeLabel')}</FieldLabel>
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
          <FieldError errors={errors.type ? [errors.type] : undefined} />
        </Field>

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
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              router.push(PATHS.categories);
            }}
          >
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
