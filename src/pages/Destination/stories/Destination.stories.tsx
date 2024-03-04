import type { Meta, StoryObj } from '@storybook/react';

import { Destination } from '../Destination';
import { chromaticViewport, defaultViewport } from '../../../components/constants/stories-viewports';

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
  // TODO: Consider moving this params block into a separate file to centralize it across stories
  parameters: {
    viewport: {
      defaultViewport: defaultViewport.mobile
    },
    chromatic: {
      viewports: [chromaticViewport.mobile]
    }
  }
};

export const DestinationOnTablet: Story = {};

export const Default: Story = {};