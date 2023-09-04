import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './styles/menu.module.scss';

/* TODO:
  - Include active state for mobile and tablet
  - Check keyboard navigation
  - Validate behavior on viewport resize 
*/

const PAGES = ['Home', 'Destination', 'Crew', 'Technology'];

const getActiveClass = ({isActive}: {isActive: boolean}) => {
  return isActive ? styles['active'] : '';
}

export const Menu = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [initialY, setInitialY] = useState(0);
  const olRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (olRef.current?.firstElementChild) {
      const rect = olRef.current.firstElementChild.getBoundingClientRect();
      setInitialY(rect.top);
      console.log(rect.top);
      
    }
  }, []);

  const onLinkClick = (index: number) => {
    setActiveItemIndex(index);
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
                onClick={() => onLinkClick(index)}
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
            className={styles['bar']}
            initial={{ y: initialY }}
            animate={{ y: activeItemIndex * 50 + initialY }}
          />
        )
      }
    </nav>
  );
};
