import * as React from 'react';

import { cn } from '../../../lib/utils';
import styles from './label.module.scss';

const Label: React.FC<React.ComponentProps<'label'>> = ({ className, ...props }) => (
  <label data-slot="label" className={cn(styles.label, className)} {...props} />
);

export { Label };
