import { useDocumentTitle } from "../../hooks";

export const PageNotFound = () => {
  useDocumentTitle("Page Not Found");
  return <>404</>;
};
