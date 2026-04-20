import type { FC } from 'react';

import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { getLocale } from 'next-intl/server';

import type { RecurringTransactionFilterStatus } from '../../constants/recurring-transaction-list';

import { fetchRecurringTransactionList } from '../../actions/fetch-recurring-transaction-list';
import { RecurringTransactionsPageContent } from '../../page.content';
import { RecurringTransactionList } from '../recurring-transaction-list/RecurringTransactionList';

interface RecurringTransactionListServerProps {
  page: number;
  pageSize: number;
  status: RecurringTransactionFilterStatus;
}

export const RecurringTransactionListServer: FC<RecurringTransactionListServerProps> = async ({
  page,
  pageSize,
  status,
}) => {
  const params = {
    page,
    pageSize,
    ...(status !== 'ALL' && { status }),
  };

  const [result, locale] = await Promise.all([fetchRecurringTransactionList(params), getLocale()]);
  const recurringTransactionList = result?.data ?? [];
  const visibleIdList = recurringTransactionList.map((item) => item.id);

  return (
    <RecurringTransactionsPageContent
      total={result?.total ?? EMPTY_LIST_LENGTH}
      filters={{ page, pageSize, status }}
      visibleIdList={visibleIdList}
    >
      <RecurringTransactionList
        recurringTransactionList={recurringTransactionList}
        locale={locale}
      />
    </RecurringTransactionsPageContent>
  );
};
