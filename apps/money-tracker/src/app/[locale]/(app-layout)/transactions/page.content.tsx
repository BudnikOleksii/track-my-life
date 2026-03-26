import type { FC } from 'react';

import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';

interface TransactionsPageContentProps {
  translations: (key: string) => string;
}

export const TransactionsPageContent: FC<TransactionsPageContentProps> = ({ translations }) => (
  <div>
    <Typography variant="title-l">{translations('content.title')}</Typography>
  </div>
);
