import { MouseEvent, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './styles/menu.module.scss';
import { useScreenType } from '../../hooks/useScreenType';
import { menuVariants } from './animations/menu.variants';
import { getActiveClass, getBarAnimation } from './utils/Menu.utils';

const PAGES = ['Home', 'Destination', 'Crew', 'Technology'];

const baseFontSize = parseFloat(window.getComputedStyle(document.documentElement).getPropertyValue('font-size'));

export const Menu = () => {
  const [activeMenuOptionIndex, setActiveMenuOptionIndex] = useState(0);
  const [options, setOptions] = useState<HTMLLIElement[]>([]);
  const screenType = useScreenType();
  const olRef = useRef<HTMLOListElement>(null);
  const barRef = useRef<HTMLDivElement>(null);  

  useEffect(() => {
    const olElement = olRef.current;

    if (olElement) {
      const liElements = Array.from(olElement.getElementsByTagName('li'));
      setOptions(liElements);
    }
  }, [])

  useEffect(() => {
    const barElement = barRef.current;

    const resizeObserver = new ResizeObserver((entries) => {      
      if (barElement) {
        const activeMenuOptionWidth = Math.round(entries[0].contentBoxSize[0].inlineSize);
        barElement.style.width = `${activeMenuOptionWidth / baseFontSize}rem`; 
      }
    });
    
    const calculateBarWidth = () => {
      if (options.length && barElement) {    
        const activeMenuOption = options[activeMenuOptionIndex];            
        resizeObserver.observe(activeMenuOption);
      }
    }

    calculateBarWidth();

    return () => {
      resizeObserver.disconnect();
    }
  }, [activeMenuOptionIndex, options]);

  const onLinkClick = (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>, index: number) => {
    e.preventDefault();   
    setActiveMenuOptionIndex(index);
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
    </nav>
  );
};
