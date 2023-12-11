import { Suspense, lazy, useState } from 'react';
import { MenuButton } from './MenuButton';
// import { Menu } from './Menu';

const Menu = lazy(() => import('./Menu'));

export const NavigationBar = () => {
  // TODO: Remove Menu button on tablet
  const [isOpen, setIsOpen] = useState(false);
  
  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <MenuButton isOpen={isOpen} onToggle={onToggle} />
      {isOpen && (
        <Suspense fallback={<div>Loading...</div>}>
          <Menu />
        </Suspense>
      )}
    </div>
  );
};
