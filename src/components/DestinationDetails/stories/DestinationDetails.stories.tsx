import type { Meta, StoryObj } from '@storybook/react';

import { DestinationDetails } from '../DestinationDetails';

const meta: Meta<typeof DestinationDetails> = {
  title: 'Components/DestinationDetails',
  component: DestinationDetails,
};

export default meta;
type Story = StoryObj<typeof DestinationDetails>;

export const Default: Story = {};