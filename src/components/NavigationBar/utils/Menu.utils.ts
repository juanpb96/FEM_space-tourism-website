import { ScreenType } from "../../../hooks/useScreenType";
import styles from "../styles/menu.module.scss";

const getActiveClass = ({isActive}: {isActive: boolean}) => {
  return isActive ? styles['active'] : '';
};

const getMobileAnimation = (isOpen: boolean, screenType: ScreenType) => {
  if (screenType === 'mobile') {
    return isOpen ? "open" : "closed"
  }

  return "";
};

const getBarAnimation = (screenType: ScreenType) => {
  return screenType === 'mobile' ? 'vertical' : 'horizontal';
};

export {
  getActiveClass,
  getMobileAnimation,
  getBarAnimation
};
