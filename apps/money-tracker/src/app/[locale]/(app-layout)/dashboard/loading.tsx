import { Skeleton } from '@track-my-life/ui/src/components/atoms/skeleton/skeleton';

import styles from './loading.module.scss';

const WIDGET_COUNT = 5;
const WIDGET_SKELETON_LINE_COUNT = 3;
const FILTER_BAR_ITEM_COUNT = 3;

const widgetSkeletonLineList = Array.from(
  { length: WIDGET_SKELETON_LINE_COUNT },
  (_unused, index) => index,
);
const widgetList = Array.from({ length: WIDGET_COUNT }, (_unused, index) => index);
const filterBarItemList = Array.from({ length: FILTER_BAR_ITEM_COUNT }, (_unused, index) => index);

const WidgetSkeleton = () => (
  <div className={styles.widgetSkeleton}>
    {widgetSkeletonLineList.map((index) => (
      <Skeleton key={index} width="100%" height={20} />
    ))}
  </div>
);

const DashboardLoading = () => (
  <div className={styles.page}>
    <div className={styles.header}>
      <Skeleton width={180} height={28} />
    </div>
    <div className={styles.filterBar}>
      {filterBarItemList.map((index) => (
        <Skeleton key={index} width={96} height={32} />
      ))}
    </div>
    <div className={styles.grid}>
      <div className={styles.summary}>
        <WidgetSkeleton />
      </div>
      {widgetList.map((index) => (
        <WidgetSkeleton key={index} />
      ))}
    </div>
  </div>
);

export default DashboardLoading;
