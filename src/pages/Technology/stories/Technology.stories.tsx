import type { Meta, StoryObj } from '@storybook/react-vite';

import { Technology } from '../Technology';
import { mobileGlobals, mobileParameters, tabletGlobals, tabletParameters } from '../../../components/constants/stories-viewports';

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
  globals: mobileGlobals,
  parameters: mobileParameters
};

export const TechnologyOnTablet: Story = {
  globals: tabletGlobals,
  parameters: tabletParameters
};

export const Default: Story = {};