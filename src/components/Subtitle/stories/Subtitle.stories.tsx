import type { Meta, StoryObj } from '@storybook/react';

import { Subtitle } from '../Subtitle';

const meta: Meta<typeof Subtitle> = {
  title: 'Components/Subtitle',
  component: Subtitle,
  argTypes: {
    prefix: {
      options: ['','01','02','03'],
      control: 'select'
    }
  },
  args: {
    prefix: '01',
    title: 'Pick your destination'
  }
};

export default meta;
type Story = StoryObj<typeof Subtitle>;

export const Default: Story = {};