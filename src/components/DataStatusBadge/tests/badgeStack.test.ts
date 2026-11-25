import { BadgeEntry, badgeStackReducer } from "../badgeStack";

const errorBadge: BadgeEntry = { id: 1, kind: "error", isStale: false };

describe("badgeStackReducer", () => {
  it("should add the new badge at the bottom and keep the previous one as stale", () => {
    expect(
      badgeStackReducer([errorBadge], { type: "show", id: 2, kind: "updated" })
    ).toEqual([
      { ...errorBadge, isStale: true },
      { id: 2, kind: "updated", isStale: false },
    ]);
  });

  it("should only keep the current badge and the previous one", () => {
    const stack = [
      { id: 1, kind: "slow", isStale: true },
      { id: 2, kind: "error", isStale: false },
    ] satisfies BadgeEntry[];

    expect(
      badgeStackReducer(stack, { type: "show", id: 3, kind: "updated" })
    ).toEqual([
      { id: 2, kind: "error", isStale: true },
      { id: 3, kind: "updated", isStale: false },
    ]);
  });

  it("should mark the current badge as stale without removing it", () => {
    expect(badgeStackReducer([errorBadge], { type: "markStale" })).toEqual([
      { ...errorBadge, isStale: true },
    ]);
  });

  it("should keep the same stack when there is nothing to mark as stale", () => {
    const stack = [{ ...errorBadge, isStale: true }];

    expect(badgeStackReducer(stack, { type: "markStale" })).toBe(stack);
    expect(badgeStackReducer([], { type: "markStale" })).toEqual([]);
  });

  it("should dismiss only the given badge", () => {
    const stack = [
      { ...errorBadge, isStale: true },
      { id: 2, kind: "updated", isStale: false },
    ] satisfies BadgeEntry[];

    expect(badgeStackReducer(stack, { type: "dismiss", id: 1 })).toEqual([
      { id: 2, kind: "updated", isStale: false },
    ]);
  });
});
