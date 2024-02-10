import type { Meta, StoryObj } from '@storybook/react';

import { Description } from '../Description';

const meta: Meta<typeof Description> = {
  title: 'Components/Description',
  component: Description,
};

export default meta;
type Story = StoryObj<typeof Description>;

export const Default: Story = {};