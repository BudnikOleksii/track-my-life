import { Skeleton } from '@track-my-life/ui/src/components/atoms/skeleton/skeleton';

import { PageSkeleton } from '../components/page-skeleton/PageSkeleton';
import styles from './loading.module.scss';

const CategoriesLoading = () => (
  <div className={styles.page}>
    <div className={styles.header}>
      <Skeleton width={140} height={28} />
      <Skeleton width={96} height={32} />
    </div>
    <PageSkeleton count={5} height={48} />
  </div>
);

export default CategoriesLoading;
