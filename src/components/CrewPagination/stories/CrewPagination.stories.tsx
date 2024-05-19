import type { Meta, StoryObj } from '@storybook/react';

import { CrewPagination } from '../CrewPagination';

const meta: Meta<typeof CrewPagination> = {
  title: 'Components/CrewPagination',
  component: CrewPagination,
};

export default meta;
type Story = StoryObj<typeof CrewPagination>;

export const Default: Story = {};