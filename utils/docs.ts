import { RouteLocationNormalized } from "vue-router";
import { joinPath } from "./joinPath";

const PAGE_BLACKLIST = ["/summary", "/confidential-assets"];

export const extractCategory = (path: string): string | null => {
  const parts = path.split("/");

  // Case with language code
  if (parts.length > 3 && parts[2] === "docs") {
    return `/docs/${parts[3]}`;
  }

  // Case without language code
  if (parts.length > 2 && parts[1] === "docs") {
    return `/docs/${parts[2]}`;
  }

  return null;
};

export function normalizePath(path: string): string {
  const combinedPattern = /^(?:\.\/)?(?:\/[a-z]{2})?(\/[^/]+(?:\/[^/]+)*\/?)$/;
  const withoutHash = path.split("#")[0]; // Remove any hash from the path
  const normalizedPath = withoutHash.replace(combinedPattern, (match, p1) =>
    p1.endsWith("/") ? p1.slice(0, -1) : p1
  );
  return normalizedPath;
}

export const isIndex = (path: string): boolean => path.endsWith("/readme");

export const handleIndex = async (path: string): Promise<string> => {
  const readme = joinPath(path, "readme");
  return (await pageExist(readme)) ? readme : path;
};

export const isPageBlacklisted = (path: string): boolean =>
  PAGE_BLACKLIST.some((blacklisted) => path.endsWith(blacklisted));

export const isSameCategory = (
  path: string,
  route: RouteLocationNormalized
): boolean => {
  const currentPathCategory = extractCategory(route.fullPath);
  const targetPathCategory = extractCategory(path);
  return currentPathCategory === targetPathCategory;
};

export const pageExist = async (path: string): Promise<boolean> =>
  !isPageBlacklisted(path) && (await queryContent(path).find()).length > 0;
