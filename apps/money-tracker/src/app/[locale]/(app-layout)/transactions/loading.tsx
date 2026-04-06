import { Skeleton } from '@track-my-life/ui/src/components/atoms/skeleton/skeleton';

import { PageSkeleton } from '../components/page-skeleton/PageSkeleton';
import styles from './loading.module.scss';

const ACTION_BUTTON_COUNT = 3;
const actionButtonList = Array.from({ length: ACTION_BUTTON_COUNT }, (_unused, index) => index);

const TransactionsLoading = () => (
  <div className={styles.page}>
    <div className={styles.header}>
      <Skeleton width={160} height={28} />
      <div className={styles.actionList}>
        {actionButtonList.map((index) => (
          <Skeleton key={index} width={80} height={32} />
        ))}
      </div>
    </div>
    <PageSkeleton count={8} height={56} />
  </div>
);

export default TransactionsLoading;
