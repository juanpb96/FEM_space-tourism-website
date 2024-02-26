import { MouseEvent, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { getActiveClass, getBarAnimation, getMobileAnimation } from "./utils/Menu.utils";
import { motion } from "framer-motion";
import { menuVariants, optionsVariants } from "./animations/menu.variants";
import styles from './styles/menu.module.scss';

const PAGES = ['Home', 'Destination', 'Crew', 'Technology'];

interface MenuMobileProps {
  isOpen: boolean;
}

/**
 * TODO: Increase menu options clickable area to enhance usability - Issue #48
 * - Update hover query by including pointer fine
 */
 
export const MenuMobile = ({ isOpen }: MenuMobileProps) => {
  const [activeMenuOptionIndex, setActiveMenuOptionIndex] = useState(0);
  const olRef = useRef<HTMLOListElement>(null);
  const barRef = useRef<HTMLDivElement>(null);  

  const onLinkClick = (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>, index: number) => {
    e.preventDefault();
    setActiveMenuOptionIndex(index);
  };

  return (
    <motion.nav
        initial={false}
        animate={getMobileAnimation(isOpen)}
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
          screenType: 'mobile',
          index: activeMenuOptionIndex
        }}
        animate={getBarAnimation('mobile')}
        variants={menuVariants}
      />
    </motion.nav>
  );
};
