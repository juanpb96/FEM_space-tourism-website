import { useState } from 'react';
import { MenuButton } from './MenuButton';
import { Menu } from './Menu';
import styles from './styles/navigation-bar.module.scss';

export const NavigationBar = () => {
  // TODO: Remove Menu button on tablet
  const [isOpen, setIsOpen] = useState(false);
  
  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles['nav-container']}>
      <MenuButton isOpen={isOpen} onToggle={onToggle} />
      <Menu isOpen={isOpen} />
    </div>
  );
};
