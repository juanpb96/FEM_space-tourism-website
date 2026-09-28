import type { Meta, StoryObj } from '@storybook/react-vite';

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
  globals: {
    viewport: { value: defaultViewport.mobile, isRotated: false },
  },
  parameters: {
    chromatic: {
      viewports: [chromaticViewport.mobile]
    }
  }
};

export const HomeOnTablet: Story = {
  globals: {
    viewport: { value: defaultViewport.tablet, isRotated: false },
  },
  parameters: {
    chromatic: {
      viewports: [chromaticViewport.tablet]
    }
  }
};

export const Default: Story = {};