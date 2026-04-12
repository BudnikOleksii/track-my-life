'use client';

import type { FC } from 'react';

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const CHART_HEIGHT = 300;
const SPENDING_COLOR = '#6366f1';

interface DailySpendingChartData {
  name: string;
  total: number;
}

interface DailySpendingChartContentProps {
  chartData: DailySpendingChartData[];
}

export const DailySpendingChartContent: FC<DailySpendingChartContentProps> = ({ chartData }) => (
  <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
    <BarChart data={chartData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="total" fill={SPENDING_COLOR} />
    </BarChart>
  </ResponsiveContainer>
);
