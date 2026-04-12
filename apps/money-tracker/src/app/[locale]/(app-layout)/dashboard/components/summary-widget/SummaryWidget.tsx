import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { convertFilterDateList } from '@track-my-life/shared/src/utils/convert-filter-date-list';
import { formatAmount } from '@track-my-life/shared/src/utils/format-amount';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { getTranslations } from 'next-intl/server';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';
import { getTimezoneOffset } from '@/utils/get-timezone-offset';

import type { DashboardFilters } from '../../constants/dashboard';

import { fetchSummary } from '../../actions/fetch-summary';
import { WidgetCard } from '../widget-card/WidgetCard';
import styles from './SummaryWidget.module.scss';

interface SummaryWidgetProps {
  filters: DashboardFilters;
  className?: string | undefined;
}

export const SummaryWidget = async ({ filters, className }: SummaryWidgetProps) => {
  const [translations, offset] = await Promise.all([
    getTranslations(I18N_NAMESPACE.dashboardPage),
    getTimezoneOffset(),
  ]);

  const data = await fetchSummary({
    currencyCode: filters.currencyCode,
    ...convertFilterDateList(filters, offset),
    ...(filters.type !== 'ALL' && { type: filters.type }),
  });

  return (
    <WidgetCard
      title={translations('content.summaryTitle')}
      noDataLabel={translations('content.noData')}
      isEmpty={data === null || data.transactionCount === EMPTY_LIST_LENGTH}
      className={className}
    >
      {data && (
        <div className={styles.grid}>
          <div className={styles.statCard}>
            <Typography variant="body-s" className={styles.label}>
              {translations('content.totalIncome')}
            </Typography>
            <Typography variant="title-xs" className={styles.income}>
              {formatAmount(data.totalIncome, filters.currencyCode)}
            </Typography>
          </div>
          <div className={styles.statCard}>
            <Typography variant="body-s" className={styles.label}>
              {translations('content.totalExpenses')}
            </Typography>
            <Typography variant="title-xs" className={styles.expense}>
              {formatAmount(data.totalExpenses, filters.currencyCode)}
            </Typography>
          </div>
          <div className={styles.statCard}>
            <Typography variant="body-s" className={styles.label}>
              {translations('content.netBalance')}
            </Typography>
            <Typography variant="title-xs" className={styles.balance}>
              {formatAmount(data.netBalance, filters.currencyCode)}
            </Typography>
          </div>
          <div className={styles.statCard}>
            <Typography variant="body-s" className={styles.label}>
              {translations('content.transactionCount')}
            </Typography>
            <Typography variant="title-xs">{data.transactionCount}</Typography>
          </div>
        </div>
      )}
    </WidgetCard>
  );
};
