import type { FC } from 'react';

import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@track-my-life/ui/src/components/molecules/card/card';

import styles from './page.module.scss';

interface HomePageContentProps {
  translations: (key: string) => string;
}

export const HomePageContent: FC<HomePageContentProps> = ({ translations }) => (
  <main className={styles.main}>
    <Card className={styles.card}>
      <CardHeader>
        <CardTitle className={styles.cardTitle}>{translations('content.title')}</CardTitle>
        <CardDescription>{translations('content.description')}</CardDescription>
      </CardHeader>
      <CardContent className={styles.cardContent}>
        <Button>{translations('content.getStarted')}</Button>
        <Button variant="outline">{translations('content.learnMore')}</Button>
      </CardContent>
    </Card>
  </main>
);
