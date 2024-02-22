import { SVGMotionProps, motion, useReducedMotion } from 'framer-motion';
import { bottomRectVariants, middleRectVariants, svgVariants, topRectVariants } from './animations/menu-button-variants';
import styles from './styles/menu-button.module.scss';

const Rect = (props: SVGMotionProps<SVGRectElement>) => {
  return (
    <motion.rect
      width="24"
      height="3"
      viewBox="0 0 24 3"
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
  const shouldReduceMotion = useReducedMotion();
  const animateVariant = isOpen ? 'open' : 'closed';

  return (
    <button
      aria-label={`${isOpen ? "Close" : "Open"} menu`}
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
        initial={false}
        animate={animateVariant}
        variants={svgVariants}
        role="presentation"
        className={styles['svg']}
      >
        <Rect
          className="top"
          initial={false}
          animate={animateVariant}
          variants={topRectVariants}
          style={{ originX: '12px', originY: '1.5px' }}
        />
        <Rect
          className="middle"
          y="9"
          custom={shouldReduceMotion}
          initial={false}
          animate={animateVariant}
          variants={middleRectVariants}
        />
        <Rect
          className="bottom"
          y="18"
          initial={false}
          animate={animateVariant}
          variants={bottomRectVariants}
          style={{ originX: '12px', originY: '19.5px' }}
        />
      </motion.svg>               
    </button>
  );
};
