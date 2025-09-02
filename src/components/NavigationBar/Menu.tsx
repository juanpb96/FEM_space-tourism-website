import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import { getActiveClass } from "./utils/Menu.utils";
import { useLocationBar } from "../../hooks/useLocationBar";
import styles from "./styles/menu.module.scss";
import { useEffect } from "react";

const PAGES = ["Home", "Destination", "Crew", "Technology"];

export const Menu = () => {
  // TODO: Evaluate if this hook is worth keeping after layout animations implementation - Issue #50
  const { activeMenuOptionIndex, setActiveMenuOptionIndex } = useLocationBar<
    HTMLOListElement,
    HTMLLIElement
  >();
  const location = useLocation();

  const onLinkClick = (index: number) => {
    setActiveMenuOptionIndex(index);
  };

  useEffect(() => {
    const newIndex = PAGES.map((item) => item.toLowerCase()).indexOf(
      location.pathname.slice(1).toLowerCase()
    );

    if (newIndex >= 0) {
      setActiveMenuOptionIndex(newIndex);
    }
  }, [location.pathname, setActiveMenuOptionIndex]);

  return (
    <nav className={styles["menu"]}>
      <ol>
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
            {activeMenuOptionIndex === index && (
              <motion.div layoutId="location-bar" className={styles["bar"]} />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
