import type { Meta, StoryObj } from '@storybook/react-vite';

import { Header } from '../Header';
import { chromaticViewport, defaultViewport } from '../../constants/stories-viewports';
import { withRouter } from '../../helpers/stories/withRouter';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  decorators: [withRouter],
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof Header>;

export const HeaderOnMobile: Story = {
  globals: {
    viewport: { value: defaultViewport.mobile, isRotated: false },
  },
  parameters: {
    chromatic: {
      viewports: [chromaticViewport.mobile]
    }
  }
};

export const HeaderOnTablet: Story = {
  globals: {
    viewport: { value: defaultViewport.tablet, isRotated: false },
  },
  parameters: {
    chromatic: {
      viewports: [chromaticViewport.tablet]
    }
  }
};

export const HeaderOnDesktop: Story = {};