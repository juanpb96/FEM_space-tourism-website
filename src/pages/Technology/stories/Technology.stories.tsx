import type { Meta, StoryObj } from '@storybook/react';

import { Technology } from '../Technology';

const meta: Meta<typeof Technology> = {
  title: 'Pages/Technology',
  component: Technology,
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof Technology>;

export const Default: Story = {};