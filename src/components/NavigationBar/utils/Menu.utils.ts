import { ScreenType } from "../../../hooks/useScreenType";
import styles from "../styles/menu.module.scss";

const getActiveClass = ({isActive}: {isActive: boolean}) => {
  return isActive ? styles['active'] : '';
};

const getMobileAnimation = (isOpen: boolean) => {
  return isOpen ? "open" : "closed";
};

const getBarAnimation = (screenType: ScreenType) => {
  return screenType === 'mobile' ? 'vertical' : 'horizontal';
};

export {
  getActiveClass,
  getMobileAnimation,
  getBarAnimation
};
