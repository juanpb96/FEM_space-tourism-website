import type { BadgeKind } from "./messages";

/** Badges displayed at the same time: the current one and the previous one */
export const MAX_STACKED_BADGES = 2;

export interface BadgeEntry {
  /** Unique per badge, so the same kind can be displayed again as a new badge */
  id: number;
  kind: BadgeKind;
  /**
   * A newer badge (or a new request) replaced this one. It stays above the
   * current badge, dimmed, until it dismisses itself
   */
  isStale: boolean;
}

export type BadgeStackAction =
  | { type: "show"; id: number; kind: BadgeKind }
  | { type: "markStale" }
  | { type: "dismiss"; id: number };

/**
 * The newest badge goes last (displayed at the bottom) and the previous ones
 * are kept above it as stale badges
 */
export const badgeStackReducer = (
  stack: BadgeEntry[],
  action: BadgeStackAction
): BadgeEntry[] => {
  switch (action.type) {
    case "show":
      return [
        ...markAllStale(stack),
        { id: action.id, kind: action.kind, isStale: false },
      ].slice(-MAX_STACKED_BADGES);
    case "markStale":
      return stack.some((entry) => !entry.isStale)
        ? markAllStale(stack)
        : stack;
    case "dismiss":
      return stack.filter((entry) => entry.id !== action.id);
  }
};

const markAllStale = (stack: BadgeEntry[]): BadgeEntry[] =>
  stack.map((entry) => (entry.isStale ? entry : { ...entry, isStale: true }));
