import type { FC } from 'react';

import { AdvantagesSection } from './components/AdvantagesSection/AdvantagesSection';
import { FaqSection } from './components/FaqSection/FaqSection';
import { HeroSection } from './components/HeroSection/HeroSection';
import { ReviewsSection } from './components/ReviewsSection/ReviewsSection';
import styles from './page.module.scss';

interface HomePageContentProps {
  translations: (key: string) => string;
}

export const HomePageContent: FC<HomePageContentProps> = ({ translations }) => (
  <main className={styles.main}>
    <HeroSection translations={translations} />
    <AdvantagesSection translations={translations} />
    <ReviewsSection translations={translations} />
    <FaqSection translations={translations} />
  </main>
);
