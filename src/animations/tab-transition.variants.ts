import type { Variants } from "framer-motion";

/**
 * Direction of the transition between tabs (crew members, destinations,
 * technologies...): `1` when moving forward in the pagination, `-1` when
 * moving backwards and `0` to skip the movement (e.g. when the user prefers
 * reduced motion).
 */
export type Direction = 1 | -1 | 0;

interface TabTransitionOptions {
  /**
   * `x` slides the element horizontally following the direction (used for
   * images), `y` makes it rise from below no matter the direction (used for
   * text blocks).
   */
  axis: "x" | "y";
  /** Distance in pixels the element travels while entering/exiting */
  offset: number;
}

// <MotionConfig reducedMotion="user" /> (SpaceTourismWebsite) doesn't animate
// transforms for users who prefer reduced motion, but it still applies them
// instantly, which would make the elements jump. A `0` direction removes the
// movement so those users get a plain cross-fade instead.
export const createTabTransitionVariants = ({
  axis,
  offset,
}: TabTransitionOptions): Variants => {
  const getOffset = (direction: Direction) =>
    axis === "x" ? direction * offset : Math.abs(direction) * offset;

  return {
    enter: (direction: Direction) => ({
      opacity: 0,
      [axis]: getOffset(direction),
    }),
    center: {
      opacity: 1,
      [axis]: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
    exit: (direction: Direction) => ({
      opacity: 0,
      [axis]: -getOffset(direction),
      transition: { duration: 0.2, ease: "easeIn" },
    }),
  };
};

/** Variants for the main image of a tab (crew photo, planet, technology) */
export const imageVariants = createTabTransitionVariants({
  axis: "x",
  offset: 60,
});

/** Variants for the text block describing the current tab */
export const textVariants = createTabTransitionVariants({
  axis: "y",
  offset: 20,
});
