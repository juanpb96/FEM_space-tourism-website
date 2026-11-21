export type BadgeKind = "slow" | "error" | "updated";

/** A request that takes longer than this displays the "slow" badge */
export const SLOW_REQUEST_THRESHOLD_MS = 60 * 1000;

/** Time before each badge dismisses itself (paused on hover/focus) */
export const AUTO_DISMISS_DELAY_MS: Record<BadgeKind, number> = {
  slow: 15 * 1000,
  error: 15 * 1000,
  updated: 5 * 1000,
};

export const BADGE_MESSAGES: Record<
  BadgeKind,
  { title: string; description: string }
> = {
  slow: {
    title: "Still loading",
    description:
      "The latest data is taking longer than usual. You're seeing a saved copy in the meantime.",
  },
  error: {
    title: "Couldn't load the latest data",
    description: "You're seeing a saved copy of this content.",
  },
  updated: {
    title: "Up to date",
    description: "The latest data has been loaded.",
  },
};
