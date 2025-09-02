import styles from "../styles/menu.module.scss";

const getActiveClass = ({ isActive }: { isActive: boolean }) => {
  return isActive ? styles["active"] : "";
};

const getMobileAnimation = (isOpen: boolean) => {
  return isOpen ? "open" : "closed";
};

export { getActiveClass, getMobileAnimation };
