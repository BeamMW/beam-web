export const getLinkTarget = (href: string) => {
  if (!href) {
    return "_self";
  }
  return href.startsWith("/") || href.startsWith("#") ? "_self" : "_blank";
};
