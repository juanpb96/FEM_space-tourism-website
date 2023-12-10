import { useState } from 'react';
import { MenuButton } from './MenuButton';
import { Menu } from './Menu';

export const NavigationBar = () => {
  // TODO: Remove Menu button on tablet
  const [isOpen, setIsOpen] = useState(false);
  
  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <MenuButton isOpen={isOpen} onToggle={onToggle} />
      <Menu />
    </div>
  );
};
