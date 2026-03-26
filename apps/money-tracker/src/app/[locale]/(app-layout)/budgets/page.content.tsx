import type { FC } from 'react';

import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';

interface BudgetsPageContentProps {
  translations: (key: string) => string;
}

export const BudgetsPageContent: FC<BudgetsPageContentProps> = ({ translations }) => (
  <div>
    <Typography variant="title-l">{translations('content.title')}</Typography>
  </div>
);
