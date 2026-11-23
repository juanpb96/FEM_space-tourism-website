import {
  DEFAULT_DOCUMENT_TITLE,
  formatDocumentTitle,
} from "../useDocumentTitle";

describe("formatDocumentTitle", () => {
  it("should prefix the page title to the default title", () => {
    expect(formatDocumentTitle("Crew")).toBe("Crew | Space tourism website");
  });

  it("should return the default title when there is no page title", () => {
    expect(formatDocumentTitle()).toBe(DEFAULT_DOCUMENT_TITLE);
    expect(formatDocumentTitle("")).toBe(DEFAULT_DOCUMENT_TITLE);
  });
});
