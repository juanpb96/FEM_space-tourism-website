import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { ExploreButton } from '../ExploreButton';

const meta = {
  title: 'Components/ExploreButton',
  component: ExploreButton,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof ExploreButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};

export const ButtonOnMobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'iphone6'
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /Explore/i });

    expect(button).toBeInTheDocument();
    await userEvent.click(button);
  }
};