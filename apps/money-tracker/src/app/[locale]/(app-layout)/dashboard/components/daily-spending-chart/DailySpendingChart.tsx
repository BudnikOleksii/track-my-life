'use client';

import type { DailySpendingResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { useTranslations } from 'next-intl';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { WidgetCard } from '../widget-card/WidgetCard';
import styles from './DailySpendingChart.module.scss';

interface DailySpendingChartProps {
  data: DailySpendingResponseDto | null;
}

const CHART_HEIGHT = 300;
const SPENDING_COLOR = '#6366f1';

const formatDayLabel = (dateString: string): string => {
  const date = new Date(dateString);
  return String(date.getDate());
};

export const DailySpendingChart: FC<DailySpendingChartProps> = ({ data }) => {
  const translations = useTranslations(I18N_NAMESPACE.dashboardPage);

  const dayList = data?.days ?? [];
  const chartData = dayList.map((day) => ({
    name: formatDayLabel(day.date),
    total: Number(day.total),
  }));

  return (
    <WidgetCard
      title={translations('content.dailySpendingTitle')}
      isLoading={false}
      isEmpty={dayList.length === EMPTY_LIST_LENGTH}
    >
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill={SPENDING_COLOR} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
};
