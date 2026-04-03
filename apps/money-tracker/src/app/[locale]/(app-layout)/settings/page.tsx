import type { Metadata } from 'next';

import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { PageSkeleton } from '../components/page-skeleton/PageSkeleton';
import { SettingsPageServer } from './components/settings-page-server/SettingsPageServer';
import styles from './page.module.scss';

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

const SettingsPage = async (props: Props) => {
  const params = await props.params;

  const translations = await getTranslations({
    locale: params.locale,
    namespace: I18N_NAMESPACE.settingsPage,
  });

  return (
    <div className={styles.container}>
      <Typography variant="title-l">{translations('content.title')}</Typography>
      <Suspense fallback={settingsSkeletonFallback}>
        <SettingsPageServer />
      </Suspense>
    </div>
  );
};

export default SettingsPage;
