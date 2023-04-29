import { RouteLocationNormalized } from "vue-router";
import { joinPath } from "./joinPath";

export function extractCategory(path: string): string | null {
  const regex = /^\/(?:\w{2}\/)?docs\/([^/]+)/;
  const match = path.match(regex);

  if (match && match[1]) {
    return `/docs/${match[1]}`;
  }

  return null;
}

export function isIndex(path: string): boolean {
  return path.endsWith("/readme");
}

export async function handleIndex(path: string): Promise<string> {
  const readme = joinPath(path, "readme");
  const isIndex = await pageExist(readme);
  return isIndex ? readme : path;
}

export const isPageBlacklisted = (path: string): boolean => {
  if (path.endsWith("/summary")) {
    return true;
  }
  if (path.endsWith("/confidential-assets")) {
    return true;
  }
  return false;
};

export const isSameCategory = (
  path: string,
  route: RouteLocationNormalized
): boolean => {
  const currentPathCategory = extractCategory(route.fullPath);
  const targetPathCategory = extractCategory(path);
  if (!currentPathCategory || !targetPathCategory) {
    return false;
  }
  return currentPathCategory === targetPathCategory;
};

export const pageExist = async (path: string): Promise<boolean> => {
  if (isPageBlacklisted(path)) {
    return false;
  }
  const contentQuery = queryContent(path);
  const query = await contentQuery.find();
  return query.length > 0;
};
