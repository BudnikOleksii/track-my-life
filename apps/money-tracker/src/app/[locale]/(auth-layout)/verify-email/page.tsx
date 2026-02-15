import type { Metadata } from 'next';
import type { FC } from 'react';

import { getTranslations } from 'next-intl/server';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { VerifyEmailPageContent } from './page.content';

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;

  const translations = await getTranslations({
    locale: params.locale,
    namespace: I18N_NAMESPACE.verifyEmailPage,
  });

  return {
    description: translations('metadata.description'),
    title: translations('metadata.title'),
  };
};

const VerifyEmailPage: FC<Props> = async () => {
  const tVerifyEmail = await getTranslations(I18N_NAMESPACE.verifyEmailPage);

  return <VerifyEmailPageContent tVerifyEmail={tVerifyEmail} />;
};

export default VerifyEmailPage;
