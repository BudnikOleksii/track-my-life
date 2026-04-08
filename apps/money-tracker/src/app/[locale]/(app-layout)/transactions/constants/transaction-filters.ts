import type { FilterValue } from '@/constants/transaction';

export interface TransactionFilters {
  page: number;
  pageSize: number;
  type: FilterValue;
  dateFrom: string;
  dateTo: string;
  categoryId: string;
  sortBy: string;
  sortOrder: string;
}
