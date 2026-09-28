import { useEffect } from "react";
import { useMatches } from "react-router-dom";

export const DEFAULT_DOCUMENT_TITLE = "Space tourism website";

interface RouteHandle {
  title?: string;
}

export const formatDocumentTitle = (pageTitle?: string) =>
  pageTitle ? `${pageTitle} | ${DEFAULT_DOCUMENT_TITLE}` : DEFAULT_DOCUMENT_TITLE;

/**
 * Updates the browser tab title using the `handle.title` of the deepest
 * matched route, e.g. "Crew | Space tourism website".
 */
export const useDocumentTitle = () => {
  const matches = useMatches();
  const pageTitle = [...matches]
    .reverse()
    .map((match) => (match.handle as RouteHandle | undefined)?.title)
    .find(Boolean);

  useEffect(() => {
    document.title = formatDocumentTitle(pageTitle);
  }, [pageTitle]);
};
