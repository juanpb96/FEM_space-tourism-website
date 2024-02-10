import type { Meta, StoryObj } from '@storybook/react';

import { Heading } from '../Heading';

const meta: Meta<typeof Heading> = {
  title: 'Components/Heading',
  component: Heading,
  argTypes: {
    variant: {
      options: ['small', 'medium', 'large'],
      control: 'select'
    }
  },
  args: {
    text: 'Douglas Hurley',
    variant: 'small'
  }
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {};