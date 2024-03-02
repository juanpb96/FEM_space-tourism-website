import { motion } from 'framer-motion';
import { MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { useScreenType } from '../../hooks/useScreenType';
import { menuVariants } from './animations/menu.variants';
import { getActiveClass, getBarAnimation } from './utils/Menu.utils';
import { useLocationBar } from '../../hooks/useLocationBar';
import styles from './styles/menu.module.scss';

const PAGES = ['Home', 'Destination', 'Crew', 'Technology'];

export const Menu = () => {
  const { olRef, barRef, options, activeMenuOptionIndex, setActiveMenuOptionIndex } = useLocationBar();
  const screenType = useScreenType();

  const onLinkClick = (e: MouseEvent, index: number) => {
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
