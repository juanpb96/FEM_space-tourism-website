import { SVGMotionProps, motion } from 'framer-motion';
import { RefAttributes } from 'react';
import { JSX } from 'react/jsx-runtime';
import styles from './styles/menu-button.module.scss';

const Rect = (props: JSX.IntrinsicAttributes & SVGMotionProps<SVGRectElement> & RefAttributes<SVGRectElement>) => {
  return (
    <motion.rect
      width="24"
      height="3"
      fill="#D0D6F9"
      {...props}
    />
  )
};

interface MenuButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const MenuButton = ({isOpen, onToggle}: MenuButtonProps) => {
  // TODO: Include reduced motion
  // TODO: Try implementing variants

  return (
    <button
      type="button"
      onClick={onToggle}
      className={styles['menu-button']}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="21"
        viewBox="0 0 24 21"
        fill="none"
        initial={{ rotate: 0 }}
        animate={{ rotate: isOpen ? 90 : 0 }}
      >
        <Rect
          className="top"
          initial={{ rotate: 0, y: 0 }}
          animate={{
            rotate: isOpen ? [0, 0, -45] : [-45, 0, 0],
            y: isOpen ? 9 : 0
          }}
          transition={{ duration: 0.3, times: [0, 0.5, 1] }}
        />
        <Rect
          className="middle"
          y="9"
          initial={{ opacity: 1 }}
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />
        <Rect
          className="bottom"
          y="18"
          initial={{ rotate: 0, y: 0 }}
          animate={{
            rotate: isOpen ? [0, 0, 45] : [45, 0, 0],
            y: isOpen ? -9 : 0
          }}
          transition={{ duration: 0.3, times: [0, 0.5, 1] }}
        />
      </motion.svg>               
    </button>
  );
};
