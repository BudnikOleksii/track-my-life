'use client';

import type { ComponentPropsWithoutRef, ComponentRef, Ref } from 'react';

import * as AccordionPrimitive from '@radix-ui/react-accordion';

import { cn } from '../../../lib/utils';
import styles from './accordion.module.scss';

const Accordion = AccordionPrimitive.Root;

interface AccordionItemProps extends ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {
  ref?: Ref<ComponentRef<typeof AccordionPrimitive.Item>>;
}

const AccordionItem = ({ className, ref, ...props }: AccordionItemProps) => (
  <AccordionPrimitive.Item
    ref={ref}
    data-slot="accordion-item"
    className={cn(styles.item, className)}
    {...props}
  />
);

interface AccordionTriggerProps extends ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Trigger
> {
  ref?: Ref<ComponentRef<typeof AccordionPrimitive.Trigger>>;
}

const AccordionTrigger = ({ className, children, ref, ...props }: AccordionTriggerProps) => (
  <AccordionPrimitive.Header className={styles.header}>
    <AccordionPrimitive.Trigger
      ref={ref}
      data-slot="accordion-trigger"
      className={cn(styles.trigger, className)}
      {...props}
    >
      {children}
      <span className={styles.chevron} aria-hidden>
        ▼
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);

interface AccordionContentProps extends ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Content
> {
  ref?: Ref<ComponentRef<typeof AccordionPrimitive.Content>>;
}

const AccordionContent = ({ className, children, ref, ...props }: AccordionContentProps) => (
  <AccordionPrimitive.Content
    ref={ref}
    data-slot="accordion-content"
    className={cn(styles.content, className)}
    {...props}
  >
    <div className={styles.contentInner}>{children}</div>
  </AccordionPrimitive.Content>
);

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
