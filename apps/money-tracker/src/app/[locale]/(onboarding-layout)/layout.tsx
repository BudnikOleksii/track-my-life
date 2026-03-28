import type { FC, PropsWithChildren } from 'react';

import styles from './layout.module.scss';

const OnboardingLayout: FC<PropsWithChildren> = ({ children }) => (
  <main className={styles.main}>{children}</main>
);

export default OnboardingLayout;
