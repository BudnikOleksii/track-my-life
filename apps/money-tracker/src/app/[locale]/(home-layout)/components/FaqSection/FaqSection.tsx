import type { TranslateFn } from '@track-my-life/next-shared/src/types/translate-fn';
import type { FC } from 'react';

import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@track-my-life/ui/src/components/molecules/accordion/accordion';

import styles from './FaqSection.module.scss';

interface FaqSectionProps {
  translations: TranslateFn;
}

const FAQ_KEY_LIST = ['q1', 'q2', 'q3', 'q4', 'q5'] as const;

export const FaqSection: FC<FaqSectionProps> = ({ translations }) => (
  <section className={styles.section}>
    <div className={styles.container}>
      <Typography className={styles.title} fontWeight="bold" tag="h2" variant="title-l">
        {translations('content.faq.title')}
      </Typography>
      <Accordion className={styles.accordion} collapsible type="single">
        {FAQ_KEY_LIST.map((key) => (
          <AccordionItem key={key} value={key}>
            <AccordionTrigger>{translations(`content.faq.items.${key}.question`)}</AccordionTrigger>
            <AccordionContent>
              <Typography variant="body-m">
                {translations(`content.faq.items.${key}.answer`)}
              </Typography>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);
