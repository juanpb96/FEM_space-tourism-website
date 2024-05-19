import type { Meta, StoryObj } from '@storybook/react';

import { Crew } from '../Crew';

const meta: Meta<typeof Crew> = {
  title: 'Pages/Crew',
  component: Crew,
};

export default meta;
type Story = StoryObj<typeof Crew>;

export const Default: Story = {};