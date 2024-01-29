import { MouseEvent, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './styles/menu.module.scss';
import { useScreenType } from '../../hooks/useScreenType';
import { menuVariants, optionsVariants } from './animations/menu.variants';
import { getActiveClass, getMobileAnimation, getBarAnimation } from './utils/Menu.utils';

/* TODO:
  - Include active state for mobile and tablet
  - Check keyboard navigation
  - Validate behavior on viewport resize 
*/

const PAGES = ['Home', 'Destination', 'Crew', 'Technology'];

const baseFontSize = parseFloat(window.getComputedStyle(document.documentElement).getPropertyValue('font-size'));

export const Menu = ({ isOpen = true }) => {
  const [activeMenuOptionIndex, setActiveMenuOptionIndex] = useState(0);
  const [options, setOptions] = useState<HTMLLIElement[]>([]);
  const screenType = useScreenType();
  const olRef = useRef<HTMLOListElement>(null);
  const barRef = useRef<HTMLDivElement>(null);  

  useEffect(() => {
    const olElement = olRef.current;
    const barElement = barRef.current;
    
    if (screenType !== 'mobile' && olElement && barElement) {
      const liElements = Array.from(olElement.getElementsByTagName('li'));
      setOptions(liElements);
      
      const activeMenuOption = liElements[activeMenuOptionIndex];
      barElement.style.width = `${activeMenuOption.offsetWidth / baseFontSize}rem`;      
    }
  }, [activeMenuOptionIndex, screenType]);

  const onLinkClick = (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>, index: number) => {
    e.preventDefault();   
    setActiveMenuOptionIndex(index);

    if (screenType === 'mobile') {
      return;
    }

    const elementSize = (e.target as HTMLLinkElement).offsetWidth / baseFontSize 
    
    if (barRef.current) {
      barRef.current.style.width = `${elementSize}rem`;
    }
  };

  return (
    <motion.nav
        initial={false}
        animate={getMobileAnimation(isOpen, screenType)}
        variants={optionsVariants}
        className={styles['menu']}
    >
      <ol ref={olRef}>
        {
          PAGES.map((page, index) => (
            <li key={page}>
              <NavLink
                to={`/${page}`}
                className={getActiveClass}
                onClick={(e) => onLinkClick(e, index)}
              >
                <span className={styles['counter']}>0{index}</span>
                {page}
              </NavLink>
            </li>
          ))
        }
      </ol>
      <motion.div
        ref={barRef}
        className={styles['bar']}
        initial={false}
        custom={{
          screenType,
          options,
          index: activeMenuOptionIndex
        }}
        animate={getBarAnimation(screenType)}
        variants={menuVariants}
      />
    </motion.nav>
  );
};
