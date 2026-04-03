'use client';

import type { CategoryResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { Link } from '@track-my-life/shared/src/i18n/navigation/navigation';
import { Badge } from '@track-my-life/ui/src/components/atoms/badge/badge';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { ChevronRight, FolderOpen } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { getTransactionsByCategoryPath } from '@/constants/paths';
import { TRANSACTION_TYPE_BADGE_VARIANT_MAP } from '@/constants/transaction';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import styles from './page.module.scss';

interface TransactionsByCategoryPageContentProps {
  categoryList: CategoryResponseDto[];
}

export const TransactionsByCategoryPageContent: FC<TransactionsByCategoryPageContentProps> = ({
  categoryList,
}) => {
  const translations = useTranslations(I18N_NAMESPACE.transactionsByCategoryPage);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Typography variant="title-l">{translations('content.title')}</Typography>
      </div>

      {categoryList.length === EMPTY_LIST_LENGTH ? (
        <div className={styles.empty}>
          <FolderOpen size={48} className={styles.emptyIcon} />
          <Typography variant="body-m" className={styles.emptyText}>
            {translations('content.noCategories')}
          </Typography>
        </div>
      ) : (
        <div className={styles.list}>
          {categoryList.map((category) => (
            <Link
              key={category.id}
              href={getTransactionsByCategoryPath(category.id)}
              className={styles.categoryItem}
            >
              <div className={styles.categoryInfo}>
                <Typography variant="body-m" fontWeight="medium">
                  {category.name}
                </Typography>
                <Badge variant={TRANSACTION_TYPE_BADGE_VARIANT_MAP[category.type]}>
                  {translations(
                    `content.${category.type === 'INCOME' ? 'incomeType' : 'expenseType'}`,
                  )}
                </Badge>
              </div>
              <ChevronRight size={18} className={styles.chevron} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
