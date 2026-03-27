'use client';

import type { FC } from 'react';

import { Badge } from '@track-my-life/ui/src/components/atoms/badge/badge';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@track-my-life/ui/src/components/molecules/accordion/accordion';
import { FolderOpen, Pencil, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import type { CategoryResponseDto } from '../../actions/fetch-category-list';

import styles from './CategoryTree.module.scss';

interface CategoryTreeProps {
  categoryList: CategoryResponseDto[];
  onEdit: (category: CategoryResponseDto) => void;
  onDelete: (category: CategoryResponseDto) => void;
}

const EMPTY_LIST_LENGTH = 0;

const buildCategoryHierarchy = (categoryList: CategoryResponseDto[]) => {
  const parentList = categoryList.filter((item) => !item.parentCategoryId);
  const children = new Map<string, CategoryResponseDto[]>();

  for (const category of categoryList) {
    if (category.parentCategoryId) {
      const existing = children.get(category.parentCategoryId) ?? [];
      existing.push(category);
      children.set(category.parentCategoryId, existing);
    }
  }

  return { parentCategoryList: parentList, childrenMap: children };
};

export const CategoryTree: FC<CategoryTreeProps> = ({ categoryList, onEdit, onDelete }) => {
  const translations = useTranslations(I18N_NAMESPACE.categoriesPage);

  const { parentCategoryList, childrenMap } = useMemo(
    () => buildCategoryHierarchy(categoryList),
    [categoryList],
  );

  if (parentCategoryList.length === EMPTY_LIST_LENGTH) {
    return (
      <div className={styles.empty}>
        <FolderOpen size={40} className={styles.emptyIcon} />
        <Typography variant="body-m" className={styles.emptyText}>
          {translations('content.noCategories')}
        </Typography>
      </div>
    );
  }

  return (
    <Accordion type="multiple" className={styles.tree}>
      {parentCategoryList.map((parent) => {
        const childList = childrenMap.get(parent.id) ?? [];

        return (
          <AccordionItem key={parent.id} value={parent.id}>
            <div className={styles.itemRow}>
              <AccordionTrigger className={styles.trigger}>
                <span className={styles.categoryName}>
                  {parent.name}
                  <Badge variant={parent.type === 'INCOME' ? 'success' : 'warning'}>
                    {translations(
                      parent.type === 'INCOME' ? 'content.incomeType' : 'content.expenseType',
                    )}
                  </Badge>
                </span>
              </AccordionTrigger>
              <div className={styles.actions}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    onEdit(parent);
                  }}
                  aria-label={translations('content.editButton')}
                >
                  <Pencil size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    onDelete(parent);
                  }}
                  aria-label={translations('content.deleteButton')}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
            <AccordionContent>
              {childList.length === EMPTY_LIST_LENGTH ? (
                <Typography variant="body-s" className={styles.noChildren}>
                  {translations('content.noSubcategories')}
                </Typography>
              ) : (
                <div className={styles.childList}>
                  {childList.map((child) => (
                    <div key={child.id} className={styles.childRow}>
                      <Typography variant="body-m">{child.name}</Typography>
                      <div className={styles.actions}>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            onEdit(child);
                          }}
                          aria-label={translations('content.editButton')}
                        >
                          <Pencil size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            onDelete(child);
                          }}
                          aria-label={translations('content.deleteButton')}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
