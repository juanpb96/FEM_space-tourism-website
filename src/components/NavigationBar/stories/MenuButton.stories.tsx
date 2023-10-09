import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import { MenuButton } from '../MenuButton';
import { MotionConfig } from 'framer-motion';

const meta = {
  title: 'Components/NavigationBar/MenuButton',
  component: MenuButton,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    isOpen: { control: 'boolean' },
    onToggle: { action: 'onToggle' }
  },
  args: {
    isOpen: false,
    onToggle: () => {}
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MenuButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MenuButtonMobile: Story = {
  render: () => {
    const [{ isOpen }, updateArgs] = useArgs();    
    const onToggle = () => updateArgs({ isOpen: !isOpen });

    return (
      <MotionConfig reducedMotion="user">
        <MenuButton
          isOpen={isOpen}
          onToggle={onToggle}
        />
      </MotionConfig>
    );
  }
};