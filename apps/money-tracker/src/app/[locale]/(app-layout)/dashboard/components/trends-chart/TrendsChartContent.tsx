'use client';

import type { FC } from 'react';

import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const CHART_HEIGHT = 300;
const INCOME_COLOR = '#22c55e';
const EXPENSE_COLOR = '#ef4444';

interface TrendsChartData {
  name: string;
  income: number;
  expenses: number;
}

interface TrendsChartContentProps {
  chartData: TrendsChartData[];
  totalIncomeName: string;
  totalExpensesName: string;
}

export const TrendsChartContent: FC<TrendsChartContentProps> = ({
  chartData,
  totalIncomeName,
  totalExpensesName,
}) => (
  <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
    <BarChart data={chartData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="income" name={totalIncomeName} fill={INCOME_COLOR} />
      <Bar dataKey="expenses" name={totalExpensesName} fill={EXPENSE_COLOR} />
    </BarChart>
  </ResponsiveContainer>
);
