import { linkType, LinkTypes } from "./linkType";
export const getLinkTarget = (href: string) => {
  if (!href) {
    return "_self";
  }
  return linkType(href) === LinkTypes.INTERNAL ? "_self" : "_blank";
};
