import DOMPurify from "dompurify";

export function sanitizeAndTrimString(str: string) {
  return DOMPurify.sanitize(str.trim());
}
