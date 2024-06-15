import type { Meta, StoryObj } from '@storybook/react';

import { Pagination } from '../Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Technology/Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {};