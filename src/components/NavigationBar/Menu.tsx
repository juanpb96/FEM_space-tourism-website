import { MouseEvent, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './styles/menu.module.scss';
import { useScreenType } from '../../hooks/useScreenType';

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

export const Menu = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [initialY, setInitialY] = useState(0);
  const screenType = useScreenType();
  const olRef = useRef<HTMLOListElement>(null);
  const barRef = useRef<HTMLDivElement>(null);  

  useEffect(() => {
    if (olRef.current?.firstElementChild) {
      const rect = olRef.current.firstElementChild.getBoundingClientRect();
      setInitialY(rect.top);
    }
  }, [screenType]);

  const onLinkClick = (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>, index: number) => {
    // TODO: Add fix for mobile
    if (screenType === 'mobile') {
      return setActiveItemIndex(index);
    }

    const elementSize = (e.target as HTMLLinkElement).offsetWidth / baseFontSize 
    if (barRef.current) {
      barRef.current.style.width = `${elementSize}rem`;
    }

    if (olRef.current) {     
      setActiveItemIndex(
        index === 0 
        ? index 
        : [...olRef.current.children].slice(0, index).reduce((sum, item) => sum + (item as HTMLLinkElement).offsetWidth + 38, 0)
      );
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
            initial={
              screenType === 'mobile'
              ? { y: initialY }
              : { x: 0 }
            }
            animate={
              screenType === 'mobile'
              ? { y: activeItemIndex * 50 + initialY }
              : { x: activeItemIndex }
            }
          />
        )
      }
    </nav>
  );
};
