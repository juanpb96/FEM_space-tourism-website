import type { Meta, StoryObj } from '@storybook/react';

import { InnerNavigationBar } from '../InnerNavigationBar';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof InnerNavigationBar> = {
  title: 'Components/InnerNavigationBar',
  component: InnerNavigationBar,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const liElement = await canvas.findByText(/europa/i);
    
    await expect(liElement).toBeInTheDocument();
    await userEvent.click(liElement);
  },
  args: {
    pages: ['Moon', 'Mars', 'Europa', 'Titan'],
    setActivePage: () => {}
  }
};

export default meta;
type Story = StoryObj<typeof InnerNavigationBar>;

export const Default: Story = {};