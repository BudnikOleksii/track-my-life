import type { FC, ReactNode } from 'react';

import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@track-my-life/ui/src/components/molecules/card/card';
import { cn } from '@track-my-life/ui/src/lib/utils';

import styles from './WidgetCard.module.scss';

interface WidgetCardProps {
  title: string;
  noDataLabel: string;
  isEmpty?: boolean;
  className?: string | undefined;
  children: ReactNode;
}

export const WidgetCard: FC<WidgetCardProps> = ({
  title,
  noDataLabel,
  isEmpty = false,
  className,
  children,
}) => (
  <Card className={cn(styles.card, className)}>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      {isEmpty && (
        <Typography variant="body-m" className={styles.empty}>
          {noDataLabel}
        </Typography>
      )}
      {!isEmpty && children}
    </CardContent>
  </Card>
);
