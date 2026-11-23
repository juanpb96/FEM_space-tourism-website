import { getTabDirection } from "../useTabDirection";

const tabs = [{ name: "Moon" }, { name: "Mars" }, { name: "Europa" }];

describe("getTabDirection", () => {
  it("should return 1 when moving forward", () => {
    expect(getTabDirection(tabs, "Moon", "Europa")).toBe(1);
  });

  it("should return -1 when moving backwards", () => {
    expect(getTabDirection(tabs, "Europa", "Mars")).toBe(-1);
  });

  it("should return 1 when selecting the current tab", () => {
    expect(getTabDirection(tabs, "Mars", "Mars")).toBe(1);
  });
});
