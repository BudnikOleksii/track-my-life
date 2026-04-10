import type { CategoryResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { toast } from '@track-my-life/ui/src/components/molecules/toaster/toast';
import { useActionState, useCallback, useMemo, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import type { ActionState } from '@/constants/action-state';

import { INITIAL_ACTION_STATE } from '@/constants/action-state';
import { PATHS } from '@/constants/paths';
import { TRANSACTION_TYPE } from '@/constants/transaction';

import type { CategoryFormValues } from '../../../constants/category-form-schema';

import { createCategory } from '../../../actions/create-category';
import { updateCategory } from '../../../actions/update-category';
import { categoryFormSchema } from '../../../constants/category-form-schema';

interface UseCategoryFormPageParams {
  category: CategoryResponseDto | null;
  parentCategoryList: CategoryResponseDto[];
  translations: (key: string) => string;
}

export const useCategoryFormPage = ({
  category,
  parentCategoryList,
  translations,
}: UseCategoryFormPageParams) => {
  const router = useRouter();
  const isEditing = Boolean(category);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: category?.name ?? '',
      type: category?.type ?? TRANSACTION_TYPE.EXPENSE,
      parentCategoryId: category?.parentCategoryId ?? '',
    },
  });

  const [isPending, startTransition] = useTransition();
  const [, submitAction] = useActionState(
    async (_prev: ActionState, values: CategoryFormValues): Promise<ActionState> => {
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

      if (result.ok) {
        router.push(PATHS.categories);
        return { success: true, error: null };
      }
      const errorKey = isEditing ? 'content.updateError' : 'content.createError';
      toast.error(translations(errorKey));
      return { success: false, error: errorKey };
    },
    INITIAL_ACTION_STATE,
  );

  const handleFormSubmit = useCallback(
    (values: CategoryFormValues) => {
      startTransition(() => {
        submitAction(values);
      });
    },
    [submitAction],
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
    isPending,
    parentOptionList,
    handleFormSubmit,
    handleCancel,
  };
};
