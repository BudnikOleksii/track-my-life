'use client';

import type { FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Input } from '@track-my-life/ui/src/components/atoms/input/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@track-my-life/ui/src/components/atoms/select/select';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@track-my-life/ui/src/components/molecules/alert-dialog/alert-dialog';
import { Combobox } from '@track-my-life/ui/src/components/molecules/combobox/combobox';
import {
  Field,
  FieldError,
  FieldLabel,
} from '@track-my-life/ui/src/components/molecules/field/field';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import type { CategoryItemDto } from '../../actions/fetch-category-list';
import type { CategoryFormValues } from '../../constants/category-form-schema';

import { createCategory } from '../../actions/create-category';
import { fetchCategoryList } from '../../actions/fetch-category-list';
import { updateCategory } from '../../actions/update-category';
import { categoryFormSchema, TRANSACTION_TYPE } from '../../constants/category-form-schema';
import styles from './CategoryForm.module.scss';

const EMPTY_LIST_LENGTH = 0;

interface CategoryFormProps {
  isOpen: boolean;
  category: CategoryItemDto | null;
  parentCategoryList: CategoryItemDto[];
  onClose: () => void;
  onSuccess: (category: CategoryItemDto) => void;
}

export const CategoryForm: FC<CategoryFormProps> = ({
  isOpen,
  category,
  parentCategoryList,
  onClose,
  onSuccess,
}) => {
  const translations = useTranslations(I18N_NAMESPACE.categoriesPage);
  const isEditing = Boolean(category);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: '',
      type: TRANSACTION_TYPE.EXPENSE,
      parentCategoryId: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        name: category?.name ?? '',
        type: category?.type ?? TRANSACTION_TYPE.EXPENSE,
        parentCategoryId: category?.parentCategoryId ?? '',
      });
    }
  }, [isOpen, category, reset]);

  const handleFormSubmit = useCallback(
    async (values: CategoryFormValues) => {
      const parentCategoryId = values.parentCategoryId || undefined;

      if (isEditing && category) {
        const result = await updateCategory(category.id, {
          name: values.name,
          parentCategoryId: parentCategoryId ? { id: parentCategoryId } : null,
        });
        if (result) {
          onSuccess({
            ...category,
            name: values.name,
            parentCategoryId: parentCategoryId ?? null,
          });
        }
      } else {
        const result = await createCategory({
          name: values.name,
          type: values.type,
          parentCategoryId,
        });
        if (result) {
          fetchCategoryList().then((categoryItemList) => {
            const created = categoryItemList.find((item) => item.name === values.name);
            if (created) {
              onSuccess(created);
            }
          });
        }
      }
    },
    [isEditing, category, onSuccess],
  );

  const parentOptionList = parentCategoryList
    .filter((item) => item.id !== category?.id)
    .map((item) => ({ value: item.id, label: item.name }));

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isEditing ? translations('content.editButton') : translations('content.createButton')}
          </AlertDialogTitle>
        </AlertDialogHeader>

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

          <AlertDialogFooter>
            <AlertDialogCancel>
              <Button variant="outline" type="button">
                {translations('content.cancel')}
              </Button>
            </AlertDialogCancel>
            <Button type="submit" disabled={isSubmitting}>
              {isEditing
                ? translations('content.editButton')
                : translations('content.createButton')}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
