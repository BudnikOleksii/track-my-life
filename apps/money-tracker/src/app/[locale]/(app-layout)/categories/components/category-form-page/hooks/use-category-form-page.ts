import type { CategoryResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@track-my-life/shared/src/i18n/navigation/navigation';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { PATHS } from '@/constants/paths';
import { TRANSACTION_TYPE } from '@/constants/transaction';

import type { CategoryFormValues } from '../../../constants/category-form-schema';

import { createCategory } from '../../../actions/create-category';
import { updateCategory } from '../../../actions/update-category';
import { categoryFormSchema } from '../../../constants/category-form-schema';

interface UseCategoryFormPageParams {
  category: CategoryResponseDto | null;
  parentCategoryList: CategoryResponseDto[];
}

export const useCategoryFormPage = ({
  category,
  parentCategoryList,
}: UseCategoryFormPageParams) => {
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
      const parentCategoryId = values.parentCategoryId || null;

      const result =
        isEditing && category
          ? await updateCategory(category.id, {
              name: values.name,
              parentCategoryId,
            })
          : await createCategory({
              name: values.name,
              type: values.type,
              ...(parentCategoryId && { parentCategoryId }),
            });

      if (result) {
        router.push(PATHS.categories);
      }
    },
    [isEditing, category, router],
  );

  const parentOptionList = useMemo(
    () =>
      parentCategoryList
        .filter((item) => item.id !== category?.id)
        .map((item) => ({ value: item.id, label: item.name })),
    [parentCategoryList, category?.id],
  );

  const handleCancel = useCallback(() => {
    router.push(PATHS.categories);
  }, [router]);

  return {
    isEditing,
    register,
    handleSubmit,
    control,
    errors,
    isSubmitting,
    parentOptionList,
    handleFormSubmit,
    handleCancel,
  };
};
