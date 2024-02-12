import type { Meta, StoryObj } from '@storybook/react';

import { Description } from '../Description';

const meta: Meta<typeof Description> = {
  title: 'Components/Description',
  component: Description,
  args: {
    children: 'Let’s face it; if you want to go to space, you might as well genuinely go to outer space and not hover kind of on the edge of it. Well sit back, and relax because we’ll give you a truly out of this world experience!'
  },
  parameters: {
    layout: 'centered'
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '444px', margin: 'auto' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Description>;

export const Default: Story = {};