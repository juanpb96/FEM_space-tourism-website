import type { Meta, StoryObj } from '@storybook/react';

import { Destination } from '../Destination';

const meta: Meta<typeof Destination> = {
  title: 'Pages/Destination',
  component: Destination,
};

export default meta;
type Story = StoryObj<typeof Destination>;

export const DestinationOnMobile: Story = {};

export const DestinationOnTablet: Story = {};

export const Default: Story = {};