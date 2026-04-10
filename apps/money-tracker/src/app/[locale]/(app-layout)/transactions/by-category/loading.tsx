import { Skeleton } from '@track-my-life/ui/src/components/atoms/skeleton/skeleton';

import { PageSkeleton } from '../../components/page-skeleton/PageSkeleton';
import styles from './loading.module.scss';

const TransactionsByCategoryLoading = () => (
  <div className={styles.page}>
    <div className={styles.header}>
      <Skeleton width={200} height={28} />
    </div>
    <PageSkeleton count={5} height={56} />
  </div>
);

export default TransactionsByCategoryLoading;
