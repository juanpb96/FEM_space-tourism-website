import type { Meta, StoryObj } from '@storybook/react';

import { Crew } from '../Crew';
import { mobileParameters } from '../../../components/constants/stories-viewports';

const meta: Meta<typeof Crew> = {
  title: 'Pages/Crew',
  component: Crew,
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof Crew>;

export const CrewOnMobile: Story = {
  parameters: mobileParameters
};

export const CrewOnTablet: Story = {};
export const Default: Story = {};