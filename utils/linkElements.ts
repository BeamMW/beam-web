import {
  preHtml,
} from "@/app.config";

export interface LinkElement {
  rel: string;
  href: string;
  as?: string;
  crossorigin?: boolean;
}

export type URLEntry = string | Omit<LinkElement, 'rel'>;

function isString(urlOrObject: URLEntry): urlOrObject is string {
  return typeof urlOrObject === 'string';
}

export const linkElements: LinkElement[] = [];

for (const [relType, urls] of Object.entries(preHtml)) {
  urls.forEach((urlOrObject: URLEntry) => {
      const linkElement: LinkElement = isString(urlOrObject)
      ? { rel: relType, href: urlOrObject }
      : { ...urlOrObject, rel: relType };
      linkElements.push(linkElement);
  });
}
