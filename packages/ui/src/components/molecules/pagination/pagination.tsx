'use client';

import type { FC } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '../../atoms/button/button';
import { Typography } from '../../atoms/typography/Typography';
import styles from './pagination.module.scss';

const FIRST_PAGE = 1;
const SINGLE_PAGE = 1;
const PAGE_STEP = 1;

export interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  previousLabel?: string;
  nextLabel?: string;
  renderInfo?: (page: number, totalPages: number) => string;
  className?: string;
}

export const Pagination: FC<PaginationProps> = ({
  page,
  pageSize,
  total,
  onPageChange,
  previousLabel = 'Previous page',
  nextLabel = 'Next page',
  renderInfo,
  className,
}) => {
  const totalPageCount = Math.ceil(total / pageSize);
  const hasPrevious = page > FIRST_PAGE;
  const hasNext = page < totalPageCount;

  if (totalPageCount <= SINGLE_PAGE) {
    return null;
  }

  return (
    <div className={className ?? styles.pagination}>
      <Button
        variant="outline"
        size="sm"
        disabled={!hasPrevious}
        onClick={() => {
          onPageChange(page - PAGE_STEP);
        }}
        aria-label={previousLabel}
      >
        <ChevronLeft size={16} />
      </Button>

      <Typography variant="body-s" className={styles.info}>
        {renderInfo ? renderInfo(page, totalPageCount) : `${page} / ${totalPageCount}`}
      </Typography>

      <Button
        variant="outline"
        size="sm"
        disabled={!hasNext}
        onClick={() => {
          onPageChange(page + PAGE_STEP);
        }}
        aria-label={nextLabel}
      >
        <ChevronRight size={16} />
      </Button>
    </div>
  );
};
