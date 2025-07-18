import { useEffect, useState } from "react";
import { Menu } from "./Menu";
import { useScreenType } from "../../hooks/useScreenType";
import { MenuMobile } from "./MenuMobile";
import styles from "./styles/navigation-bar.module.scss";

export const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const screenType = useScreenType();

  useEffect(() => {
    setIsOpen(false);
  }, [screenType]);

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles["nav-container"]}>
      {screenType === "mobile" ? (
        <MenuMobile isOpen={isOpen} onToggle={onToggle} />
      ) : (
        <Menu />
      )}
    </div>
  );
};
