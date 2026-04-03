import type { FC } from 'react';

import { fetchProfile } from '@/actions/fetch-profile';

import { SettingsPageContent } from '../../page.content';

export const SettingsPageServer: FC = async () => {
  const profile = await fetchProfile();

  if (!profile) {
    return null;
  }

  return <SettingsPageContent profile={profile} />;
};
