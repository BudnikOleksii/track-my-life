import type { FC } from 'react';

import { fetchTransactionsByCategory } from '../../../actions/fetch-transactions-by-category';
import { CategoryDetailContent } from '../../page.content';

interface TransactionsByCategoryServerProps {
  categoryId: string;
}

export const TransactionsByCategoryServer: FC<TransactionsByCategoryServerProps> = async ({
  categoryId,
}) => {
  const result = await fetchTransactionsByCategory(categoryId);

  return <CategoryDetailContent groupList={result?.groups ?? []} />;
};
