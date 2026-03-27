import type { Meta, StoryObj } from '@storybook/react-vite';

import { Checkbox } from '@track-my-life/ui/src/components/atoms/checkbox/checkbox';
import { useState } from 'react';

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'select',
      options: [true, false, 'indeterminate'],
      description: 'The checked state of the checkbox',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    error: {
      control: 'boolean',
      description: 'Whether the checkbox has an error state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    checked: 'indeterminate',
  },
};

export const WithError: Story = {
  args: {
    checked: false,
    error: true,
  },
};

const InteractiveCheckbox = () => {
  const [checked, setChecked] = useState(false);
  return <Checkbox checked={checked} onCheckedChange={(val) => setChecked(val === true)} />;
};

export const Interactive: Story = {
  render: () => <InteractiveCheckbox />,
};
