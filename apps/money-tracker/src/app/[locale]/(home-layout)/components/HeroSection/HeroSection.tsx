import type { FC } from 'react';

import { Link } from '@track-my-life/shared/src/i18n/navigation/navigation';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';

import { PATHS } from '@/constants/paths';

import styles from './HeroSection.module.scss';

interface HeroSectionProps {
  translations: (key: string) => string;
}

export const HeroSection: FC<HeroSectionProps> = ({ translations }) => (
  <section className={styles.hero}>
    <div className={styles.container}>
      <Typography className={styles.title} fontWeight="bold" tag="h1" variant="title-xl">
        {translations('content.hero.title')}
      </Typography>
      <Typography className={styles.subtitle} tag="p" variant="body-l">
        {translations('content.hero.subtitle')}
      </Typography>
      <div className={styles.actions}>
        <Button component={Link} href={PATHS.signUp}>
          {translations('content.hero.getStarted')}
        </Button>
        <Button component="a" href="#advantages" variant="outline">
          {translations('content.hero.learnMore')}
        </Button>
      </div>
    </div>
  </section>
);
