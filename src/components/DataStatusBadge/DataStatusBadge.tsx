import { useEffect, useRef } from "react";
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
 *
 * A new badge enters at the bottom and the previous one stays stacked above
 * it, dimmed, until it dismisses itself.
 */
export const DataStatusBadge = ({
  dataState,
  onRetry,
}: DataStatusBadgeProps) => {
  const { badges, dismiss, setIsPaused } = useDataStatusBadge(dataState);
  const regionRef = useRef<HTMLDivElement>(null);

  // Removed elements (a dismissed badge, the "Try again" button of a stale
  // badge) don't fire `mouseleave`/`blur`, so the pause is synced with the
  // badges that are still displayed
  useEffect(() => {
    const region = regionRef.current;
    if (!region) {
      return;
    }

    setIsPaused(
      badges.some(({ id }) => {
        const element = region.querySelector(`[data-badge-id="${id}"]`);
        return (
          !!element &&
          (element.matches(":hover") ||
            element.contains(document.activeElement))
        );
      })
    );
  }, [badges, setIsPaused]);

  return createPortal(
    // The live region is always rendered and badges are only added to it (the
    // previous ones aren't re-rendered as new nodes), so screen readers only
    // announce the new badge
    <div
      ref={regionRef}
      className={styles["region"]}
      role="status"
      aria-live="polite"
    >
      {/* A leaving badge keeps its space until it fades out, then the rest
          move to their new position (`layout="position"` animates the
          position only, never the size). `popLayout` isn't used: it places
          the leaving badge relative to the region top, which moves because
          the region is anchored to the bottom */}
      <AnimatePresence>
        {badges.map(({ id, kind, isStale }) => (
          <motion.div
            key={id}
            layout="position"
            className={styles["item"]}
            data-badge-id={id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          >
            <div
              className={styles["badge"]}
              data-badge={kind}
              data-stale={isStale}
            >
              <div className={styles["content"]}>
                <p className={styles["title"]}>{BADGE_MESSAGES[kind].title}</p>
                <p className={styles["description"]}>
                  {BADGE_MESSAGES[kind].description}
                </p>
                {kind === "error" && !isStale && onRetry && (
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
                onClick={() => dismiss(id)}
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
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
};
