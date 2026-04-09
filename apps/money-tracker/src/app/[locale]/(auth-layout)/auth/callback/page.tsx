import type { Metadata } from 'next';
import type { FC } from 'react';

import { getTranslations } from 'next-intl/server';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { AuthCallbackPageContent } from './page.content';

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;

  const translations = await getTranslations({
    locale: params.locale,
    namespace: I18N_NAMESPACE.authCallbackPage,
  });

  return {
    description: translations('metadata.description'),
    title: translations('metadata.title'),
  };
};

const AuthCallbackPage: FC<Props> = async () => {
  const tAuthCallback = await getTranslations(I18N_NAMESPACE.authCallbackPage);

  return (
    <AuthCallbackPageContent
      loadingText={tAuthCallback('content.loading')}
      errorTitle={tAuthCallback('content.errorTitle')}
      errorEmailExists={tAuthCallback('content.errorEmailExists')}
      errorGeneric={tAuthCallback('content.errorGeneric')}
      backToSignIn={tAuthCallback('content.backToSignIn')}
    />
  );
};

export default AuthCallbackPage;
