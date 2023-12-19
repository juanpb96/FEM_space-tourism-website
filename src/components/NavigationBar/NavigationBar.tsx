import { useEffect, useState } from 'react';
import { MenuButton } from './MenuButton';
import { Menu } from './Menu';
import styles from './styles/navigation-bar.module.scss';
import { useScreenType } from '../../hooks/useScreenType';

export const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const screenType = useScreenType();
  
  // TODO: Check behavior resizing the screen
  useEffect(() => {
    if (screenType !== 'mobile') {
      setIsOpen(true);
    }
  }, [screenType])
  

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
