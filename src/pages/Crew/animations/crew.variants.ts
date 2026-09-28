import type { Variants } from "framer-motion";

/**
 * Direction of the transition between crew members:
 * `1` when moving forward in the pagination, `-1` when moving backwards and
 * `0` to skip the movement (e.g. when the user prefers reduced motion).
 */
export type Direction = 1 | -1 | 0;

const PHOTO_OFFSET = 60;
const DETAILS_OFFSET = 20;

// <MotionConfig reducedMotion="user" /> (SpaceTourismWebsite) doesn't animate
// transforms for users who prefer reduced motion, but it still applies them
// instantly, which would make the elements jump. A `0` direction removes the
// movement so those users get a plain cross-fade instead.
export const photoVariants: Variants = {
  enter: (direction: Direction) => ({
    opacity: 0,
    x: direction * PHOTO_OFFSET,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: (direction: Direction) => ({
    opacity: 0,
    x: direction * -PHOTO_OFFSET,
    transition: { duration: 0.2, ease: "easeIn" },
  }),
};

export const detailsVariants: Variants = {
  enter: (direction: Direction) => ({
    opacity: 0,
    y: Math.abs(direction) * DETAILS_OFFSET,
  }),
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: (direction: Direction) => ({
    opacity: 0,
    y: Math.abs(direction) * -DETAILS_OFFSET,
    transition: { duration: 0.2, ease: "easeIn" },
  }),
};
