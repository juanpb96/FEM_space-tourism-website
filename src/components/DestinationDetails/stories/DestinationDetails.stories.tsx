import type { Meta, StoryObj } from '@storybook/react';

import { DestinationDetails } from '../DestinationDetails';

const meta: Meta<typeof DestinationDetails> = {
  title: 'Components/DestinationDetails',
  component: DestinationDetails,
  args: {
    title: 'Avg. distance',
    value: '384,400 km'
  },
};

export default meta;
type Story = StoryObj<typeof DestinationDetails>;

export const Default: Story = {};