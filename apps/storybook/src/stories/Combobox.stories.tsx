import type { Meta, StoryObj } from '@storybook/react-vite';

import { Combobox } from '@track-my-life/ui/src/components/molecules/combobox/combobox';
import { useState } from 'react';

const CATEGORY_OPTION_LIST = [
  { value: '1', label: 'Food & Dining' },
  { value: '2', label: 'Transportation' },
  { value: '3', label: 'Housing' },
  { value: '4', label: 'Entertainment' },
  { value: '5', label: 'Shopping' },
  { value: '6', label: 'Healthcare' },
  { value: '7', label: 'Education' },
  { value: '8', label: 'Salary' },
];

const meta: Meta<typeof Combobox> = {
  title: 'Molecules/Combobox',
  component: Combobox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultCombobox = () => {
  const [value, setValue] = useState('');
  return (
    <div style={{ width: 280 }}>
      <Combobox
        optionList={CATEGORY_OPTION_LIST}
        value={value}
        onValueChange={setValue}
        placeholder="Select category..."
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <DefaultCombobox />,
};

const WithSelectionCombobox = () => {
  const [value, setValue] = useState('1');
  return (
    <div style={{ width: 280 }}>
      <Combobox
        optionList={CATEGORY_OPTION_LIST}
        value={value}
        onValueChange={setValue}
        placeholder="Select category..."
      />
    </div>
  );
};

export const WithSelection: Story = {
  render: () => <WithSelectionCombobox />,
};

export const WithError: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <Combobox optionList={CATEGORY_OPTION_LIST} placeholder="Select category..." error />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <Combobox optionList={CATEGORY_OPTION_LIST} placeholder="Disabled" disabled />
    </div>
  ),
};
