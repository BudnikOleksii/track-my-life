import type { Metadata } from 'next';
import type { FC } from 'react';

import { getTranslations } from 'next-intl/server';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { SignUpPageContent } from './page.content';

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;

  const translations = await getTranslations({
    locale: params.locale,
    namespace: I18N_NAMESPACE.signUpPage,
  });

  return {
    description: translations('metadata.description'),
    title: translations('metadata.title'),
  };
};

const SignUpPage: FC<Props> = async (props) => {
  await props.params;
  const tSignUp = await getTranslations(I18N_NAMESPACE.signUpPage);
  const tAuthShared = await getTranslations(I18N_NAMESPACE.authShared);

  return <SignUpPageContent tSignUp={tSignUp} tAuthShared={tAuthShared} />;
};

export default SignUpPage;
