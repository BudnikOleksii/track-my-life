import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  RadioGroup,
  RadioGroupItem,
} from '@track-my-life/ui/src/components/atoms/radio-group/radio-group';
import { useState } from 'react';

const meta: Meta<typeof RadioGroup> = {
  title: 'Atoms/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const RadioGroupDefault = () => {
  const [value, setValue] = useState('expense');
  return (
    <div style={{ width: 320 }}>
      <RadioGroup value={value} onValueChange={setValue}>
        <RadioGroupItem value="income">Income</RadioGroupItem>
        <RadioGroupItem value="expense">Expense</RadioGroupItem>
      </RadioGroup>
    </div>
  );
};

export const Default: Story = {
  render: () => <RadioGroupDefault />,
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <RadioGroup value="income" disabled>
        <RadioGroupItem value="income">Income</RadioGroupItem>
        <RadioGroupItem value="expense">Expense</RadioGroupItem>
      </RadioGroup>
    </div>
  ),
};
