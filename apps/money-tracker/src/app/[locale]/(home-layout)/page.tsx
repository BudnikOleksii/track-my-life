import type { Metadata } from 'next';
import type { FC } from 'react';

import { getTranslations } from 'next-intl/server';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { HomePageContent } from './page.content';

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;

  const translations = await getTranslations({
    locale: params.locale,
    namespace: I18N_NAMESPACE.homePage,
  });

  return {
    description: translations('metadata.description'),
    title: translations('metadata.title'),
  };
};

const HomePage: FC<Props> = async () => {
  const translations = await getTranslations(I18N_NAMESPACE.homePage);

  return <HomePageContent translations={translations} />;
};

export default HomePage;
