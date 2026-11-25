import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import type { PageDataState } from "../../services/cache";
import {
  AUTO_DISMISS_DELAY_MS,
  BadgeKind,
  SLOW_REQUEST_THRESHOLD_MS,
  STALE_DISMISS_DELAY_MS,
} from "./messages";
import { getBadgeTransition } from "./getBadgeTransition";
import { BadgeEntry, badgeStackReducer } from "./badgeStack";

const getDismissDelay = ({ kind, isStale }: BadgeEntry) =>
  isStale
    ? Math.min(STALE_DISMISS_DELAY_MS, AUTO_DISMISS_DELAY_MS[kind])
    : AUTO_DISMISS_DELAY_MS[kind];

export const useDataStatusBadge = ({ status, requestedAt }: PageDataState) => {
  const [badges, dispatch] = useReducer(badgeStackReducer, []);
  const [isPaused, setIsPaused] = useState(false);
  const previousStatusRef = useRef<PageDataState["status"]>();
  const hasWarnedRef = useRef(false);
  const nextIdRef = useRef(0);

  const show = useCallback((kind: BadgeKind | null) => {
    if (kind === "slow" || kind === "error") {
      hasWarnedRef.current = true;
    }

    if (kind === "updated") {
      hasWarnedRef.current = false;
    }

    if (kind === null) {
      dispatch({ type: "markStale" });
      return;
    }

    nextIdRef.current += 1;
    dispatch({ type: "show", id: nextIdRef.current, kind });
  }, []);

  // Error, success and new requests
  useEffect(() => {
    const nextBadge = getBadgeTransition({
      previousStatus: previousStatusRef.current,
      status,
      hasWarned: hasWarnedRef.current,
    });
    previousStatusRef.current = status;

    if (nextBadge !== undefined) {
      show(nextBadge);
    }
  }, [status, show]);

  // Requests that take longer than the threshold
  useEffect(() => {
    if (status !== "loading") {
      return;
    }

    const elapsed = Date.now() - (requestedAt ?? Date.now());
    const timeoutId = setTimeout(
      () => show("slow"),
      Math.max(0, SLOW_REQUEST_THRESHOLD_MS - elapsed)
    );

    return () => clearTimeout(timeoutId);
  }, [status, requestedAt, show]);

  // Auto dismiss, paused while the user interacts with any badge. The timers
  // restart when the stack changes, and stale badges always leave first
  useEffect(() => {
    if (isPaused) {
      return;
    }

    const timeoutIds = badges.map((badge) =>
      setTimeout(
        () => dispatch({ type: "dismiss", id: badge.id }),
        getDismissDelay(badge)
      )
    );

    return () => timeoutIds.forEach(clearTimeout);
  }, [badges, isPaused]);

  return {
    badges,
    dismiss: (id: number) => dispatch({ type: "dismiss", id }),
    /**
     * Pauses the auto dismiss while the user hovers or focuses a badge. Keep
     * it in sync when the stack changes: removed elements don't fire
     * `mouseleave`/`blur`
     */
    setIsPaused,
  };
};
