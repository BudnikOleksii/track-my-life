'use client';

import type { CategoryResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';
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

import { deleteCategory } from '../../actions/delete-category';

interface DeleteCategoryDialogProps {
  category: CategoryResponseDto | null;
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
    try {
      const result = await deleteCategory(category.id);
      if (result.ok) {
        onSuccess(category.id);
      }
    } finally {
      setIsDeleting(false);
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
          <AlertDialogAction
            onClick={async (event) => {
              event.preventDefault();
              await handleConfirm();
            }}
          >
            <Button variant="destructive" disabled={isDeleting}>
              {translations('content.deleteButton')}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
