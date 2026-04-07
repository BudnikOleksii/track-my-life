import type { TranslateFn } from '@track-my-life/next-shared/src/types/translate-fn';
import type { FC } from 'react';

import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import {
  Card,
  CardContent,
  CardHeader,
} from '@track-my-life/ui/src/components/molecules/card/card';

import styles from './ReviewsSection.module.scss';

interface ReviewsSectionProps {
  translations: TranslateFn;
}

const REVIEW_KEY_LIST = ['review1', 'review2', 'review3'] as const;

export const ReviewsSection: FC<ReviewsSectionProps> = ({ translations }) => (
  <section className={styles.section}>
    <div className={styles.container}>
      <Typography className={styles.title} fontWeight="bold" tag="h2" variant="title-l">
        {translations('content.reviews.title')}
      </Typography>
      <div className={styles.grid}>
        {REVIEW_KEY_LIST.map((key) => (
          <Card key={key} className={styles.card}>
            <CardContent>
              <Typography className={styles.quote} variant="body-m">
                &ldquo;{translations(`content.reviews.items.${key}.quote`)}&rdquo;
              </Typography>
            </CardContent>
            <CardHeader>
              <Typography fontWeight="semibold" variant="body-m">
                {translations(`content.reviews.items.${key}.name`)}
              </Typography>
              <Typography className={styles.role} variant="body-s">
                {translations(`content.reviews.items.${key}.role`)}
              </Typography>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  </section>
);
