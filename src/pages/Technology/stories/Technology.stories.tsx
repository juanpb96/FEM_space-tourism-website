import type { Meta, StoryObj } from '@storybook/react';

import { Technology } from '../Technology';
import { mobileParameters, tabletParameters } from '../../../components/constants/stories-viewports';

const meta: Meta<typeof Technology> = {
  title: 'Pages/Technology',
  component: Technology,
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof Technology>;

export const TechnologyOnMobile: Story = {
  parameters: mobileParameters
};

export const TechnologyOnTablet: Story = {
  parameters: tabletParameters
};

export const Default: Story = {};