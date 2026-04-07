'use client';

import { useRouter } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { ErrorState } from '@track-my-life/ui/src/components/molecules/error-state/ErrorState';
import { useTranslations } from 'next-intl';

import { PATHS } from '@/constants/paths';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

const NotFound = () => {
  const translations = useTranslations(I18N_NAMESPACE.all);
  const router = useRouter();

  const handleNavigateHome = () => {
    router.push(PATHS.dashboard);
  };

  return (
    <ErrorState
      title={translations('error.notFound.title')}
      description={translations('error.notFound.description')}
      navigateHomeLabel={translations('error.goHomeButton')}
      onNavigateHome={handleNavigateHome}
    />
  );
};

export default NotFound;
