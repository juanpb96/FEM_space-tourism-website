import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { ExploreButton } from '../ExploreButton';
import { defaultViewport } from '../../constants/stories-viewports';

const meta = {
  title: 'Components/ExploreButton',
  component: ExploreButton,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /Explore/i });

    expect(button).toBeInTheDocument();
    await userEvent.click(button);
  }
} satisfies Meta<typeof ExploreButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonOnMobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: defaultViewport.mobile
    }
  }
};

export const ButtonOnTablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: defaultViewport.tablet
    }
  }
};

export const ButtonOnDesktop: Story = {};