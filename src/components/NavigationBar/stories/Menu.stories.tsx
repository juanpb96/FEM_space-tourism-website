import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import Menu from '../Menu';

const withRouter: Decorator = (Story) => (
  <MemoryRouter initialEntries={['/']}>
    <Story />
  </MemoryRouter>
);

const meta = {
  title: 'Components/NavigationBar/Menu',
  component: Menu,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  decorators: [withRouter]
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MenuOnMobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'iphone6'
    }
  },
};

export const MenuOnTablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'ipad'
    }
  },
};

export const Default: Story = {};
