import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./styles/destination-pagination.module.scss";

interface DestinationPaginationProps {
  pages: string[];
  setActivePage: (page: string) => void;
}

export const DestinationPagination = ({
  pages,
  setActivePage,
}: DestinationPaginationProps) => {
  const [activePageIndex, setActivePageIndex] = useState(0);

  return (
    <div
      role="group"
      aria-label="Choose your destination"
      className={styles["pagination"]}
    >
      {pages.map((page, index) => {
        const isActive = activePageIndex === index;
        const activeClass = isActive ? styles["active"] : "";
        const buttonClass = `${styles["destination"]} ${activeClass}`;

        return (
          <button
            type="button"
            className={buttonClass}
            key={page}
            onClick={() => {
              setActivePageIndex(index);
              setActivePage(page);
            }}
            aria-pressed={isActive}
          >
            {page}
            {/* A layout animation moves the bar between options, even when they wrap into several rows */}
            {isActive && (
              <motion.span
                layoutId="destination-bar"
                className={styles["bar"]}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
