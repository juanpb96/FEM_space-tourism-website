import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import { Menu } from '../Menu';

const meta = {
  title: 'Components/NavigationBar/Menu',
  component: Menu,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MenuMobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'iphone6'
    }
  },
};
