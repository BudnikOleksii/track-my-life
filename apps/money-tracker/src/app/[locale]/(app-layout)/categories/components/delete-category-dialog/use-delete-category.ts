'use client';

import type { TranslateFn } from '@track-my-life/next-shared/src/types/translate-fn';
import type { CategoryResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { toast } from '@track-my-life/ui/src/components/molecules/toaster/toast';
import { useCallback, useState } from 'react';

import type { BulkDeleteResult } from '../../actions/types';

import { bulkDeleteCategory } from '../../actions/bulk-delete-category';
import { deleteCategory } from '../../actions/delete-category';

const ACTIVE_TRANSACTIONS_MARKER = 'active transactions';
const PARENT_COUNT = 1;

const checkReasonHasActiveTransactions = (reason: string): boolean =>
  reason.toLowerCase().includes(ACTIVE_TRANSACTIONS_MARKER);

const checkAnyFailureHasActiveTransactions = (failureList: BulkDeleteResult['failureList']) =>
  failureList.some((failure) => checkReasonHasActiveTransactions(failure.reason));

interface UseCascadeDeleteParams {
  category: CategoryResponseDto | null;
  subcategoryList: CategoryResponseDto[];
  onSuccess: (categoryId: string) => void;
  translations: TranslateFn;
  setErrorKey: (key: string | null) => void;
}

const useCascadeDelete = ({
  category,
  subcategoryList,
  onSuccess,
  translations,
  setErrorKey,
}: UseCascadeDeleteParams) => {
  const handleUnexpected = useCallback(() => {
    toast.error(translations('content.cascadeUnexpectedFailure'));
    setErrorKey('content.cascadeUnexpectedFailure');
  }, [setErrorKey, translations]);

  const handleChildFailure = useCallback(
    (failureList: BulkDeleteResult['failureList']) => {
      const messageKey = checkAnyFailureHasActiveTransactions(failureList)
        ? 'content.cascadeChildHasTransactions'
        : 'content.cascadeUnexpectedFailure';
      toast.error(translations(messageKey));
      setErrorKey(messageKey);
    },
    [setErrorKey, translations],
  );

  const handleParentFailure = useCallback(
    (failureList: BulkDeleteResult['failureList'], childCount: number) => {
      const messageKey = checkAnyFailureHasActiveTransactions(failureList)
        ? 'content.cascadeParentStillReferenced'
        : 'content.cascadeUnexpectedFailure';
      toast.warning(
        translations('content.cascadePartialChildrenDeleted', {
          deleted: childCount,
          total: childCount + PARENT_COUNT,
        }),
      );
      toast.error(translations(messageKey));
      setErrorKey(messageKey);
    },
    [setErrorKey, translations],
  );

  const runChildrenRequest = useCallback(
    async (childIdList: string[]): Promise<boolean> => {
      const result = await bulkDeleteCategory(childIdList);
      if (!result.ok) {
        handleUnexpected();
        return false;
      }
      if (result.data.failureList.length > EMPTY_LIST_LENGTH) {
        handleChildFailure(result.data.failureList);
        return false;
      }
      return true;
    },
    [handleChildFailure, handleUnexpected],
  );

  const runParentRequest = useCallback(
    async (parentId: string, childCount: number): Promise<boolean> => {
      const result = await bulkDeleteCategory([parentId]);
      if (!result.ok) {
        handleUnexpected();
        return false;
      }
      if (result.data.failureList.length > EMPTY_LIST_LENGTH) {
        handleParentFailure(result.data.failureList, childCount);
        return false;
      }
      return true;
    },
    [handleParentFailure, handleUnexpected],
  );

  return useCallback(async () => {
    if (!category) {
      return;
    }
    const childIdList = subcategoryList.map((item) => item.id);
    if (!(await runChildrenRequest(childIdList))) {
      return;
    }
    if (!(await runParentRequest(category.id, childIdList.length))) {
      return;
    }
    toast.success(
      translations('content.cascadeSuccessToast', {
        count: childIdList.length + PARENT_COUNT,
      }),
    );
    onSuccess(category.id);
  }, [category, onSuccess, runChildrenRequest, runParentRequest, subcategoryList, translations]);
};

interface UseDeleteCategoryParams {
  category: CategoryResponseDto | null;
  subcategoryList: CategoryResponseDto[];
  onSuccess: (categoryId: string) => void;
  translations: TranslateFn;
}

export const useDeleteCategory = ({
  category,
  subcategoryList,
  onSuccess,
  translations,
}: UseDeleteCategoryParams) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  const hasSubcategories = subcategoryList.length > EMPTY_LIST_LENGTH;

  const handleCascadeDelete = useCascadeDelete({
    category,
    subcategoryList,
    onSuccess,
    translations,
    setErrorKey,
  });

  const handleLeafDelete = useCallback(async () => {
    if (!category) {
      return;
    }
    const result = await deleteCategory(category.id);
    if (result.ok) {
      toast.success(translations('content.deleteSuccess'));
      onSuccess(category.id);
      return;
    }
    toast.error(translations('content.deleteError'));
    setErrorKey('content.deleteError');
  }, [category, onSuccess, translations]);

  const handleConfirm = useCallback(async () => {
    setIsSubmitting(true);
    setErrorKey(null);
    try {
      if (hasSubcategories) {
        await handleCascadeDelete();
        return;
      }
      await handleLeafDelete();
    } finally {
      setIsSubmitting(false);
    }
  }, [handleCascadeDelete, handleLeafDelete, hasSubcategories]);

  const resetError = useCallback(() => {
    setErrorKey(null);
  }, []);

  return { isSubmitting, errorKey, hasSubcategories, handleConfirm, resetError };
};
