import { Skeleton } from '@track-my-life/ui/src/components/atoms/skeleton/skeleton';

import { PageSkeleton } from '../../components/page-skeleton/PageSkeleton';
import styles from './loading.module.scss';

const RecurringTransactionsLoading = () => (
  <div className={styles.page}>
    <div className={styles.header}>
      <Skeleton width={200} height={28} />
      <Skeleton width={80} height={32} />
    </div>
    <PageSkeleton count={8} height={56} />
  </div>
);

export default RecurringTransactionsLoading;
