import type { TranslateFn } from '@track-my-life/shared/src/types/translate-fn';
import type { FC } from 'react';

import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@track-my-life/ui/src/components/molecules/card/card';

import styles from './AdvantagesSection.module.scss';

interface AdvantagesSectionProps {
  translations: TranslateFn;
}

const ADVANTAGE_KEY_LIST = ['tracking', 'budgets', 'insights', 'recurring'] as const;

export const AdvantagesSection: FC<AdvantagesSectionProps> = ({ translations }) => (
  <section className={styles.section} id="advantages">
    <div className={styles.container}>
      <Typography className={styles.title} fontWeight="bold" tag="h2" variant="title-l">
        {translations('content.advantages.title')}
      </Typography>
      <div className={styles.grid}>
        {ADVANTAGE_KEY_LIST.map((key) => (
          <Card key={key} className={styles.card}>
            <CardHeader>
              <span className={styles.icon}>
                {translations(`content.advantages.items.${key}.icon`)}
              </span>
              <CardTitle>{translations(`content.advantages.items.${key}.title`)}</CardTitle>
            </CardHeader>
            <CardContent>
              <Typography className={styles.description} variant="body-m">
                {translations(`content.advantages.items.${key}.description`)}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);
