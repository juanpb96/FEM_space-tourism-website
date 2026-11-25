import type { PageDataStatus } from "../../services/cache";
import type { BadgeKind } from "./messages";

interface BadgeTransition {
  previousStatus: PageDataStatus | undefined;
  status: PageDataStatus;
  /** Whether the user was told the page displays fallback data */
  hasWarned: boolean;
}

/**
 * Returns the badge to display when the data status changes:
 * - `undefined`: keep the current badges as they are
 * - `null`: no new badge, but the current ones are outdated (they stay
 *   dimmed until they dismiss themselves)
 *
 * The "slow" badge depends on time, so it is handled by a timer instead.
 */
export const getBadgeTransition = ({
  previousStatus,
  status,
  hasWarned,
}: BadgeTransition): BadgeKind | null | undefined => {
  // Only react to changes, not to the status the page was mounted with
  if (previousStatus === undefined || previousStatus === status) {
    return undefined;
  }

  switch (status) {
    case "error":
      return "error";
    case "success":
      return hasWarned ? "updated" : null;
    case "loading":
      // A new request (e.g. "Try again") makes the previous error outdated
      return null;
    default:
      return undefined;
  }
};
