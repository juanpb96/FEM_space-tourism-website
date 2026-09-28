import { useCallback, useEffect, useRef, useState } from "react";
import type { PageDataState } from "../../services/cache";
import {
  AUTO_DISMISS_DELAY_MS,
  BadgeKind,
  SLOW_REQUEST_THRESHOLD_MS,
} from "./messages";
import { getBadgeTransition } from "./getBadgeTransition";

export const useDataStatusBadge = ({ status, requestedAt }: PageDataState) => {
  const [badge, setBadge] = useState<BadgeKind | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const previousStatusRef = useRef<PageDataState["status"]>();
  const hasWarnedRef = useRef(false);

  const show = useCallback((kind: BadgeKind | null) => {
    if (kind === "slow" || kind === "error") {
      hasWarnedRef.current = true;
    }

    if (kind === "updated") {
      hasWarnedRef.current = false;
    }

    setBadge(kind);
    // Focus/hover events aren't fired when the badge is removed
    setIsPaused(false);
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

  // Auto dismiss, paused while the user interacts with the badge
  useEffect(() => {
    if (!badge || isPaused) {
      return;
    }

    const timeoutId = setTimeout(
      () => setBadge(null),
      AUTO_DISMISS_DELAY_MS[badge]
    );

    return () => clearTimeout(timeoutId);
  }, [badge, isPaused]);

  return {
    badge,
    dismiss: () => show(null),
    pause: () => setIsPaused(true),
    resume: () => setIsPaused(false),
  };
};
