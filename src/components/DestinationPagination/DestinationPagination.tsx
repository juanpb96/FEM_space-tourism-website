import { motion } from "framer-motion";
import { MouseEvent } from "react";
import { useLocationBar } from "../../hooks/useLocationBar";
import { useScreenType } from "../../hooks/useScreenType";
import { calculateHorizontalMoveByViewport } from "./animations/horizontal-move";
import styles from "./styles/destination-pagination.module.scss";

interface DestinationPaginationProps {
  pages: string[];
  setActivePage: (page: string) => void;
}

// TODO: Increase options clickable area to enhance usability - Issue #48
// TODO: Options should be focusable with keyboard navigation
//       - Refactor component structure to enhance accessibility
// TODO: Consider if keeping the onClick function in this component is the best approach or if it should be received as a prop
export const DestinationPagination = ({
  pages,
  setActivePage,
}: DestinationPaginationProps) => {
  const {
    containerRef,
    barRef,
    options,
    activeMenuOptionIndex,
    setActiveMenuOptionIndex,
  } = useLocationBar<HTMLDivElement, HTMLButtonElement>(pages, 0);
  const screenType = useScreenType();

  const onLinkClick = (e: MouseEvent, index: number) => {
    e.preventDefault();
    setActiveMenuOptionIndex(index);
    setActivePage(pages[index]);
  };

  return (
    <div className={styles["pagination-wrapper"]}>
      <div
        ref={containerRef}
        role="group"
        aria-label="Choose your destination"
        className={styles["pagination"]}
      >
        {pages.map((page, index) => (
          <button
            className={styles["destination"]}
            key={page}
            onClick={(e) => onLinkClick(e, index)}
            aria-pressed={activeMenuOptionIndex === index ? "true" : "false"}
          >
            {page}
          </button>
        ))}
      </div>

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
    </div>
  );
};
