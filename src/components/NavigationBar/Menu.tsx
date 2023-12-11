import { MouseEvent, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './styles/menu.module.scss';
import { useScreenType } from '../../hooks/useScreenType';
import { menuVariants } from './animations/menu.variants';
import { useActiveItemIndex } from './hooks/useActiveItemIndex';

/* TODO:
  - Include active state for mobile and tablet
  - Check keyboard navigation
  - Validate behavior on viewport resize 
*/

const PAGES = ['Home', 'Destination', 'Crew', 'Technology'];

const getActiveClass = ({isActive}: {isActive: boolean}) => {
  return isActive ? styles['active'] : '';
};

const baseFontSize = parseFloat(window.getComputedStyle(document.documentElement).getPropertyValue('font-size'));

const Menu = () => {
  const [initialY, setInitialY] = useState(0);
  const screenType = useScreenType();
  const {activeItemIndex, setItemList, setActivePosition} = useActiveItemIndex();
  const olRef = useRef<HTMLOListElement>(null);
  const barRef = useRef<HTMLDivElement>(null);  

  useEffect(() => {
    if (olRef.current?.firstElementChild) {
      const rect = olRef.current.firstElementChild.getBoundingClientRect();
      setInitialY(rect.top);
    }
  }, [screenType]);

  useEffect(() => {
    const olElement = olRef.current; 
    console.log(activeItemIndex);

    // TODO: Set logic for moving bar below active item depending on viewport resize
    // TODO: Check https://www.componentdriven.org/ and implement menu in main page

    if (olElement) {
      setItemList([...olElement.children] as HTMLLinkElement[]);
      setActivePosition(activeItemIndex);
    }

    const timeoutId = setTimeout(() => {
      const barElement = barRef.current; 
      if (barElement && screenType !== 'mobile') {
        const element = (olElement?.children[activeItemIndex] as HTMLLinkElement);
        barElement.style.width = `${element.offsetWidth / baseFontSize}rem`;
      } 
    }, 200);

    return () => {
      clearTimeout(timeoutId);
    }
  }, [screenType]);

  const onLinkClick = (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>, index: number) => {
    e.preventDefault();   
    setActivePosition(index);

    if (screenType === 'mobile') {
      return;
    }

    const elementSize = (e.target as HTMLLinkElement).offsetWidth / baseFontSize 
    
    if (barRef.current) {
      barRef.current.style.width = `${elementSize}rem`;
    }
  };

  return (
    <nav className={styles['menu']}>
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
      {
        initialY > 0 && (
          <motion.div
            key={initialY}
            ref={barRef}
            className={styles['bar']}
            initial={false}
            custom={{activeItemIndex, initialY}}
            animate={screenType}
            variants={menuVariants}
          />
        )
      }
    </nav>
  );
};

export default Menu;