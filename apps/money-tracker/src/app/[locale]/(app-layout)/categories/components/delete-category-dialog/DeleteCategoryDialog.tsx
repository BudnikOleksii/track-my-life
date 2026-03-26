'use client';

import type { FC } from 'react';

import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@track-my-life/ui/src/components/molecules/alert-dialog/alert-dialog';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import type { CategoryItemDto } from '../../actions/fetch-category-list';

import { deleteCategory } from '../../actions/delete-category';

interface DeleteCategoryDialogProps {
  category: CategoryItemDto | null;
  onClose: () => void;
  onSuccess: (categoryId: string) => void;
}

export const DeleteCategoryDialog: FC<DeleteCategoryDialogProps> = ({
  category,
  onClose,
  onSuccess,
}) => {
  const translations = useTranslations(I18N_NAMESPACE.categoriesPage);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = useCallback(async () => {
    if (!category) {
      return;
    }

    setIsDeleting(true);
    const result = await deleteCategory(category.id);
    setIsDeleting(false);

    if (result?.success) {
      onSuccess(category.id);
    }
  }, [category, onSuccess]);

  return (
    <AlertDialog open={Boolean(category)} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>{translations('content.deleteButton')}</AlertDialogTitle>
          <AlertDialogDescription>{translations('content.deleteConfirm')}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Button variant="outline" type="button">
              {translations('content.cancel')}
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction>
            <Button variant="destructive" onClick={handleConfirm} disabled={isDeleting}>
              {translations('content.deleteButton')}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
