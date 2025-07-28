import { motion } from "framer-motion";
import { useLocationBar } from "../../hooks/useLocationBar";
import { useScreenType } from "../../hooks/useScreenType";
import { calculateHorizontalMoveByViewport } from "./animations/horizontal-move";
import styles from "./styles/destination-pagination.module.scss";

interface DestinationPaginationProps {
  pages: string[];
  setActivePage: (page: string) => void;
}

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

  return (
    <div className={styles["pagination-wrapper"]}>
      <div
        ref={containerRef}
        role="group"
        aria-label="Choose your destination"
        className={styles["pagination"]}
      >
        {pages.map((page, index) => {
          const isActive = activeMenuOptionIndex === index;
          const activeClass = isActive ? styles["active"] : "";
          const buttonClass = `${styles["destination"]} ${activeClass}`;

          return (
            <button
              type="button"
              className={buttonClass}
              key={page}
              onClick={() => {
                setActiveMenuOptionIndex(index);
                setActivePage(page);
              }}
              aria-pressed={isActive}
            >
              {page}
            </button>
          );
        })}
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
