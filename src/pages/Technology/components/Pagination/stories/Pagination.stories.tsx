import type { Meta, StoryObj } from '@storybook/react';

import { Pagination } from '../Pagination';
import { mobileParameters, tabletParameters } from '../../../../../components/constants/stories-viewports';

const meta: Meta<typeof Pagination> = {
  title: 'Technology/Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const PaginationOnMobile: Story = {
  parameters: mobileParameters
};

export const PaginationOnTablet: Story = {
  parameters: tabletParameters
};

export const Default: Story = {};