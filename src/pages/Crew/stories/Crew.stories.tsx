import type { Meta, StoryObj } from '@storybook/react-vite';

import { Crew } from '../Crew';
import { mobileGlobals, mobileParameters, tabletGlobals, tabletParameters } from '../../../components/constants/stories-viewports';

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
  globals: mobileGlobals,
  parameters: mobileParameters
};

export const CrewOnTablet: Story = {
  globals: tabletGlobals,
  parameters: tabletParameters
};

export const Default: Story = {};