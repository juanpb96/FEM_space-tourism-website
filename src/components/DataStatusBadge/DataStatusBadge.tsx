import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import type { PageDataState } from "../../services/cache";
import { BADGE_MESSAGES } from "./messages";
import { useDataStatusBadge } from "./useDataStatusBadge";
import styles from "./styles/data-status-badge.module.scss";

interface DataStatusBadgeProps {
  dataState: PageDataState;
  /** Displays a "Try again" button when the request fails */
  onRetry?: () => void;
}

/**
 * Lets the user know the page displays the fallback data (data.json) because
 * the API is slow or failed, and when the latest data has been loaded.
 */
export const DataStatusBadge = ({
  dataState,
  onRetry,
}: DataStatusBadgeProps) => {
  const { badge, dismiss, pause, resume } = useDataStatusBadge(dataState);

  return createPortal(
    // The live region is always rendered, so screen readers announce the
    // badges when they are added to it
    <div className={styles["region"]} role="status" aria-live="polite">
      <AnimatePresence>
        {badge && (
          <motion.div
            key={badge}
            className={styles["badge"]}
            data-badge={badge}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onMouseEnter={pause}
            onMouseLeave={resume}
            onFocus={pause}
            onBlur={resume}
          >
            <div className={styles["content"]}>
              <p className={styles["title"]}>{BADGE_MESSAGES[badge].title}</p>
              <p className={styles["description"]}>
                {BADGE_MESSAGES[badge].description}
              </p>
              {badge === "error" && onRetry && (
                <button
                  type="button"
                  className={styles["retry"]}
                  onClick={onRetry}
                >
                  Try again
                </button>
              )}
            </div>
            <button
              type="button"
              className={styles["dismiss"]}
              aria-label="Dismiss notification"
              onClick={dismiss}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                width="16"
                height="16"
              >
                <path
                  d="M3 3l10 10M13 3L3 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>,
    document.body
  );
};
