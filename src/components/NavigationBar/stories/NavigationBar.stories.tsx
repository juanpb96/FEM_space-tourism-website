import type { Meta, StoryObj } from '@storybook/react';

import { NavigationBar } from '../NavigationBar';
import { defaultViewport, chromaticViewport } from '../../constants/stories-viewports';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { withRouter } from '../../helpers/stories/withRouter';

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
    chromatic: {
      viewports: [chromaticViewport.mobile]
    },
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
    },
    chromatic: {
      viewports: [chromaticViewport.tablet]
    }
  },
};

export const NavigationBarDesktop: Story = {}
