'use client';

import type { CategoryBreakdownResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { CHART_COLOR_LIST } from '../../constants/dashboard';

const CHART_HEIGHT = 300;
const OUTER_RADIUS = 100;
const INNER_RADIUS = 60;

interface CategoryBreakdownChartContentProps {
  data: CategoryBreakdownResponseDto;
}

export const CategoryBreakdownChartContent: FC<CategoryBreakdownChartContentProps> = ({ data }) => {
  const breakdownList = data.breakdown;

  return (
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <PieChart>
        <Pie
          data={breakdownList}
          dataKey="total"
          nameKey="categoryName"
          cx="50%"
          cy="50%"
          outerRadius={OUTER_RADIUS}
          innerRadius={INNER_RADIUS}
        >
          {breakdownList.map((item, index) => {
            const fill = CHART_COLOR_LIST[index % CHART_COLOR_LIST.length];
            return <Cell key={item.categoryId} {...(fill && { fill })} />;
          })}
        </Pie>
        <Tooltip formatter={(value, name) => [`${data.currencyCode} ${value}`, name]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
