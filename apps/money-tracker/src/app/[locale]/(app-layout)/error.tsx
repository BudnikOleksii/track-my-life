'use client';

import type { ErrorInfo } from 'next/error';
import type { FC } from 'react';

import { useRouter } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { ErrorState } from '@track-my-life/ui/src/components/molecules/error-state/ErrorState';
import { useTranslations } from 'next-intl';

import { PATHS } from '@/constants/paths';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

const AppLayoutError: FC<ErrorInfo> = ({ unstable_retry }) => {
  const translations = useTranslations(I18N_NAMESPACE.all);
  const router = useRouter();

  const handleNavigateHome = () => {
    router.push(PATHS.dashboard);
  };

  return (
    <ErrorState
      title={translations('error.title')}
      description={translations('error.description')}
      retryLabel={translations('error.retryButton')}
      navigateHomeLabel={translations('error.goHomeButton')}
      onRetry={unstable_retry}
      onNavigateHome={handleNavigateHome}
    />
  );
};

export default AppLayoutError;
