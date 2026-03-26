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
  translations: (key: string) => string;
}

export const DashboardPageContent: FC<DashboardPageContentProps> = ({ translations }) => (
  <main className={styles.main}>
    <Card className={styles.card}>
      <CardHeader>
        <CardTitle>{translations('content.title')}</CardTitle>
        <CardDescription>{translations('content.welcome')}</CardDescription>
      </CardHeader>

      <CardContent className={styles.cardContent}>
        <form action={signOut} className={styles.signOutForm}>
          <Button type="submit" variant="outline" className={styles.signOutButton}>
            {translations('content.logoutButton')}
          </Button>
        </form>
      </CardContent>
    </Card>
  </main>
);
