import type { FC } from 'react';

import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';

interface CategoriesPageContentProps {
  translations: (key: string) => string;
}

export const CategoriesPageContent: FC<CategoriesPageContentProps> = ({ translations }) => (
  <div>
    <Typography variant="title-l">{translations('content.title')}</Typography>
  </div>
);
