import type { Meta, StoryObj } from '@storybook/react';

import { Home } from '../Home';
import { withRouter } from '../../../components/helpers/stories/withRouter';
import { chromaticViewport, defaultViewport } from '../../../components/constants/stories-viewports';

const meta: Meta<typeof Home> = {
  title: 'Pages/Home',
  component: Home,
  decorators: [withRouter],
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof Home>;

export const HomeOnMobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: defaultViewport.mobile
    },
    chromatic: {
      viewports: [chromaticViewport.mobile]
    }
  }
};

export const HomeOnTablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: defaultViewport.tablet
    },
    chromatic: {
      viewports: [chromaticViewport.tablet]
    }
  }
};

export const Default: Story = {};