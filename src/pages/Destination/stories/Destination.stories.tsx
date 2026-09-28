import type { Meta, StoryObj } from '@storybook/react-vite';

import { Destination } from '../Destination';
import { mobileGlobals, mobileParameters, tabletGlobals, tabletParameters } from '../../../components/constants/stories-viewports';

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
  globals: mobileGlobals,
  parameters: mobileParameters
};

export const DestinationOnTablet: Story = {
  globals: tabletGlobals,
  parameters: tabletParameters
};

export const Default: Story = {};