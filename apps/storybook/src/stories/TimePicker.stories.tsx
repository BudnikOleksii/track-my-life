import type { Meta, StoryObj } from '@storybook/react-vite';

import { TimePicker } from '@track-my-life/ui/src/components/atoms/time-picker/time-picker';
import { useState } from 'react';

const meta: Meta<typeof TimePicker> = {
  title: 'Atoms/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const TimePickerDefault = () => {
  const [value, setValue] = useState('14:30');
  return <TimePicker value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: () => <TimePickerDefault />,
};

export const Disabled: Story = {
  render: () => <TimePicker value="09:00" disabled />,
};
