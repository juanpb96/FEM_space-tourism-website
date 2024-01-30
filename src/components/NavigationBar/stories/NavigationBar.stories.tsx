import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import { NavigationBar } from '../NavigationBar';
import { defaultViewport } from '../../constants/stories-viewports';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

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
  decorators: [withRouter],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const anchorElement = canvas.getByRole('link', { name: /technology/i });

    await expect(anchorElement).toBeInTheDocument();
    await userEvent.click(anchorElement);
  }
} satisfies Meta<typeof NavigationBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// TODO: Add background image to test blur effect
export const NavigationBarOnMobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: defaultViewport.mobile
    },
    chromatic: { viewports: [375, 667] },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button', { name: /menu/i });
    const anchorElement = canvas.getByRole('link', { name: /technology/i });

    await expect(button).toBeInTheDocument();
    await userEvent.click(button);
    await expect(anchorElement).toBeInTheDocument();
    await userEvent.click(anchorElement);
  }
};

export const NavigationBarOnTablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: defaultViewport.tablet
    }
  },
};

export const NavigationBarDesktop: Story = {}
