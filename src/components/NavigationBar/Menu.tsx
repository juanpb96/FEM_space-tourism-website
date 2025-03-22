import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import { useScreenType } from "../../hooks/useScreenType";
import { menuVariants } from "./animations/menu.variants";
import { getActiveClass, getBarAnimation } from "./utils/Menu.utils";
import { useLocationBar } from "../../hooks/useLocationBar";
import styles from "./styles/menu.module.scss";
import { useEffect } from "react";

const PAGES = ["Home", "Destination", "Crew", "Technology"];

export const Menu = () => {
  const {
    olRef,
    barRef,
    options,
    activeMenuOptionIndex,
    setActiveMenuOptionIndex,
  } = useLocationBar();
  const screenType = useScreenType();
  const location = useLocation();

  useEffect(() => {
    const newIndex = PAGES.map((item) => item.toLowerCase()).indexOf(
      location.pathname.slice(1).toLowerCase()
    );

    if (newIndex >= 0) {
      setActiveMenuOptionIndex(newIndex);
    }
  }, [location.pathname, setActiveMenuOptionIndex]);

  const onLinkClick = (index: number) => {
    setActiveMenuOptionIndex(index);
  };

  return (
    <nav className={styles["menu"]}>
      <ol ref={olRef}>
        {PAGES.map((page, index) => (
          <li key={page}>
            <NavLink
              to={`/${page.toLowerCase()}`}
              className={getActiveClass}
              onClick={() => onLinkClick(index)}
            >
              <span className={styles["counter"]}>0{index}</span>
              {page}
            </NavLink>
          </li>
        ))}
      </ol>
      <motion.div
        ref={barRef}
        className={styles["bar"]}
        initial={false}
        custom={{
          screenType,
          options,
          index: activeMenuOptionIndex,
        }}
        animate={getBarAnimation(screenType)}
        variants={menuVariants}
      />
    </nav>
  );
};
