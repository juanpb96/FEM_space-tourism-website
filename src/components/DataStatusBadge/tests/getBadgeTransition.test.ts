import { getBadgeTransition } from "../getBadgeTransition";

describe("getBadgeTransition", () => {
  it("should ignore the status the page was mounted with", () => {
    expect(
      getBadgeTransition({
        previousStatus: undefined,
        status: "error",
        hasWarned: false,
      })
    ).toBeUndefined();
  });

  it("should ignore renders without a status change", () => {
    expect(
      getBadgeTransition({
        previousStatus: "loading",
        status: "loading",
        hasWarned: true,
      })
    ).toBeUndefined();
  });

  it("should show the error badge when the request fails", () => {
    expect(
      getBadgeTransition({
        previousStatus: "loading",
        status: "error",
        hasWarned: false,
      })
    ).toBe("error");
  });

  it("should show the updated badge only if the user was warned before", () => {
    expect(
      getBadgeTransition({
        previousStatus: "loading",
        status: "success",
        hasWarned: true,
      })
    ).toBe("updated");
    expect(
      getBadgeTransition({
        previousStatus: "loading",
        status: "success",
        hasWarned: false,
      })
    ).toBeNull();
  });

  it("should hide the error badge when a new request starts", () => {
    expect(
      getBadgeTransition({
        previousStatus: "error",
        status: "loading",
        hasWarned: true,
      })
    ).toBeNull();
  });
});
