import { motion } from 'framer-motion';
import { MouseEvent } from 'react';
import { useLocationBar } from '../../hooks/useLocationBar';
import { useScreenType } from '../../hooks/useScreenType';
import { calculateHorizontalMoveByViewport } from './animations/horizontal-move';
import styles from './styles/inner-navigation-bar.module.scss';

const PAGES = ['Moon', 'Mars', 'Europa', 'Titan'];

// TODO: Increase options clickable area to enhance usability - Issue #48
export const InnerNavigationBar = () => {
  const { olRef, barRef, options, activeMenuOptionIndex, setActiveMenuOptionIndex } = useLocationBar();
  const screenType = useScreenType();

  const onLinkClick = (e: MouseEvent, index: number) => {
    e.preventDefault();
    setActiveMenuOptionIndex(index);
  };

  return (
    <nav className={styles['nav']}>
      <ol ref={olRef}>
        {PAGES.map((page, index) => (
          <li key={page} onClick={(e) => onLinkClick(e, index)}>
            {page}
          </li>
        ))}
      </ol>

      <motion.div
        ref={barRef}
        className={styles['bar']}
        animate={{
          x: calculateHorizontalMoveByViewport({
            screenType,
            options,
            index: activeMenuOptionIndex
          })
        }}
      />
    </nav>
  );
};
