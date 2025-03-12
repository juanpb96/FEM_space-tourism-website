import { motion } from "framer-motion";
import { MouseEvent } from "react";
import { useLocationBar } from "../../hooks/useLocationBar";
import { useScreenType } from "../../hooks/useScreenType";
import { calculateHorizontalMoveByViewport } from "./animations/horizontal-move";
import styles from "./styles/inner-navigation-bar.module.scss";

interface InnerNavigationBarProps {
  pages: string[];
  setActivePage: (page: string) => void;
}

// TODO: Increase options clickable area to enhance usability - Issue #48
// TODO: Rename the component to be more specific
// TODO: Consider if keeping the onClick function in this component is the best approach or if it should be received as a prop
export const InnerNavigationBar = ({
  pages,
  setActivePage,
}: InnerNavigationBarProps) => {
  const {
    olRef,
    barRef,
    options,
    activeMenuOptionIndex,
    setActiveMenuOptionIndex,
  } = useLocationBar(pages);
  const screenType = useScreenType();

  const onLinkClick = (e: MouseEvent, index: number) => {
    e.preventDefault();
    setActiveMenuOptionIndex(index);
    setActivePage(pages[index]);
  };

  return (
    <nav className={styles["nav"]}>
      <ol ref={olRef}>
        {pages.map((page, index) => (
          <li key={page} onClick={(e) => onLinkClick(e, index)}>
            {page}
          </li>
        ))}
      </ol>

      <motion.div
        ref={barRef}
        className={styles["bar"]}
        animate={{
          x: calculateHorizontalMoveByViewport({
            screenType,
            options,
            index: activeMenuOptionIndex,
          }),
        }}
      />
    </nav>
  );
};
