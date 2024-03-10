import type { Meta, StoryObj } from '@storybook/react';

import { Destination } from '../Destination';
import { mobileParameters, tabletParameters } from '../../../components/constants/stories-viewports';

const meta: Meta<typeof Destination> = {
  title: 'Pages/Destination',
  component: Destination,
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof Destination>;

export const DestinationOnMobile: Story = {
  parameters: mobileParameters
};

export const DestinationOnTablet: Story = {
  parameters: tabletParameters
};

export const Default: Story = {};