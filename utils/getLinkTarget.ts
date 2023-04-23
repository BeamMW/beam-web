export const getLinkTarget = (href: string) => {
  return href.startsWith("/") || href.startsWith("#") ? "_self" : "_blank";
};
