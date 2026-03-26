import type { FC, PropsWithChildren } from 'react';

import { AppHeader } from './components/app-header/AppHeader';
import { AppSidebar } from './components/app-sidebar/AppSidebar';
import { SidebarProvider } from './components/sidebar-provider/SidebarProvider';
import styles from './layout.module.scss';

const AppLayout: FC<PropsWithChildren> = ({ children }) => (
  <SidebarProvider>
    <div className={styles.layout}>
      <AppSidebar />
      <div className={styles.content}>
        <AppHeader />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  </SidebarProvider>
);

export default AppLayout;
