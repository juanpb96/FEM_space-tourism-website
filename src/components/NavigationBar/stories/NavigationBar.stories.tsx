import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import { NavigationBar } from '../NavigationBar';
import { defaultViewport } from '../../constants/stories-viewports';

//TODO: Move this into a utils or decorators folder
const withRouter: Decorator = (Story) => (
  <MemoryRouter initialEntries={['/']}>
    <Story />
  </MemoryRouter>
);

const meta = {
  title: 'Components/NavigationBar/NavigationBar',
  component: NavigationBar,
  tags: ['autodocs'],
  decorators: [withRouter]
} satisfies Meta<typeof NavigationBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// TODO: Add background image to test blur effect
export const NavigationBarOnMobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: defaultViewport.mobile
    }
  },
};

export const NavigationBarOnTablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: defaultViewport.tablet
    }
  },
};

export const NavigationBarDesktop: Story = {}
