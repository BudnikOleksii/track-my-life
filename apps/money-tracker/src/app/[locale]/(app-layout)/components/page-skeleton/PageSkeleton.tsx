import type { FC } from 'react';

import { Skeleton } from '@track-my-life/ui/src/components/atoms/skeleton/skeleton';

import styles from './PageSkeleton.module.scss';

interface PageSkeletonProps {
  count: number;
  height: number;
}

export const PageSkeleton: FC<PageSkeletonProps> = ({ count, height }) => {
  const skeletonList = Array.from({ length: count }, (_unused, index) => index);

  return (
    <div className={styles.column}>
      {skeletonList.map((index) => (
        <Skeleton key={index} width="100%" height={height} />
      ))}
    </div>
  );
};
