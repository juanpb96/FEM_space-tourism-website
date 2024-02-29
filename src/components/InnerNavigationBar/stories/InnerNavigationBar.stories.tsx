import type { Meta, StoryObj } from '@storybook/react';

import { InnerNavigationBar } from '../InnerNavigationBar';

const meta: Meta<typeof InnerNavigationBar> = {
  title: 'Components/InnerNavigationBar',
  component: InnerNavigationBar,
};

export default meta;
type Story = StoryObj<typeof InnerNavigationBar>;

export const Default: Story = {};