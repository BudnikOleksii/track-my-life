import { Skeleton } from '@track-my-life/ui/src/components/atoms/skeleton/skeleton';

import styles from './loading.module.scss';

const BudgetsLoading = () => (
  <div className={styles.page}>
    <Skeleton width={120} height={28} />
    <Skeleton width="100%" height={56} />
    <Skeleton width="100%" height={56} />
    <Skeleton width="100%" height={56} />
  </div>
);

export default BudgetsLoading;
