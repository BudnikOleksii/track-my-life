'use client';

import type { CategoryResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
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
import { useCallback } from 'react';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { useDeleteCategory } from './use-delete-category';

const PARENT_COUNT = 1;

interface DeleteCategoryDialogProps {
  category: CategoryResponseDto | null;
  subcategoryList: CategoryResponseDto[];
  onClose: () => void;
  onSuccess: (categoryId: string) => void;
}

export const DeleteCategoryDialog: FC<DeleteCategoryDialogProps> = ({
  category,
  subcategoryList,
  onClose,
  onSuccess,
}) => {
  const translations = useTranslations(I18N_NAMESPACE.categoriesPage);
  const { isSubmitting, errorKey, hasSubcategories, handleConfirm, resetError } = useDeleteCategory(
    { category, subcategoryList, onSuccess, translations },
  );

  const handleClose = useCallback(() => {
    resetError();
    onClose();
  }, [onClose, resetError]);

  const confirmLabel = hasSubcategories
    ? translations('content.cascadeDeleteConfirm', {
        count: subcategoryList.length + PARENT_COUNT,
      })
    : translations('content.deleteButton');

  const titleLabel = hasSubcategories
    ? translations('content.cascadeDeleteTitle')
    : translations('content.deleteButton');

  const descriptionLabel = hasSubcategories
    ? translations('content.cascadeDeleteBody', { count: subcategoryList.length })
    : translations('content.deleteConfirm');

  return (
    <AlertDialog
      open={Boolean(category)}
      onOpenChange={(open) => {
        if (!open) {
          handleClose();
        }
      }}
    >
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>{titleLabel}</AlertDialogTitle>
          <AlertDialogDescription>{descriptionLabel}</AlertDialogDescription>
        </AlertDialogHeader>
        {hasSubcategories && (
          <ul>
            {subcategoryList.map((child) => (
              <li key={child.id}>
                <Typography variant="body-s">{child.name}</Typography>
              </li>
            ))}
          </ul>
        )}
        {errorKey && (
          <Typography variant="body-s" data-error>
            {translations(errorKey)}
          </Typography>
        )}
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
            <Button variant="destructive" disabled={isSubmitting}>
              {confirmLabel}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
