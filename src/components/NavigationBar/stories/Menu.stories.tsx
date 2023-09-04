import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

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

const withStoriesRouter: Decorator = (Story) => (
  <MemoryRouter initialEntries={['/']}>
    <Story />
  </MemoryRouter>
);

export const MenuMobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'iphone6'
    }
  },
  decorators: [withStoriesRouter]
};
