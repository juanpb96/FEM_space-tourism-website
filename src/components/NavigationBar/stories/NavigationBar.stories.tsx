import type { Meta, StoryObj } from '@storybook/react';

import { NavigationBar } from '../NavigationBar';

const meta = {
  title: 'Components/NavigationBar',
  component: NavigationBar,
  tags: ['autodocs'],
} satisfies Meta<typeof NavigationBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// TODO: Add background image to test blur effect
export const NavigationBarOnMobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'iphone6'
    }
  },
};
