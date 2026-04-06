import { AlertTriangle } from 'lucide-react';

import { cn } from '../../../lib/utils';
import { Button } from '../../atoms/button/button';
import { Typography } from '../../atoms/typography/Typography';
import styles from './ErrorState.module.scss';

interface ErrorStateProps {
  title: string;
  description: string;
  onRetry?: () => void;
  onNavigateHome?: () => void;
  retryLabel?: string;
  navigateHomeLabel?: string;
  className?: string;
}

export const ErrorState = ({
  title,
  description,
  onRetry,
  onNavigateHome,
  retryLabel = 'Try again',
  navigateHomeLabel = 'Go to homepage',
  className,
}: ErrorStateProps) => {
  const hasActions = onRetry !== undefined || onNavigateHome !== undefined;

  return (
    <div className={cn(styles.container, className)}>
      <AlertTriangle className={styles.icon} aria-hidden="true" />
      <div className={styles.content}>
        <Typography variant="title-m" className={styles.title}>
          {title}
        </Typography>
        <Typography variant="body-m" className={styles.description}>
          {description}
        </Typography>
      </div>
      {hasActions && (
        <div className={styles.actions}>
          {onRetry !== undefined && (
            <Button variant="primary" size="md" onClick={onRetry}>
              {retryLabel}
            </Button>
          )}
          {onNavigateHome !== undefined && (
            <Button variant="outline" size="md" onClick={onNavigateHome}>
              {navigateHomeLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
