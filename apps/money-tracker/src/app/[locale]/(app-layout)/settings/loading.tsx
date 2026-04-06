import { Skeleton } from '@track-my-life/ui/src/components/atoms/skeleton/skeleton';

import { PageSkeleton } from '../components/page-skeleton/PageSkeleton';
import styles from './loading.module.scss';

const SettingsLoading = () => (
  <div className={styles.container}>
    <Skeleton width={100} height={28} />
    <PageSkeleton count={4} height={56} />
  </div>
);

export default SettingsLoading;
