import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { Direction } from "../animations/tab-transition.variants";

interface Tab {
  name: string;
}

/**
 * Returns the direction of the transition when moving from `currentName` to
 * `nextName`: `-1` when the next tab comes before the current one and `1`
 * otherwise.
 */
export const getTabDirection = (
  tabs: Tab[],
  currentName: string,
  nextName: string
): Direction => {
  const currentIndex = tabs.findIndex((tab) => tab.name === currentName);
  const nextIndex = tabs.findIndex((tab) => tab.name === nextName);

  return nextIndex < currentIndex ? -1 : 1;
};

/**
 * Keeps track of the direction of the transition between tabs. It wraps the
 * `onPaginationClick` from `usePageData` so the direction is updated before
 * the tab changes, and returns `0` when the user prefers reduced motion.
 */
export const useTabDirection = (
  tabs: Tab[],
  currentName: string | undefined,
  onPaginationClick: (name: string) => void
) => {
  const [direction, setDirection] = useState<Direction>(1);
  const shouldReduceMotion = useReducedMotion();

  const onTabChange = (name: string) => {
    if (currentName !== undefined) {
      setDirection(getTabDirection(tabs, currentName, name));
    }
    onPaginationClick(name);
  };

  return {
    direction: shouldReduceMotion ? (0 as Direction) : direction,
    onTabChange,
  };
};
