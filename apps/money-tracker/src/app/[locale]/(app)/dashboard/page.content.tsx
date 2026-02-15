import type { FC } from 'react';

import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@track-my-life/ui/src/components/molecules/card/card';

import { signOut } from '@/actions/sign-out';

import styles from './page.module.scss';

interface DashboardPageContentProps {
  user: {
    email?: string;
    user_metadata?: { name?: string };
  };
  translations: (key: string) => string;
}

export const DashboardPageContent: FC<DashboardPageContentProps> = ({ user, translations }) => (
  <main className={styles.main}>
    <Card className={styles.card}>
      <CardHeader>
        <CardTitle className={styles.cardTitle}>{translations('content.title')}</CardTitle>
        <CardDescription>{translations('content.welcome')}</CardDescription>
      </CardHeader>

      <CardContent className={styles.cardContent}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{translations('content.userInfo')}</h2>
          <p className={styles.paragraph}>
            <span className={styles.label}>{translations('content.email')}: </span>
            {user.email}
          </p>
          <p className={styles.paragraph}>
            <span className={styles.label}>{translations('content.name')}: </span>
            {user.user_metadata?.name ?? ''}
          </p>
        </section>

        <form action={signOut} className={styles.signOutForm}>
          <Button type="submit" variant="outline" className={styles.signOutButton}>
            {translations('content.logoutButton')}
          </Button>
        </form>
      </CardContent>
    </Card>
  </main>
);
