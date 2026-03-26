import type { FC } from 'react';

import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';

interface SettingsPageContentProps {
  translations: (key: string) => string;
}

export const SettingsPageContent: FC<SettingsPageContentProps> = ({ translations }) => (
  <div>
    <Typography variant="title-l">{translations('content.title')}</Typography>
  </div>
);
