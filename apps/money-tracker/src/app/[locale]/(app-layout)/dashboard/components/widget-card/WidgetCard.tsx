'use client';

import type { FC, ReactNode } from 'react';

import { Skeleton } from '@track-my-life/ui/src/components/atoms/skeleton/skeleton';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@track-my-life/ui/src/components/molecules/card/card';
import { cn } from '@track-my-life/ui/src/lib/utils';
import { useTranslations } from 'next-intl';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import styles from './WidgetCard.module.scss';

interface WidgetCardProps {
  title: string;
  isLoading: boolean;
  isEmpty?: boolean;
  className?: string;
  children: ReactNode;
}

const SKELETON_COUNT = 3;
const skeletonList = Array.from({ length: SKELETON_COUNT }, (_unused, index) => index);

export const WidgetCard: FC<WidgetCardProps> = ({
  title,
  isLoading,
  isEmpty = false,
  className,
  children,
}) => {
  const translations = useTranslations(I18N_NAMESPACE.dashboardPage);

  return (
    <Card className={cn(styles.card, className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className={styles.skeletonContainer}>
            {skeletonList.map((index) => (
              <Skeleton key={index} width="100%" height={20} />
            ))}
          </div>
        )}
        {!isLoading && isEmpty && (
          <Typography variant="body-m" className={styles.empty}>
            {translations('content.noData')}
          </Typography>
        )}
        {!isLoading && !isEmpty && children}
      </CardContent>
    </Card>
  );
};
