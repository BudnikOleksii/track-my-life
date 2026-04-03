import type { FC, PropsWithChildren } from 'react';

import { getTranslations } from 'next-intl/server';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { Footer } from './components/Footer/Footer';
import styles from './layout.module.scss';

const HomeLayout: FC<PropsWithChildren> = async ({ children }) => {
  const translations = await getTranslations(I18N_NAMESPACE.homePage);

  return (
    <div className={styles.layout}>
      <div className={styles.content}>{children}</div>
      <Footer translations={translations} />
    </div>
  );
};

export default HomeLayout;
