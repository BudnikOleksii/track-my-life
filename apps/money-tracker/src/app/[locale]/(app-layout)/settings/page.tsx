import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { PageSkeleton } from '../components/page-skeleton/PageSkeleton';
import { SettingsPageServer } from './components/settings-page-server/SettingsPageServer';

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;

  const translations = await getTranslations({
    locale: params.locale,
    namespace: I18N_NAMESPACE.settingsPage,
  });

  return {
    description: translations('metadata.description'),
    title: translations('metadata.title'),
  };
};

const settingsSkeletonFallback = <PageSkeleton count={4} height={56} />;

const SettingsPage = async () => (
  <Suspense fallback={settingsSkeletonFallback}>
    <SettingsPageServer />
  </Suspense>
);

export default SettingsPage;
