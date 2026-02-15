'use client';

import type { FC } from 'react';

import { useMemo } from 'react';

import { cn } from '../../../lib/utils';
import { Label } from '../../atoms/label/label';
import { Separator } from '../../atoms/separator/separator';
import styles from './field.module.scss';

const FieldSet: FC<React.ComponentProps<'fieldset'>> = ({ className, ...props }) => (
  <fieldset data-slot="field-set" className={cn(styles.fieldSet, className)} {...props} />
);

const FieldLegend: FC<React.ComponentProps<'legend'> & { variant?: 'legend' | 'label' }> = ({
  className,
  variant = 'legend',
  ...props
}) => (
  <legend
    data-slot="field-legend"
    data-variant={variant}
    className={cn(styles.fieldLegend, className)}
    {...props}
  />
);

const FieldGroup: FC<React.ComponentProps<'div'>> = ({ className, ...props }) => (
  <div data-slot="field-group" className={cn(styles.fieldGroup, className)} {...props} />
);

type FieldOrientation = 'vertical' | 'horizontal' | 'responsive';

const Field: FC<React.ComponentProps<'div'> & { orientation?: FieldOrientation }> = ({
  className,
  orientation = 'vertical',
  ...props
}) => (
  <div
    role="group"
    data-slot="field"
    data-orientation={orientation}
    className={cn(styles.field, className)}
    {...props}
  />
);

const FieldContent: FC<React.ComponentProps<'div'>> = ({ className, ...props }) => (
  <div data-slot="field-content" className={cn(styles.fieldContent, className)} {...props} />
);

const FieldLabel: FC<React.ComponentProps<typeof Label>> = ({ className, ...props }) => (
  <Label data-slot="field-label" className={cn(styles.fieldLabel, className)} {...props} />
);

const FieldTitle: FC<React.ComponentProps<'div'>> = ({ className, ...props }) => (
  <div data-slot="field-title" className={cn(styles.fieldTitle, className)} {...props} />
);

const FieldDescription: FC<React.ComponentProps<'p'>> = ({ className, ...props }) => (
  <p data-slot="field-description" className={cn(styles.fieldDescription, className)} {...props} />
);

const FieldSeparator: FC<React.ComponentProps<'div'> & { children?: React.ReactNode }> = ({
  children,
  className,
  ...props
}) => (
  <div
    data-slot="field-separator"
    data-content={Boolean(children)}
    className={cn(styles.fieldSeparator, className)}
    {...props}
  >
    <Separator className={styles.fieldSeparatorLine} />
    {children && (
      <span data-slot="field-separator-content" className={styles.fieldSeparatorContent}>
        {children}
      </span>
    )}
  </div>
);

const FIELD_ERROR_MIN_LENGTH = 1;
const FIRST_ARRAY_ELEMENT = 0;

const FieldError: FC<
  React.ComponentProps<'div'> & {
    errors?: ({ message?: string } | undefined)[];
  }
> = ({ className, children, errors, ...props }) => {
  const content = useMemo(() => {
    if (children) {
      return children;
    }

    if (!errors?.length) {
      return null;
    }

    const uniqueErrorList = [...new Map(errors.map((error) => [error?.message, error])).values()];

    if (uniqueErrorList?.length === FIELD_ERROR_MIN_LENGTH) {
      return uniqueErrorList[FIRST_ARRAY_ELEMENT]?.message;
    }

    return (
      <ul className={styles.fieldErrorList}>
        {uniqueErrorList.map(
          (error) => error?.message && <li key={error.message}>{error.message}</li>,
        )}
      </ul>
    );
  }, [children, errors]);

  if (!content) {
    return null;
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn(styles.fieldError, className)}
      {...props}
    >
      {content}
    </div>
  );
};

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
};
