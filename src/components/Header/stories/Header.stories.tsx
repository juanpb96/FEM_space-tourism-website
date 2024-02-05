import type { Meta, StoryObj } from '@storybook/react';

import { Header } from '../Header';
import { chromaticViewport, defaultViewport } from '../../constants/stories-viewports';
import { withRouter } from '../../helpers/stories/withRouter';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  decorators: [withRouter]
};

export default meta;
type Story = StoryObj<typeof Header>;

export const HeaderOnMobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: defaultViewport.mobile
    },
    chromatic: {
      viewports: [chromaticViewport.mobile]
    }
  }
};

export const Default: Story = {};